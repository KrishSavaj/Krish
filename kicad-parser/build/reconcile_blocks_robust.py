#!/usr/bin/env python3
"""
Robust reconciliation of junctions, wires, and symbols with original files.
Handles minor floating-point differences and normalizes formats.
Produces cleaned *_cleaned.txt files that better match original files.
"""

import re
from math import isclose

# Config
FLOAT_TOLERANCE = 0.01

# Input/output files
FILES = [
    ("final_junctions.txt", "orig_junctions.txt", "final_junctions_cleaned.txt", "junction"),
    ("final_wires.txt", "orig_wires.txt", "final_wires_cleaned.txt", "wire"),
    ("final_symbols.txt", "orig_symbols.txt", "final_symbols_cleaned.txt", "symbol")
]

# -------------------------------------------------------------
# Utility functions
# -------------------------------------------------------------
def normalize_symbol(text):
    """Round all floats to 2 decimals and remove extra spaces."""
    text = re.sub(r'\b\d+\.\d+\b', lambda m: f"{round(float(m.group()), 2)}", text)
    text = re.sub(r'\s+', ' ', text).strip()
    return text


def parse_junction(line):
    """Extract (x, y) coordinates from a junction line."""
    m = re.search(r'\(at ([\d\.\-]+) ([\d\.\-]+)\)', line)
    return (float(m.group(1)), float(m.group(2))) if m else None


def parse_wire(line):
    """Extract (x1, y1), (x2, y2) from wire line (supports pts or start/end)."""
    pts = re.findall(r'\(xy ([\d\.\-]+) ([\d\.\-]+)\)', line)
    if pts and len(pts) == 2:
        return [(float(pts[0][0]), float(pts[0][1])),
                (float(pts[1][0]), float(pts[1][1]))]
    m = re.findall(r'\(start ([\d\.\-]+) ([\d\.\-]+)\) \(end ([\d\.\-]+) ([\d\.\-]+)\)', line)
    if m:
        return [(float(m[0][0]), float(m[0][1])),
                (float(m[0][2]), float(m[0][3]))]
    return None


def compare_junctions(orig, final):
    """Compare junction coordinates within tolerance."""
    return all(isclose(a, b, abs_tol=FLOAT_TOLERANCE) for a, b in zip(orig, final))


def compare_wires(orig_pts, final_pts):
    """Compare wire coordinates (supports reversed direction)."""
    # Direct match
    direct = all(isclose(a, b, abs_tol=FLOAT_TOLERANCE)
                 for (a, b) in zip(orig_pts[0], final_pts[0])) and \
             all(isclose(a, b, abs_tol=FLOAT_TOLERANCE)
                 for (a, b) in zip(orig_pts[1], final_pts[1]))

    # Reversed match
    reversed_match = all(isclose(a, b, abs_tol=FLOAT_TOLERANCE)
                         for (a, b) in zip(orig_pts[0], final_pts[1])) and \
                     all(isclose(a, b, abs_tol=FLOAT_TOLERANCE)
                         for (a, b) in zip(orig_pts[1], final_pts[0]))

    return direct or reversed_match

# -------------------------------------------------------------
# Process each file type
# -------------------------------------------------------------
for final_file, orig_file, cleaned_file, ftype in FILES:
    with open(final_file) as f:
        final_lines = [line.rstrip("\n") for line in f]
    with open(orig_file) as f:
        orig_lines = [line.rstrip("\n") for line in f]

    cleaned = []

    if ftype == "symbol":
        # Split symbols into blocks and normalize
        orig_blocks = [normalize_symbol(s)
                       for s in re.findall(r'\(symbol\b.*?\)(?=\s*\(symbol\b|$)',
                                           "\n".join(orig_lines), re.DOTALL)]
        final_blocks = [normalize_symbol(s)
                        for s in re.findall(r'\(symbol\b.*?\)(?=\s*\(symbol\b|$)',
                                            "\n".join(final_lines), re.DOTALL)]
        orig_set = set(orig_blocks)
        seen = set()
        for block in final_blocks:
            if block in orig_set and block not in seen:
                cleaned.append(block)
                seen.add(block)
        cleaned_text = "\n".join(cleaned)
        with open(cleaned_file, "w") as f:
            f.write(cleaned_text)

    elif ftype == "junction":
        # Compare junction coordinates
        for line in final_lines:
            final_coords = parse_junction(line)
            if final_coords and any(compare_junctions(final_coords, parse_junction(orig))
                                    for orig in orig_lines):
                cleaned.append(line)
        with open(cleaned_file, "w") as f:
            f.write("\n".join(cleaned))

    elif ftype == "wire":
        # Compare wire coordinates
        for line in final_lines:
            final_pts = parse_wire(line)
            if final_pts and any(compare_wires(final_pts, parse_wire(orig))
                                 for orig in orig_lines):
                cleaned.append(line)
        with open(cleaned_file, "w") as f:
            f.write("\n".join(cleaned))

        # ✅ Diagnostic: detect missing wires
        missing = []
        for line in final_lines:
            final_pts = parse_wire(line)
            if not final_pts:
                continue
            found = any(compare_wires(final_pts, parse_wire(orig)) for orig in orig_lines)
            if not found:
                missing.append(final_pts)
        if missing:
            print(f"⚠️ Missing wires ({len(missing)}):")
            for m in missing:
                print("   ", m)

    print(f"✅ Cleaned {ftype}: {final_file} -> {cleaned_file}: {len(cleaned)} items")

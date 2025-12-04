#!/usr/bin/env python3
"""
Robust validator for reconciled junctions, wires, and symbols.

Compares:
  - final_junctions_cleaned.txt vs orig_junctions.txt
  - final_wires_cleaned.txt     vs orig_wires.txt
  - final_symbols_cleaned.txt   vs orig_symbols.txt

This script uses:
  - tolerant float comparisons (FLOAT_TOLERANCE)
  - direction-agnostic wire matching (start/end swapped allowed)
  - normalization of numeric formatting in symbol blocks

Usage:
  chmod +x validate_cleaned_files.py
  ./validate_cleaned_files.py
"""
import re
from math import isclose
from pathlib import Path

FLOAT_TOLERANCE = 0.01

FILES = [
    ("final_junctions_cleaned.txt", "orig_junctions.txt", "junction"),
    ("final_wires_cleaned.txt",     "orig_wires.txt",     "wire"),
    ("final_symbols_cleaned.txt",   "orig_symbols.txt",   "symbol"),
]

# ---------- helpers ----------
def parse_junction(line):
    m = re.search(r'\(at\s+([-\d\.]+)\s+([-\d\.]+)\)', line)
    return (float(m.group(1)), float(m.group(2))) if m else None

def parse_wire(line):
    pts = re.findall(r'\(xy\s+([-\d\.]+)\s+([-\d\.]+)\)', line)
    if pts and len(pts) >= 2:
        # take first two xy if more provided
        return [(float(pts[0][0]), float(pts[0][1])),
                (float(pts[1][0]), float(pts[1][1]))]
    m = re.search(r'\(start\s+([-\d\.]+)\s+([-\d\.]+)\)\s*\(end\s+([-\d\.]+)\s+([-\d\.]+)\)', line)
    if m:
        return [(float(m.group(1)), float(m.group(2))),
                (float(m.group(3)), float(m.group(4)))]
    return None

def compare_junctions(a, b):
    return all(isclose(x, y, abs_tol=FLOAT_TOLERANCE) for x, y in zip(a, b))

def compare_wires(a_pts, b_pts):
    if not a_pts or not b_pts:
        return False
    direct = (isclose(a_pts[0][0], b_pts[0][0], abs_tol=FLOAT_TOLERANCE) and
              isclose(a_pts[0][1], b_pts[0][1], abs_tol=FLOAT_TOLERANCE) and
              isclose(a_pts[1][0], b_pts[1][0], abs_tol=FLOAT_TOLERANCE) and
              isclose(a_pts[1][1], b_pts[1][1], abs_tol=FLOAT_TOLERANCE))
    reversed_match = (isclose(a_pts[0][0], b_pts[1][0], abs_tol=FLOAT_TOLERANCE) and
                      isclose(a_pts[0][1], b_pts[1][1], abs_tol=FLOAT_TOLERANCE) and
                      isclose(a_pts[1][0], b_pts[0][0], abs_tol=FLOAT_TOLERANCE) and
                      isclose(a_pts[1][1], b_pts[0][1], abs_tol=FLOAT_TOLERANCE))
    return direct or reversed_match

def normalize_block_numbers(text):
    # Round floats to 2 decimals and collapse whitespace
    text = re.sub(r'\b(-?\d+\.\d+)\b', lambda m: f"{round(float(m.group()), 2)}", text)
    text = re.sub(r'\s+', ' ', text).strip()
    return text

def extract_symbol_blocks(text):
    return [normalize_block_numbers(s) for s in re.findall(r'\(symbol\b.*?\)(?=\s*\(symbol\b|$)', text, re.DOTALL)]

# ---------- main ----------
all_good = True

for cleaned_file, orig_file, ftype in FILES:
    cleaned_path = Path(cleaned_file)
    orig_path = Path(orig_file)

    cleaned_raw = cleaned_path.read_text().splitlines() if cleaned_path.exists() else []
    orig_raw = orig_path.read_text().splitlines() if orig_path.exists() else []

    missing = []
    extra = []

    if ftype == "junction":
        cleaned_parsed = [parse_junction(l) for l in cleaned_raw if parse_junction(l) is not None]
        orig_parsed = [parse_junction(l) for l in orig_raw if parse_junction(l) is not None]

        for o in orig_parsed:
            if not any(compare_junctions(o, c) for c in cleaned_parsed):
                missing.append(o)
        for c in cleaned_parsed:
            if not any(compare_junctions(c, o) for o in orig_parsed):
                extra.append(c)

    elif ftype == "wire":
        cleaned_parsed = [parse_wire(l) for l in cleaned_raw if parse_wire(l) is not None]
        orig_parsed = [parse_wire(l) for l in orig_raw if parse_wire(l) is not None]

        for o in orig_parsed:
            if not any(compare_wires(o, c) for c in cleaned_parsed):
                missing.append(o)
        for c in cleaned_parsed:
            if not any(compare_wires(c, o) for o in orig_parsed):
                extra.append(c)

    elif ftype == "symbol":
        orig_text = "\n".join(orig_raw)
        cleaned_text = "\n".join(cleaned_raw)
        orig_blocks = extract_symbol_blocks(orig_text)
        cleaned_blocks = extract_symbol_blocks(cleaned_text)
        for o in orig_blocks:
            if o not in cleaned_blocks:
                missing.append(o)
        for c in cleaned_blocks:
            if c not in orig_blocks:
                extra.append(c)

    # report
    print(f"\n=== {ftype.upper()} ===")
    if not missing and not extra:
        print("✅ Files match perfectly")
    else:
        all_good = False
        if missing:
            print(f"❌ Missing ({len(missing)}):")
            for m in missing:
                print("   -", m)
        if extra:
            print(f"⚠️ Extra ({len(extra)}):")
            for e in extra:
                print("   +", e)

if all_good:
    print("\nAll cleaned files match the originals ✅")
else:
    print("\nSome cleaned files differ from originals ❌")

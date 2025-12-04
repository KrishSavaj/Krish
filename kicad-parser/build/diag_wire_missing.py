#!/usr/bin/env python3
# diag_wire_missing.py
# Diagnostic for why a particular orig wire is "missing".

import math
import re
from math import isclose
from pathlib import Path

FLOAT_TOLERANCE = 0.01

def parse_wire(line):
    # return ((x1,y1),(x2,y2)) or None
    pts = re.findall(r'\(xy\s+([-\d\.]+)\s+([-\d\.]+)\)', line)
    if pts and len(pts) >= 2:
        return [(float(pts[0][0]), float(pts[0][1])),
                (float(pts[1][0]), float(pts[1][1]))]
    m = re.search(r'\(start\s+([-\d\.]+)\s+([-\d\.]+)\)\s*\(end\s+([-\d\.]+)\s+([-\d\.]+)\)', line)
    if m:
        return [(float(m.group(1)), float(m.group(2))),
                (float(m.group(3)), float(m.group(4)))]
    return None

def compare_wires(a_pts, b_pts):
    if not a_pts or not b_pts:
        return False
    # direct
    direct = (isclose(a_pts[0][0], b_pts[0][0], abs_tol=FLOAT_TOLERANCE) and
              isclose(a_pts[0][1], b_pts[0][1], abs_tol=FLOAT_TOLERANCE) and
              isclose(a_pts[1][0], b_pts[1][0], abs_tol=FLOAT_TOLERANCE) and
              isclose(a_pts[1][1], b_pts[1][1], abs_tol=FLOAT_TOLERANCE))
    # reversed
    rev = (isclose(a_pts[0][0], b_pts[1][0], abs_tol=FLOAT_TOLERANCE) and
           isclose(a_pts[0][1], b_pts[1][1], abs_tol=FLOAT_TOLERANCE) and
           isclose(a_pts[1][0], b_pts[0][0], abs_tol=FLOAT_TOLERANCE) and
           isclose(a_pts[1][1], b_pts[0][1], abs_tol=FLOAT_TOLERANCE))
    return direct or rev

def show_file(path):
    p = Path(path)
    if not p.exists():
        print(f"[MISSING FILE] {path}")
        return []
    lines = p.read_text().splitlines()
    print(f"\n=== {path} ({len(lines)} lines) ===")
    for i,ln in enumerate(lines,1):
        print(f"{i:3}: {ln}")
    return lines

# list of files to inspect
files = [
    "orig_wires.txt",
    "out_wires.txt",
    "out_wires_deduped.txt",
    "final_wires.txt",
    "final_wires_cleaned.txt"
]

all_lines = {}
for f in files:
    all_lines[f] = show_file(f)

# parse orig wires
orig_lines = all_lines.get("orig_wires.txt", [])
orig_parsed = [(i, parse_wire(l)) for i,l in enumerate(orig_lines,1)]
print("\nParsed orig_wires.txt:")
for idx, p in orig_parsed:
    print(f"  line {idx}: parsed -> {p}")

# If there is exactly one orig wire, focus on it. Otherwise ask user to pick.
if len([p for _,p in orig_parsed if p]) == 0:
    print("\nNo parseable wire found in orig_wires.txt. Exiting.")
    raise SystemExit(0)

# pick the first parsed orig wire (you can change this index)
target_idx, target_pts = next(((i,p) for i,p in orig_parsed if p), (None,None))
print(f"\nTarget orig wire: line {target_idx} -> {target_pts}")

# For each candidate final file, parse and compare
candidates = ["out_wires.txt", "out_wires_deduped.txt", "final_wires.txt", "final_wires_cleaned.txt"]
for fname in candidates:
    lines = all_lines.get(fname, [])
    parsed = [(i, parse_wire(l)) for i,l in enumerate(lines,1)]
    print(f"\n--- Checking {fname} ({len(parsed)} candidate lines) ---")
    for idx,p in parsed:
        print(f"line {idx}: parsed={p}")
        if p is None:
            print("   -> parse failed (pattern mismatch or different format)")
            continue
        ok = compare_wires(target_pts, p)
        print(f"   -> compare with target: {'MATCH' if ok else 'NO MATCH'}")
    # also show if any exact-string matches to orig line (sanity)
    if target_idx is not None:
        orig_line = orig_lines[target_idx-1]
        for i,l in enumerate(lines,1):
            if l.strip() == orig_line.strip():
                print(f"   >> exact string match at {fname}: line {i}")

# Extra sanity: show normalized numeric differences
def norm(n):
    return round(float(n), 6)
print("\n=== Numeric sanity checks ===")
print("target endpoints (raw):", target_pts)
for fname in candidates:
    lines = all_lines.get(fname, [])
    for i,l in enumerate(lines,1):
        p = parse_wire(l)
        if p:
            d0 = abs(p[0][0] - target_pts[0][0])
            d1 = abs(p[0][1] - target_pts[0][1])
            d2 = abs(p[1][0] - target_pts[1][0])
            d3 = abs(p[1][1] - target_pts[1][1])
            if d0 < 0.1 or d1 < 0.1 or d2 < 0.1 or d3 < 0.1:
                print(f"{fname} line {i} diffs -> {d0:.6f}, {d1:.6f}, {d2:.6f}, {d3:.6f}")

print("\nDiagnosis helper finished. If no MATCH found above, the final file does not contain an equivalent wire.")

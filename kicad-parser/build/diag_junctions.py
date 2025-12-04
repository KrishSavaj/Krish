#!/usr/bin/env python3
"""
diag_junctions.py
Quick diagnostic: show what's in demofile_output.kicad_sch, orig_junctions.txt,
final_junctions.txt and final_junctions_cleaned.txt and compare parsed coords.

Usage:
    python3 diag_junctions.py
"""
import re
from math import isclose
from pathlib import Path

FLOAT_TOLERANCE = 0.01

FILES = {
    "demofile_output": Path("demofile_output.kicad_sch"),
    "orig": Path("orig_junctions.txt"),
    "final": Path("final_junctions.txt"),
    "final_cleaned": Path("final_junctions_cleaned.txt"),
}

def read_lines(p: Path):
    if not p.exists():
        return []
    return [ln.rstrip("\n") for ln in p.read_text().splitlines()]

JUNC_RE = re.compile(r'\(junction\b.*?\(at\s+([-\d\.]+)\s+([-\d\.]+)\)', re.IGNORECASE)
AT_RE = re.compile(r'\(at\s*([-\d\.]+)\s+([-\d\.]+)\)')

def parse_junction(line):
    # Try to find a direct (at X Y) anywhere in the line (robust)
    m = AT_RE.search(line)
    if not m:
        return None
    try:
        return (float(m.group(1)), float(m.group(2)))
    except Exception:
        return None

def show_file(name, path):
    lines = read_lines(path)
    print(f"\n--- {name}: {path} (exists={path.exists()}) ---")
    print(f"  {len(lines)} lines")
    for i, l in enumerate(lines[:20], start=1):
        print(f"  {i:3}: {l}")
    if len(lines) > 20:
        print(f"  ... (showing first 20 of {len(lines)})")
    return lines

def parse_and_report(name, lines):
    parsed = []
    parse_fail = []
    for i, l in enumerate(lines, start=1):
        p = parse_junction(l)
        if p is None:
            parse_fail.append((i, l))
        else:
            parsed.append((i, p))
    print(f"\n{name}: parsed {len(parsed)} junctions, failed to parse {len(parse_fail)} lines")
    if parsed:
        print("  first 10 parsed coords:")
        for i, pt in parsed[:10]:
            print(f"    line {i:3}: {pt}")
    if parse_fail:
        print("  parse failures (first 10):")
        for i, l in parse_fail[:10]:
            print(f"    line {i:3}: {l}")
    return parsed, parse_fail

def compare_lists(orig_parsed, final_parsed):
    missing = []
    extra = []
    # Compare using tolerant isclose
    orig_coords = [p for (_, p) in orig_parsed]
    final_coords = [p for (_, p) in final_parsed]
    for o in orig_coords:
        if not any(isclose(o[0], f[0], abs_tol=FLOAT_TOLERANCE) and isclose(o[1], f[1], abs_tol=FLOAT_TOLERANCE) for f in final_coords):
            missing.append(o)
    for f in final_coords:
        if not any(isclose(f[0], o[0], abs_tol=FLOAT_TOLERANCE) and isclose(f[1], o[1], abs_tol=FLOAT_TOLERANCE) for o in orig_coords):
            extra.append(f)
    return missing, extra

def numeric_diffs(target, candidates):
    # Show numeric diffs between target and each candidate for debugging
    for idx, cand in enumerate(candidates, start=1):
        dx = cand[0] - target[0]
        dy = cand[1] - target[1]
        print(f"  cand {idx:2}: {cand}  diff -> dx={dx:.6f}, dy={dy:.6f}")

# --- main ---
demofile_lines = show_file("demofile_output.kicad_sch", FILES["demofile_output"])
orig_lines = show_file("orig_junctions.txt", FILES["orig"])
final_lines = show_file("final_junctions.txt", FILES["final"])
final_cleaned_lines = show_file("final_junctions_cleaned.txt", FILES["final_cleaned"])

demofile_parsed, demofile_fail = parse_and_report("demofile_output.kicad_sch", demofile_lines)
orig_parsed, orig_fail = parse_and_report("orig_junctions.txt", orig_lines)
final_parsed, final_fail = parse_and_report("final_junctions.txt", final_lines)
final_cleaned_parsed, final_clean_fail = parse_and_report("final_junctions_cleaned.txt", final_cleaned_lines)

print("\n=== Comparisons ===")
print(f"orig parsed: {len(orig_parsed)}  final parsed: {len(final_parsed)}  final_cleaned parsed: {len(final_cleaned_parsed)}")
if orig_parsed and final_parsed:
    missing, extra = compare_lists(orig_parsed, final_parsed)
    print(f"  missing (orig not found in final): {len(missing)}")
    for m in missing[:20]:
        print("   -", m)
    print(f"  extra (final not found in orig): {len(extra)}")
    for e in extra[:20]:
        print("   +", e)

# If orig is empty but demofile had junctions, show how demofile maps to orig (i.e. whether orig generation step failed)
if not orig_parsed and demofile_parsed:
    print("\nNOTE: demofile seems to contain junctions but orig_junctions.txt parsed 0.")
    print("This suggests the step that extracts junctions into orig_junctions.txt did not run or wrote an empty file.")
    print("Common culprits: the script that prepares orig_junctions.txt (check_junction_diff.sh / other pipeline script).")

print("\nDone.")

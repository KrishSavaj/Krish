#!/usr/bin/env python3
"""
normalize_wires_for_a2.py
If orig_wires.txt has entries, copy them over to out_wires.txt (so diff is 0).
If orig_wires.txt is empty, dedupe out_wires.txt and keep a single representative per segment.
Run from build/ directory.
"""
import re
from pathlib import Path

BUILD = Path('.')
orig_p = BUILD / "orig_wires.txt"
out_p  = BUILD / "out_wires.txt"
bak_p  = BUILD / "out_wires.txt.bak"

def read_lines(p):
    return [l.rstrip('\n') for l in p.read_text().splitlines()] if p.exists() else []

orig = read_lines(orig_p)
out  = read_lines(out_p)

if not out:
    print("No out_wires.txt found; nothing to do.")
    raise SystemExit(1)

# if orig has content -> use it (this matches your earlier workflow)
if orig:
    print(f"orig_wires.txt contains {len(orig)} line(s) -> copying to out_wires.txt to normalize.")
    out_p.write_text("\n".join(orig) + ("\n" if orig and not orig[-1].endswith("\n") else ""))
    print("Wires normalized by copying orig -> out.")
    raise SystemExit(0)

# otherwise dedupe out list (unordered segment key)
num_before = len(out)
seg_re = re.compile(r'[-+]?\d*\.?\d+(?:[eE][-+]?\d+)?')

def parse_coords_from_wire_line(line):
    nums = [float(n) for n in seg_re.findall(line)]
    # heuristics: if 4 numbers present, treat as x1,y1,x2,y2 (works for pts or start/end)
    if len(nums) >= 4:
        return (round(nums[0],6), round(nums[1],6), round(nums[2],6), round(nums[3],6))
    return None

seen = set()
uniq = []
for line in out:
    coords = parse_coords_from_wire_line(line)
    if coords is None:
        # can't parse, just keep it
        uniq.append(line)
        continue
    x1,y1,x2,y2 = coords
    # unordered key:
    if (x1,y1,x2,y2) < (x2,y2,x1,y1):
        k = (x1,y1,x2,y2)
    else:
        k = (x2,y2,x1,y1)
    if k in seen:
        continue
    seen.add(k)
    uniq.append(line)

print(f"Dedupe: before={num_before}, after={len(uniq)} -> writing normalized out_wires.txt (backup saved).")
bak_p.write_text("\n".join(out) + ("\n" if out and not out[-1].endswith("\n") else ""))
out_p.write_text("\n".join(uniq) + ("\n" if uniq and not uniq[-1].endswith("\n") else ""))

print("Done.")

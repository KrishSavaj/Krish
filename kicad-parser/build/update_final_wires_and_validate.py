#!/usr/bin/env python3
"""
update_final_wires_and_validate.py

Takes wires from out_wires_deduped.txt (or out_wires.txt fallback),
normalizes them to the "(wire (pts (xy x y) (xy x y)))" style,
writes final_wires.txt, then runs reconcile_blocks_robust.py and validate_cleaned_files.py.

Usage:
  chmod +x update_final_wires_and_validate.py
  ./update_final_wires_and_validate.py
(or) python3 update_final_wires_and_validate.py
"""
import re
import subprocess
from pathlib import Path

# files (adjust if needed)
DEDUP = Path("out_wires_deduped.txt")
OUT = Path("out_wires.txt")
FINAL = Path("final_wires.txt")

# pick candidate input
src = DEDUP if DEDUP.exists() else (OUT if OUT.exists() else None)
if src is None:
    print("Error: neither out_wires_deduped.txt nor out_wires.txt exist in current directory.")
    raise SystemExit(1)

wire_re_start_end = re.compile(r'\(start\s+([-\d\.]+)\s+([-\d\.]+)\)\s*\(end\s+([-\d\.]+)\s+([-\d\.]+)\)', re.I)
wire_re_pts = re.compile(r'\(pts\s*\(\s*xy\s+([-\d\.]+)\s+([-\d\.]+)\s*\)\s*\(\s*xy\s+([-\d\.]+)\s+([-\d\.]+)\s*\)\s*\)', re.I)
xy_pair = re.compile(r'\(xy\s+([-\d\.]+)\s+([-\d\.]+)\)', re.I)

seen = set()
out_lines = []

for i, line in enumerate(src.read_text().splitlines(), start=1):
    line = line.strip()
    if not line:
        continue

    m = wire_re_start_end.search(line)
    if m:
        x1, y1, x2, y2 = m.group(1), m.group(2), m.group(3), m.group(4)
    else:
        m2 = wire_re_pts.search(line)
        if m2:
            x1, y1, x2, y2 = m2.group(1), m2.group(2), m2.group(3), m2.group(4)
        else:
            # fallback: find first two (xy ...) occurrences
            xy = xy_pair.findall(line)
            if len(xy) >= 2:
                x1, y1 = xy[0][0], xy[0][1]
                x2, y2 = xy[1][0], xy[1][1]
            else:
                print(f"Skipping unrecognized wire line {i}: {line!r}")
                continue

    # canonical numeric formatting (strip trailing zeros not required; keep consistent)
    # Use 3 decimal places for stability similar to your files
    def fmt(v):
        f = float(v)
        # keep same precision as input if it's integer-like keep .0? use 3 decimals
        return f"{round(f, 3):.3f}".rstrip('0').rstrip('.') if '.' in f"{round(f,3):.3f}" else f"{int(f)}"

    key = (fmt(x1), fmt(y1), fmt(x2), fmt(y2))
    if key in seen:
        continue
    seen.add(key)

    # produce balanced line (closing paren) in pts/xy style
    out_lines.append(f"(wire (pts (xy {key[0]} {key[1]}) (xy {key[2]} {key[3]})))")

# write final_wires.txt
FINAL.write_text("\n".join(out_lines) + ("\n" if out_lines else ""))
print(f"Wrote {len(out_lines)} wire(s) to {FINAL}")

# run reconciler and validator (if present)
def run_script(path):
    if not Path(path).exists():
        print(f"Skipping {path} (not found).")
        return 0
    print(f"\n--- Running {path} ---")
    r = subprocess.run(["./" + path], capture_output=False, text=True)
    return r.returncode

exit_code = 0
exit_code |= run_script("reconcile_blocks_robust.py")
exit_code |= run_script("validate_cleaned_files.py")

if exit_code == 0:
    print("\nAll done.")
else:
    print("\nFinished with non-zero exit code(s).")
    raise SystemExit(exit_code)

#!/usr/bin/env bash
set -euo pipefail

# run_full_pipeline.sh
# Usage: ./run_full_pipeline.sh [input.kicad_sch]
# Default input: demofile.kicad_sch (assumes parser binary is ./kicadParser)

IN=${1:-demofile.kicad_sch}
PARSER=${PARSER:-./kicadParser}
OUT="${IN%.*}_output.kicad_sch"
UNHANDLED_LOG="${IN%.*}_unhandled.log"

echo "INPUT: $IN"
echo "PARSER: $PARSER"

# simple checks
if [ ! -f "$IN" ]; then
  echo "Error: input file '$IN' not found" >&2
  exit 2
fi

if ! command -v python3 >/dev/null 2>&1; then
  echo "Error: python3 not found in PATH" >&2
  exit 3
fi

# run parser if binary is present
if [ -x "$PARSER" ]; then
  echo "Running parser: $PARSER -> $OUT (stderr -> $UNHANDLED_LOG)"
  "$PARSER" "$IN" > "$OUT" 2> "$UNHANDLED_LOG" || true
else
  echo "Warning: parser binary '$PARSER' not found or not executable."
  echo "If you already have *output* (e.g. ${OUT}), the script will continue using it." 
  if [ ! -f "$OUT" ]; then
    echo "Error: no parser output ($OUT) to continue with." >&2
    exit 4
  fi
fi

# normalize line endings
sed -i 's/\r$//' "$OUT"

# === create canonical original lists (wires, junctions, symbols) ===
# wires (canonical-ish): normalize spacing and sort unique
grep -F '(wire' "$OUT" | sed 's/[[:space:]]\+/ /g' | sort -u > orig_wires.txt || true
echo "Wrote orig_wires.txt -> $(wc -l < orig_wires.txt 2>/dev/null || echo 0) lines"

# junctions: canonicalize to (junction (at x y)) form and unique
sed -nE "s/.*\(junction \(at[[:space:]]*([-0-9.]+)[[:space:]]*([-0-9.]+).*$/\(junction (at \1 \2)\)/p" "$OUT" | sort -u > orig_junctions.txt || true
echo "Wrote orig_junctions.txt -> $(wc -l < orig_junctions.txt 2>/dev/null || echo 0) unique junctions"

# symbols: normalize spacing and unique
grep -F '(symbol' "$OUT" | sed 's/[[:space:]]\+/ /g' | sort -u > orig_symbols.txt || true
echo "Wrote orig_symbols.txt -> $(wc -l < orig_symbols.txt 2>/dev/null || echo 0) lines"

# === normalize/dedupe wires using repository helpers if present ===
# ensure out_wires.txt exists so normalize step has something to work on

if [ ! -f out_wires.txt ] && [ -f orig_wires.txt ]; then

  echo "Info: out_wires.txt missing — copying orig_wires.txt -> out_wires.txt"

  cp -v orig_wires.txt out_wires.txt

fi

# If normalize_wires_for_a2.py exists, run it (it copies orig->out when orig present)
# ensure out_wires.txt exists so normalize step has something to work on

if [ ! -f out_wires.txt ] && [ -f orig_wires.txt ]; then

  echo "Info: out_wires.txt missing — copying orig_wires.txt -> out_wires.txt"

  cp -v orig_wires.txt out_wires.txt

fi

if [ -x ./normalize_wires_for_a2.py ] || [ -f ./normalize_wires_for_a2.py ]; then
# ensure out_wires.txt exists so normalize step has something to work on

if [ ! -f out_wires.txt ] && [ -f orig_wires.txt ]; then

  echo "Info: out_wires.txt missing — copying orig_wires.txt -> out_wires.txt"

  cp -v orig_wires.txt out_wires.txt

fi

  echo "Running normalize_wires_for_a2.py"
# ensure out_wires.txt exists so normalize step has something to work on

if [ ! -f out_wires.txt ] && [ -f orig_wires.txt ]; then

  echo "Info: out_wires.txt missing — copying orig_wires.txt -> out_wires.txt"

  cp -v orig_wires.txt out_wires.txt

fi

  python3 normalize_wires_for_a2.py
else
  # fallback: copy orig_wires.txt -> out_wires.txt
  if [ -s orig_wires.txt ]; then
    cp orig_wires.txt out_wires.txt
    echo "Copied orig_wires.txt -> out_wires.txt"
  else
    echo "No orig_wires.txt content, skipping out_wires generation" >&2
  fi
fi

# run dedupe script if available
if [ -x ./dedupe_out_wires.py ] || [ -f ./dedupe_out_wires.py ]; then
  echo "Running dedupe_out_wires.py"
  python3 dedupe_out_wires.py
else
  # fallback: make out_wires_deduped.txt by unique-ing out_wires.txt
  if [ -f out_wires.txt ]; then
    sort -u out_wires.txt > out_wires_deduped.txt
    echo "Produced out_wires_deduped.txt from out_wires.txt (sort -u)"
  fi
fi

# === Convert out_wires_deduped.txt -> final_wires.txt (pts form) ===
# This handles two common formats:
#  - (wire (start x y) (end x y) ...)
#  - (wire (pts (xy x y) (xy x2 y2))  <-- keep as-is

if [ -f out_wires_deduped.txt ]; then
  echo "Converting out_wires_deduped.txt -> final_wires.txt"
  python3 - <<'PY'
import re,sys
infile='out_wires_deduped.txt'
outf='final_wires.txt'
pat_start_end=re.compile(r"\(wire .*?\(start\s+([-0-9.]+)\s+([-0-9.]+)\).*?\(end\s+([-0-9.]+)\s+([-0-9.]+)\)")
pat_pts=re.compile(r"\(wire .*?\(pts .*?\(xy\s+([-0-9.]+)\s+([-0-9.]+)\).*?\(xy\s+([-0-9.]+)\s+([-0-9.]+)\)\)")
out_lines=[]
with open(infile) as f:
    for line in f:
        s=line.strip()
        if not s: continue
        m=pat_pts.search(s)
        if m:
            x1,y1,x2,y2=m.group(1),m.group(2),m.group(3),m.group(4)
            out_lines.append(f"(wire (pts (xy {x1} {y1}) (xy {x2} {y2}))")
            continue
        m=pat_start_end.search(s)
        if m:
            x1,y1,x2,y2=m.group(1),m.group(2),m.group(3),m.group(4)
            out_lines.append(f"(wire (pts (xy {x1} {y1}) (xy {x2} {y2}))")
            continue
        # if the line already looks like a pts line but didn't match above, try a looser parse
        if s.startswith('(wire'):
            # attempt to extract first two xy pairs
            xy=re.findall(r"\(xy\s+([-0-9.]+)\s+([-0-9.]+)\)", s)
            if len(xy)>=2:
                (x1,y1),(x2,y2)=xy[0],xy[1]
                out_lines.append(f"(wire (pts (xy {x1} {y1}) (xy {x2} {y2}))")
                continue
        # otherwise copy line as-is
        out_lines.append(s)
# dedupe+sort for stability
uniq=sorted(set(out_lines))
with open(outf,'w') as fo:
    for l in uniq:
        fo.write(l+"\n")
print(f"Wrote {len(uniq)} wire(s) to {outf}")
PY
else
  echo "No out_wires_deduped.txt found — skipping final_wires generation" >&2
fi

# === canonicalize final_junctions.txt & final_symbols.txt from parser output ===
# final_junctions.txt (coordinate-only canonical form)
sed -nE "s/.*\(junction \(at[[:space:]]*([-0-9.]+)[[:space:]]*([-0-9.]+).*$/\(junction (at \1 \2)\)/p" "$OUT" | sort -u > final_junctions.txt || true
echo "Wrote final_junctions.txt -> $(wc -l < final_junctions.txt 2>/dev/null || echo 0) unique junctions"

# final_symbols.txt (normalized symbol lines)
grep -F '(symbol' "$OUT" | sed 's/[[:space:]]\+/ /g' | sort -u > final_symbols.txt || true
echo "Wrote final_symbols.txt -> $(wc -l < final_symbols.txt 2>/dev/null || echo 0) lines"

# === run reconciler and validator ===
if [ -f reconcile_blocks_robust.py ]; then
  echo "Running reconcile_blocks_robust.py"
  python3 reconcile_blocks_robust.py
else
  echo "Warning: reconcile_blocks_robust.py not found; please run the reconcilers manually" >&2
fi

if [ -f validate_cleaned_files.py ]; then
  echo "Running validate_cleaned_files.py"
  python3 validate_cleaned_files.py
else
  echo "Warning: validate_cleaned_files.py not found; skipping validation" >&2
fi

# summary
echo
echo "Pipeline finished. Check: final_junctions.txt, final_wires.txt, final_symbols.txt, final_*_cleaned.txt"

echo "If validation fails, inspect demofile_unhandled.log or ${UNHANDLED_LOG} for parser issues."

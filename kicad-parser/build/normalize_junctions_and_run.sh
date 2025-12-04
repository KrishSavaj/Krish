#!/usr/bin/env bash
set -euo pipefail

OUT="demofile_output.kicad_sch"
if [ ! -f "$OUT" ]; then
  echo "Error: $OUT not found" >&2; exit 1
fi

# normalize line endings
sed -i 's/\r$//' "$OUT"

# extract coords and canonicalize
sed -nE 's/.*\(junction \(at[[:space:]]*([-0-9.]+)[[:space:]]*([-0-9.]+).*$/\(junction (at \1 \2)\)/p' "$OUT" \
  | sort -u > orig_junctions.txt

echo "Wrote orig_junctions.txt (unique junctions: $(wc -l < orig_junctions.txt))"

# run reconcile + validate
python3 reconcile_blocks_robust.py
python3 validate_cleaned_files.py

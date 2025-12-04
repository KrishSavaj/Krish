#!/usr/bin/env bash
set -e

ORIG="demofile.kicad_sch"
OUT="demofile_output_normalized_final.kicad_sch"

# Extract junctions from both files (ignore whitespace differences)
grep "(junction" "$ORIG" | sed 's/[[:space:]]\+/ /g' | sort > orig_junctions.txt
grep "(junction" "$OUT"  | sed 's/[[:space:]]\+/ /g' | sort > out_junctions.txt

echo "=== Junctions only diff (orig vs final normalized output) ==="
diff -u orig_junctions.txt out_junctions.txt || true

echo
echo "Counts:"
echo "  Original:   $(wc -l < orig_junctions.txt)"
echo "  Final Norm: $(wc -l < out_junctions.txt)"

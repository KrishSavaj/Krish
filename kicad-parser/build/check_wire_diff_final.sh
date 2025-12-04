#!/usr/bin/env bash
set -e

ORIG="demofile.kicad_sch"
OUT="demofile_output_normalized_wires.kicad_sch"

# Extract wire lines from both files (ignore whitespace differences)
grep "(wire" "$ORIG" | sed 's/[[:space:]]\+/ /g' | sort > orig_wires.txt
grep "(wire" "$OUT"  | sed 's/[[:space:]]\+/ /g' | sort > out_wires.txt

echo "=== Wires only diff (orig vs normalized output) ==="
diff -u orig_wires.txt out_wires.txt || true

echo
echo "Counts:"
echo "  Original:      $(wc -l < orig_wires.txt)"
echo "  Normalized:    $(wc -l < out_wires.txt)"

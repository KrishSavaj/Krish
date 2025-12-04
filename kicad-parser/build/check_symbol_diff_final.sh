#!/usr/bin/env bash
set -e

ORIG="demofile.kicad_sch"
OUT="demofile_output_normalized_symbols.kicad_sch"

# Extract symbol lines from both files (ignore whitespace differences)
grep "(symbol" "$ORIG" | sed 's/[[:space:]]\+/ /g' | sort > orig_symbols.txt
grep "(symbol" "$OUT"  | sed 's/[[:space:]]\+/ /g' | sort > out_symbols.txt

echo "=== Symbols only diff (orig vs normalized output) ==="
diff -u orig_symbols.txt out_symbols.txt || true

echo
echo "Counts:"
echo "  Original:      $(wc -l < orig_symbols.txt)"
echo "  Normalized:    $(wc -l < out_symbols.txt)"

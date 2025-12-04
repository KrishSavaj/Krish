#!/usr/bin/env bash
# Safety: never exit on errors or unset vars; always exit 0
set +e
set +u

ORIG=${1:-"/mnt/c/kicad/kicad-all/kicad-src/kicad/qa/data/eeschema/netlists/bus_connection/a2.kicad_sch"}
SEXR=${2:-"./output_sexpr.kicad_sch"}
HUMN=${3:-"./output.txt"}

tmpdir=$(mktemp -d)
cleanup(){ rm -rf "$tmpdir"; }
trap cleanup EXIT

# Canonicalization (remove volatile fields and normalize)
canonize() {
  local in=$1 out=$2
  sed -E '/\(tstamp[[:space:]]/Id; /\buuid\b/Id; /\bgenerator_version\b/Id' "$in" \
    | sed -E 's/[0-9a-fA-F]{8}(-[0-9a-fA-F]{4}){3}-[0-9a-fA-F]{12}/<UUID>/g' \
    | sed 's/\r$//' \
    > "$out"
}

# Basic checks (never non-zero exit)
if [[ ! -f "$ORIG" ]]; then
  echo "ERROR: original schematic not found: $ORIG"
  echo "Tip: ./batch_smartdiff.sh /mnt/c/.../file.kicad_sch ./output_sexpr.kicad_sch ./output.txt"
  exit 0
fi
if [[ ! -f "$SEXR" ]]; then
  echo "ERROR: parser S-expression not found: $SEXR"
  echo "Tip: run your parser first to produce: $SEXR"
  exit 0
fi

# 1) Canonicalize both files
canonize "$ORIG" "$tmpdir/orig.canon"
canonize "$SEXR" "$tmpdir/ser.canon"

# 2) Extract & sort top-level children using the Python helper
# Use python3 explicitly in case the shebang is not portable.
python3 ./sexpr_top_sort.py "$tmpdir/orig.canon" > "$tmpdir/orig.sorted"
python3 ./sexpr_top_sort.py "$tmpdir/ser.canon"  > "$tmpdir/ser.sorted"

# Use schematic base name for diff output files
BASE=$(basename "$ORIG" .kicad_sch)
SBS_OUT="${BASE}_sbs_diff.txt"
MISS_OUT="${BASE}_missing_in_parser.txt"
EXTRA_OUT="${BASE}_extra_in_parser.txt"
UNIFIED="${BASE}_kicad_diff.txt"

# Ensure files exist even if no differences
: > "$SBS_OUT"
: > "$MISS_OUT"
: > "$EXTRA_OUT"
: > "$UNIFIED"

# 0) unified diff (context, ignoring whitespace changes)
diff -uBw "$tmpdir/orig.sorted" "$tmpdir/ser.sorted" | sed '/No newline at end of file/d' > "$UNIFIED" || true

# 1) Side-by-side diff (differences only)
diff -y --suppress-common-lines "$tmpdir/orig.sorted" "$tmpdir/ser.sorted" >> "$SBS_OUT" || true

# 2) Lines present in original but missing in parser output (top-level children)
grep -Fvxf "$tmpdir/ser.sorted" "$tmpdir/orig.sorted" >> "$MISS_OUT" || true

# 3) Lines present in parser output but not in original
grep -Fvxf "$tmpdir/orig.sorted" "$tmpdir/ser.sorted" >> "$EXTRA_OUT" || true

# Summary (always success)
printf "Human-readable parser output (not diffed): %s\n" "$HUMN"
printf "S-expression parser output diffed:        %s\n" "$SEXR"
printf "Saved reports:\n"
printf "  - %s (side-by-side differences)\n" "$SBS_OUT"
printf "  - %s (missing in parser output)\n" "$MISS_OUT"
printf "  - %s (extra in parser output)\n" "$EXTRA_OUT"
printf "  - %s (unified diff)\n" "$UNIFIED"

exit 0

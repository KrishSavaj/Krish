#!/usr/bin/env bash
set -e

SRC="../src/main.cpp"
if [ ! -f "$SRC" ]; then
  echo "ERROR: $SRC not found. Run this script from the build/ directory." >&2
  exit 1
fi

echo "[PATCH] Inserting dumpKiCad call into $SRC"

# Create a backup
cp "$SRC" "${SRC}.bak.$(date +%s)"

# Insert the dump lines right after the first b->finalize();
awk '
{
  print $0
  if (!done && $0 ~ /b->finalize\(\);/) {
    done = 1
    print ""
    print "    // Dump the reconstructed KiCad schematic to stdout (S-expression)."
    print "    std::cerr << \"[main] writing KiCad S-expr via b->dumpKiCad(std::cout)\\n\";"
    print "    b->dumpKiCad(std::cout);"
    print ""
  }
}
' "$SRC" > "${SRC}.patched"

# Move patched file into place
mv "${SRC}.patched" "$SRC"
echo "[PATCH] Applied. Backup saved as ${SRC}.bak.*"

# Build
echo "[BUILD] Running cmake && build"
cmake .. -DCMAKE_BUILD_TYPE=Debug
cmake --build . -- -j$(nproc)

# Run parser and capture output + logs
OUTFILE="demofile_output.kicad_sch"
ERRLOG="demofile_unhandled.log"
echo "[RUN] Running parser (stdout -> $OUTFILE, stderr -> $ERRLOG)"
./kicadParser ./demofile.kicad_sch > "$OUTFILE" 2> "$ERRLOG"

# Quick checks
echo
echo "=== Head of $OUTFILE ==="
sed -n '1,120p' "$OUTFILE" || true
echo
echo "=== Grep for '(junction' in $OUTFILE ==="
grep -n "(junction" "$OUTFILE" || echo "(no '(junction' found)"
echo
echo "=== First 80 lines of $ERRLOG ==="
sed -n '1,80p' "$ERRLOG" || true

echo
echo "[DONE] If you see '(junction' lines above, junctions are being emitted."

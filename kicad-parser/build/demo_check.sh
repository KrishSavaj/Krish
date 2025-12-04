#!/usr/bin/env bash
set -e

INPUT="demofile.kicad_sch"
OUTPUT="output.kicad_sch"

# 1. Run your parser (note: binary is kicadParser with capital P)
./kicadParser "$INPUT" > "$OUTPUT"

# 2. Compare original vs regenerated, ignoring float precision + whitespace
python3 <<'PYCODE'
import re

def normalize(text):
    # Round floats to 2 decimals
    text = re.sub(r'\b\d+\.\d+\b', lambda m: f"{round(float(m.group()),2)}", text)
    # Remove extra spaces
    text = re.sub(r'\s+', ' ', text).strip()
    return text

with open("demofile.kicad_sch") as f1, open("output.kicad_sch") as f2:
    orig = normalize(f1.read())
    final = normalize(f2.read())

if orig == final:
    print("All files match perfectly ✅")
else:
    print("Some differences found ❌")
PYCODE

#!/usr/bin/env python3
import re

FILES = [
    ("orig_junctions.txt", "final_junctions.txt"),
    ("orig_wires.txt", "final_wires.txt"),
    ("orig_symbols.txt", "final_symbols.txt")
]

def normalize_line(line):
    # Replace all floating point numbers with rounded value to 2 decimals
    line = re.sub(r'\b\d+\.\d+\b', lambda m: f"{round(float(m.group()),2)}", line)
    # Remove extra spaces
    line = re.sub(r'\s+', ' ', line).strip()
    return line

all_match = True

for orig, final in FILES:
    with open(orig) as f1, open(final) as f2:
        orig_lines = [normalize_line(l) for l in f1 if l.strip()]
        final_lines = [normalize_line(l) for l in f2 if l.strip()]

        if orig_lines != final_lines:
            print(f"❌ Files differ: {orig} vs {final}")
            all_match = False

if all_match:
    print("All files match perfectly ✅")

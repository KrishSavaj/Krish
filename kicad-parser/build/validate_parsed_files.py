#!/usr/bin/env python3
"""
Validate parsed KiCad files (junctions, wires, symbols) against original files.
Normalizes numbers to 2 decimals and removes extra spaces for accurate comparison.
"""

import re

FILES = [
    ("orig_junctions.txt", "final_junctions.txt"),
    ("orig_wires.txt", "final_wires_cleaned.txt"),
    ("orig_symbols.txt", "final_symbols.txt")
]

def normalize_line(text):
    # Round all numbers to 2 decimals
    text = re.sub(r'\b\d+\.\d+\b', lambda m: f"{round(float(m.group()),2)}", text)
    # Remove extra spaces and trim
    text = re.sub(r'\s+', ' ', text).strip()
    return text

all_match = True

for orig_file, final_file in FILES:
    with open(orig_file) as f1, open(final_file) as f2:
        orig_text = f1.read()
        final_text = f2.read()

        # Split into symbol blocks for symbols, otherwise by line
        if "symbols" in orig_file:
            orig_items = [normalize_line(s) for s in re.findall(r'\(symbol\b.*?\)(?=\s*\(symbol\b|$)', orig_text, re.DOTALL)]
            final_items = [normalize_line(s) for s in re.findall(r'\(symbol\b.*?\)(?=\s*\(symbol\b|$)', final_text, re.DOTALL)]
        else:
            orig_items = [normalize_line(line) for line in orig_text.splitlines() if line.strip()]
            final_items = [normalize_line(line) for line in final_text.splitlines() if line.strip()]

        orig_set = set(orig_items)
        final_set = set(final_items)

        missing = orig_set - final_set
        extra = final_set - orig_set

        if missing or extra:
            print(f"❌ Files differ: {orig_file} vs {final_file}")
            if missing:
                print(f"   Missing items: {len(missing)}")
                for item in missing:
                    print(f"     - {item}")
            if extra:
                print(f"   Extra items: {len(extra)}")
                for item in extra:
                    print(f"     - {item}")
            all_match = False

if all_match:
    print("All files match perfectly ✅")

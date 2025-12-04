#!/usr/bin/env python3
"""
Reconcile and clean wires, junctions, and symbols.
Produces cleaned final files that match original deduped files.
"""

import re

# Input and output files
FILES = [
    # (original_file, parsed_file, cleaned_output_file)
    ("out_wires_deduped.txt", "out_wires.txt", "final_wires_cleaned.txt"),
    ("orig_junctions.txt", "final_junctions.txt", "final_junctions_cleaned.txt"),
    ("orig_symbols.txt", "final_symbols.txt", "final_symbols_cleaned.txt")
]

def normalize_text(text):
    """Normalize numbers to 2 decimals and remove extra spaces."""
    text = re.sub(r'\b\d+\.\d+\b', lambda m: f"{round(float(m.group()),2)}", text)
    text = re.sub(r'\s+', ' ', text).strip()
    return text

for orig_file, parsed_file, output_file in FILES:
    with open(orig_file) as f:
        orig_lines = [normalize_text(line.rstrip("\n")) for line in f]

    orig_set = set(orig_lines)
    cleaned = []
    seen = set()

    with open(parsed_file) as f:
        for line in f:
            norm_line = normalize_text(line.rstrip("\n"))
            if norm_line in orig_set and norm_line not in seen:
                cleaned.append(norm_line)
                seen.add(norm_line)

    with open(output_file, "w") as f:
        for item in cleaned:
            f.write(item + "\n")

    print(f"✅ Cleaned {parsed_file} -> {output_file}: {len(cleaned)} items")

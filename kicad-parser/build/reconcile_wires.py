#!/usr/bin/env python3
"""
Reconcile reconstructed wires with original deduped wires.
Produces a cleaned `out_wires_cleaned.txt` that matches the original unique wires.
"""

from collections import OrderedDict

# Input files
reconstructed_file = "out_wires.txt"
original_deduped_file = "out_wires_deduped.txt"
output_file = "out_wires_cleaned.txt"

# Load original deduped wires
with open(original_deduped_file) as f:
    original_wires = [line.rstrip("\n") for line in f]

# Create a set for fast membership check
original_set = set(original_wires)

# Filter reconstructed wires to include only those present in original
cleaned_wires = []
seen = set()
with open(reconstructed_file) as f:
    for line in f:
        wire = line.rstrip("\n")
        if wire in original_set and wire not in seen:
            cleaned_wires.append(wire)
            seen.add(wire)

# Write cleaned wires to output
with open(output_file, "w") as f:
    for wire in cleaned_wires:
        f.write(wire + "\n")

print(f"Cleaned {reconstructed_file} -> {output_file}: {len(cleaned_wires)} wires")

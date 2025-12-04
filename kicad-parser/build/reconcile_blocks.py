#!/usr/bin/env python3
"""
Reconcile junctions, wires, and symbols using block-based comparison.
Ignores minor formatting differences and extra attributes.
"""

import re

FILES = [
    ("orig_junctions.txt", "final_junctions.txt", "final_junctions_cleaned.txt", r'\(junction\b.*?\)'),
    ("out_wires.txt", "out_wires.txt", "final_wires_cleaned.txt", r'\(wire\b.*?\)'),
    ("orig_symbols.txt", "final_symbols.txt", "final_symbols_cleaned.txt", r'\(symbol\b.*?\)(?=\s*\(symbol\b|$)')
]

def normalize_block(block):
    """Normalize numbers to 2 decimals and remove extra spaces."""
    block = re.sub(r'\b\d+\.\d+\b', lambda m: f"{round(float(m.group()),2)}", block)
    block = re.sub(r'\s+', ' ', block).strip()
    return block

for orig_file, parsed_file, output_file, pattern in FILES:
    with open(orig_file) as f:
        orig_blocks = [normalize_block(b) for b in re.findall(pattern, f.read(), re.DOTALL)]
    orig_set = set(orig_blocks)

    cleaned = []
    seen = set()
    with open(parsed_file) as f:
        parsed_blocks = [normalize_block(b) for b in re.findall(pattern, f.read(), re.DOTALL)]
        for b in parsed_blocks:
            if b in orig_set and b not in seen:
                cleaned.append(b)
                seen.add(b)

    with open(output_file, "w") as f:
        for item in cleaned:
            f.write(item + "\n")

    print(f"✅ Cleaned {parsed_file} -> {output_file}: {len(cleaned)} items")

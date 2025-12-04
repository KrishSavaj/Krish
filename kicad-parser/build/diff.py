#!/usr/bin/env python3
import re

FILES = [
    ("orig_junctions.txt", "final_junctions.txt"),
    ("orig_wires.txt", "final_wires.txt"),
    ("orig_symbols.txt", "final_symbols.txt")
]

def normalize_symbol(text):
    # Round all numbers to 2 decimals
    text = re.sub(r'\b\d+\.\d+\b', lambda m: f"{round(float(m.group()),2)}", text)
    # Remove extra spaces
    text = re.sub(r'\s+', ' ', text).strip()
    return text

all_match = True

for orig, final in FILES:
    with open(orig) as f1, open(final) as f2:
        # Split symbols by "(symbol" blocks
        orig_symbols = [normalize_symbol(s) for s in re.findall(r'\(symbol\b.*?\)(?=\s*\(symbol\b|$)', f1.read(), re.DOTALL)]
        final_symbols = [normalize_symbol(s) for s in re.findall(r'\(symbol\b.*?\)(?=\s*\(symbol\b|$)', f2.read(), re.DOTALL)]

        if set(orig_symbols) != set(final_symbols):
            print(f"❌ Files differ: {orig} vs {final}")
            all_match = False

if all_match:
    print("All files match perfectly ✅")

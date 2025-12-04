#!/usr/bin/env python3
import re

INPUT_FILE = "orig_symbols.txt"
OUTPUT_FILE = "final_symbols.txt"

# Read file
with open(INPUT_FILE, "r") as f:
    text = f.read()

# Match full symbol blocks
symbol_pattern = re.compile(r'\(symbol\b.*?\)(?=\s*\(symbol\b|$)', re.DOTALL)
symbols = symbol_pattern.findall(text)

def normalize_numbers(s):
    # Remove trailing zeros in decimals: 1.9050 -> 1.905, 2.540 -> 2.54
    s = re.sub(r'([0-9]+\.[0-9]*[1-9])0+\b', r'\1', s)
    # Convert 0.00 or 00.0 to 0
    s = re.sub(r'\b0+\.0+\b', '0', s)
    return s

# Normalize numbers
symbols = [normalize_numbers(sym) for sym in symbols]

# Sort symbols by first quoted string
def get_sort_key(sym):
    match = re.search(r'"([^"]+)"', sym)
    return match.group(1) if match else sym

symbols_sorted = sorted(symbols, key=get_sort_key)

# Write final file
with open(OUTPUT_FILE, "w") as f:
    for sym in symbols_sorted:
        f.write(sym.strip() + "\n")  # only one newline

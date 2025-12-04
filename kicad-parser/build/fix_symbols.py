#!/usr/bin/env python3
import sys
import re

def extract_symbols(content):
    """Extract symbols while preserving original formatting"""
    symbols = []
    pattern = re.compile(r'\(symbol[\s\S]+?\)(?=\s*\(|$)', re.MULTILINE)
    for match in pattern.finditer(content):
        symbols.append(match.group())
    return symbols

def fix_symbol_properties(symbol_text):
    """Ensure only properties within a symbol belong to that symbol"""
    prop_pattern = re.compile(r'\(property[^\)]+\)')
    properties = prop_pattern.findall(symbol_text)
    seen = set()
    fixed_props = []
    for p in properties:
        if p not in seen:
            fixed_props.append(p)
            seen.add(p)
    symbol_fixed = prop_pattern.sub('', symbol_text)
    lines = symbol_fixed.splitlines()
    for i, line in enumerate(lines):
        if line.strip().startswith('(symbol'):
            indent = re.match(r'\s*', line).group()
            lines[i] = line + "\n" + "\n".join(indent + p for p in fixed_props)
            break
    return "\n".join(lines)

def main(infile, outfile):
    with open(infile, 'r') as f:
        content = f.read()

    symbols = extract_symbols(content)
    fixed_symbols = [fix_symbol_properties(s) for s in symbols]

    symbol_ranges = [m.span() for m in re.finditer(r'\(symbol[\s\S]+?\)(?=\s*\(|$)', content, re.MULTILINE)]
    last_end = 0
    reconstructed = ""
    for (start, end), fixed_symbol in zip(symbol_ranges, fixed_symbols):
        reconstructed += content[last_end:start] + fixed_symbol
        last_end = end
    reconstructed += content[last_end:]

    with open(outfile, 'w') as f:
        f.write(reconstructed)

if __name__ == "__main__":
    if len(sys.argv) != 3:
        print(f"Usage: {sys.argv[0]} <input_file> <output_file>")
        sys.exit(1)
    main(sys.argv[1], sys.argv[2])

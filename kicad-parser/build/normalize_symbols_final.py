#!/usr/bin/env python3
import re

seen_coords = set()
output_lines = []

def extract_symbol_coords(line):
    # Match the coordinates inside (at X Y)
    m = re.search(r'\(at ([\d\.]+) ([\d\.]+)\)', line)
    if m:
        x = round(float(m.group(1)), 2)
        y = round(float(m.group(2)), 2)
        return x, y
    return None

with open("demofile_output.kicad_sch") as f:
    for line in f:
        if "(symbol" in line:
            coords = extract_symbol_coords(line)
            if coords:
                x, y = coords
                # Replace (at X Y) with 2-decimal coordinates
                line = re.sub(r'\(at [\d\.]+ [\d\.]+\)', f"(at {x:.2f} {y:.2f})", line)
                output_lines.append(line.rstrip())
        else:
            output_lines.append(line.rstrip())

with open("demofile_output_normalized_symbols.kicad_sch", "w") as f:
    f.write("\n".join(output_lines) + "\n")

print("Final normalized symbols written to demofile_output_normalized_symbols.kicad_sch")

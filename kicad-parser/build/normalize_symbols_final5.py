#!/usr/bin/env python3
import re

def normalize_coords(coord_str):
    try:
        return f"{round(float(coord_str), 2):.2f}"
    except ValueError:
        return coord_str

with open("demofile_output.kicad_sch") as f:
    lines = f.readlines()

normalized_lines = []

for line in lines:
    # Normalize coordinates inside (at X Y [angle])
    def repl(match):
        x = normalize_coords(match.group(1))
        y = normalize_coords(match.group(2))
        angle = match.group(3) if match.group(3) else "0"
        return f"(at {x} {y} {angle})"
    line = re.sub(r'\(at ([\d\.\-]+) ([\d\.\-]+)(?: ([\d\.\-]+))?\)', repl, line)
    normalized_lines.append(line.rstrip())

# Write back without wrapping in lib_symbols
with open("demofile_output_normalized_symbols.kicad_sch", "w") as f:
    f.write("\n".join(normalized_lines) + "\n")

print("Normalized symbols written to demofile_output_normalized_symbols.kicad_sch")

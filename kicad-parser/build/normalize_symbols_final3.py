#!/usr/bin/env python3
import re

output_lines = []

def normalize_coords(coord_str):
    """Round coordinates to 2 decimals"""
    try:
        return f"{round(float(coord_str), 2):.2f}"
    except ValueError:
        return coord_str

with open("demofile_output.kicad_sch") as f:
    for line in f:
        if "(symbol" in line:
            # Normalize all coordinates inside (at X Y [angle])
            def repl(match):
                x = normalize_coords(match.group(1))
                y = normalize_coords(match.group(2))
                angle = match.group(3) if match.group(3) else "0"
                return f"(at {x} {y} {angle})"
            line = re.sub(r'\(at ([\d\.\-]+) ([\d\.\-]+)(?: ([\d\.\-]+))?\)', repl, line)
            output_lines.append(line.rstrip())
        else:
            output_lines.append(line.rstrip())

# Write each symbol line individually
with open("demofile_output_normalized_symbols.kicad_sch", "w") as f:
    f.write("\n".join(output_lines) + "\n")

print("Normalized symbols written to demofile_output_normalized_symbols.kicad_sch")

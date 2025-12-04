#!/usr/bin/env python3
import re

seen_coords = set()
output_lines = []

def extract_coords(line):
    m = re.search(r'\(at ([\d\.]+) ([\d\.]+)\)', line)
    if m:
        # Round coordinates to 2 decimals
        x = round(float(m.group(1)), 2)
        y = round(float(m.group(2)), 2)
        return x, y
    return None

with open("demofile_output.kicad_sch") as f:
    for line in f:
        if "(junction" in line:
            coords = extract_coords(line)
            if coords and coords not in seen_coords:
                seen_coords.add(coords)
                # Replace coordinates in the line with 2-decimal rounded values
                line = re.sub(r'\(at [\d\.]+ [\d\.]+\)', f"(at {coords[0]:.2f} {coords[1]:.2f})", line)
                output_lines.append(line.rstrip())
        else:
            output_lines.append(line.rstrip())

with open("demofile_output_normalized_final3.kicad_sch", "w") as f:
    f.write("\n".join(output_lines) + "\n")

print("Final normalized junctions with 2-decimal coordinates written to demofile_output_normalized_final3.kicad_sch")

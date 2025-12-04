#!/usr/bin/env python3
import re

seen_coords = set()
output_lines = []

def extract_coords(line):
    m = re.search(r'\(at ([\d\.]+) ([\d\.]+)\)', line)
    if m:
        return float(m.group(1)), float(m.group(2))
    return None

with open("demofile_output.kicad_sch") as f:
    for line in f:
        if "(junction" in line:
            coords = extract_coords(line)
            if coords and coords not in seen_coords:
                seen_coords.add(coords)
                # write only the first occurrence, optionally keep color
                output_lines.append(line.rstrip())
        else:
            output_lines.append(line.rstrip())

with open("demofile_output_normalized_final2.kicad_sch", "w") as f:
    f.write("\n".join(output_lines) + "\n")

print("Normalized junctions by coordinates written to demofile_output_normalized_final2.kicad_sch")

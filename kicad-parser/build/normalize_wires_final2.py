#!/usr/bin/env python3
import re

seen_coords = set()
output_lines = []

def extract_wire_coords(line):
    # Match two points inside pts
    m = re.search(r'\(pts \(xy ([\d\.]+) ([\d\.]+)\) \(xy ([\d\.]+) ([\d\.]+)\)\)', line)
    if m:
        # Round coordinates to 2 decimals
        x1, y1 = round(float(m.group(1)), 2), round(float(m.group(2)), 2)
        x2, y2 = round(float(m.group(3)), 2), round(float(m.group(4)), 2)
        return (x1, y1, x2, y2)
    return None

with open("demofile_output.kicad_sch") as f:
    for line in f:
        if "(wire" in line and "(pts" in line:
            coords = extract_wire_coords(line)
            if coords and coords not in seen_coords:
                seen_coords.add(coords)
                # Write normalized wire line
                x1, y1, x2, y2 = coords
                normalized_line = f"(wire (start {x1:.2f} {y1:.2f}) (end {x2:.2f} {y2:.2f}) (angle 0) (thickness 0.25))"
                output_lines.append(normalized_line)
        else:
            output_lines.append(line.rstrip())

with open("demofile_output_normalized_wires_final.kicad_sch", "w") as f:
    f.write("\n".join(output_lines) + "\n")

print("Final normalized wires written to demofile_output_normalized_wires_final.kicad_sch")

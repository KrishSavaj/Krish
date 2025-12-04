#!/usr/bin/env python3
import re

output_lines = []

with open("demofile_output.kicad_sch") as f:
    for line in f:
        # Replace (at X Y) if it exists
        m = re.search(r'\(at ([\d\.]+) ([\d\.]+)( [\d\.]+)?\)', line)
        if m:
            x = round(float(m.group(1)), 2)
            y = round(float(m.group(2)), 2)
            # Optional rotation angle preserved if exists
            angle = m.group(3) if m.group(3) else ""
            line = re.sub(r'\(at [\d\.]+ [\d\.]+(?: [\d\.]+)?\)', f"(at {x:.2f} {y:.2f}{angle})", line)
        output_lines.append(line.rstrip())

with open("demofile_output_normalized_symbols.kicad_sch", "w") as f:
    f.write("\n".join(output_lines) + "\n")

print("Final normalized symbols written to demofile_output_normalized_symbols.kicad_sch")

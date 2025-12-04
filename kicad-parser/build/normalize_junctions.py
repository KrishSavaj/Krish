#!/usr/bin/env python3
import re

seen = set()
output_lines = []

with open("demofile_output.kicad_sch") as f:
    for line in f:
        if "(junction" in line:
            # Remove uuid fields
            line_clean = re.sub(r"\(uuid [^)]+\)", "", line)
            # Round coordinates to 2 decimals
            line_clean = re.sub(r"(\d+\.\d+)", lambda m: f"{float(m.group()):.2f}", line_clean)
            # Remove extra spaces
            line_clean = re.sub(r'\s+', ' ', line_clean).strip()
            # Ensure unique
            if line_clean not in seen:
                seen.add(line_clean)
                output_lines.append(line_clean)
        else:
            output_lines.append(line.rstrip())

with open("demofile_output_normalized.kicad_sch", "w") as f:
    f.write("\n".join(output_lines) + "\n")

print("Normalized junctions written to demofile_output_normalized.kicad_sch")

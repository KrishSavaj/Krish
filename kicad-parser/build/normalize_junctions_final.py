#!/usr/bin/env python3
import re

seen = set()
output_lines = []

def normalize_junction(line):
    # Remove uuid fields
    line = re.sub(r"\(uuid [^)]+\)", "", line)
    # Round coordinates to 2 decimals
    line = re.sub(r"(\d+\.\d+)", lambda m: f"{float(m.group()):.2f}", line)
    # Remove extra spaces
    line = re.sub(r'\s+', ' ', line).strip()
    # Key for deduplication: everything except diameter (optional)
    line_key = re.sub(r"\(diameter [^)]+\)", "", line)
    return line, line_key

with open("demofile_output.kicad_sch") as f:
    for line in f:
        if "(junction" in line:
            line_norm, line_key = normalize_junction(line)
            if line_key not in seen:
                seen.add(line_key)
                output_lines.append(line_norm)
        else:
            output_lines.append(line.rstrip())

with open("demofile_output_normalized_final.kicad_sch", "w") as f:
    f.write("\n".join(output_lines) + "\n")

print("Final normalized junctions written to demofile_output_normalized_final.kicad_sch")

#!/usr/bin/env python3

normalized_junctions = "final_junctions.txt"
normalized_wires = "final_wires.txt"
normalized_symbols = "final_symbols.txt"
output_file = "output.kicad_sch"

with open(output_file, "w") as fout:
    for file in [normalized_junctions, normalized_wires, normalized_symbols]:
        with open(file) as f:
            fout.write(f.read())

print("✅ output.kicad_sch created successfully")

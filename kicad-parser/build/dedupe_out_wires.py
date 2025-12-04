#!/usr/bin/env python3
from collections import OrderedDict
infile = "out_wires.txt"
outfile = "out_wires_deduped.txt"
seen = OrderedDict()
with open(infile, "r") as f:
    for line in f:
        s = line.rstrip("\n")
        if s not in seen:
            seen[s] = None
with open(outfile, "w") as f:
    for s in seen.keys():
        f.write(s + "\n")
print(f"Deduped {infile} -> {outfile}: {len(list(seen.keys()))} unique lines")

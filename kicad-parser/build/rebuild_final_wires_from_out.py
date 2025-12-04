#!/usr/bin/env python3
import re
infile = "out_wires_deduped.txt"
outfile = "final_wires_rebuilt.txt"
pat = re.compile(r'\(start\s+([-\d\.]+)\s+([-\d\.]+)\)\s*\(end\s+([-\d\.]+)\s+([-\d\.]+)\)')
out = []
with open(infile) as f:
    for line in f:
        m = pat.search(line)
        if m:
            x1,y1,x2,y2 = m.group(1),m.group(2),m.group(3),m.group(4)
            out.append(f" (wire (pts (xy {x1} {y1}) (xy {x2} {y2}))")
with open(outfile,"w") as f:
    for l in out:
        f.write(l+"\n")
print("Wrote", len(out), "wires to", outfile)

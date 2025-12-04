#!/usr/bin/env python3
import sys
import sexpdata  # make sure python3-sexpdata is installed

def normalize_sexpr(text: str) -> str:
    """Parse and dump S-expr in compact single-line form."""
    expr = sexpdata.loads(text)

    def dump(node):
        if isinstance(node, list):
            return "(" + " ".join(dump(x) for x in node) + ")"
        elif isinstance(node, sexpdata.Symbol):
            return node.value()
        elif isinstance(node, str):
            return '"' + node + '"' if " " in node else node
        else:
            return str(node)

    return dump(expr)

def main(infile, outfile):
    with open(infile, "r") as f:
        text = f.read()
    normalized = normalize_sexpr(text)
    with open(outfile, "w") as f:
        f.write(normalized + "\n")

if __name__ == "__main__":
    if len(sys.argv) != 3:
        print("Usage: normalize_sexpr.py input.kicad_sch output.kicad_sch")
        sys.exit(1)
    main(sys.argv[1], sys.argv[2])

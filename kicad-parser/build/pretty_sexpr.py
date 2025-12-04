#!/usr/bin/env python3
import sys
import sexpdata  # pip install sexpdata

def pretty_format(node, indent=0):
    """Format S-expression in KiCad style."""
    if isinstance(node, list):
        if not node:
            return "()"
        result = "(" + str(pretty_format(node[0], 0))
        for elem in node[1:]:
            if isinstance(elem, list):
                result += "\n" + "  " * (indent + 1) + pretty_format(elem, indent + 1)
            else:
                result += " " + pretty_format(elem, indent + 1)
        result += ")"
        return result
    elif isinstance(node, sexpdata.Symbol):
        return str(node.value())
    elif isinstance(node, str):
        return f"\"{node}\"" if " " in node or not node.isidentifier() else node
    else:
        return str(node)

def main(input_file, output_file):
    with open(input_file, "r") as f:
        content = f.read()
    sexpr = sexpdata.loads(content)
    formatted = pretty_format(sexpr)
    with open(output_file, "w") as f:
        f.write(formatted + "\n")

if __name__ == "__main__":
    if len(sys.argv) != 3:
        print("Usage: pretty_sexpr.py input.kicad_sch output.kicad_sch")
        sys.exit(1)
    main(sys.argv[1], sys.argv[2])

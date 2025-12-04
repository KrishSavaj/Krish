#!/usr/bin/env python3
import re, sys

def normalize_wire(text):
    """Extract coordinates from a (wire (pts ...)) block and return tuple of points."""
    coords = re.findall(r"\(xy ([0-9\.\-]+) ([0-9\.\-]+)\)", text)
    return tuple((float(x), float(y)) for x, y in coords)

def extract_blocks(path, kind):
    """Extract all (kind ...) s-expressions from file."""
    pattern = re.compile(rf"\({kind}\s.*?\)", re.DOTALL)
    blocks = []
    with open(path) as f:
        data = f.read()
        for m in pattern.finditer(data):
            blocks.append(m.group(0))
    return blocks

def compare_sets(kind, orig_blocks, parsed_blocks):
    if kind == "wire":
        orig_norm = [normalize_wire(b) for b in orig_blocks]
        parsed_norm = [normalize_wire(b) for b in parsed_blocks]
    else:
        # For non-wire, compare raw strings after whitespace normalization
        orig_norm = [" ".join(b.split()) for b in orig_blocks]
        parsed_norm = [" ".join(b.split()) for b in parsed_blocks]

    orig_set = set(orig_norm)
    parsed_set = set(parsed_norm)

    missing = orig_set - parsed_set
    extra   = parsed_set - orig_set

    print(f"== {kind.upper()} ==")
    print(f"original {kind}: {len(orig_blocks)}")
    print(f"parsed   {kind}: {len(parsed_blocks)}")
    print(f"missing: {len(missing)}")
    print(f"extra:   {len(extra)}")

    if missing:
        print("  Missing examples:")
        for m in list(missing)[:5]:
            print("   ", m)
    if extra:
        print("  Extra examples:")
        for e in list(extra)[:5]:
            print("   ", e)
    print()

def main():
    if len(sys.argv) < 3:
        print("Usage: compare_sexpr_segments.py orig.kicad_sch parsed.kicad_sch")
        sys.exit(1)

    orig_path, parsed_path = sys.argv[1], sys.argv[2]

    for kind in ["segment", "wire", "junction"]:
        orig_blocks = extract_blocks(orig_path, kind)
        parsed_blocks = extract_blocks(parsed_path, kind)
        compare_sets(kind, orig_blocks, parsed_blocks)

if __name__ == "__main__":
    main()

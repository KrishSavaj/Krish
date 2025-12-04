import re, json, os

def extract_blocks(text, start_token="(footprint", end_token=")"):
    """Extract balanced '(footprint ... )' or '(module ... )' blocks safely."""
    blocks = []
    stack = 0
    start = None
    for i in range(len(text)):
        if text[i:i+len(start_token)] == start_token:
            if stack == 0:
                start = i
            stack += 1
        elif text[i] == '(':
            if stack > 0:
                stack += 1
        elif text[i] == ')':
            if stack > 0:
                stack -= 1
                if stack == 0 and start is not None:
                    blocks.append(text[start:i+1])
                    start = None
    return blocks


def parse_kicad(filepath):
    with open(filepath, "r") as f:
        content = f.read()

    # Detect legacy KiCad 4 format (uses "module")
    old_format = "(module " in content

    # --- Board outline (Edge.Cuts or legacy area) ---
    board_bbox = None

    # --- Board outline (Edge.Cuts) ---
    rect = re.search(r'\(gr_rect\s+\(start\s+([-\d\.]+)\s+([-\d\.]+)\)\s+\(end\s+([-\d\.]+)\s+([-\d\.]+)\)', content)
    if rect:
        board_bbox = [float(rect.group(i)) for i in range(1, 5)]
    else:
        xs, ys = [], []
        for m in re.finditer(
            r'\(gr_(?:line|arc|circle)[\s\S]*?\(layer\s+"?Edge\.Cuts"?\)[\s\S]*?\(start\s+([-\d\.]+)\s+([-\d\.]+)\)[\s\S]*?\(end\s+([-\d\.]+)\s+([-\d\.]+)\)',
            content
        ):
            xs += [float(m.group(1)), float(m.group(3))]
            ys += [float(m.group(2)), float(m.group(4))]

        for m in re.finditer(
            r'\(gr_circle[\s\S]*?\(layer\s+"?Edge\.Cuts"?\)[\s\S]*?\(center\s+([-\d\.]+)\s+([-\d\.]+)\)\s+\(end\s+([-\d\.]+)\s+([-\d\.]+)\)',
            content
        ):
            cx, cy, ex, ey = map(float, m.groups())
            r = ((ex - cx)**2 + (ey - cy)**2)**0.5
            xs += [cx - r, cx + r]
            ys += [cy - r, cy + r]

        if xs and ys:
            board_bbox = [min(xs), min(ys), max(xs), max(ys)]

    #Fallback for legacy KiCad v4 "(area ...)" field
    if board_bbox is None:
        area_match = re.search(r'\(area\s+([-\d\.]+)\s+([-\d\.]+)\s+([-\d\.]+)\s+([-\d\.]+)\)', content)
        if area_match:
            board_bbox = [float(area_match.group(i)) for i in range(1, 5)]
            print(f"Detected legacy KiCad v4 area: {board_bbox}")
            
    # --- Nets (supports both quoted and unquoted names) ---
    nets = {}
    for m in re.finditer(r'\(net\s+(\d+)\s+"?([^"\)]+)"?\)', content):
        nets[m.group(1)] = m.group(2)

    # --- Footprints or Modules ---
    footprints = extract_blocks(content, "(module" if old_format else "(footprint", ")")
    pads = []

    pad_pattern = re.compile(
        r'\(pad\s+("?[^"\s]+?"?)[\s\S]*?\(at\s+([-\d\.]+)\s+([-\d\.]+)(?:\s+[^\)]*)?\)[\s\S]*?\(net\s+(\d+)\s+(?:"([^"]+)"|([^\)]+))\)',
        re.MULTILINE
    )

    for fp in footprints:
        at_match = re.search(r'\(at\s+([-\d\.]+)\s+([-\d\.]+)', fp)
        fx, fy = (float(at_match.group(1)), float(at_match.group(2))) if at_match else (0.0, 0.0)

        for m in pad_pattern.finditer(fp):
            local_x, local_y = float(m.group(2)), float(m.group(3))
            net_name = m.group(5) if m.group(5) else m.group(6)
            pads.append({
                "pad": m.group(1).strip('"'),
                "x": fx + local_x,
                "y": fy + local_y,
                "net_id": m.group(4),
                "net_name": net_name.strip(),
            })


    # --- Group pads per net ---
    nets_dict = {}
    for p in pads:
        nets_dict.setdefault(p["net_name"], []).append((p["x"], p["y"]))

    result = {
        "board_bbox": board_bbox,
        "nets": nets_dict,
        "pad_count": len(pads)
    }
    return result


if __name__ == "__main__":
    pcb_path = "../data/ACtoDCconverter.kicad_pcb"
    result = parse_kicad(pcb_path)
    os.makedirs("../results", exist_ok=True)
    with open("../results/board_meta.json", "w") as f:
        json.dump(result, f, indent=2)
    print("Parsed:", pcb_path)
    print(f"Pads: {result['pad_count']}, Nets: {len(result['nets'])}")
    print("Net names:", list(result["nets"].keys())[:10])

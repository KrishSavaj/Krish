import json
from sexpdata import loads, Symbol
import sys
import math

def parse_kicad_pcb(filepath):
    with open(filepath, 'r') as file:
        content = file.read()

    data = loads(content)
    components = []

    if not isinstance(data, list) or data[0] != Symbol("kicad_pcb"):
        raise ValueError("This is not a valid KiCad .kicad_pcb file")

    pcb_file = data[1:]

    for item in pcb_file:
        if isinstance(item, list) and item[0] == Symbol("footprint"):
            footprint_name = str(item[1])
            ref = None
            value = None
            position = (0.0, 0.0)
            rotation = 0.0
            pins = []

            for sub in item:
                if not isinstance(sub, list) or len(sub) < 2:
                    continue

                tag = sub[0]

                # Position & Rotation
                if tag == Symbol("at"):
                    try:
                        position = (float(sub[1]), float(sub[2]))
                        if len(sub) >= 4:
                            rotation = float(sub[3])
                            rotation = -(rotation)  # treat -90 and 90 
                    except:
                        pass

                # Ref and Value
                elif tag == Symbol("property") and len(sub) >= 3:
                    try:
                        prop_name = sub[1].value() if hasattr(sub[1], 'value') else str(sub[1])
                        prop_value = sub[2].value() if hasattr(sub[2], 'value') else str(sub[2])
                        if prop_name.lower() == "reference":
                            ref = prop_value
                        elif prop_name.lower() == "value":
                            value = prop_value
                    except:
                        pass

                elif tag == Symbol("fp_text") and len(sub) >= 3:
                    try:
                        text_type = sub[1].value() if hasattr(sub[1], 'value') else str(sub[1])
                        text_value = sub[2].value() if hasattr(sub[2], 'value') else str(sub[2])
                        if text_type.lower() == "reference":
                            ref = text_value
                        elif text_type.lower() == "value":
                            value = text_value
                    except:
                        pass

                # Pads
                elif tag == Symbol("pad") and len(sub) >= 2:
                    pad_num = str(sub[1])
                    dx, dy = 0.0, 0.0
                    net_name = "unknown"

                    for pad_sub in sub:
                        if isinstance(pad_sub, list):
                            if pad_sub[0] == Symbol("at") and len(pad_sub) >= 3:
                                try:
                                    dx = float(pad_sub[1])
                                    dy = float(pad_sub[2])
                                except:
                                    pass
                            elif pad_sub[0] == Symbol("net") and len(pad_sub) >= 3:
                                net_name = str(pad_sub[2]).strip('"')

                    # Apply rotation (normalized to positive)
                    theta = math.radians(rotation)
                    rx = dx * math.cos(theta) - dy * math.sin(theta)
                    ry = dx * math.sin(theta) + dy * math.cos(theta)

                    pad_x = position[0] + rx
                    pad_y = position[1] + ry

                    pins.append({
                        "pad": pad_num,
                        "net": net_name,
                        "x": round(pad_x, 3),
                        "y": round(pad_y, 3)
                    })

            if (ref or "").startswith("G") and (value or "").upper() == "LOGO":
                continue

            components.append({
                "ref": ref or "unknown",
                "value": value or "unknown",
                "footprint": footprint_name,
                "x": round(position[0], 3),
                "y": round(position[1], 3),
                "pins": pins
            })

    return components


if __name__ == "__main__":
    if len(sys.argv) != 3:
        print("Usage: python parser2.py input.kicad_pcb output.json")
        sys.exit(1)

    input_file = sys.argv[1]
    output_file = sys.argv[2]

    components = parse_kicad_pcb(input_file)

    with open(output_file, "w") as f:
        json.dump(components, f, indent=2)

    print(f"Extracted {len(components)} components to {output_file}")

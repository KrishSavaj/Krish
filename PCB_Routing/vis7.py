import json
import matplotlib.pyplot as plt
import matplotlib.patches as mpatches
import math

# Load JSON
with open("data_files/output_routed.json", "r") as f:
    data = json.load(f)


segments = data.get("segments", [])
components = data.get("components", [])

# Filter out all "unknown" nets before processing
segments = [
    s for s in segments
    if not (s.get("net", "").lower() == "unknown")
]


# --- Determine center ---
all_x = []
all_y = []

for seg in segments:
    if seg.get("type") == "segment":
        all_x.extend([seg["start"][0], seg["end"][0]])
        all_y.extend([seg["start"][1], seg["end"][1]])
    elif seg.get("type") == "via":
        all_x.append(seg["x"])
        all_y.append(seg["y"])

for comp in components:
    if comp.get("x") is not None:
        all_x.append(comp["x"])
    if comp.get("y") is not None:
        all_y.append(comp["y"])
    for pin in comp.get("pins", []):
        all_x.append(pin["x"])
        all_y.append(pin["y"])

cx = (min(all_x) + max(all_x)) / 2
cy = (min(all_y) + max(all_y)) / 2

# --- Flip vertically (top ↔ bottom) ---
def flip_y(x, y):
    return x, 2 * cy - y

# Layer colors
layer_colors = {
    0: "white",  
    1: "red",  
    2: "#87CEEB",  
    3: "green",
    4: "orange"      # Bottom
}
xmin, xmax = min(all_x), max(all_x)
ymin, ymax = min(all_y), max(all_y)


board_width = xmax - xmin
board_height = ymax - ymin

cx = (xmin + xmax) / 2
cy = (ymin + ymax) / 2
# ------------------------------------------------------------
# Extract Routing Statistics
# ------------------------------------------------------------
num_segments = sum(1 for s in segments if s.get("type") == "segment")
num_vias = sum(1 for s in segments if s.get("type") == "via")

layers_used = sorted({seg["layer"] for seg in segments if seg.get("type") == "segment"})
num_layers = len(layers_used)

num_components = len(components)
num_pins = sum(len(c.get("pins", [])) for c in components)

board_area = board_width * board_height


# Compute total routed track length
total_length = 0.0
for s in segments:
    if s.get("type") == "segment":
        x0, y0 = s["start"]
        x1, y1 = s["end"]
        total_length += math.hypot(x1 - x0, y1 - y0)

#  Compute total unique nets routed
unique_nets = set()
for s in segments:
    if s.get("type") == "segment" and "net" in s and s["net"]:
        unique_nets.add(s["net"])
num_unique_nets = len(unique_nets)

# ------------------------------------------------------------
# Print Routing Summary
# ------------------------------------------------------------
print("\n================ PCB ROUTING SUMMARY ================")
print(f"Board X range: {xmin:.2f} to {xmax:.2f}")
print(f"Board Y range: {ymin:.2f} to {ymax:.2f}")
print(f"Board Width  : {board_width:.2f} mm")
print(f"Board Height : {board_height:.2f} mm")
print(f"Board Area          : {board_area:.2f} mm²")

print("\n--- Routing Stats ---")
print(f"Total Segments Routed: {num_segments}")
print(f"Total Vias Used      : {num_vias}")
print(f"Layers Used          : {layers_used}")
print(f"Number of Layers     : {num_layers}")
print(f"Total Track Length   : {total_length:.2f} mm") 
print(f"Total Nets Routed    : {num_unique_nets}")  



print("\n--- Component Stats ---")
print(f"Total Components     : {num_components}")
print(f"Total Pins           : {num_pins}")
print("=====================================================\n")

# Plot setup
plt.figure(figsize=(12, 10))
ax = plt.gca()
ax.set_facecolor('#002b36')
plt.axis('equal')
plt.grid(False)

# --- Draw wires with net names (labels on side) ---
for seg in segments:
    if seg["type"] == "segment":
        x0, y0 = flip_y(*seg["start"])
        x1, y1 = flip_y(*seg["end"])
        layer = seg["layer"]
        color = layer_colors.get(layer, "#FFFFFF")
        plt.plot([x0, x1], [y0, y1], color=color, linewidth=2)

    elif seg["type"] == "via":
        x, y = flip_y(seg["x"], seg["y"])
        plt.plot(x, y, 'o', color="cyan", markersize=6)
        # optional: label via
        # plt.text(x+0.3, y+0.3, "via", fontsize=6, color="white")

    # # Place net label near start point, with offset
    # offset_x = 0.8
    # offset_y = 0.6
    # plt.text(x0 + offset_x, y0 + offset_y, net, fontsize=6, color=color,
    #          ha='left', va='bottom', backgroundcolor="#002b36")

# --- Draw components and pads ---
for comp in components:
    ref = comp.get("ref", "")
    cx_comp = comp.get("x")
    cy_comp = comp.get("y")
    cx_flip, cy_flip = flip_y(cx_comp, cy_comp) if cx_comp is not None and cy_comp is not None else (None, None)
    pads = comp.get("pins", [])

    # Bounding box
    if pads:
        flipped_pads = [flip_y(pin["x"], pin["y"]) for pin in pads]
        xs, ys = zip(*flipped_pads)
        xmin_pad, xmax_pad = min(xs), max(xs)
        ymin_pad, ymax_pad = min(ys), max(ys)

        width = xmax_pad - xmin_pad
        height = ymax_pad - ymin_pad

        margin = 0.5
        xmin_pad -= margin
        ymin_pad -= margin
        width += 2 * margin
        height += 2 * margin

        rect = mpatches.Rectangle((xmin_pad, ymin_pad), width, height,
                                  linewidth=1.2, edgecolor='magenta', facecolor='none', linestyle='-')
        ax.add_patch(rect)

    # Component label
    if cx_flip is not None and cy_flip is not None:
        plt.text(cx_flip, cy_flip, ref, color='white', fontsize=8, ha='center', va='center')

    # Pads
    for pin in pads:
        px, py = flip_y(pin["x"], pin["y"])
        padnum = pin.get("pad", "?")
        plt.plot(px, py, 'o', color='yellow', markersize=6)
        #plt.text(px + 0.4, py + 0.4, f"{ref}.{padnum}", fontsize=6, color='white')

# --- Legend ---
patches = [
    mpatches.Patch(color=color, label=f'Layer {layer}')
    for layer, color in layer_colors.items() if layer in layers_used
]
patches.append(mpatches.Patch(edgecolor='magenta', facecolor='none', label='Bounding Box'))

# Add the legend in the top-right corner of the window (axes coordinates)
legend = plt.legend(
    handles=patches,
    loc='upper right',           # position inside axes
    bbox_to_anchor=(1.02, 1.0),  # small offset outside plot
    frameon=True,
    framealpha=0.8,
    facecolor="#073642",         # solarized dark background
    edgecolor="white",
    fontsize=9
)

# Customize legend text color
for text in legend.get_texts():
    text.set_color("white")

plt.title("Routed PCB Viewer", fontsize=14, color='white')
plt.xlabel("X (mm)", color='white')
plt.ylabel("Y (mm)", color='white')

# Make all tick labels white for better visibility
ax.tick_params(colors='white')
for spine in ax.spines.values():
    spine.set_edgecolor('white')

plt.tight_layout()
plt.show()

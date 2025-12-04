import json
import math
import re
from collections import defaultdict

# --- Configuration ---
# Assuming JSON coordinates are already in millimeters (mm).
# Based on observation (e.g., SES 1324000 vs JSON 132.4),
# FreeRouting SES coordinates are typically in 0.1 micrometer (100 nanometer) units.
# 1 mm = 1000 micrometers (µm)
# 1 mm = 10000 * 0.1 micrometers (since 1 µm = 10 * 0.1 µm)
SES_COORD_UNIT_TO_MM_FACTOR = 10000.0
# Net names to exclude from comparison (e.g., power/ground planes often routed separately)
EXCLUDE_NETS = {"GND", "unknown"}

# --- Load output_routed2.json (Your Router's Output) ---
with open("data_files/output_routed.json", "r") as f:
    data_json = json.load(f)

# ***************************************************************
# *** FIX: Filter out Vias and excluded nets ***
# A segment must have 'start' and 'end' keys to be measurable.
# Vias typically have 'type': 'via' and only 'x' and 'y'.
segments_raw = data_json.get("segments", [])
segments_json = [
    seg for seg in segments_raw 
    if "start" in seg and seg.get("net") not in EXCLUDE_NETS
]
# ***************************************************************

# Per-net length tracking for JSON output
nets_json = set(seg["net"] for seg in segments_json) # Recalculate nets based on filtered list
lengths_json = defaultdict(float)
for seg in segments_json:
    # math.dist directly calculates distance in the units of the coordinates (mm in this case)
    # This line is now safe because only true line segments remain.
    dist = math.dist(seg["start"], seg["end"]) 
    lengths_json[seg["net"]] += dist

segment_count_json = len(segments_json)
net_count_json = len(nets_json)
total_length_json = sum(lengths_json.values())


# --- Parse ACtoDCconverter_Freerouting_IP.ses (FreeRouting's Output) ---
with open("ACtoDCconverter_Freerouting_IP.ses", "r") as f:
    ses_content = f.read()

# Initialize SES routing metrics
net_set_ses = set()
segment_count_ses = 0
total_length_ses_raw_units = 0.0 # Accumulate total length in raw SES coordinate units
lengths_ses = defaultdict(float)

# Find all net blocks in the SES content
net_blocks = re.findall(r'\(net\s+("([^"]+)"|([^\s\)]+))\s*(.*?)\)\s*(?=\(net|\)\s*\)\s*\))', ses_content, re.DOTALL)

for net_group in net_blocks:
    net_name = net_group[1] if net_group[1] else net_group[2]
    if net_name in EXCLUDE_NETS:
        continue
    
    net_set_ses.add(net_name)
    net_body = net_group[3] # This contains the content of the net block

    # --- Debugging start for specific net ---
    # if net_name == "Net-(D5-A)":
    #     print(f"\n--- DEBUGGING Net: {net_name} ---")
    #     print(f"Full Net Body for {net_name}:\n{net_body}\n---")
        
    # Find all individual (wire ...) blocks within the net_body
    # This regex is more specific to capture each wire block separately.
    individual_wire_blocks = re.findall(r'(\(wire\s*\(path\s+\S+\s+\d+\s*(?:[-\d]+\s+[-\d]+\s*)+\)\s*\))', net_body, re.DOTALL)

    # if net_name == "Net-(D5-A)":
    #     print(f"Found {len(individual_wire_blocks)} individual wire blocks for {net_name}.")
    #     for i, block in enumerate(individual_wire_blocks):
    #         print(f"  Wire Block {i+1} content:\n{block}\n---")

    for wire_block_str in individual_wire_blocks:
        # Now, extract coordinates from this single wire_block_str
        coords_match = re.search(r'\(path\s+\S+\s+\d+\s*((?:[-\d]+\s+[-\d]+\s*)+)\)', wire_block_str)
        if coords_match:
            path_str = coords_match.group(1)
            coords_list = path_str.strip().split()
            coordinates = []
            for i in range(0, len(coords_list), 2):
                coordinates.append((float(coords_list[i]), float(coords_list[i + 1])))

            # if net_name == "Net-(D5-A)":
            #     print(f"    Extracted coordinates: {coordinates}")
            #     print(f"    Number of segments in this wire block: {len(coordinates) - 1 if len(coordinates) >= 2 else 0}")
                
            # Count segments and accumulate length
            if len(coordinates) >= 2:
                for i in range(len(coordinates) - 1):
                    x0, y0 = coordinates[i]
                    x1, y1 = coordinates[i + 1]
                    segment_count_ses += 1
                    
                    # math.dist returns distance in the raw coordinate units (0.1 um for SES)
                    dist_in_raw_units = math.dist((x0, y0), (x1, y1))
                    lengths_ses[net_name] += dist_in_raw_units
                    total_length_ses_raw_units += dist_in_raw_units
    
    # if net_name == "Net-(D5-A)":
    #     print(f"--- END DEBUGGING Net: {net_name} ---")


# Count unique nets in SES (already handled by adding to set)
net_count_ses = len(net_set_ses)

# Convert the accumulated total length from raw units (0.1 um) to mm
total_length_ses_mm = total_length_ses_raw_units / SES_COORD_UNIT_TO_MM_FACTOR


# --- Print Comparison Summary ---
print("Routing Quality Comparison")
print("--------------------------------------------------")
print(f"{'Metric':<25} | {'Your Router (.json)':<22} | {'FreeRouting (.ses)':<20}")
print("--------------------------------------------------")
print(f"{'Net count':<25} | {net_count_json:<22} | {net_count_ses:<20}")
print(f"{'Segment count':<25} | {segment_count_json:<22} | {segment_count_ses:<20}")
print(f"{'Total wire length (mm)':<25} | {total_length_json:<22.2f} | {total_length_ses_mm:<20.2f}")
print()

# --- Print Per-Net Lengths ---
print("Per-Net Wire Lengths (in mm):")
print(f"{'Net Name':<25} | {'Your Router':>15} | {'FreeRouting':>15}")
print("-" * 59)

# Combine all unique net names and sort them for consistent output
all_nets = sorted(nets_json.union(net_set_ses))

for net in all_nets:
    # Corrected line: Removed non-printable character from assignment
    len_json = lengths_json.get(net, 0.0) # Length from your router (already in mm)
    len_ses = lengths_ses.get(net, 0.0) / SES_COORD_UNIT_TO_MM_FACTOR # Convert SES raw units to mm
    print(f"{net:<25} | {len_json:>15.2f} | {len_ses:>15.2f}")
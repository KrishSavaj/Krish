import os
import csv
import numpy as np
from random import shuffle, seed

from parse_kicad import parse_kicad
from astar import astar
from feature_extractor import (
    board_features, compute_net_geometry, aggregate_net_features, routing_metrics, ordering_features
)

DATA_DIR = "../data"
OUTPUT_CSV = "../results/pcb_dataset5.csv"
NET_CSV = "../results/per_net_dataset1.csv"
NUM_ORDERINGS = 5   # number of random net orderings per board

def route_board(filepath):
    """Parse and route a single board; compute features."""
    meta = parse_kicad(filepath)
    nets = meta["nets"]
    bbox = meta["board_bbox"]


    if bbox is None or not nets:
        print(f" Skipping {os.path.basename(filepath)} — invalid board or no nets")
        return None, []

    scale = 2.0  # 2 grid cells per mm

    W, H = int((bbox[2] - bbox[0])*scale), int((bbox[3] - bbox[1])*scale)
    grid = np.zeros((H, W), dtype=int)
    grid[0, :] = grid[-1, :] = grid[:, 0] = grid[:, -1] = 1
    grid_init = grid.copy()

    # === Route all nets (for baseline metrics) ===
    total_length, successful = 0, 0
    failed_nets = []
    net_results = []

    # Route all nets (for simplicity, only first 2 pins per net)
    for net_name, pins in nets.items():
        if len(pins) < 2:
            continue

        p1, p2 = pins[0], pins[1]
        s = (int(p1[1] - bbox[1]), int(p1[0] - bbox[0]))
        g = (int(p2[1] - bbox[1]), int(p2[0] - bbox[0]))
        path = astar(s, g, grid)

        est_len = abs(p1[0]-p2[0]) + abs(p1[1]-p2[1])

        if path:
            successful += 1
            routed_len = len(path)
            total_length += routed_len
            stretch = routed_len / (est_len + 1e-6)

            for (y, x) in path:
                if 0 <= y < H and 0 <= x < W:
                    grid[y, x] = 1

            net_results.append({
                "net": net_name,
                "success": True,
                "routed_len": routed_len,
                "manhattan": est_len,
                "stretch": stretch
            })
        else:
            failed_nets.append(net_name)
            net_results.append({
                "net": net_name,
                "success": False,
                "manhattan": est_len,
                "stretch": 0

            })
    total_nets = len([n for n in nets if len(nets[n]) >= 2])
    success_rate = (successful / total_nets * 100) if total_nets > 0 else 0

    # === Base board-level + net geometry features ===
    board_feat = board_features(meta, grid_init)
    net_geom = compute_net_geometry(meta["nets"])
    net_agg = aggregate_net_features(net_geom)
    routing_feat = routing_metrics(net_results, total_nets, total_length, success_rate, grid)

    via_count = 0  # placeholder
    board_row = {
        "board_name": os.path.basename(filepath),
        **board_feat,
        **net_agg,
        **routing_feat,
        "total_nets": total_nets,
        "successful": successful,
        "failed": len(failed_nets),
        "success_rate": success_rate,
        "total_wirelength": total_length,
        "via_count": via_count,
    }

    # === Multi-order feature generation for ML training ===
    per_net_data_all = []
    for run_id in range(NUM_ORDERINGS):
        # ensure reproducibility
        np.random.seed(run_id)
        seed(run_id)

        order = list(nets.keys())
        shuffle(order)
        order_feat, per_net_feat = ordering_features(meta, order)

        # add per-order global context (mean_overlap, total_est_len, etc.)
        global_order_summary = {
            "order_total_est_len": order_feat.get("total_est_len", 0.0),
            "order_mean_overlap": order_feat.get("mean_overlap", 0.0),
            "order_std_overlap": order_feat.get("std_overlap", 0.0),
            "order_mean_manhattan": order_feat.get("mean_manhattan", 0.0),
            "order_final_occupied_ratio": order_feat.get("final_occupied_ratio", 0.0)
        }

        for pos, nf in enumerate(per_net_feat):
            match_geom = next((g for g in net_geom if g["net"] == nf["net"]), None)
            if match_geom:
                nf.update({
                    "board_name": os.path.basename(filepath),
                    "order_run": run_id,
                    "net_index_in_order": pos,   # <-- NEW FEATURE
                    "pin_count": match_geom["pin_count"],
                    "bbox_area": match_geom["bbox_area"],
                    **global_order_summary       # <-- attach global context
                })
                per_net_data_all.append(nf)

    return board_row, per_net_data_all

def main():
    os.makedirs("../results", exist_ok=True)

    board_results, net_results = [], []

    for fname in os.listdir(DATA_DIR):
        if fname.endswith(".kicad_pcb"):
            path = os.path.join(DATA_DIR, fname)
            print(f"\n=== Processing {fname} ===")
            board_row, per_net_data = route_board(path)
            if board_row:
                board_results.append(board_row)
            net_results.extend(per_net_data)

     # === Save board-level dataset ===
    if board_results:
        with open(OUTPUT_CSV, "w", newline="") as f:
            writer = csv.DictWriter(f, fieldnames=board_results[0].keys())
            writer.writeheader()
            writer.writerows(board_results)
        print(f"\n Board-level dataset saved to: {OUTPUT_CSV}")

    # === Save per-net dataset ===
    if net_results:
        with open(NET_CSV, "w", newline="") as f:
            writer = csv.DictWriter(f, fieldnames=net_results[0].keys())
            writer.writeheader()
            writer.writerows(net_results)
        print(f" Per-net dataset saved to: {NET_CSV}")

    print(f"\nTotal boards processed: {len(board_results)}")
    print(f"Total nets processed: {len(net_results)}")


if __name__ == "__main__":
    main()

#!/usr/bin/env python3
import os
import sys
import numpy as np
import random
import joblib
import json
import pandas as pd
from parse_kicad import parse_kicad
from feature_extractor import ordering_features

# === Config ===
MODEL_PATH_DEFAULT = "results/net_cost_model.pkl"
OUTPUT_PATH_DEFAULT = "results/best_net_order.json"
POP_SIZE = 30
NUM_GENERATIONS = 5
MUTATION_RATE = 0.2
TOURNAMENT_SIZE = 5

# === Load trained ML model ===
def load_model(model_path):
    if not os.path.exists(model_path):
        raise FileNotFoundError(f"Trained ML model not found: {model_path}")
    print(f"Loaded trained ML model from {model_path}")
    return joblib.load(model_path)

# === Feature set expected by model ===
FEATURE_COLS = [
    "pos_norm",
    "manhattan_len",
    "bbox_area",
    "overlap_frac",
    "pin_count",
    "net_index_in_order",
    "order_total_est_len",
    "order_mean_overlap",
    "order_std_overlap",
    "order_mean_manhattan",
    "order_final_occupied_ratio",
]

# ----------------------- GA CORE -----------------------
def evaluate_order(model, meta, order):
    """Compute per-net features and predict total routing cost using ML model."""
    order_feat, per_net_feat = ordering_features(meta, order)
    if not per_net_feat:
        return float("inf")

    # Add global order context to per-net features
    global_ctx = {
        "order_total_est_len": order_feat.get("total_est_len", 0.0),
        "order_mean_overlap": order_feat.get("mean_overlap", 0.0),
        "order_std_overlap": order_feat.get("std_overlap", 0.0),
        "order_mean_manhattan": order_feat.get("mean_manhattan", 0.0),
        "order_final_occupied_ratio": order_feat.get("final_occupied_ratio", 0.0),
    }

    enriched = []
    for pos, nf in enumerate(per_net_feat):
        nf.update({
            "net_index_in_order": pos,
            "pin_count": nf.get("pin_count", 2),
            **global_ctx
        })
        enriched.append(nf)

    df = pd.DataFrame(enriched)
    if not all(c in df.columns for c in FEATURE_COLS):
        missing = [c for c in FEATURE_COLS if c not in df.columns]
        print(f"[Warning] Missing columns: {missing}")
        return float("inf")

    y_pred = model.predict(df[FEATURE_COLS])
    return np.sum(y_pred)  # total estimated routing cost


def crossover(p1, p2):
    """Partially Mapped Crossover (PMX)."""
    size = len(p1)
    a, b = sorted(random.sample(range(size), 2))
    child = [None] * size
    child[a:b] = p1[a:b]
    for i in range(a, b):
        if p2[i] not in child:
            j = i
            while True:
                val = p1[j]
                j = p2.index(val)
                if child[j] is None:
                    child[j] = p2[i]
                    break
    for i in range(size):
        if child[i] is None:
            child[i] = p2[i]
    return child


def mutate(order):
    """Swap mutation."""
    if random.random() < MUTATION_RATE:
        a, b = random.sample(range(len(order)), 2)
        order[a], order[b] = order[b], order[a]
    return order


def tournament_selection(pop, fitness, k=TOURNAMENT_SIZE):
    """Select the best from k random candidates."""
    selected = random.sample(list(zip(pop, fitness)), k)
    return min(selected, key=lambda x: x[1])[0]


def run_ga(model, meta, board_name="unnamed_board"):
    """Run Genetic Algorithm for optimal net order."""
    nets = list(meta["nets"].keys())
    if len(nets) < 2:
        print(f"[Info] Skipping {board_name} — not enough nets.")
        return None, None

    # === Initialize ===
    population = [random.sample(nets, len(nets)) for _ in range(POP_SIZE)]
    fitness_scores = [evaluate_order(model, meta, ind) for ind in population]

    best_idx = int(np.argmin(fitness_scores))
    best_order = population[best_idx]
    best_cost = fitness_scores[best_idx]

    print(f"Initial best cost: {best_cost:.2f}")

    # === Evolution loop ===
    for gen in range(NUM_GENERATIONS):
        new_pop = []
        for _ in range(POP_SIZE):
            p1 = tournament_selection(population, fitness_scores)
            p2 = tournament_selection(population, fitness_scores)
            child = crossover(p1, p2)
            mutate(child)
            new_pop.append(child)

        new_fitness = [evaluate_order(model, meta, ind) for ind in new_pop]
        population, fitness_scores = new_pop, new_fitness

        gen_best_idx = int(np.argmin(fitness_scores))
        gen_best_cost = fitness_scores[gen_best_idx]
        if gen_best_cost < best_cost:
            best_cost = gen_best_cost
            best_order = new_pop[gen_best_idx]

        print(f"Gen {gen+1:02d}: best_cost={best_cost:.2f}")

    return best_order, best_cost
# -------------------------------------------------------

def run_optimizer(input_file, model_file=MODEL_PATH_DEFAULT, output_file=OUTPUT_PATH_DEFAULT):
    """Main entry for integration with C++ or standalone run."""
    model = load_model(model_file)

    if not input_file.endswith(".kicad_pcb"):
        raise ValueError(f"Expected a .kicad_pcb input file, got: {input_file}")

    board_name = os.path.basename(input_file)
    print(f"\n=== Running ML+GA optimizer for {board_name} ===")

    # Parse board and get nets
    meta = parse_kicad(input_file)
    if not meta or "nets" not in meta:
        raise RuntimeError("Failed to parse PCB or extract nets.")

    best_order, best_cost = run_ga(model, meta, board_name)
    if not best_order:
        raise RuntimeError("GA optimization failed or no valid nets found.")

    print(f" Best routing order found for {board_name}")
    print(f"   Cost: {best_cost:.2f}")
    print(f"   Order: {best_order}")

    # === Save order ===
    os.makedirs(os.path.dirname(output_file), exist_ok=True)
    with open(output_file, "w") as f:
        json.dump({"net_order": best_order, "best_cost": best_cost}, f, indent=2)

    print(f"Results saved to {output_file}")
    return best_order


if __name__ == "__main__":
    in_file = sys.argv[1] if len(sys.argv) > 1 else "../data/sample_board.kicad_pcb"
    model_file = sys.argv[2] if len(sys.argv) > 2 else MODEL_PATH_DEFAULT
    out_file = sys.argv[3] if len(sys.argv) > 3 else OUTPUT_PATH_DEFAULT

    run_optimizer(in_file, model_file, out_file)

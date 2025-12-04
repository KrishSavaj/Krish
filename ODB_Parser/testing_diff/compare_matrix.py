import sys

def parse_matrix_file(path):
    records = []
    current = None
    with open(path, "r") as f:
        for line in f:
            line = line.strip()
            if not line or line.startswith("#"):  # skip empty/comment
                continue
            if line.endswith("{"):
                token = line.split()[0]
                current = {"type": token, "kv": {}}
            elif line == "}":
                if current:
                    records.append(current)
                    current = None
            elif "=" in line and current:
                key, val = line.split("=", 1)
                key, val = key.strip(), val.strip()
                # skip empty values
                if val != "":
                    current["kv"][key] = val
    return records


def compare_files(file1, file2):
    rec1 = parse_matrix_file(file1)
    rec2 = parse_matrix_file(file2)

    if len(rec1) != len(rec2):
        print(f"Record count mismatch: {len(rec1)} vs {len(rec2)}")

    for i, (r1, r2) in enumerate(zip(rec1, rec2), start=1):
        print(f"\nComparing record {i} ({r1['type']})")
        for k, v in r1["kv"].items():
            v2 = r2["kv"].get(k)
            if v2 is None:
                print(f"  Missing key {k} in file2")
            elif v != v2:
                print(f"  Mismatch {k}: file1={v}, file2={v2}")
        for k in r2["kv"]:
            if k not in r1["kv"]:
                print(f"  Extra key {k} in file2 with value {r2['kv'][k]}")


if __name__ == "__main__":
    if len(sys.argv) != 3:
        print("Usage: python compare_matrix.py original matrix_data")
        sys.exit(1)
    compare_files(sys.argv[1], sys.argv[2])


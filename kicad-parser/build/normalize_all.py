#!/usr/bin/env python3
import subprocess
import sys

# Input and output files
input_file = "demofile.kicad_sch"
normalized_junctions = "demofile.normalized_junctions.txt"
normalized_wires = "demofile.normalized_wires.txt"
normalized_symbols = "demofile.normalized_symbols.txt"
normalized_final = "demofile.normalized_final.txt"
output_file = "output.kicad_sch"
diff_file = "demofile.normalized_diff.txt"

def run_cmd(cmd):
    print(f"Running: {' '.join(cmd)}")
    result = subprocess.run(cmd, capture_output=True, text=True)
    if result.returncode != 0:
        print(f"Error: {result.stderr}")
        sys.exit(1)
    return result.stdout

def main():
    # Normalize junctions
    run_cmd(["python3", "../normalize_sort_junctions.py"])
    print("✅ Junctions normalized")

    # Normalize wires
    run_cmd(["python3", "../normalize_sort_wires.py"])
    print("✅ Wires normalized")

    # Normalize symbols
    run_cmd(["python3", "../normalize_sort_symbols.py"])
    print("✅ Symbols normalized")

    # Merge normalized outputs into final
    with open(normalized_junctions) as f1, open(normalized_wires) as f2, open(normalized_symbols) as f3, open(normalized_final, "w") as out:
        out.write(f1.read())
        out.write(f2.read())
        out.write(f3.read())

    # Create output.kicad_sch
    with open(output_file, "w") as fout, open(normalized_final) as fin:
        fout.write(fin.read())

    # Run diff against input
    diff = run_cmd(["diff", "-u", input_file, output_file])
    with open(diff_file, "w") as f:
        f.write(diff)

    if diff.strip():
        print("⚠️ Differences found. Check", diff_file)
    else:
        print("🎉 No differences. Output is clean:", output_file)

if __name__ == "__main__":
    main()

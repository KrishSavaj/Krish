#!/usr/bin/env python3
import os
import subprocess

# Define base directories
dir1_base = "/home/ritik/tmp/pcbdev/ODB_Parser/ODBPlusPlusFile/symbols"
dir2_base = "/home/ritik/test/designodb_rigidflex/designodb_rigidflex/symbols"

def main():
    # List all subdirectories in Directory 1
    for entry in os.scandir(dir1_base):
        if entry.is_dir():
            subdir_name = entry.name
            dir1_file = os.path.join(dir1_base, subdir_name, "symbols_data.txt")
            dir2_file = os.path.join(dir2_base, subdir_name, "features")

            if os.path.isfile(dir1_file) and os.path.isfile(dir2_file):
                print(f"\nComparing '{subdir_name}':")
                try:
                    # Run diff and capture output
                    result = subprocess.run(
                        ["diff", "-u", dir1_file, dir2_file],
                        stdout=subprocess.PIPE,
                        stderr=subprocess.PIPE,
                        text=True
                    )
                    if result.stdout:
                        print(result.stdout)
                    else:
                        print("No differences.")
                except Exception as e:
                    print(f"Error comparing {dir1_file} and {dir2_file}: {e}")
            else:
                print(f"\nSkipping '{subdir_name}': One or both files not found.")
                
if __name__ == "__main__":
    main()


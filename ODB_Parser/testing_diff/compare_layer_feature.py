#!/usr/bin/env python3
import os
import sys
import re

def extract_data(line):
    """Extract just the essential data from a line, ignoring formatting"""
    line = line.split('#')[0].strip()  # Remove comments
    
    if line.startswith('L '):  # Line feature
        match = re.search(r'L ([\d.-]+) ([\d.-]+) ([\d.-]+) ([\d.-]+).*ID=(\d+)', line)
        if match:
            return f"LINE:{match.group(1)},{match.group(2)},{match.group(3)},{match.group(4)},{match.group(5)}"
    
    elif line.startswith('A '):  # Arc feature
        match = re.search(r'A ([\d.-]+) ([\d.-]+).*ID=(\d+)', line)
        if match:
            return f"ARC:{match.group(1)},{match.group(2)},{match.group(3)}"
    
    elif line.startswith('P '):  # Pad feature
        match = re.search(r'P ([\d.-]+) ([\d.-]+).*ID=(\d+)', line)
        if match:
            return f"PAD:{match.group(1)},{match.group(2)},{match.group(3)}"
    
    elif line.startswith(('S ', 'OB', 'OS', 'OE')):  # Surface features
        match = re.search(r'ID=(\d+)', line)
        if match:
            return f"SURFACE:{match.group(1)}"
    
    elif re.search(r'ID=\d+', line):  # Any other feature with ID
        match = re.search(r'ID=(\d+)', line)
        return f"FEATURE:{match.group(1)}"
    
    # For non-feature lines (headers, etc.), include the whole line but normalize it
    line = re.sub(r'\s*([;,=])\s*', r'\1', line)  # Normalize spaces around special chars
    line = re.sub(r'\s+', ' ', line).strip()      # Collapse multiple spaces
    return line

def read_file_data(filepath):
    """Read just the essential data from a file"""
    data = set()
    with open(filepath, 'r') as f:
        for line in f:
            line = line.strip()
            if line and not line.startswith('#'):  # Skip empty lines and comments
                item = extract_data(line)
                if item:
                    data.add(item)
    return data

def compare_files(file1, file2):
    """Compare if all data from file2 exists in file1"""
    try:
        file1_data = read_file_data(file1)
        file2_data = read_file_data(file2)
        
        missing_data = file2_data - file1_data
        
        if missing_data:
            print(f"Error: {len(missing_data)} data items from file2 are missing in file1:")
            for item in sorted(missing_data):
                print(f"  - {item}")
            return False
        else:
            print("All data from file2 exists in file1.")
            return True
            
    except FileNotFoundError as e:
        print(f"Error reading files: {e}")
        return False

def main():
    # Base directories
    dir1_base = "/home/ritik/tmp/pcbdev/ODB_Parser/ODBPlusPlusFile/steps/ODBPlusPlusFile/layers"
    dir2_base = "/home/ritik/test/designodb_rigidflex/designodb_rigidflex/steps/cellular_flip-phone/layers"
    
    # Track comparison results
    total_comparisons = 0
    failed_comparisons = 0
    missing_file_count = 0
    
    print(f"Comparing directories:\n- Reference: {dir1_base}\n- Test: {dir2_base}\n")
    
    # List all subdirectories in Directory 1
    for entry in os.scandir(dir1_base):
        if entry.is_dir():
            subdir_name = entry.name
            file1 = os.path.join(dir1_base, subdir_name, "features.txt")
            file2 = os.path.join(dir2_base, subdir_name, "features")
            
            total_comparisons += 1
            
            if os.path.isfile(file1) and os.path.isfile(file2):
                print(f"\nComparing layer '{subdir_name}':")
                if not compare_files(file1, file2):
                    failed_comparisons += 1
                    print("Comparison failed!")
            else:
                missing_file_count += 1
                print(f"\nSkipping '{subdir_name}': One or both files not found.")
                if not os.path.isfile(file1):
                    print(f"  - Missing: {file1}")
                if not os.path.isfile(file2):
                    print(f"  - Missing: {file2}")
    
    # Summary report
    print("\n" + "="*50)
    print(f"Comparison Summary:")
    print(f"- Total layers compared: {total_comparisons}")
    print(f"- Successful comparisons: {total_comparisons - failed_comparisons - missing_file_count}")
    print(f"- Failed comparisons: {failed_comparisons}")
    print(f"- Missing files: {missing_file_count}")
    
    if failed_comparisons > 0 or missing_file_count > 0:
        sys.exit(1)

if __name__ == "__main__":
    main()
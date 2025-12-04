import re
from collections import defaultdict

def normalize_numeric(value):
    """Normalize numeric values by removing trailing .0 and limiting precision"""
    if '.' in value:
        # Remove trailing zeros after decimal
        value = value.rstrip('0').rstrip('.') if '.' in value else value
        # Limit to 6 decimal places to handle floating point precision differences
        parts = value.split('.')
        if len(parts) == 2 and len(parts[1]) > 6:
            value = f"{parts[0]}.{parts[1][:6]}"
    return value

def normalize_line(line):
    """Normalize a line by handling numbers and whitespace"""
    # First normalize numbers in the line
    line = re.sub(r'(\d+\.\d+)', lambda m: normalize_numeric(m.group(1)), line)
    
    # Then handle general normalization
    line = re.sub(r'\s+', ' ', line.strip())  # Collapse multiple whitespaces
    line = line.replace('; ', ';').replace(' ;', ';')  # Normalize semicolon spacing
    return line.lower()

def parse_file(filename):
    """Parse a file into sections and lines"""
    sections = defaultdict(list)
    current_section = None
    
    try:
        with open(filename, 'r') as f:
            for line in f:
                line = line.strip()
                if not line:
                    continue
                    
                # Detect section headers
                if line.startswith('# CMP'):
                    current_section = line
                    sections[current_section] = []
                elif current_section is not None:
                    normalized = normalize_line(line)
                    sections[current_section].append(normalized)
                else:
                    # Header lines before first section
                    sections['header'].append(normalize_line(line))
    except FileNotFoundError:
        print(f"Error: File '{filename}' not found.")
        exit(1)
    
    return sections

def compare_files(original_file, my_file):
    """Compare two files and report missing content"""
    original_sections = parse_file(original_file)
    my_sections = parse_file(my_file)
    
    missing_content = defaultdict(list)
    
    # Check header content
    for line in original_sections['header']:
        if line not in my_sections['header']:
            missing_content['header'].append(line)
    
    # Check each component section
    for section, original_lines in original_sections.items():
        if section == 'header':
            continue
            
        if section not in my_sections:
            missing_content[section] = original_lines
            continue
            
        my_lines = my_sections[section]
        
        # Check each line in the original section
        for o_line in original_lines:
            found = False
            for m_line in my_lines:
                # More flexible comparison for numeric lines
                if o_line == m_line:
                    found = True
                    break
                # Handle cases where only numeric precision differs
                if (o_line.split(';')[0] == m_line.split(';')[0] and 
                    o_line.split(';')[1:] == m_line.split(';')[1:]):
                    found = True
                    break
            
            if not found:
                missing_content[section].append(o_line)
    
    return missing_content

def print_missing_content(missing_content):
    """Print the missing content in a readable format"""
    if not missing_content:
        print("All content from the original file is present in your file!")
        return
        
    print("The following content from the original file is missing in your file:")
    print("=" * 80)
    
    for section, lines in missing_content.items():
        if section == 'header':
            print("\nMissing in header section:")
        else:
            print(f"\nMissing in {section}:")
        
        for line in lines:
            print(f"  - {line}")

if __name__ == "__main__":
    original_file = "components"     # Original file name
    my_file = "components.txt"       # Your file name
    
    print(f"Comparing original file '{original_file}' with your file '{my_file}'...\n")
    missing_content = compare_files(original_file, my_file)
    print_missing_content(missing_content)

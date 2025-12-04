#!/usr/bin/env python3
import sys

def extract_junctions(text):
    out = []
    i = 0
    L = len(text)
    while True:
        j = text.find('(junction', i)
        if j == -1:
            break
        depth = 0
        k = j
        matched = False
        while k < L:
            if text[k] == '(':
                depth += 1
            elif text[k] == ')':
                depth -= 1
                if depth == 0:
                    out.append(text[j:k+1])
                    i = k + 1
                    matched = True
                    break
            k += 1
        if not matched:
            # unmatched parentheses — stop to avoid infinite loop
            break
    return '\n\n'.join(out)

def main():
    if len(sys.argv) < 2:
        print("Usage: extract_junctions.py input_file [output_file]", file=sys.stderr)
        sys.exit(2)
    infile = sys.argv[1]
    outfile = sys.argv[2] if len(sys.argv) > 2 else 'junctions_extracted.txt'
    text = open(infile, 'r', encoding='utf-8').read()
    extracted = extract_junctions(text)
    open(outfile, 'w', encoding='utf-8').write(extracted)

if __name__ == '__main__':
    main()

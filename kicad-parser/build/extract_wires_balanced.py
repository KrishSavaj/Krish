#!/usr/bin/env python3
import sys, re
def find_matching_paren(s, start):
    depth = 0; in_str=False; esc=False; n=len(s)
    for i in range(start, n):
        ch=s[i]
        if in_str:
            if esc: esc=False
            elif ch=='\\': esc=True
            elif ch=='"': in_str=False
        else:
            if ch=='"': in_str=True
            elif ch=='(': depth+=1
            elif ch==')': depth-=1; 
            if depth==0: return i
    return -1
def extract_wires(text):
    i=0
    while True:
        idx=text.find('(wire', i)
        if idx==-1: break
        end=find_matching_paren(text, idx)
        if end==-1: break
        yield text[idx:end+1]
        i=end+1
if __name__=='__main__':
    if len(sys.argv)!=2:
        print("Usage: extract_wires_balanced.py file.kicad_sch", file=sys.stderr); sys.exit(1)
    t=open(sys.argv[1], 'r', encoding='utf-8', errors='replace').read()
    for w in extract_wires(t):
        one=re.sub(r'\s+', ' ', w.strip())
        print(one)

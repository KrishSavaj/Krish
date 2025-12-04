#!/usr/bin/env python3
# tools/sexpr_top_sort.py
"""
KiCad S-expression top-level sorter with pretty-printing and stable output.
Removes volatile tokens (UUID, tstamp, generator_version) and sorts nested children.
"""

import re
import sys
from collections import defaultdict

# --- Volatile token cleaning ---
UUID_RE = re.compile(r'[0-9a-fA-F]{8}(-[0-9a-fA-F]{4}){3}-[0-9a-fA-F]{12}')
VOLATILE_RE = re.compile(r'\(tstamp[^\)]*\)|\bgenerator_version\b[^\s\)]*', re.IGNORECASE)

def clean_preserve_newlines(s: str) -> str:
    """Remove UUIDs and volatile tokens but preserve line breaks and spacing."""
    s = s.replace('\r', ' ')
    s = UUID_RE.sub('<UUID>', s)
    s = VOLATILE_RE.sub('', s)
    lines = [re.sub(r'[ \t]+', ' ', l).rstrip() for l in s.splitlines()]
    return "\n".join(lines).strip()

# --- Normalization for diff/side-by-side ---
def normalize_input(text: str):
    if re.search(r'(?m)^---\s+\S+', text) and re.search(r'(?m)^\+\+\+\s+\S+', text):
        out_lines = []
        for line in text.splitlines():
            if line.startswith('---') or line.startswith('+++') or line.startswith('@@'):
                continue
            if not line:
                out_lines.append('')
                continue
            first = line[0]
            if first == '+':
                continue
            elif first in (' ', '-'):
                out_lines.append(line[1:])
            else:
                out_lines.append(line)
        return ("\n".join(out_lines), 'unified-diff')

    lines = text.splitlines()
    tab_count = sum(1 for L in lines if '\t' in L)
    angle_marker_count = sum(1 for L in lines if re.search(r'\s[<>]\s*$', L))
    pipe_count = sum(1 for L in lines if ' | ' in L)
    total = max(1, len(lines))
    if tab_count > 0 or angle_marker_count > 0 or pipe_count > 0:
        out_lines = []
        for L in lines:
            if '\t' in L:
                out_lines.append(L.split('\t', 1)[0].rstrip())
            elif ' | ' in L:
                out_lines.append(L.split(' | ', 1)[0].rstrip())
            elif re.search(r'\s[<>]\s*$', L):
                out_lines.append(re.sub(r'\s[<>]+\s*$', '', L).rstrip())
            else:
                out_lines.append(L)
        return ("\n".join(out_lines), 'side-by-side')

    return (text, 'none')

# --- Tokenizer / parser ---
def tokenize(s):
    tokens, i, n = [], 0, len(s)
    while i < n:
        c = s[i]
        if c.isspace():
            i += 1
        elif c in '()':
            tokens.append(c); i += 1
        elif c == '"':
            j, buf = i + 1, []
            while j < n:
                if s[j] == '"' and s[j-1] != '\\':
                    break
                buf.append(s[j]); j += 1
            tokens.append('"' + ''.join(buf) + '"')
            i = j + 1
        else:
            j = i
            while j < n and not s[j].isspace() and s[j] not in '()':
                j += 1
            tokens.append(s[i:j]); i = j
    return tokens

def parse(tokens, idx=0):
    out = []
    while idx < len(tokens):
        t = tokens[idx]
        if t == '(':
            lst, idx = parse(tokens, idx+1)
            out.append(lst)
        elif t == ')':
            return out, idx+1
        else:
            out.append(t)
            idx += 1
    return out, idx

def load_kicad_sch(text):
    tokens = tokenize(text)
    tree, idx = parse(tokens)
    if idx != len(tokens):
        print(f"[warning] tokenizer left {len(tokens)-idx} tokens unparsed", file=sys.stderr)
    return tree

# --- Helpers ---
def atom_str(a):
    if isinstance(a, str) and len(a) >= 2 and a[0] == '"' and a[-1] == '"':
        return a[1:-1]
    return a

def extract_top_level_nodes(tree):
    groups = defaultdict(list)
    for node in tree:
        if isinstance(node, list) and node:
            key = atom_str(node[0])
            groups[key].append(node)
    return groups

# --- Pretty printer ---
def pretty_sexpr(node, indent=0):
    ind = "  " * indent
    if isinstance(node, list):
        if not node:
            return ind + "()"
        def is_inline(n):
            if isinstance(n, list):
                return all(not isinstance(x, list) for x in n) and len(n) <= 6
            return True
        if all(is_inline(x) for x in node):
            def flatten(n):
                if isinstance(n, list):
                    return "(" + " ".join(flatten(x) for x in n) + ")"
                return str(n)
            return ind + flatten(node)
        parts = [ind + "(" + str(node[0])]
        for child in node[1:]:
            parts.append(pretty_sexpr(child, indent+1))
        return "\n".join(parts) + "\n" + ind + ")"
    else:
        return ind + str(node)

# --- Sort nested children for stable diff ---
def sort_nested_children(node):
    if isinstance(node, list):
        if all(isinstance(x, list) and x for x in node[1:]):
            node[1:] = sorted(node[1:], key=lambda x: str(x[0]))
        for child in node:
            sort_nested_children(child)

# --- Summary ---
def print_summary(groups):
    total = 0
    for typ in sorted(groups.keys()):
        count = len(groups[typ])
        total += count
        print(f"{typ}: {count}")
    print(f"TOTAL: {total}")

# --- Main ---
def main():
    if len(sys.argv) < 2:
        print("usage: sexpr_top_sort.py input-file > output", file=sys.stderr)
        sys.exit(1)

    raw = open(sys.argv[1], 'r', encoding='utf-8', errors='replace').read()
    raw = clean_preserve_newlines(raw)

    normalized, method = normalize_input(raw)
    if method != 'none':
        print(f"[info] input auto-normalized (method={method})", file=sys.stderr)

    tree = load_kicad_sch(normalized)
    sort_nested_children(tree)               # Sort recursively for stable diff
    groups = extract_top_level_nodes(tree)

    for typ in sorted(groups.keys()):
        nodes_sorted = sorted([pretty_sexpr(n) for n in groups[typ]])
        print(f"\n### {typ} ###")
        for n in nodes_sorted:
            print(n)

    print_summary(groups)

if __name__ == "__main__":
    main()

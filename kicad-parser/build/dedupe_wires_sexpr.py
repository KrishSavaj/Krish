#!/usr/bin/env python3
# dedupe_wires_sexpr.py
# Robustly removes duplicate (wire ...) top-level sexprs (or duplicates inside a single root list).
# Usage:
#   ./dedupe_wires_sexpr.py input.kicad_sch output.kicad_sch

import sys, re

def find_matching_paren(s, start):
    depth = 0
    in_str = False
    esc = False
    n = len(s)
    for i in range(start, n):
        ch = s[i]
        if in_str:
            if esc:
                esc = False
            elif ch == '\\\\':
                esc = True
            elif ch == '"':
                in_str = False
        else:
            if ch == '"':
                in_str = True
            elif ch == '(':
                depth += 1
            elif ch == ')':
                depth -= 1
                if depth == 0:
                    return i
    return -1

def split_top_level_entries(text):
    """Split *top-level* sexprs. If file is a single root list, return that single entry."""
    items = []
    i = 0
    n = len(text)
    while i < n:
        # find next '('
        while i < n and text[i].isspace():
            i += 1
        if i >= n:
            break
        if text[i] != '(':
            # skip any leading garbage (unlikely)
            i += 1
            continue
        j = find_matching_paren(text, i)
        if j == -1:
            items.append(text[i:].strip())
            break
        items.append(text[i:j+1].strip())
        i = j + 1
    return items

def split_children_of_root(root_text):
    """Given root_text like '(rootSymbol A B (child1 ...) (child2 ...) ...)'
       return tuple (root_symbol, list_of_child_sexprs_as_strings, other_atoms_before_children)
       other_atoms_before_children are atoms (numbers/symbols/strings) that appear between rootSymbol and first '('
    """
    assert root_text.startswith("(") and root_text.endswith(")")
    inner = root_text[1:-1].strip()
    # parse first token (root symbol)
    i = 0
    n = len(inner)
    # skip whitespace
    while i < n and inner[i].isspace(): i += 1
    # read root symbol/atom
    if i < n and inner[i] == '"':
        # string symbol
        j = i+1
        esc = False
        while j < n:
            if esc:
                esc = False
            elif inner[j] == '\\\\':
                esc = True
            elif inner[j] == '"':
                break
            j += 1
        root_sym = inner[i:j+1]
        j += 1
    else:
        j = i
        while j < n and not inner[j].isspace() and inner[j] != '(' and inner[j] != ')':
            j += 1
        root_sym = inner[i:j]
    # now from j to end, we may have atoms (to skip) and then child sexprs
    rest = inner[j:].lstrip()
    # skip any atoms before first '(' (these are header fields)
    k = 0
    header_atoms = []
    while k < len(rest) and rest[k].isspace(): k += 1
    # if header begins with an atom (not '('), consume atoms until we hit '('
    while k < len(rest) and rest[k] != '(':
        # consume one atom or string
        if rest[k].isspace():
            k += 1
            continue
        if rest[k] == '"':
            m = k+1
            esc=False
            while m < len(rest):
                if esc:
                    esc=False
                elif rest[m] == '\\\\':
                    esc=True
                elif rest[m] == '"':
                    break
                m+=1
            header_atoms.append(rest[k:m+1])
            k = m+1
        else:
            m = k
            while m < len(rest) and not rest[m].isspace() and rest[m] != '(' and rest[m] != ')':
                m += 1
            header_atoms.append(rest[k:m])
            k = m
        # skip spaces
        while k < len(rest) and rest[k].isspace(): k += 1

    # Starting at k, collect immediate child sexprs (depth-1 children)
    children = []
    pos = k
    while pos < len(rest):
        # find next '('
        while pos < len(rest) and rest[pos].isspace():
            pos += 1
        if pos >= len(rest):
            break
        if rest[pos] != '(':
            # stray atom: capture as single token until next whitespace
            m = pos
            while m < len(rest) and not rest[m].isspace():
                m += 1
            children.append(rest[pos:m])
            pos = m
            continue
        # rest[pos] == '('
        global_index = pos  # index inside rest substring
        j = find_matching_paren(rest, pos)
        if j == -1:
            children.append(rest[pos:].strip())
            break
        children.append(rest[pos:j+1].strip())
        pos = j + 1
    return root_sym, header_atoms, children

def normalize_pts_in_sexpr(sexpr_text):
    # find the (pts ... ) part
    m = re.search(r'\(pts\b([^)]*\))', sexpr_text, flags=re.S)
    if not m:
        return None
    body = m.group(1)
    nums = re.findall(r'[-+]?\d*\.\d+|\d+', body)
    try:
        norm = ",".join("{:.3f}".format(float(x)) for x in nums)
    except:
        norm = ",".join(nums)
    return norm

def dedupe_children(children):
    seen = set()
    out = []
    total_wires = 0
    kept_wires = 0
    total_junc = 0
    kept_junc = 0
    for c in children:
        tag = c.strip().lstrip('(').split(None,1)[0] if c.strip().startswith('(') else None
        if tag == 'wire':
            total_wires += 1
            key = normalize_pts_in_sexpr(c)
            if key is None:
                key = re.sub(r'\s+',' ', c.strip())
            if key in seen:
                continue
            seen.add(key)
            kept_wires += 1
            out.append(c)
        elif tag == 'junction':
            total_junc += 1
            # simple dedupe by exact text for junctions (usually small)
            key = re.sub(r'\s+',' ', c.strip())
            if key in seen:
                continue
            seen.add(key)
            kept_junc += 1
            out.append(c)
        else:
            out.append(c)
    return out, total_wires, kept_wires, total_junc, kept_junc

def main():
    if len(sys.argv) != 3:
        print("Usage: dedupe_wires_sexpr.py input.kicad_sch output.kicad_sch")
        sys.exit(2)
    inp = sys.argv[1]; outp = sys.argv[2]
    text = open(inp, encoding='utf-8', errors='replace').read()
    entries = split_top_level_entries(text)

    # If file is a single root list, split its children and operate inside it.
    output_text = None
    if len(entries) == 1 and entries[0].startswith('('):
        root = entries[0]
        root_sym, header_atoms, children = split_children_of_root(root)
        deduped_children, tw, kw, tj, kj = dedupe_children(children)
        # Reconstruct root list: (root_sym header_atoms... <children...>)
        inner_parts = []
        if header_atoms:
            inner_parts.extend(header_atoms)
        inner_parts.extend(deduped_children)
        inner_joined = " ".join(part for part in inner_parts if part)
        output_text = "(" + root_sym + (" " + inner_joined if inner_joined else "") + ")"
        total_top = 1
    else:
        # many top-level entries; process each separately
        kept = []
        tw = kw = tj = kj = 0
        for e in entries:
            if e.strip().startswith('(kicad_sch') or e.strip().startswith('(kicad_pcb'):
                # treat root-like similarly: split its children
                root_sym, header_atoms, children = split_children_of_root(e)
                deduped_children, ttw, kkw, ttj, kkj = dedupe_children(children)
                tw += ttw; kw += kkw; tj += ttj; kj += kkj
                inner_parts = []
                if header_atoms:
                    inner_parts.extend(header_atoms)
                inner_parts.extend(deduped_children)
                inner_joined = " ".join(part for part in inner_parts if part)
                kept.append("(" + root_sym + (" " + inner_joined if inner_joined else "") + ")")
            else:
                # single top-level sexpr: if it's a wire or junction, apply normalization
                tag = e.strip().lstrip('(').split(None,1)[0] if e.strip().startswith('(') else None
                if tag == 'wire':
                    tw += 1
                    key = normalize_pts_in_sexpr(e)
                    if key is None:
                        key = re.sub(r'\s+',' ', e.strip())
                    # use a small seen-per-file set to dedupe wires across file
                    # we'll collect globally below
                    kept.append(e)
                elif tag == 'junction':
                    tj += 1
                    kept.append(e)
                else:
                    kept.append(e)
        # Global dedupe across kept entries (for wires/junctions)
        # We'll reuse dedupe_children logic by calling it on kept but that expects children as strings
        deduped_all, total_wires, kept_wires, total_junc, kept_junc = dedupe_children(kept)
        output_text = "\n\n".join(deduped_all)
        # make sure tw/kw reflect final counts
        tw = total_wires; kw = kept_wires; tj = total_junc; kj = kept_junc
        total_top = len(entries)

    with open(outp, 'w', encoding='utf-8') as f:
        f.write(output_text + "\n")

    print(f"Total top-level entries scanned: {total_top}")
    print(f"Total wires encountered: {tw}, wires kept (unique by pts): {kw}")
    print(f"Total junctions encountered: {tj}, junctions kept: {kj}")
    print(f"Output written to {outp}")

if __name__ == '__main__':
    main()

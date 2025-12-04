#!/usr/bin/env python3
"""
Relaxed ODB-like file comparator

Usage:
  python relaxed_diff.py --orig path/to/original.txt --mine path/to/mine.txt [--tol 1e-6]

What it does:
- Ignores pure comment lines starting with '#' (after leading whitespace).
- Ignores all whitespace differences and line breaks entirely.
- Tokenizes both files into identifiers and numbers, dropping punctuation (e.g., '=', ';', '::', ';;').
- Compares numbers at a relaxed *float* precision by rounding to a tolerance (default 1e-6).
- Verifies that every token (with multiplicity) from the original file exists in your file.
  (Order is ignored; this is a multiset subset check.)
- Prints a clear report and the *entire* list of missing/extra tokens.
"""

import argparse
import math
import re
from collections import Counter
from typing import List

NUM_TOKENIZER = re.compile(r"[+-]?(?:\d+\.\d*|\.\d+|\d+)(?:[eE][+-]?\d+)?")
ID_TOKENIZER = re.compile(r"[A-Za-z_+$][A-Za-z0-9_+$]*")

def is_comment(line: str) -> bool:
    s = line.lstrip()
    return s.startswith("#")

def normalize_number_token(tok: str, tol: float) -> str:
    try:
        val = float(tok)
    except ValueError:
        return tok
    if math.isfinite(val):
        if tol <= 0:
            out = f"{val:.12g}"
        else:
            decimals = max(0, int(math.ceil(-math.log10(tol))))
            out = f"{round(val, decimals):.{decimals}f}"
            if "." in out:
                out = out.rstrip("0").rstrip(".")
            if out == "-0":
                out = "0"
    else:
        out = str(val)
    return out

def tokenize(text: str, tol: float) -> Counter:
    tokens: List[str] = []
    for raw_line in text.splitlines():
        if is_comment(raw_line):
            continue
        line = raw_line.strip()
        if not line:
            continue
        idx = 0
        n = len(line)
        while idx < n:
            m_num = NUM_TOKENIZER.match(line, idx)
            if m_num:
                tokens.append(normalize_number_token(m_num.group(0), tol))
                idx = m_num.end()
                continue
            m_id = ID_TOKENIZER.match(line, idx)
            if m_id:
                tokens.append(m_id.group(0))
                idx = m_id.end()
                continue
            idx += 1
    return Counter(tokens)

def multiset_is_subset(small: Counter, big: Counter) -> bool:
    for k, v in small.items():
        if big[k] < v:
            return False
    return True

def main():
    ap = argparse.ArgumentParser(
        description="Relaxed diff for ODB-like text files (whitespace-insensitive, linebreak-insensitive, float-tolerant)."
    )
    ap.add_argument("--orig", required=True, help="Path to the original/reference file")
    ap.add_argument("--mine", required=True, help="Path to your generated file to check")
    ap.add_argument("--tol", type=float, default=1e-6, help="Numeric tolerance (default: 1e-6).")
    args = ap.parse_args()

    with open(args.orig, "r", encoding="utf-8", errors="replace") as f:
        orig_text = f.read()
    with open(args.mine, "r", encoding="utf-8", errors="replace") as f:
        mine_text = f.read()

    orig_tokens = tokenize(orig_text, args.tol)
    mine_tokens = tokenize(mine_text, args.tol)

    ok = multiset_is_subset(orig_tokens, mine_tokens)

    missing = Counter()
    extras = Counter()

    for k, v in orig_tokens.items():
        if mine_tokens[k] < v:
            missing[k] = v - mine_tokens[k]
    for k, v in mine_tokens.items():
        if v > orig_tokens[k]:
            extras[k] = v - orig_tokens[k]

    if ok:
        print("✅ PASS: Your file contains all data from the original (under relaxed comparison).")
    else:
        print("❌ FAIL: Your file is missing some data from the original (under relaxed comparison).")

    total_orig = sum(orig_tokens.values())
    total_mine = sum(mine_tokens.values())
    print(f"\nToken counts (after normalization):")
    print(f"  Original: {total_orig} tokens | distinct: {len(orig_tokens)}")
    print(f"  Yours   : {total_mine} tokens | distinct: {len(mine_tokens)}")
    print(f"  Tolerance used for numbers: {args.tol}\n")

    if missing:
        print("Missing tokens (need at least these counts):")
        for tok, cnt in missing.most_common():
            print(f"  {tok!r}  × {cnt}")
    else:
        print("No missing tokens detected.")

    if extras:
        print("\nExtra tokens in your file (beyond original):")
        for tok, cnt in extras.most_common():
            print(f"  {tok!r}  × {cnt}")
    else:
        print("\nNo extra tokens detected beyond the original.")

    raise SystemExit(0 if ok else 2)

if __name__ == "__main__":
    main()
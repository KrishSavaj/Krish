def load_normalized_kv(file_path):
    kv = {}
    with open(file_path, 'r') as f:
        for line in f:
            line = line.strip()
            if not line or '=' not in line:
                continue
            key, value = map(str.strip, line.split('=', 1))
            kv[key] = value
    return kv

file1 = 'attr_list.txt'
file2 = 'attrlist.txt'

kv1 = load_normalized_kv(file1)
kv2 = load_normalized_kv(file2)

if kv1 == kv2:
    print("✅ Files are logically identical (same keys and values).")
else:
    print("❌ Files differ logically.")
    keys1 = set(kv1.keys())
    keys2 = set(kv2.keys())
    only_in_1 = keys1 - keys2
    only_in_2 = keys2 - keys1
    common = keys1 & keys2
    diff_vals = [k for k in common if kv1[k] != kv2[k]]

    if only_in_1:
        print(f"Only in file1: {only_in_1}")
    if only_in_2:
        print(f"Only in file2: {only_in_2}")
    if diff_vals:
        print("Different values:")
        for k in diff_vals:
            print(f"  {k}: file1='{kv1[k]}', file2='{kv2[k]}'")


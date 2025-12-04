#!/bin/bash
# save this as check_kicad_diff.sh and chmod +x

fixed="$1"
normalized="$2"

diffs=0

for type in symbols wires junctions; do
    grep_pattern=""
    case $type in
        symbols) grep_pattern='symbol [^ ]+' ;;
        wires)   grep_pattern='\(wire.*?\)' ;;
        junctions) grep_pattern='\(junction.*?\)' ;;
    esac

    grep -oP "$grep_pattern" "$fixed"  > fixed_$type.txt
    grep -oP "$grep_pattern" "$normalized" > normalized_$type.txt

    if ! diff fixed_$type.txt normalized_$type.txt >/dev/null; then
        echo "❌ Difference found in $type"
        diffs=$((diffs+1))
    fi
done

if [ $diffs -eq 0 ]; then
    echo "✅ Everything parsed correctly: symbols, wires, junctions match!"
else
    echo "⚠️ Some differences detected. Check the diff files."
fi

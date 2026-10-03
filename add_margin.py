with open('script.js', 'r', encoding='utf-8') as f:
    lines = f.readlines()

for i, line in enumerate(lines):
    if "block.className = 'question-block';" in line:
        lines.insert(i+1, "        if (currentQ > 0) { block.style.marginTop = '150vh'; }\n")
        break

with open('script.js', 'w', encoding='utf-8') as f:
    f.writelines(lines)

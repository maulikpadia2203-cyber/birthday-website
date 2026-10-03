with open('script.js', 'r', encoding='utf-8') as f:
    js = f.read()

old = "        const block = document.createElement('div');\n        block.className = 'question-block';"
new = "        const block = document.createElement('div');\n        block.className = 'question-block';\n        if (currentQ > 0) block.style.marginTop = '100vh';"

js = js.replace(old, new)

with open('script.js', 'w', encoding='utf-8') as f:
    f.write(js)

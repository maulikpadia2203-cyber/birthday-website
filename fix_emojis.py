with open('index.html', 'r', encoding='utf-8') as f:
    html = f.read()

# Fix emoji corruption
html = html.replace('<div class="bow">??</div>', '<div class="bow">🎀</div>')
html = html.replace('<p class="click-to-open">Tap to Open ??</p>', '<p class="click-to-open">Tap to Open 💝</p>')

with open('index.html', 'w', encoding='utf-8') as f:
    f.write(html)

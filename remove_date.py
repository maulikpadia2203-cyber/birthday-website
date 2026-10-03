import re

with open('script.js', 'r', encoding='utf-8') as f:
    content = f.read()

content = re.sub(r'<p class="note-date">\$\{item\.date\}</p>\s*', '', content)

with open('script.js', 'w', encoding='utf-8') as f:
    f.write(content)

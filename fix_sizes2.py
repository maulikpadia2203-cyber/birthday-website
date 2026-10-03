import re

with open('script.js', 'r', encoding='utf-8') as f:
    js = f.read()

# Update sizes for larger outer items and center item
old_sizing = '''                    let radius = gallerySize * 0.45;
                    let itemSize = Math.max(60, gallerySize * 0.15); // Bigger small photos
                    let centerSize = gallerySize * 0.45; // Bigger center photo'''

new_sizing = '''                    let radius = gallerySize * 0.43;
                    let itemSize = Math.max(85, gallerySize * 0.18); // Much bigger outer photos
                    let centerSize = gallerySize * 0.55; // Much bigger center photo'''

js = js.replace(old_sizing, new_sizing)

with open('script.js', 'w', encoding='utf-8') as f:
    f.write(js)

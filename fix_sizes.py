import re

with open('script.js', 'r', encoding='utf-8') as f:
    js = f.read()

# Update sizes and remove the background
old_sizing = '''                    // Calculate massive size for pure page takeover
                    let vw = window.innerWidth;
                    let vh = window.innerHeight;
                    let gallerySize = Math.min(vw, vh) * 0.85; // 85% of screen
                    if (gallerySize > 700) gallerySize = 700; // Cap at 700px
                    
                    let radius = gallerySize * 0.45;
                    let itemSize = Math.max(40, gallerySize * 0.12);
                    let centerSize = gallerySize * 0.45;'''

new_sizing = '''                    // Calculate massive size for pure page takeover
                    let vw = window.innerWidth;
                    let vh = window.innerHeight;
                    let gallerySize = Math.min(vw * 0.95, vh * 0.95); 
                    if (gallerySize > 1000) gallerySize = 1000; // Let it be huge on desktop
                    
                    let radius = gallerySize * 0.45;
                    let itemSize = Math.max(60, gallerySize * 0.15); // Bigger small photos
                    let centerSize = gallerySize * 0.45; // Bigger center photo'''

js = js.replace(old_sizing, new_sizing)

# Remove the blue background band
old_bg = 'block.style.background = "radial-gradient(circle, rgba(10, 15, 36, 0.8) 0%, transparent 80%)";'
new_bg = 'block.style.background = "transparent"; block.style.boxShadow = "none";'

js = js.replace(old_bg, new_bg)

with open('script.js', 'w', encoding='utf-8') as f:
    f.write(js)

import re

with open('script.js', 'r', encoding='utf-8') as f:
    js = f.read()

# Replace HTML for arrows and next button
old_html = '''                        <div class="orbit-gallery" style="width:${gallerySize}px; height:${gallerySize}px;">
                            <div class="orbit-ring" id="orbit-ring-${currentQ}">
                                ${ringHtml}
                            </div>
                            <div class="orbit-center" style="width:${centerSize}px; height:${centerSize}px;">
                                <img src="${images[gIndex]}" id="orbit-main-${currentQ}">
                            </div>
                        </div>
                        <div class="carousel-controls mt-5" style="gap:30px;">
                            <button class="carousel-btn prev-photo" style="font-size:1.5rem; padding: 10px 30px;">⬅️</button>
                            <button class="carousel-btn next-photo" style="font-size:1.5rem; padding: 10px 30px;">➡️</button>
                        </div>
                        <button class="btn-primary mt-5 new-next-btn" style="background: var(--rose); font-size: 1.2rem;">Aage Badho ➡️</button>'''

new_html = '''                        <div class="orbit-gallery" style="width:${gallerySize}px; height:${gallerySize}px;">
                            <div class="orbit-ring" id="orbit-ring-${currentQ}">
                                ${ringHtml}
                            </div>
                            <div class="orbit-center" style="width:${centerSize}px; height:${centerSize}px;">
                                <img src="${images[gIndex]}" id="orbit-main-${currentQ}">
                            </div>
                            <button class="carousel-btn prev-photo">&#10094;</button>
                            <button class="carousel-btn next-photo">&#10095;</button>
                        </div>
                        <button class="btn-primary mt-5 new-next-btn" style="background: var(--rose); font-size: 1.2rem;">Next ➡️</button>'''

js = js.replace(old_html, new_html)

# Also fix the fallback 'Aage Badho' button if needed in other parts of the script
js = js.replace('Aage Badho ➡️', 'Next ➡️')

with open('script.js', 'w', encoding='utf-8') as f:
    f.write(js)

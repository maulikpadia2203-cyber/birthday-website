import re

with open('index.html', 'r', encoding='utf-8') as f:
    content = f.read()

new_html = '''            <p id="hero-subtitle" class="hidden-text story-text mt-3" style="font-size: 1.8rem; text-shadow: 0 2px 4px rgba(0,0,0,0.8);">Happy Birthday bachaaaaaaaaaa 🧚🐥🐥</p>
            <p id="hero-message" class="hero-long-message mt-3" data-text="Happy birthday, bachaaaaaaa 🐥🫂🫂 May my Mahadev always bless youuu tara life ni harek wise puri thaii thay 🤞and thank you bachaaaa🐥🪿 mari life ma aava mate me mari mari life na a move ment tari jode jivya che mara sapna hataaa hun manu chu ki mari bhulo thay che but tu sache ek gift che mari life ma hala ki mari pase hal kaii nathi but tu che ne mari jodeee aavu feel thay che ne wahhhh ek god gift aaapi che bhagvan am lage che 🫂👥❤️🌹🌎🥭🦢💋💕💕👥"></p>'''

content = re.sub(r'<p id="hero-subtitle".*?</p>', new_html, content, flags=re.DOTALL)

with open('index.html', 'w', encoding='utf-8') as f:
    f.write(content)

import re

with open('script.js', 'r', encoding='utf-8') as f:
    content = f.read()

old_logic = '''                if (qData.successImages && qData.successImages.length > 0) {
                    gallery.innerHTML = qData.successImages.map(img => `<img src="${img}">`).join('');
                    gallery.style.display = 'grid';
                }'''

new_logic = '''                if (qData.successImages && qData.successImages.length > 0) {
                    let numItems = qData.successImages.length;
                    let theta = 360 / numItems;
                    let radius = Math.round((220 / 2) / Math.tan(Math.PI / numItems)); 
                    
                    let html = `<div class="carousel-scene">
                        <div class="carousel-spin" id="spin-${currentQ}">`;
                    
                    qData.successImages.forEach((img, i) => {
                        let angle = theta * i;
                        html += `<img src="${img}" class="carousel-item" style="transform: rotateY(${angle}deg) translateZ(${radius}px);">`;
                    });
                    
                    html += `</div></div>
                        <div class="carousel-controls">
                            <button class="carousel-btn prev-photo">⬅️ Peeche</button>
                            <button class="carousel-btn next-photo">Aage ➡️</button>
                        </div>`;
                        
                    gallery.innerHTML = html;
                    gallery.style.display = 'block';
                    
                    let currentAngle = 0;
                    let spinEl = gallery.querySelector('.carousel-spin');
                    
                    gallery.querySelector('.prev-photo').addEventListener('click', () => {
                        currentAngle += theta;
                        spinEl.style.transform = `rotateY(${currentAngle}deg)`;
                    });
                    
                    gallery.querySelector('.next-photo').addEventListener('click', () => {
                        currentAngle -= theta;
                        spinEl.style.transform = `rotateY(${currentAngle}deg)`;
                    });
                }'''

content = content.replace(old_logic, new_logic)

with open('script.js', 'w', encoding='utf-8') as f:
    f.write(content)

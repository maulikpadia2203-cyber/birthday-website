import re

with open('style.css', 'r', encoding='utf-8') as f:
    css = f.read()

# Remove the old 3D carousel CSS completely
css = re.sub(r'/\* 3D Carousel Gallery \*/.*?(?=\z|\n\n\n)', '', css, flags=re.DOTALL)

# Add new clean circular gallery CSS
new_css = '''
/* Circular Slider Gallery */
.circle-gallery-container {
    width: 250px;
    height: 250px;
    margin: 30px auto;
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
}

.circle-photo {
    width: 100%;
    height: 100%;
    border-radius: 50%;
    object-fit: cover;
    border: 4px solid var(--starlight);
    box-shadow: 0 0 25px rgba(245, 230, 184, 0.4);
    transition: transform 0.4s cubic-bezier(0.2, 0.8, 0.2, 1), opacity 0.4s ease;
    position: absolute;
    opacity: 0;
    transform: scale(0.5); /* Start small */
}

.circle-photo.active {
    opacity: 1;
    transform: scale(1); /* Zoomed in */
}

.carousel-controls {
    display: flex;
    justify-content: center;
    gap: 20px;
    margin-top: 15px;
    margin-bottom: 15px;
}

.carousel-btn {
    background: rgba(255, 255, 255, 0.1);
    border: 2px solid var(--starlight);
    color: var(--starlight);
    padding: 8px 20px;
    border-radius: 30px;
    font-size: 1.2rem;
    cursor: pointer;
    transition: all 0.3s;
}

.carousel-btn:hover {
    background: var(--starlight);
    color: var(--ink);
}
'''
css = css + new_css

with open('style.css', 'w', encoding='utf-8') as f:
    f.write(css)

# Update JS logic
with open('script.js', 'r', encoding='utf-8') as f:
    js = f.read()

old_logic = '''                if (qData.successImages && qData.successImages.length > 0) {
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

new_logic = '''                if (qData.successImages && qData.successImages.length > 0) {
                    let images = qData.successImages;
                    let gIndex = 0;
                    
                    let html = `
                        <div class="circle-gallery-container">
                            <img src="${images[gIndex]}" class="circle-photo active" id="gallery-photo-${currentQ}">
                        </div>
                        <div class="carousel-controls">
                            <button class="carousel-btn prev-photo">⬅️</button>
                            <button class="carousel-btn next-photo">➡️</button>
                        </div>
                    `;
                        
                    gallery.innerHTML = html;
                    gallery.style.display = 'block';
                    
                    let photoEl = gallery.querySelector(`#gallery-photo-${currentQ}`);
                    
                    function updatePhoto() {
                        photoEl.classList.remove('active');
                        setTimeout(() => {
                            photoEl.src = images[gIndex];
                            photoEl.classList.add('active');
                        }, 400); // wait for fade out
                    }

                    gallery.querySelector('.prev-photo').addEventListener('click', () => {
                        gIndex = (gIndex - 1 + images.length) % images.length;
                        updatePhoto();
                    });
                    
                    gallery.querySelector('.next-photo').addEventListener('click', () => {
                        gIndex = (gIndex + 1) % images.length;
                        updatePhoto();
                    });
                }'''

js = js.replace(old_logic, new_logic)

with open('script.js', 'w', encoding='utf-8') as f:
    f.write(js)

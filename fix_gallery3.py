with open('script.js', 'r', encoding='utf-8') as f:
    js = f.read()

old_logic = '''                if (qData.successImages && qData.successImages.length > 0) {
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

new_logic = '''                if (qData.successImages && qData.successImages.length > 0) {
                    let images = qData.successImages;
                    let gIndex = 0;
                    let radius = 135; // orbit radius
                    
                    let ringHtml = '';
                    images.forEach((img, i) => {
                        // Math for circle placement
                        let angle = (i * 30) * (Math.PI / 180);
                        let x = Math.cos(angle) * radius;
                        let y = Math.sin(angle) * radius;
                        ringHtml += `<div class="orbit-item" id="orbit-item-${currentQ}-${i}" style="transform: translate(${x}px, ${y}px) rotate(0deg);">
                                        <img src="${img}">
                                     </div>`;
                    });
                    
                    let html = `
                        <div class="orbit-gallery">
                            <div class="orbit-ring" id="orbit-ring-${currentQ}">
                                ${ringHtml}
                            </div>
                            <div class="orbit-center">
                                <img src="${images[gIndex]}" id="orbit-main-${currentQ}">
                            </div>
                        </div>
                        <div class="carousel-controls">
                            <button class="carousel-btn prev-photo">⬅️</button>
                            <button class="carousel-btn next-photo">➡️</button>
                        </div>
                    `;
                        
                    gallery.innerHTML = html;
                    gallery.style.display = 'block';
                    
                    let ringEl = gallery.querySelector(`#orbit-ring-${currentQ}`);
                    let mainEl = gallery.querySelector(`#orbit-main-${currentQ}`);
                    
                    function updateOrbit() {
                        let rotation = -(gIndex * 30);
                        ringEl.style.transform = `rotate(${rotation}deg)`;
                        
                        // Counter rotate items to stay upright
                        images.forEach((img, i) => {
                            let itemEl = gallery.querySelector(`#orbit-item-${currentQ}-${i}`);
                            let angle = (i * 30) * (Math.PI / 180);
                            let x = Math.cos(angle) * radius;
                            let y = Math.sin(angle) * radius;
                            itemEl.style.transform = `translate(${x}px, ${y}px) rotate(${-rotation}deg)`;
                            
                            if (i === gIndex) {
                                itemEl.style.borderColor = 'var(--rose)';
                                itemEl.style.boxShadow = '0 0 15px var(--rose)';
                            } else {
                                itemEl.style.borderColor = '#fff';
                                itemEl.style.boxShadow = '0 4px 10px rgba(0,0,0,0.5)';
                            }
                        });
                        
                        // Zoom center photo
                        mainEl.style.opacity = 0;
                        mainEl.style.transform = 'scale(0.5)';
                        setTimeout(() => {
                            mainEl.src = images[gIndex];
                            mainEl.style.opacity = 1;
                            mainEl.style.transform = 'scale(1)';
                        }, 300);
                    }
                    
                    updateOrbit(); // Initial call

                    gallery.querySelector('.prev-photo').addEventListener('click', () => {
                        gIndex = (gIndex - 1 + images.length) % images.length;
                        updateOrbit();
                    });
                    
                    gallery.querySelector('.next-photo').addEventListener('click', () => {
                        gIndex = (gIndex + 1) % images.length;
                        updateOrbit();
                    });
                }'''

js = js.replace(old_logic, new_logic)

with open('script.js', 'w', encoding='utf-8') as f:
    f.write(js)

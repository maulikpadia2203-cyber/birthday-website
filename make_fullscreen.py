import re

with open('script.js', 'r', encoding='utf-8') as f:
    js = f.read()

# We need to replace the entire `if (isCorrect) { ... }` block inside submitBtn click listener
# Let's target the exact segment.

old_logic = '''            if (isCorrect) {
                feedback.textContent = qData.successMsg;
                feedback.classList.add('success');
                submitBtn.style.display = 'none';
                
                // Hide the question and options so gallery takes full focus
                let qTitle = block.querySelector('h2');
                if (qTitle) qTitle.style.display = 'none';
                
                let qProgress = block.querySelector('.quiz-progress');
                if (qProgress) qProgress.style.display = 'none';
                
                let optionsDiv = block.querySelector('.options-container') || block.querySelector('.image-options') || block.querySelector('.input-group');
                if (optionsDiv) optionsDiv.style.display = 'none';

                createShootingStar();
                createShootingStar();
                
                if (qData.successImages && qData.successImages.length > 0) {
                    let images = qData.successImages;
                    let gIndex = 0;
                    let radius = 150; // orbit radius
                    
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
                }
                nextBtn.style.display = 'inline-block';
            } else {'''

new_logic = '''            if (isCorrect) {
                createShootingStar();
                createShootingStar();
                
                if (qData.successImages && qData.successImages.length > 0) {
                    let images = qData.successImages;
                    let gIndex = 0;
                    
                    // Calculate massive size for pure page takeover
                    let vw = window.innerWidth;
                    let vh = window.innerHeight;
                    let gallerySize = Math.min(vw, vh) * 0.85; // 85% of screen
                    if (gallerySize > 700) gallerySize = 700; // Cap at 700px
                    
                    let radius = gallerySize * 0.45;
                    let itemSize = Math.max(40, gallerySize * 0.12);
                    let centerSize = gallerySize * 0.45;
                    
                    let ringHtml = '';
                    images.forEach((img, i) => {
                        let angle = (i * 30) * (Math.PI / 180);
                        let x = Math.cos(angle) * radius;
                        let y = Math.sin(angle) * radius;
                        ringHtml += `<div class="orbit-item" id="orbit-item-${currentQ}-${i}" 
                                          style="width:${itemSize}px; height:${itemSize}px; margin-top:-${itemSize/2}px; margin-left:-${itemSize/2}px; transform: translate(${x}px, ${y}px) rotate(0deg);">
                                        <img src="${img}">
                                     </div>`;
                    });
                    
                    // Completely replace the block to remove the dark box!
                    block.className = ""; // Remove .question-block
                    block.style.width = "100vw";
                    block.style.position = "relative";
                    block.style.left = "50%";
                    block.style.transform = "translateX(-50%)";
                    block.style.padding = "50px 0";
                    block.style.display = "flex";
                    block.style.flexDirection = "column";
                    block.style.alignItems = "center";
                    block.style.background = "radial-gradient(circle, rgba(10, 15, 36, 0.8) 0%, transparent 80%)";

                    block.innerHTML = `
                        <h2 class="glow-text mb-5 text-center" style="font-size: 2.5rem;">${qData.successMsg}</h2>
                        <div class="orbit-gallery" style="width:${gallerySize}px; height:${gallerySize}px;">
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
                        <button class="btn-primary mt-5 new-next-btn" style="background: var(--rose); font-size: 1.2rem;">Aage Badho ➡️</button>
                    `;
                    
                    let ringEl = block.querySelector(`#orbit-ring-${currentQ}`);
                    let mainEl = block.querySelector(`#orbit-main-${currentQ}`);
                    
                    function updateOrbit() {
                        let rotation = -(gIndex * 30);
                        ringEl.style.transform = `rotate(${rotation}deg)`;
                        
                        images.forEach((img, i) => {
                            let itemEl = block.querySelector(`#orbit-item-${currentQ}-${i}`);
                            let angle = (i * 30) * (Math.PI / 180);
                            let x = Math.cos(angle) * radius;
                            let y = Math.sin(angle) * radius;
                            itemEl.style.transform = `translate(${x}px, ${y}px) rotate(${-rotation}deg)`;
                            
                            if (i === gIndex) {
                                itemEl.style.borderColor = 'var(--rose)';
                                itemEl.style.boxShadow = '0 0 15px var(--rose)';
                                itemEl.style.transform += ' scale(1.2)';
                            } else {
                                itemEl.style.borderColor = '#fff';
                                itemEl.style.boxShadow = '0 4px 10px rgba(0,0,0,0.5)';
                            }
                        });
                        
                        mainEl.style.opacity = 0;
                        mainEl.style.transform = 'scale(0.5)';
                        setTimeout(() => {
                            mainEl.src = images[gIndex];
                            mainEl.style.opacity = 1;
                            mainEl.style.transform = 'scale(1)';
                        }, 300);
                    }
                    
                    updateOrbit();

                    block.querySelector('.prev-photo').addEventListener('click', () => {
                        gIndex = (gIndex - 1 + images.length) % images.length;
                        updateOrbit();
                    });
                    
                    block.querySelector('.next-photo').addEventListener('click', () => {
                        gIndex = (gIndex + 1) % images.length;
                        updateOrbit();
                    });

                    // Re-bind the next question button
                    block.querySelector('.new-next-btn').addEventListener('click', () => {
                        block.querySelector('.new-next-btn').style.display = 'none';
                        currentQ++;
                        renderQuestion();
                    });
                    
                } else {
                    // Fallback if no images
                    feedback.textContent = qData.successMsg;
                    feedback.classList.add('success');
                    submitBtn.style.display = 'none';
                    nextBtn.style.display = 'inline-block';
                }
            } else {'''

js = js.replace(old_logic, new_logic)

with open('script.js', 'w', encoding='utf-8') as f:
    f.write(js)

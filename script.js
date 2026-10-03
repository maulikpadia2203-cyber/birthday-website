/**
 * SLIDE 1 CONFIGURATION
 * Yahan aap apni saari details, photos, aur sawal aaram se edit kar sakte hain.
 */
const CONFIG = {
    naam: "Betuu",
    heroImage: "hamari_photo.jpeg",
    photos: [
        { src: "images/p1.jpg", date: "12 Dec 2023", note: "Mari cuteeeee sache bauu cute lage cheeee bachaaa aama bhale me aane chidava game te kidhu hoyyy butt dhinglu che marruuuuu 🥹😘😘☺️" },
        { src: "images/p2.jpg", date: "25 Jan 2024", note: "Bacha tane tara 22 year pura thaya pan tu sache j haji bi aavi j cute lage che ☺️😊 sachu kauu to kyare k to mane am thay che ke tu sache j mari bachuu 🐥(i love you bachaaaa🥹)" },
        { src: "images/p3.jpg", date: "14 Feb 2024", note: "Aama to mari radha etli pyari pyari lage che ne sache jo tari smile ayyyyyyy hyyyyyyy 😌 joi ne khushi thay che mane to joii ne aavu j feel thayu jane mari j rah naii joti m j lage che hmana maro kano aavse 🤣" },
        { src: "images/p4.jpg", date: "10 Mar 2024", note: "i feel ki tu nan pan thi j mane joii gaii haiis ne tane khabar padi gaii che ke aane mare  sidho karvo padse atle jo kevuu kamre hath rakhi ne ready che ke mane to su naii sidho dor kari daiss sache mane bauuj game ki hun maru dhyan naii rakhu netyare mane khijaii ne bolee bauu cuteeeee lage che bachaaaa😎😊" },
        { src: "images/p5.jpg", date: "05 Apr 2024", note: "Namaste namaste pele thi j election ma javu che ke su taree mane keje mara ma bhi raj yog bane che to bane jode rajniti ma aavsuuu 🤭🤭🤭🤭🤭🤭" }
    ],
    quiz: [
        {
            type: "multiple-choice",
            question: "Aapde jyare first time photo padayo tyare su thayu tuu ??",
            options: [
                { text: "Hun sutoto ne mane laii gaii", id: "a" },
                { text: "Mari eacha noti ne mane laii gaii", id: "b" },
                { text: "Hun same thi aato to", id: "c" }
            ],
            correctAnswers: ["a", "b"],
            hint: "Dhyan se socho, dono baatein hui thi! ;-)",
            successMsg: "Bilkul Sahi! ?",
            successImages: ['images/q1_photos/1.jpg','images/q1_photos/2.jpg','images/q1_photos/3.jpg','images/q1_photos/4.jpg','images/q1_photos/5.jpg','images/q1_photos/6.jpg','images/q1_photos/7.jpg','images/q1_photos/8.jpg','images/q1_photos/9.jpg','images/q1_photos/10.jpg','images/q1_photos/11.jpg','images/q1_photos/12.jpg']
        },
        {
            type: "image-choice",
            question: "Maro aapda jode no sauuthi favorite photo kato che ??",
            images: [
                { src: "images/q2_opt1.jpg", id: "1" },
                { src: "images/q2_opt2.jpg", id: "2" },
                { src: "images/q2_opt3.jpg", id: "3" },
                { src: "images/q2_opt4.jpg", id: "4" }
            ],
            correctAnswers: ["1"],
            hint: "Nahi, ye wala nahi! Phir se try karo.",
            successMsg: "Sahi pehchana! Ye mera favorite hai <3"
        },
        {
            type: "text",
            question: "Aapdi sauthi fevorite movement thi password set karyo che yad kar ne aagad nu joo kaik serprise che tara mate",
            correctAnswers: ["1112161"],
            hint: "Try again! Yaad karo wo movement...",
            successMsg: "Unlocked!"
        },
        {
            type: "text",
            question: "Aapde first photo padayo ani date Kaii hati ??",
            correctAnswers: ["111225"],
            hint: "Date theek nahi hai. Think harder!",
            successMsg: "Correct!"
        }
    ]
};

document.addEventListener('DOMContentLoaded', () => {

    // --- SETUP HERO ---
    document.getElementById('hero-name').textContent = CONFIG.naam;
    const heroBg = document.getElementById('hero-bg');
    // Using inline style to apply config image
    heroBg.style.backgroundImage = `url('${CONFIG.heroImage}')`;
    
    // Animate Hero after load
    setTimeout(() => {
        heroBg.classList.add('revealed');
        document.getElementById('hero-title').classList.add('visible');
        document.getElementById('hero-subtitle').classList.add('visible');
        
        setTimeout(() => {
            const msgEl = document.getElementById('hero-message');
            if(msgEl) typeWriter(msgEl, msgEl.dataset.text, 50);
        }, 1500);
    }, 500);


    // --- BUILD JOURNEY SECTION ---
    const journeyContainer = document.getElementById('journey-container');
    CONFIG.photos.forEach((item, index) => {
        // Create Item Container
        const div = document.createElement('div');
        div.className = `journey-item ${index % 2 !== 0 ? 'reverse' : ''}`;
        
        // Random tilt for polaroid between -4 and 4 degrees
        const tilt = (Math.random() * 8) - 4;

        div.innerHTML = `
            <div class="photo-wrapper">
                <div class="polaroid" data-rotation="${tilt}deg" style="transform: rotate(${tilt}deg);">
                    <img src="${item.src}" alt="Memory ${index+1}" onerror="this.src='data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9IiNjY2MiLz48dGV4dCB4PSI1MCUiIHk9IjUwJSIgZm9udC1zaXplPSIyMCIgZmlsbD0iIzY2NiIgZG9taW5hbnQtYmFzZWxpbmU9Im1pZGRsZSIgdGV4dC1hbmNob3I9Im1pZGRsZSI+UGhvdG8gTmFoaSBNaWxpPC90ZXh0Pjwvc3ZnPg=='">
                </div>
            </div>
            <div class="note-wrapper">
                <div class="note-text" data-text="${item.note}"></div>
            </div>
        `;
        journeyContainer.appendChild(div);
    });

    // --- SETUP QUIZ ENGINE (SLIDE 2) ---
    const quizSection = document.getElementById('quiz-section');
    const quizContainer = document.getElementById('quiz-container');
    let currentQ = 0;

    function renderQuestion() {
        if (currentQ >= CONFIG.quiz.length) {
            const finalBlock = document.createElement('div');
            finalBlock.className = "question-block mt-5";
            finalBlock.style.textAlign = "center";
            finalBlock.innerHTML = `
                <h2 class="glow-text">Happy Birthday, ${CONFIG.naam}! 🎉</h2>
                <p class="story-text mt-3" style="font-size: 1.5rem;">Sare tare jag gaye hain, aasmaan roshan hai.</p>
                <p class="feedback-msg success">I love you! ❤️</p>
            `;
            quizContainer.appendChild(finalBlock);
            for(let i=0; i<30; i++) setTimeout(createShootingStar, i*100);
            setTimeout(() => finalBlock.scrollIntoView({ behavior: 'smooth', block: 'center' }), 100);
            return;
        }

        const qData = CONFIG.quiz[currentQ];
        let uiHtml = '';

        if (qData.type === 'multiple-choice') {
            uiHtml = `<div class="options-container">`;
            qData.options.forEach(opt => {
                uiHtml += `<label class="option-label"><input type="checkbox" value="${opt.id}" class="q-checkbox"> ${opt.text}</label>`;
            });
            uiHtml += `</div>`;
        } else if (qData.type === 'image-choice') {
            uiHtml = `<div class="image-options">`;
            qData.images.forEach(img => {
                uiHtml += `<img src="${img.src}" class="img-option" data-id="${img.id}">`;
            });
            uiHtml += `</div>`;
        } else {
            uiHtml = `<div class="input-group">
                <input type="text" class="quiz-input" placeholder="Yahan jawab likho..." autocomplete="off">
            </div>`;
        }

        const block = document.createElement('div');
        block.className = "question-block mt-5";
        block.innerHTML = `
            <div class="quiz-progress">Sawalon Ka Safar: ${currentQ + 1} / ${CONFIG.quiz.length}</div>
            <h2>${qData.question}</h2>
            ${uiHtml}
            <button class="btn-primary mt-3 submit-btn">Submit</button>
            <p class="feedback-msg"></p>
            <div class="success-gallery" style="display: none;"></div>
            <button class="btn-primary mt-4 next-btn" style="display: none; background: var(--rose);">Aage Badho ➡️</button>
        `;

        // Only clear container if it's the first question
        if (currentQ === 0) {
            quizContainer.innerHTML = '';
        }
        quizContainer.appendChild(block);

        setTimeout(() => block.scrollIntoView({ behavior: 'smooth', block: 'start' }), 100);

        const submitBtn = block.querySelector('.submit-btn');
        const feedback = block.querySelector('.feedback-msg');
        const gallery = block.querySelector('.success-gallery');
        const nextBtn = block.querySelector('.next-btn');

        if (qData.type === 'image-choice') {
            const imgs = block.querySelectorAll('.img-option');
            imgs.forEach(img => {
                img.addEventListener('click', () => {
                    imgs.forEach(i => i.classList.remove('selected'));
                    img.classList.add('selected');
                });
            });
        }

        submitBtn.addEventListener('click', () => {
            let isCorrect = false;
            if (qData.type === 'multiple-choice') {
                const checked = Array.from(block.querySelectorAll('.q-checkbox:checked')).map(cb => cb.value);
                const correct = qData.correctAnswers;
                if (checked.length === correct.length && checked.every(v => correct.includes(v))) {
                    isCorrect = true;
                }
            } else if (qData.type === 'image-choice') {
                const selected = block.querySelector('.img-option.selected');
                if (selected && qData.correctAnswers.includes(selected.dataset.id)) {
                    isCorrect = true;
                }
            } else {
                const val = block.querySelector('.quiz-input').value.toLowerCase().trim();
                if (qData.correctAnswers.some(ans => val.includes(ans.toLowerCase()))) {
                    isCorrect = true;
                }
            }

            if (isCorrect) {
                feedback.textContent = qData.successMsg;
                feedback.classList.add('success');
                submitBtn.style.display = 'none';
                createShootingStar();
                createShootingStar();
                
                if (qData.successImages && qData.successImages.length > 0) {
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
                }
                nextBtn.style.display = 'inline-block';
            } else {
                feedback.textContent = qData.hint;
            }
        });

        nextBtn.addEventListener('click', () => {
            nextBtn.style.display = 'none';
            currentQ++;
            renderQuestion();
        });
    }

    renderQuestion();

    // Typewriter effect function
    function typeWriter(element, text, speed = 50) {
        let i = 0;
        element.innerHTML = '';
        function type() {
            if (i < text.length) {
                element.innerHTML += text.charAt(i);
                i++;
                setTimeout(type, speed);
            }
        }
        type();
    }

    // --- INTERSECTION OBSERVERS ---
    const observerOptions = {
        threshold: 0.3
    };
    
    const journeyObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                
                const noteEl = entry.target.querySelector('.note-text');
                if (noteEl && !noteEl.dataset.typed) {
                    noteEl.dataset.typed = "true";
                    setTimeout(() => { typeWriter(noteEl, noteEl.dataset.text); }, 1200);
                }
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll('.journey-item').forEach(el => journeyObserver.observe(el));

    const questionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                document.getElementById('star-canvas').classList.add('deep-sky');
                entry.target.querySelector('.question-container').classList.add('visible');
            } else {
                document.getElementById('star-canvas').classList.remove('deep-sky');
            }
        });
    }, { threshold: 0.5 });
    
    questionObserver.observe(document.getElementById('quiz-section'));

    // --- FALLING STARS & PARALLAX SCROLL ---
    let lastScroll = 0;
    const heroBgEl = document.getElementById('hero-bg');
    
    window.addEventListener('scroll', () => {
        const currentScroll = window.scrollY;
        
        // Parallax for Background Image
        if (heroBgEl) {
            const maxScroll = document.body.scrollHeight - window.innerHeight;
            const scrollProgress = maxScroll > 0 ? Math.max(0, Math.min(1, currentScroll / maxScroll)) : 0;
            heroBgEl.style.transform = `translateY(-${scrollProgress * 10}vh)`;
        }

        // Make stars fall when scrolling down
        if (currentScroll > lastScroll && Math.random() > 0.8) {
            createShootingStar(); 
        }
        lastScroll = currentScroll;
    });

    // --- BACKGROUND CANVAS (STARS) ---    // --- BACKGROUND CANVAS (STARS) ---
    const canvas = document.getElementById('star-canvas');
    const ctx = canvas.getContext('2d');
    let width, height;
    let stars = [];
    let shootingStars = [];
    
    function resize() {
        width = window.innerWidth;
        height = window.innerHeight;
        canvas.width = width;
        canvas.height = height;
    }
    window.addEventListener('resize', resize);
    resize();

    for(let i=0; i<200; i++) {
        stars.push({
            x: Math.random() * width,
            y: Math.random() * height,
            z: Math.random() * 3 + 1, // Depth for 3D parallax effect
            r: Math.random() * 1.2,
            blinkSpeed: Math.random() * 0.02,
            alpha: Math.random()
        });
    }

    function createShootingStar() {
        shootingStars.push({
            x: Math.random() * (width / 2),
            y: 0,
            len: Math.random() * 80 + 20,
            speed: Math.random() * 10 + 10,
            angle: Math.PI / 4 // 45 degrees
        });
    }

    // Occasional random shooting star (rare)
    setInterval(() => {
        if(Math.random() > 0.7) createShootingStar();
    }, 4000);

    function draw() {
        ctx.clearRect(0, 0, width, height);
        
        // Get current scroll for parallax
        const scrollY = window.scrollY || document.documentElement.scrollTop;
        
        // Draw normal stars with parallax
        ctx.fillStyle = '#f5e6b8';
        stars.forEach(s => {
            s.alpha += s.blinkSpeed;
            if (s.alpha > 1 || s.alpha < 0) s.blinkSpeed *= -1;
            
            // Calculate parallax Y position based on depth 'z'
            let yOffset = scrollY / s.z;
            let drawY = s.y - yOffset;
            
            // Wrap stars around the screen so we never run out
            drawY = ((drawY % height) + height) % height;
            
            ctx.globalAlpha = Math.abs(s.alpha);
            ctx.beginPath();
            ctx.arc(s.x, drawY, s.r, 0, Math.PI * 2);
            ctx.fill();
        });
        
        // Draw shooting stars
        ctx.globalAlpha = 1;
        ctx.strokeStyle = '#ffb3c7';
        ctx.lineWidth = 2;
        for (let i = shootingStars.length - 1; i >= 0; i--) {
            let ss = shootingStars[i];
            ctx.beginPath();
            ctx.moveTo(ss.x, ss.y);
            ctx.lineTo(ss.x - Math.cos(ss.angle) * ss.len, ss.y - Math.sin(ss.angle) * ss.len);
            ctx.stroke();
            
            ss.x += Math.cos(ss.angle) * ss.speed;
            ss.y += Math.sin(ss.angle) * ss.speed;
            
            if (ss.x > width + ss.len || ss.y > height + ss.len) {
                shootingStars.splice(i, 1);
            }
        }
        
        requestAnimationFrame(draw);
    }
    draw();
});















document.addEventListener('DOMContentLoaded', () => {

    // --- GAME DATA ---
    const questions = [
        {
            id: 1,
            type: "multiselect",
            text: "Q1. Aapde jyare first time photo padayo tyare su thayu tuu ??",
            options: [
                { id: "a", text: "Hun sutoto ne mane laii gaii" },
                { id: "b", text: "Mari eacha noti ne mane laii gaii" },
                { id: "c", text: "Hun same thi aato to" }
            ],
            checkAnswer: (selectedIds) => {
                return selectedIds.includes('a') && selectedIds.includes('b');
            },
            message: "Hamari pehli memory... yaad hai na? ❤️",
            gallery: ["gallery_1.jpg", "gallery_2.jpg", "gallery_3.jpg", "gallery_4.jpg", "gallery_5.jpg"] // 5 Photos after Q1
        },
        {
            id: 2,
            type: "image",
            text: "Q2. Maro aapda jode no sauuthi favorite photo kato che ??",
            options: [
                { id: "img1", src: "q2_opt1.jpg" },
                { id: "img2", src: "q2_opt2.jpg" },
                { id: "img3", src: "q2_opt3.jpg" },
                { id: "img4", src: "q2_opt4.jpg" }
            ],
            checkAnswer: (selectedIds) => selectedIds.includes('img1'), 
            message: "Ye photo hamesha mere dil ke paas rahegi. ✨",
            gallery: [] // No gallery after Q2
        },
        {
            id: 3,
            type: "text",
            text: "Q3. Aapdi sauthi fevorite movement thi password set karyo che yad kar ne aagad nu joo kaik serprise che tara mate",
            checkAnswer: (val) => val === "1112161",
            message: "Wo special moment aur ye password... hamesha yaad rahega! 🌟",
            gallery: []
        },
        {
            id: 4,
            type: "text",
            text: "Q4. Aapde first photo padayo ani date Kaii hati ??",
            checkAnswer: (val) => val === "111225",
            message: "Pehli photo ki date! Hamara aasmaan poora ho gaya Betuu. 💖",
            gallery: []
        }
    ];

    const journeyContainer = document.getElementById('journey-container');
    const startBtn = document.getElementById('start-btn');
    const introScreen = document.getElementById('screen-intro');
    const fixedProgress = document.getElementById('fixed-progress');
    
    let currentQuestionIndex = 0; // We reset to 0 to force them to scroll through the journey

    startBtn.addEventListener('click', () => {
        introScreen.classList.add('hidden');
        fixedProgress.classList.remove('hidden');
        renderQuestion(currentQuestionIndex);
    });

    function renderQuestion(index) {
        if (index >= questions.length) {
            renderFinalScreen();
            return;
        }

        const q = questions[index];
        const section = document.createElement('div');
        section.className = 'journey-section';
        section.id = `section-q${index}`;

        const card = document.createElement('div');
        card.className = 'glass-card text-center';
        
        const title = document.createElement('h2');
        title.className = 'question-title';
        title.textContent = q.text;
        card.appendChild(title);

        const optionsContainer = document.createElement('div');
        optionsContainer.className = 'options-container mt-2';
        
        let selectedOptions = [];

        if (q.type === 'multiselect') {
            q.options.forEach(opt => {
                const btn = document.createElement('button');
                btn.className = 'option-btn';
                btn.textContent = opt.text;
                btn.onclick = () => {
                    btn.classList.toggle('selected');
                    if (selectedOptions.includes(opt.id)) {
                        selectedOptions = selectedOptions.filter(id => id !== opt.id);
                    } else {
                        selectedOptions.push(opt.id);
                    }
                };
                optionsContainer.appendChild(btn);
            });
        } 
        else if (q.type === 'image') {
            optionsContainer.classList.add('image-options');
            q.options.forEach(opt => {
                const img = document.createElement('img');
                img.src = opt.src;
                img.className = 'img-option';
                img.onclick = () => {
                    document.querySelectorAll(`#section-q${index} .img-option`).forEach(i => i.classList.remove('selected'));
                    img.classList.add('selected');
                    selectedOptions = [opt.id];
                };
                optionsContainer.appendChild(img);
            });
        }
        else if (q.type === 'text') {
            const input = document.createElement('input');
            input.type = 'text';
            input.className = 'text-input';
            input.placeholder = "Jawab likho...";
            optionsContainer.appendChild(input);
        }

        card.appendChild(optionsContainer);

        const feedback = document.createElement('div');
        feedback.className = 'feedback-text hidden';
        card.appendChild(feedback);

        const submitBtn = document.createElement('button');
        submitBtn.className = 'btn-gold mt-2';
        submitBtn.textContent = 'Check Answer';
        
        submitBtn.onclick = () => {
            let isCorrect = false;
            if (q.type === 'text') {
                const val = card.querySelector('.text-input').value.trim().toLowerCase().replace(/\s+/g, '');
                isCorrect = q.checkAnswer(val);
            } else {
                isCorrect = q.checkAnswer(selectedOptions);
            }

            if (isCorrect) {
                feedback.classList.add('hidden');
                submitBtn.classList.add('hidden'); // hide submit button
                
                // Disable inputs
                if (q.type === 'text') {
                    card.querySelector('.text-input').disabled = true;
                } else {
                    card.querySelectorAll('.option-btn, .img-option').forEach(el => {
                        el.style.pointerEvents = 'none';
                    });
                }

                // Light up star
                document.getElementById(`star-${index + 1}`).classList.add('lit');
                createStarExplosion();

                // Show success message
                const successMsg = document.createElement('p');
                successMsg.className = 'success-msg fade-in-slow';
                successMsg.textContent = q.message;
                card.appendChild(successMsg);

                // Render gallery and next question
                setTimeout(() => {
                    renderGalleryAndNext(index);
                }, 1000);

            } else {
                feedback.textContent = "Ek baar aur socho, tumhe pata hai ✨";
                feedback.classList.remove('hidden');
            }
        };

        card.appendChild(submitBtn);
        section.appendChild(card);
        journeyContainer.appendChild(section);

        // Scroll to the new question
        setTimeout(() => {
            section.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }, 100);
    }

    function renderGalleryAndNext(index) {
        const q = questions[index];
        
        // Render Gallery if exists
        if (q.gallery && q.gallery.length > 0) {
            const galSection = document.createElement('div');
            galSection.className = 'journey-section';
            const grid = document.createElement('div');
            grid.className = 'gallery-grid';
            
            q.gallery.forEach(imgSrc => {
                const img = document.createElement('img');
                img.src = imgSrc;
                img.className = 'gallery-img';
                grid.appendChild(img);
            });
            galSection.appendChild(grid);
            journeyContainer.appendChild(galSection);
        }

        // Render Next Question
        currentQuestionIndex++;
        renderQuestion(currentQuestionIndex);
    }

    function renderFinalScreen() {
        const section = document.createElement('div');
        section.className = 'journey-section';
        const card = document.createElement('div');
        card.className = 'glass-card text-center';
        
        const twText = document.createElement('div');
        twText.className = 'typewriter-text';
        card.appendChild(twText);

        const btn = document.createElement('button');
        btn.className = 'btn-gold mt-2 hidden';
        btn.textContent = 'Wish Karo 🌟';
        card.appendChild(btn);

        section.appendChild(card);
        journeyContainer.appendChild(section);

        setTimeout(() => {
            section.scrollIntoView({ behavior: 'smooth', block: 'center' });
            // Typewriter effect
            const msg = "Tumhare saare jawab sahi the! Tumhara aasmaan pura ho chuka hai. Ye saare tare hamari yaadon ki tarah hamesha chamakte rahenge. Happy Birthday Betuu! ❤️✨";
            let i = 0;
            function typeWriter() {
                if (i < msg.length) {
                    twText.innerHTML += msg.charAt(i);
                    i++;
                    setTimeout(typeWriter, 50);
                } else {
                    btn.classList.remove('hidden');
                }
            }
            setTimeout(typeWriter, 500);
        }, 500);
    }

    // --- AUDIO ---
    const audioBtn = document.getElementById('audio-toggle');
    const bgMusic = document.getElementById('bg-music');
    let isPlaying = false;
    audioBtn.addEventListener('click', () => {
        if (isPlaying) {
            bgMusic.pause();
            audioBtn.innerHTML = '<i class="fas fa-music"></i>';
        } else {
            bgMusic.play().catch(e => console.log(e));
            audioBtn.innerHTML = '<i class="fas fa-pause"></i>';
        }
        isPlaying = !isPlaying;
    });

    // --- CANVAS BACKGROUND (STARS & CONSTELLATION) ---
    const canvas = document.getElementById('star-canvas');
    const ctx = canvas.getContext('2d');
    let width, height;
    let stars = [];
    
    function resize() {
        width = window.innerWidth;
        height = window.innerHeight;
        canvas.width = width;
        canvas.height = height;
    }
    window.addEventListener('resize', resize);
    resize();

    // Init background stars
    for(let i=0; i<150; i++) {
        stars.push({
            x: Math.random() * width,
            y: Math.random() * height,
            r: Math.random() * 1.5,
            blinkSpeed: Math.random() * 0.02,
            alpha: Math.random()
        });
    }

    function drawStars() {
        ctx.clearRect(0, 0, width, height);
        
        ctx.fillStyle = '#f5efe6';
        stars.forEach(s => {
            s.alpha += s.blinkSpeed;
            if (s.alpha > 1 || s.alpha < 0) s.blinkSpeed *= -1;
            ctx.globalAlpha = Math.abs(s.alpha);
            ctx.beginPath();
            ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
            ctx.fill();
        });
        
        if (currentQuestionIndex >= questions.length) {
            drawConstellation();
        }

        ctx.globalAlpha = 1;
        requestAnimationFrame(drawStars);
    }
    drawStars();

    function drawConstellation() {
        const cx = width / 2;
        const cy = height / 3;
        const scale = Math.min(width, height) * 0.2;
        
        const pts = [
            {x: cx, y: cy + scale*0.5},
            {x: cx - scale, y: cy - scale*0.5},
            {x: cx, y: cy - scale*0.2},
            {x: cx + scale, y: cy - scale*0.5},
            {x: cx, y: cy + scale*0.5}
        ];

        ctx.strokeStyle = "rgba(227, 196, 138, 0.5)"; 
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(pts[0].x, pts[0].y);
        for(let i=1; i<pts.length; i++) {
            ctx.lineTo(pts[i].x, pts[i].y);
        }
        ctx.stroke();

        ctx.fillStyle = "#e3c48a";
        pts.forEach(p => {
            ctx.beginPath();
            ctx.arc(p.x, p.y, 4, 0, Math.PI*2);
            ctx.fill();
            ctx.shadowBlur = 10;
            ctx.shadowColor = "#e3c48a";
        });
        ctx.shadowBlur = 0;
    }

    function createRipple(x, y) {
        const ripple = document.createElement('div');
        ripple.style.position = 'fixed';
        ripple.style.left = `${x}px`;
        ripple.style.top = `${y}px`;
        ripple.style.width = '10px';
        ripple.style.height = '10px';
        ripple.style.border = `2px solid rgba(227, 196, 138, 0.6)`;
        ripple.style.borderRadius = '50%';
        ripple.style.pointerEvents = 'none';
        ripple.style.zIndex = '9999';
        ripple.style.transition = 'all 0.8s ease-out';
        ripple.style.transform = 'translate(-50%, -50%) scale(1)';
        document.body.appendChild(ripple);
        
        setTimeout(() => {
            ripple.style.transform = `translate(-50%, -50%) scale(6)`;
            ripple.style.opacity = '0';
        }, 10);
        setTimeout(() => ripple.remove(), 800);
    }
    window.addEventListener('click', e => createRipple(e.clientX, e.clientY));

    function createStarExplosion() {
        for(let i=0; i<30; i++) {
            const sparkle = document.createElement('div');
            sparkle.innerHTML = '✨';
            sparkle.style.position = 'fixed';
            sparkle.style.left = '50%';
            sparkle.style.top = '50%';
            sparkle.style.fontSize = `${Math.random()*20+10}px`;
            sparkle.style.pointerEvents = 'none';
            sparkle.style.zIndex = '1000';
            sparkle.style.transition = 'all 1s cubic-bezier(0.1, 0.8, 0.2, 1)';
            document.body.appendChild(sparkle);

            const angle = Math.random() * Math.PI * 2;
            const distance = Math.random() * 200 + 50;
            const tx = Math.cos(angle) * distance;
            const ty = Math.sin(angle) * distance;

            setTimeout(() => {
                sparkle.style.transform = `translate(calc(-50% + ${tx}px), calc(-50% + ${ty}px)) scale(0)`;
                sparkle.style.opacity = '0';
            }, 10);
            setTimeout(() => sparkle.remove(), 1000);
        }
    }
});

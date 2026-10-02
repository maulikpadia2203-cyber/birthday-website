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
            // As requested: a or b both (we will check if they selected a and b)
            checkAnswer: (selectedIds) => {
                return selectedIds.includes('a') && selectedIds.includes('b');
            },
            date: "Pehli Mulakat",
            photo: "q1_photo.jpg",
            message: "Hamari pehli memory... yaad hai na? ❤️"
        },
        {
            id: 2,
            type: "image",
            text: "Q2. Maro aapda jode no sauuthi favorite photo kato che ??",
            options: [
                { id: "img1", src: "q2_opt1.jpg" },
                { id: "img2", src: "q2_opt2.jpg" },
                { id: "img3", src: "q2_opt3.jpg" },
                { id: "img4", src: "q2_opt4.jpg" },
                { id: "img5", src: "q2_opt5.jpg" }
            ],
            checkAnswer: (selectedIds) => selectedIds.includes('img1'), // By default img1 is correct, can be changed later
            date: "Favorite Moment",
            photo: "q2_photo.jpg", // Correct photo shown in modal
            message: "Ye photo hamesha mere dil ke paas rahegi. ✨"
        },
        {
            id: 3,
            type: "text",
            text: "Q3. Aapdi sauthi fevorite movement thi password set karyo che yad kar ne aagad nu joo kaik serprise che tara mate",
            checkAnswer: (val) => val === "1112161",
            date: "Secret Date",
            photo: "q3_photo.jpg",
            message: "Wo special moment aur ye password... hamesha yaad rahega! 🌟"
        },
        {
            id: 4,
            type: "text",
            text: "Q4. Aapde first photo padayo ani date Kaii hati ??",
            checkAnswer: (val) => val === "111225",
            date: "11 Dec 2025", // Example formatting
            photo: "q4_photo.jpg",
            message: "Pehli photo ki date! Hamara aasmaan poora ho gaya Betuu. 💖"
        }
    ];

    // --- DOM ELEMENTS ---
    const screenIntro = document.getElementById('screen-intro');
    const screenGame = document.getElementById('screen-game');
    const screenFinal = document.getElementById('screen-final');
    const startBtn = document.getElementById('start-btn');
    
    const questionText = document.getElementById('question-text');
    const optionsContainer = document.getElementById('options-container');
    const submitBtn = document.getElementById('submit-ans-btn');
    const feedbackText = document.getElementById('feedback-text');
    
    const memoryModal = document.getElementById('memory-modal');
    const closeModal = document.getElementById('close-modal');
    const memoryImg = document.getElementById('memory-img');
    const memoryDate = document.getElementById('memory-date');
    const memoryMessage = document.getElementById('memory-message');

    // --- STATE ---
    let currentQuestionIndex = parseInt(localStorage.getItem('betuu_progress')) || 0;
    // For testing, you can force reset: currentQuestionIndex = 0;

    // --- INIT ---
    function init() {
        if (currentQuestionIndex >= questions.length) {
            showScreen(screenFinal);
            runFinalSequence();
        } else {
            // Restore stars
            for(let i=0; i<currentQuestionIndex; i++) {
                document.getElementById(`star-${i+1}`).classList.add('lit');
            }
        }
    }
    
    startBtn.addEventListener('click', () => {
        showScreen(screenGame);
        loadQuestion();
    });

    function showScreen(screen) {
        document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
        setTimeout(() => screen.classList.add('active'), 50); // slight delay for transition
    }

    // --- GAME LOGIC ---
    let selectedOptions = [];

    function loadQuestion() {
        if (currentQuestionIndex >= questions.length) {
            showScreen(screenFinal);
            runFinalSequence();
            return;
        }

        const q = questions[currentQuestionIndex];
        questionText.textContent = q.text;
        optionsContainer.innerHTML = '';
        selectedOptions = [];
        feedbackText.classList.add('hidden');
        submitBtn.classList.remove('hidden');

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
                    // Single select for images
                    document.querySelectorAll('.img-option').forEach(i => i.classList.remove('selected'));
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
    }

    submitBtn.addEventListener('click', () => {
        const q = questions[currentQuestionIndex];
        let isCorrect = false;

        if (q.type === 'text') {
            const val = document.querySelector('.text-input').value.trim().toLowerCase().replace(/\s+/g, '');
            isCorrect = q.checkAnswer(val);
        } else {
            isCorrect = q.checkAnswer(selectedOptions);
        }

        if (isCorrect) {
            feedbackText.classList.add('hidden');
            // Light up star
            const star = document.getElementById(`star-${currentQuestionIndex + 1}`);
            star.classList.add('lit');
            
            // Show memory
            memoryImg.src = q.photo;
            memoryDate.textContent = q.date;
            memoryMessage.textContent = q.message;
            memoryModal.classList.remove('hidden');
            
            // Trigger star explosion effect
            createStarExplosion();

        } else {
            feedbackText.textContent = "Ek baar aur socho, tumhe pata hai ✨";
            feedbackText.classList.remove('hidden');
        }
    });

    closeModal.addEventListener('click', () => {
        memoryModal.classList.add('hidden');
        currentQuestionIndex++;
        localStorage.setItem('betuu_progress', currentQuestionIndex);
        
        // Remove image grid class if leaving image question
        optionsContainer.classList.remove('image-options');
        
        loadQuestion();
    });

    // --- FINAL SEQUENCE ---
    function runFinalSequence() {
        const twText = document.getElementById('typewriter-text');
        const msg = "Tumhare saare jawab sahi the! Tumhara aasmaan pura ho chuka hai. Ye saare tare hamari yaadon ki tarah hamesha chamakte rahenge. Happy Birthday Betuu! ❤️✨";
        twText.innerHTML = '';
        let i = 0;
        
        function typeWriter() {
            if (i < msg.length) {
                twText.innerHTML += msg.charAt(i);
                i++;
                setTimeout(typeWriter, 50);
            } else {
                document.getElementById('final-wish-btn').classList.remove('hidden');
            }
        }
        setTimeout(typeWriter, 1000);
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
        
        // Background Stars
        ctx.fillStyle = '#f5efe6';
        stars.forEach(s => {
            s.alpha += s.blinkSpeed;
            if (s.alpha > 1 || s.alpha < 0) s.blinkSpeed *= -1;
            ctx.globalAlpha = Math.abs(s.alpha);
            ctx.beginPath();
            ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
            ctx.fill();
        });
        
        // Draw constellation line if game is over
        if (currentQuestionIndex >= questions.length) {
            drawConstellation();
        }

        ctx.globalAlpha = 1;
        requestAnimationFrame(drawStars);
    }
    drawStars();

    function drawConstellation() {
        // Draw a heart shape constellation with 4 main points
        const cx = width / 2;
        const cy = height / 3;
        const scale = Math.min(width, height) * 0.2;
        
        const pts = [
            {x: cx, y: cy + scale*0.5}, // bottom
            {x: cx - scale, y: cy - scale*0.5}, // left
            {x: cx, y: cy - scale*0.2}, // top mid
            {x: cx + scale, y: cy - scale*0.5}, // right
            {x: cx, y: cy + scale*0.5} // back to bottom
        ];

        ctx.strokeStyle = "rgba(227, 196, 138, 0.5)"; // Gold line
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(pts[0].x, pts[0].y);
        for(let i=1; i<pts.length; i++) {
            ctx.lineTo(pts[i].x, pts[i].y);
        }
        ctx.stroke();

        // Draw big stars at points
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

    // Ripple effect on click/touch
    function createRipple(x, y) {
        const ripple = document.createElement('div');
        ripple.style.position = 'fixed';
        ripple.style.left = `${x}px`;
        ripple.style.top = `${y}px`;
        ripple.style.width = '10px';
        ripple.style.height = '10px';
        ripple.style.border = `2px solid rgba(227, 196, 138, 0.6)`; // Gold ripple
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

    // Special star explosion on correct answer
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

    init();
});

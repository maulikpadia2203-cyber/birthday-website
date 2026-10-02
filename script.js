/**
 * SLIDE 1 CONFIGURATION
 * Yahan aap apni saari details, photos, aur sawal aaram se edit kar sakte hain.
 */
const CONFIG = {
    naam: "Betuu",
    heroImage: "hamari_photo.jpg",
    photos: [
        { src: "images/p1.jpg", date: "12 Dec 2023", note: "Hamari pehli mulakat, wo hasi aur wo baatein..." },
        { src: "images/p2.jpg", date: "25 Jan 2024", note: "Jab tumne pehli baar mere liye wo gaana gaya tha." },
        { src: "images/p3.jpg", date: "14 Feb 2024", note: "Ek khoobsurat din, jo hamesha yaad rahega." },
        { src: "images/p4.jpg", date: "10 Mar 2024", note: "Wo bina baat ka jhagda aur fir jaldi se maan jana." },
        { src: "images/p5.jpg", date: "05 Apr 2024", note: "Dher saari yaadein aur tumhari wo pyari si smile." },
        { src: "images/p6.jpg", date: "Ajj ka din", note: "Aur aaj tumhara birthday hai! Happy Birthday!" }
    ],
    question1: {
        text: "Sawal 1: Humne pehli baar kaunsi movie dekhi thi?",
        answers: ["pk", "p.k.", "p k"], // Ek se zyada sahi jawab (lowercase me likhein)
        hint: "Are yaad karo, wo alien wali movie... ✨",
        successMsg: "Bilkul sahi! Ek tara jag gaya tumhare liye 🌟"
    }
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
                <div class="note-date">${item.date}</div>
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
            quizContainer.innerHTML = `
                <h2 class="glow-text">Happy Birthday, ${CONFIG.naam}! 🎉</h2>
                <p class="story-text mt-3" style="font-size: 1.5rem;">Sare tare jag gaye hain, aasmaan roshan hai.</p>
                <p class="feedback-msg success">I love you! ❤️</p>
            `;
            // Trigger final starburst or fireworks here if needed
            for(let i=0; i<30; i++) setTimeout(createShootingStar, i*100);
            return;
        }

        const qData = CONFIG.quiz[currentQ];
        let uiHtml = '';

        if (qData.type === 'multiple-choice') {
            uiHtml = `<div class="options-container">`;
            qData.options.forEach(opt => {
                uiHtml += `<label class="option-label"><input type="checkbox" value="${opt.id}"> ${opt.text}</label>`;
            });
            uiHtml += `</div>`;
        } else if (qData.type === 'image-choice') {
            uiHtml = `<div class="image-options">`;
            qData.images.forEach(img => {
                uiHtml += `<img src="${img.src}" class="img-option" data-id="${img.id}">`;
            });
            uiHtml += `</div>`;
        } else {
            // Text input
            uiHtml = `
            <div class="input-group">
                <input type="text" id="quiz-input" placeholder="Yahan jawab likho..." autocomplete="off">
            </div>`;
        }

        quizContainer.innerHTML = `
            <div class="quiz-progress">Sawalon Ka Safar: ${currentQ + 1} / ${CONFIG.quiz.length}</div>
            <h2>${qData.question}</h2>
            ${uiHtml}
            <button id="quiz-submit" class="btn-primary mt-3">Submit</button>
            <p id="quiz-feedback" class="feedback-msg"></p>
        `;

        // Add event listeners
        const submitBtn = document.getElementById('quiz-submit');
        submitBtn.addEventListener('click', checkQuizAnswer);

        if (qData.type === 'image-choice') {
            const imgs = document.querySelectorAll('.img-option');
            imgs.forEach(img => img.addEventListener('click', (e) => {
                // Single selection for images
                imgs.forEach(i => i.classList.remove('selected'));
                e.target.classList.add('selected');
            }));
        } else if (qData.type === 'text') {
            document.getElementById('quiz-input').addEventListener('keypress', (e) => {
                if (e.key === 'Enter') checkQuizAnswer();
            });
        }
    }

    function checkQuizAnswer() {
        const qData = CONFIG.quiz[currentQ];
        const feedback = document.getElementById('quiz-feedback');
        let isCorrect = false;

        if (qData.type === 'multiple-choice') {
            const checked = Array.from(document.querySelectorAll('input[type="checkbox"]:checked')).map(cb => cb.value);
            // Check if arrays contain same elements
            isCorrect = checked.length === qData.correctAnswers.length && 
                        qData.correctAnswers.every(val => checked.includes(val));
        } else if (qData.type === 'image-choice') {
            const selected = document.querySelector('.img-option.selected');
            isCorrect = selected && qData.correctAnswers.includes(selected.dataset.id);
        } else {
            const inputVal = document.getElementById('quiz-input').value.trim().toLowerCase().replace(/\s+/g, ' ');
            isCorrect = qData.correctAnswers.some(ans => ans.toLowerCase() === inputVal || ans.toLowerCase().replace(/\s+/g, '') === inputVal.replace(/\s+/g, ''));
        }

        feedback.classList.remove('success');
        if (isCorrect) {
            feedback.textContent = qData.successMsg;
            feedback.classList.add('success');
            document.getElementById('quiz-submit').disabled = true;
            createShootingStar();
            createShootingStar();
            
            setTimeout(() => {
                currentQ++;
                renderQuestion();
            }, 2000);
        } else {
            feedback.textContent = qData.hint;
        }
    }

    renderQuestion();

    // --- INTERSECTION OBSERVER FOR ANIMATIONS ---
    const observerOptions = {
        threshold: 0.3
    };
    
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

    const journeyObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                
                // Find note text and animate it
                const noteEl = entry.target.querySelector('.note-text');
                if (noteEl && !noteEl.dataset.typed) {
                    noteEl.dataset.typed = "true";
                    typeWriter(noteEl, noteEl.dataset.text);
                }
                
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll('.journey-item').forEach(el => journeyObserver.observe(el));

    // Observe Quiz Section to deepen sky
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
    
    questionObserver.observe(quizSection);

    // --- FALLING STARS ON SCROLL ---
    let lastScroll = 0;
    window.addEventListener('scroll', () => {
        const currentScroll = window.scrollY;
        // Make stars fall when scrolling down
        if (currentScroll > lastScroll && Math.random() > 0.8) {
            createShootingStar(); 
        }
        lastScroll = currentScroll;
    });

    // --- BACKGROUND CANVAS (STARS) ---
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

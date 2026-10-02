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

    // --- SETUP QUESTION 1 ---
    document.getElementById('q1-text').textContent = CONFIG.question1.text;
    const q1Input = document.getElementById('q1-input');
    const q1Submit = document.getElementById('q1-submit');
    const q1Feedback = document.getElementById('q1-feedback');

    q1Submit.addEventListener('click', checkAnswer);
    q1Input.addEventListener('keypress', (e) => {
        if(e.key === 'Enter') checkAnswer();
    });

    function checkAnswer() {
        const val = q1Input.value.trim().toLowerCase().replace(/\s+/g, ' '); // normalize spaces
        const isCorrect = CONFIG.question1.answers.some(ans => ans.toLowerCase() === val || ans.toLowerCase().replace(/\s+/g, '') === val.replace(/\s+/g, ''));

        q1Feedback.classList.remove('success');
        if (isCorrect) {
            q1Feedback.textContent = CONFIG.question1.successMsg;
            q1Feedback.classList.add('success');
            q1Input.disabled = true;
            q1Submit.disabled = true;
            createShootingStar();
        } else {
            q1Feedback.textContent = CONFIG.question1.hint;
        }
    }


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
                    noteEl.dataset.typed = "true"; // ensure it only runs once
                    typeWriter(noteEl, noteEl.dataset.text);
                }
                
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll('.journey-item').forEach(el => journeyObserver.observe(el));

    // Observe Question Section to change sky color
    const questionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                document.body.classList.add('deep-sky');
                entry.target.querySelector('.question-container').classList.add('visible');
            } else {
                document.body.classList.remove('deep-sky');
            }
        });
    }, { threshold: 0.5 });
    
    questionObserver.observe(document.getElementById('question1'));

    // --- POLAROID SCROLL SCALE & SHIFT EFFECT ---
    window.addEventListener('scroll', () => {
        const items = document.querySelectorAll('.journey-item');
        const vh = window.innerHeight;
        
        items.forEach(item => {
            const p = item.querySelector('.polaroid');
            if (!p) return;
            const rect = item.getBoundingClientRect();
            
            // Start transitioning when item enters from bottom (vh * 1.5) 
            // Finish transitioning when item reaches near center (vh * 0.4)
            if (rect.top > vh * 0.4 && rect.top < vh * 1.5) {
                // progress: 1 (at bottom) -> 0 (at center)
                let progress = (rect.top - (vh * 0.4)) / (vh * 0.6); 
                progress = Math.max(0, Math.min(1, progress));
                
                // Scale from 1 (at center) up to 3.5 (at bottom) to fill screen
                const scale = 1 + (progress * 2.5); 
                
                // Translate X to center the photo when zoomed
                const isMobile = window.innerWidth <= 768;
                const isRight = item.classList.contains('reverse');
                
                // On mobile, items are stacked vertically so they are already centered (offset = 0)
                // On desktop, they are side-by-side (offset = +/- 30vw)
                const maxOffset = isMobile ? 0 : (isRight ? -30 : 30);
                const translateX = progress * maxOffset;
                
                const rotation = p.dataset.rotation || '0deg';
                
                // Apply transform
                p.style.transform = `translate(${translateX}vw, 0) scale(${scale}) rotate(${rotation})`;
                p.style.zIndex = 100;
            } else if (rect.top <= vh * 0.4) {
                const rotation = p.dataset.rotation || '0deg';
                p.style.transform = `translate(0, 0) scale(1) rotate(${rotation})`;
                p.style.zIndex = 1;
            }
        });
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

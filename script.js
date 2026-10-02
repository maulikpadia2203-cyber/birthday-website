document.addEventListener('DOMContentLoaded', () => {

    // --- STORY DATA ---
    // Yahan hum step-by-step aapki kahani daalenge jaise aap batayenge.
    const storyBlocks = [
        {
            type: "text",
            content: "Mujhe aaj bhi yaad hai wo din jab humari kahani shuru hui thi..."
        }
        // Agle steps (photos, text) hum yahan add karte jayenge!
    ];

    const startBtn = document.getElementById('start-btn');
    const introScreen = document.getElementById('screen-intro');
    const storyContent = document.getElementById('story-content');
    
    startBtn.addEventListener('click', () => {
        introScreen.classList.add('fade-out');
        setTimeout(() => {
            introScreen.classList.add('hidden');
            storyContent.classList.remove('hidden');
            renderStory();
        }, 1000);
        
        // Autoplay music if not playing
        if (!isPlaying) {
            bgMusic.play().catch(e => console.log(e));
            isPlaying = true;
            audioBtn.innerHTML = '<i class="fas fa-pause"></i>';
        }
    });

    function renderStory() {
        storyContent.innerHTML = '';
        
        storyBlocks.forEach((block, index) => {
            const section = document.createElement('div');
            section.className = 'journey-section';
            
            if (block.type === 'text') {
                const card = document.createElement('div');
                card.className = 'glass-card text-center';
                const p = document.createElement('p');
                p.className = 'story-text handwritten';
                p.textContent = block.content;
                card.appendChild(p);
                section.appendChild(card);
            }
            else if (block.type === 'photo') {
                const polaroid = document.createElement('div');
                polaroid.className = 'polaroid-card';
                const img = document.createElement('img');
                img.src = block.src;
                const caption = document.createElement('div');
                caption.className = 'polaroid-caption handwritten';
                caption.textContent = block.caption;
                
                polaroid.appendChild(img);
                polaroid.appendChild(caption);
                section.appendChild(polaroid);
            }
            // Hum aur types add kar sakte hain (like gallery)
            
            storyContent.appendChild(section);
        });

        // Intersection Observer for fade-in on scroll
        const sections = document.querySelectorAll('.journey-section');
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        }, { threshold: 0.2 });

        sections.forEach(sec => observer.observe(sec));
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

    // --- CANVAS BACKGROUND (STARS) ---
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
        
        ctx.globalAlpha = 1;
        requestAnimationFrame(drawStars);
    }
    drawStars();

    // Water Ripple effect on click/touch
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

});

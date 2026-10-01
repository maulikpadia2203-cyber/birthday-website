document.addEventListener('DOMContentLoaded', () => {
    
    // --- Envelope & Confetti Logic ---
    const envelope = document.getElementById('mystery-envelope');
    const heroContent = document.getElementById('hero-content');
    let opened = false;

    envelope.addEventListener('click', () => {
        if (!opened) {
            opened = true;
            envelope.querySelector('.envelope').classList.add('open');
            
            // Fire Confetti
            var duration = 3 * 1000;
            var animationEnd = Date.now() + duration;
            var defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

            function randomInRange(min, max) {
              return Math.random() * (max - min) + min;
            }

            var interval = setInterval(function() {
              var timeLeft = animationEnd - Date.now();

              if (timeLeft <= 0) {
                return clearInterval(interval);
              }

              var particleCount = 50 * (timeLeft / duration);
              // since particles fall down, start a bit higher than random
              confetti({
                ...defaults, particleCount,
                origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 }
              });
              confetti({
                ...defaults, particleCount,
                origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 }
              });
            }, 250);

            // Show hidden content after a short delay
            setTimeout(() => {
                heroContent.classList.remove('hidden');
                heroContent.classList.add('reveal', 'active');
                
                // Optional: scroll down a bit
                window.scrollBy({ top: 150, behavior: 'smooth' });
            }, 1000);
        }
    });

    // --- Audio Player Toggle ---
    const audioBtn = document.getElementById('audio-toggle');
    const bgMusic = document.getElementById('bg-music');
    const icon = audioBtn.querySelector('i');
    let isPlaying = false;

    audioBtn.addEventListener('click', () => {
        if (isPlaying) {
            bgMusic.pause();
            icon.classList.remove('fa-pause');
            icon.classList.add('fa-music');
        } else {
            bgMusic.play().catch(error => console.log("Audio play failed:", error));
            icon.classList.remove('fa-music');
            icon.classList.add('fa-pause');
        }
        isPlaying = !isPlaying;
    });

    // --- Parallax Background Move ---
    const bgParallax = document.getElementById('bg-parallax');
    window.addEventListener('scroll', () => {
        const scrollY = window.scrollY;
        // Move photo slightly upwards as we scroll down (parallax effect)
        // Adjust the 0.2 factor to make it faster or slower
        bgParallax.style.transform = `translateY(-${scrollY * 0.15}px)`;
    });

    // --- Scroll Reveal Animation ---
    const reveals = document.querySelectorAll('.reveal');

    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                // Optional: observer.unobserve(entry.target) if you only want it to animate once
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
    });

    reveals.forEach(reveal => {
        revealObserver.observe(reveal);
    });

    // --- Wish Wall Logic ---
    const wishForm = document.getElementById('wish-form');
    const wishesContainer = document.getElementById('wishes-container');

    wishForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const nameInput = document.getElementById('wish-name').value;
        const messageInput = document.getElementById('wish-message').value;

        if (nameInput && messageInput) {
            // Create new wish card
            const newCard = document.createElement('div');
            newCard.classList.add('wish-card');
            
            const nameHeading = document.createElement('h4');
            nameHeading.textContent = nameInput;
            
            const messagePara = document.createElement('p');
            messagePara.textContent = messageInput;
            
            newCard.appendChild(nameHeading);
            newCard.appendChild(messagePara);
            
            // Add to container
            wishesContainer.prepend(newCard);
            
            // Clear form
            wishForm.reset();
            
            // Basic animation for new card
            newCard.style.opacity = '0';
            newCard.style.transform = 'translateY(-20px)';
            newCard.style.transition = 'all 0.5s ease';
            
            setTimeout(() => {
                newCard.style.opacity = '1';
                newCard.style.transform = 'translateY(0)';
            }, 50);
        }
    });

});

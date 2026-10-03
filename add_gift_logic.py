import re

with open('script.js', 'r', encoding='utf-8') as f:
    js = f.read()

old_typewriter_trigger = '''    // Start Typewriter for Hero Message after title animation
    setTimeout(() => {
        typewriterEffect(heroMsg, msgText);
    }, 1500);'''

new_typewriter_trigger = '''    // Gift Overlay Logic
    const giftScreen = document.getElementById('gift-screen');
    const giftContainer = document.getElementById('gift-container');
    
    if (giftScreen && giftContainer) {
        giftContainer.addEventListener('click', () => {
            giftContainer.classList.add('opened');
            setTimeout(() => {
                giftScreen.style.opacity = '0';
                giftScreen.style.visibility = 'hidden';
                
                // Start Typewriter for Hero Message after gift opens
                setTimeout(() => {
                    typewriterEffect(heroMsg, msgText);
                }, 800);
                
                // Also trigger shooting stars burst
                for(let i=0; i<5; i++) {
                    setTimeout(createShootingStar, i * 200);
                }
            }, 600); // match CSS animation duration
        });
    } else {
        // Fallback if no gift overlay
        setTimeout(() => {
            typewriterEffect(heroMsg, msgText);
        }, 1500);
    }'''

js = js.replace(old_typewriter_trigger, new_typewriter_trigger)

with open('script.js', 'w', encoding='utf-8') as f:
    f.write(js)

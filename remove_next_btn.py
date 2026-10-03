import re

with open('script.js', 'r', encoding='utf-8') as f:
    js = f.read()

# 1. Remove the "Next" button from HTML template
js = js.replace('<button class="btn-primary mt-5 new-next-btn" style="background: var(--rose); font-size: 1.2rem;">Next ➡️</button>', '')

# 2. Replace the button click logic with automatic load
old_logic = '''                    // Re-bind the next question button
                    block.querySelector('.new-next-btn').addEventListener('click', () => {
                        block.querySelector('.new-next-btn').style.display = 'none';
                        currentQ++;
                        renderQuestion();
                    });'''

new_logic = '''                    // Automatically load next question after a short delay
                    setTimeout(() => {
                        currentQ++;
                        renderQuestion();
                    }, 500);'''

js = js.replace(old_logic, new_logic)

# 3. Replace the fallback logic for no images
old_fallback = '''                } else {
                    // Fallback if no images
                    feedback.textContent = qData.successMsg;
                    feedback.classList.add('success');
                    submitBtn.style.display = 'none';
                    nextBtn.style.display = 'inline-block';
                }'''

new_fallback = '''                } else {
                    // Fallback if no images
                    feedback.textContent = qData.successMsg;
                    feedback.classList.add('success');
                    submitBtn.style.display = 'none';
                    
                    setTimeout(() => {
                        currentQ++;
                        renderQuestion();
                    }, 500);
                }'''

js = js.replace(old_fallback, new_fallback)

# 4. Add margin-top to new questions
old_render = '''        let block = document.createElement('div');
        block.className = 'question-block';
        
        let html = `'''

new_render = '''        let block = document.createElement('div');
        block.className = 'question-block';
        
        // Add huge margin for continuous scrolling experience
        if (currentQ > 0) {
            block.style.marginTop = "150vh"; // 1.5 screens down
        }
        
        let html = `'''

js = js.replace(old_render, new_render)

with open('script.js', 'w', encoding='utf-8') as f:
    f.write(js)

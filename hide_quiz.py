import re

with open('script.js', 'r', encoding='utf-8') as f:
    js = f.read()

old_logic = '''            if (isCorrect) {
                feedback.textContent = qData.successMsg;
                feedback.classList.add('success');
                submitBtn.style.display = 'none';'''

new_logic = '''            if (isCorrect) {
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
'''

js = js.replace(old_logic, new_logic)

with open('script.js', 'w', encoding='utf-8') as f:
    f.write(js)

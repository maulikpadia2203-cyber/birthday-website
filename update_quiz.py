import re

with open('script.js', 'r', encoding='utf-8') as f:
    content = f.read()

# 1. Add successImages to Q1
q1_success = ",\n            successImages: [ 'images/q1_ans1.jpg', 'images/q1_ans2.jpg', 'images/q1_ans3.jpg', 'images/q1_ans4.jpg', 'images/q1_ans5.jpg', 'images/q1_ans6.jpg', 'images/q1_ans7.jpg', 'images/q1_ans8.jpg', 'images/q1_ans9.jpg', 'images/q1_ans10.jpg', 'images/q1_ans11.jpg', 'images/q1_ans12.jpg' ]\n        },"
content = content.replace('successMsg: "Bilkul Sahi! ✨"\n        },', 'successMsg: "Bilkul Sahi! ✨"' + q1_success)

# 2. Add #success-gallery and #next-btn
old_inner = '''        quizContainer.innerHTML = `
            <div class="quiz-progress">Sawalon Ka Safar: ${currentQ + 1} / ${CONFIG.quiz.length}</div>
            <h2>${qData.question}</h2>
            ${uiHtml}
            <button id="quiz-submit" class="btn-primary mt-3">Submit</button>
            <p id="quiz-feedback" class="feedback-msg"></p>
        `;

        // Add event listeners
        const submitBtn = document.getElementById('quiz-submit');
        submitBtn.addEventListener('click', checkQuizAnswer);'''

new_inner = '''        quizContainer.innerHTML = `
            <div class="quiz-progress">Sawalon Ka Safar: ${currentQ + 1} / ${CONFIG.quiz.length}</div>
            <h2>${qData.question}</h2>
            ${uiHtml}
            <button id="quiz-submit" class="btn-primary mt-3">Submit</button>
            <p id="quiz-feedback" class="feedback-msg"></p>
            <div id="success-gallery" class="success-gallery" style="display: none;"></div>
            <button id="next-btn" class="btn-primary mt-4" style="display: none; background: var(--rose);">Aage Badho ➡️</button>
        `;

        // Add event listeners
        const submitBtn = document.getElementById('quiz-submit');
        submitBtn.addEventListener('click', checkQuizAnswer);
        
        document.getElementById('next-btn').addEventListener('click', () => {
            currentQ++;
            renderQuestion();
        });'''

content = content.replace(old_inner, new_inner)

# 3. Update checkQuizAnswer success block
old_success = '''        if (isCorrect) {
            feedback.textContent = qData.successMsg;
            feedback.classList.add('success');
            document.getElementById('quiz-submit').disabled = true;
            createShootingStar();
            createShootingStar();
            
            setTimeout(() => {
                currentQ++;
                renderQuestion();
            }, 2000);
        } else {'''

new_success = '''        if (isCorrect) {
            feedback.textContent = qData.successMsg;
            feedback.classList.add('success');
            document.getElementById('quiz-submit').style.display = 'none';
            createShootingStar();
            createShootingStar();
            
            if (qData.successImages && qData.successImages.length > 0) {
                const gallery = document.getElementById('success-gallery');
                gallery.innerHTML = qData.successImages.map(img => `<img src="${img}">`).join('');
                gallery.style.display = 'grid';
            }
            
            document.getElementById('next-btn').style.display = 'inline-block';
            
        } else {'''

content = content.replace(old_success, new_success)

with open('script.js', 'w', encoding='utf-8') as f:
    f.write(content)

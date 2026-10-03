import re

with open('script.js', 'r', encoding='utf-8') as f:
    content = f.read()

new_logic = '''    function renderQuestion() {
        if (currentQ >= CONFIG.quiz.length) {
            const finalBlock = document.createElement('div');
            finalBlock.className = "question-block mt-5";
            finalBlock.style.textAlign = "center";
            finalBlock.innerHTML = `
                <h2 class="glow-text">Happy Birthday, ${CONFIG.naam}! 🎉</h2>
                <p class="story-text mt-3" style="font-size: 1.5rem;">Sare tare jag gaye hain, aasmaan roshan hai.</p>
                <p class="feedback-msg success">I love you! ❤️</p>
            `;
            quizContainer.appendChild(finalBlock);
            for(let i=0; i<30; i++) setTimeout(createShootingStar, i*100);
            setTimeout(() => finalBlock.scrollIntoView({ behavior: 'smooth', block: 'center' }), 100);
            return;
        }

        const qData = CONFIG.quiz[currentQ];
        let uiHtml = '';

        if (qData.type === 'multiple-choice') {
            uiHtml = `<div class="options-container">`;
            qData.options.forEach(opt => {
                uiHtml += `<label class="option-label"><input type="checkbox" value="${opt.id}" class="q-checkbox"> ${opt.text}</label>`;
            });
            uiHtml += `</div>`;
        } else if (qData.type === 'image-choice') {
            uiHtml = `<div class="image-options">`;
            qData.images.forEach(img => {
                uiHtml += `<img src="${img.src}" class="img-option" data-id="${img.id}">`;
            });
            uiHtml += `</div>`;
        } else {
            uiHtml = `<div class="input-group">
                <input type="text" class="quiz-input" placeholder="Yahan jawab likho..." autocomplete="off">
            </div>`;
        }

        const block = document.createElement('div');
        block.className = "question-block mt-5";
        block.innerHTML = `
            <div class="quiz-progress">Sawalon Ka Safar: ${currentQ + 1} / ${CONFIG.quiz.length}</div>
            <h2>${qData.question}</h2>
            ${uiHtml}
            <button class="btn-primary mt-3 submit-btn">Submit</button>
            <p class="feedback-msg"></p>
            <div class="success-gallery" style="display: none;"></div>
            <button class="btn-primary mt-4 next-btn" style="display: none; background: var(--rose);">Aage Badho ➡️</button>
        `;

        // Only clear container if it's the first question
        if (currentQ === 0) {
            quizContainer.innerHTML = '';
        }
        quizContainer.appendChild(block);

        setTimeout(() => block.scrollIntoView({ behavior: 'smooth', block: 'start' }), 100);

        const submitBtn = block.querySelector('.submit-btn');
        const feedback = block.querySelector('.feedback-msg');
        const gallery = block.querySelector('.success-gallery');
        const nextBtn = block.querySelector('.next-btn');

        if (qData.type === 'image-choice') {
            const imgs = block.querySelectorAll('.img-option');
            imgs.forEach(img => {
                img.addEventListener('click', () => {
                    imgs.forEach(i => i.classList.remove('selected'));
                    img.classList.add('selected');
                });
            });
        }

        submitBtn.addEventListener('click', () => {
            let isCorrect = false;
            if (qData.type === 'multiple-choice') {
                const checked = Array.from(block.querySelectorAll('.q-checkbox:checked')).map(cb => cb.value);
                const correct = qData.correctAnswers;
                if (checked.length === correct.length && checked.every(v => correct.includes(v))) {
                    isCorrect = true;
                }
            } else if (qData.type === 'image-choice') {
                const selected = block.querySelector('.img-option.selected');
                if (selected && qData.correctAnswers.includes(selected.dataset.id)) {
                    isCorrect = true;
                }
            } else {
                const val = block.querySelector('.quiz-input').value.toLowerCase().trim();
                if (qData.correctAnswers.some(ans => val.includes(ans.toLowerCase()))) {
                    isCorrect = true;
                }
            }

            if (isCorrect) {
                feedback.textContent = qData.successMsg;
                feedback.classList.add('success');
                submitBtn.style.display = 'none';
                createShootingStar();
                createShootingStar();
                
                if (qData.successImages && qData.successImages.length > 0) {
                    gallery.innerHTML = qData.successImages.map(img => `<img src="${img}">`).join('');
                    gallery.style.display = 'grid';
                }
                nextBtn.style.display = 'inline-block';
            } else {
                feedback.textContent = qData.hint;
            }
        });

        nextBtn.addEventListener('click', () => {
            nextBtn.style.display = 'none';
            currentQ++;
            renderQuestion();
        });
    }

    renderQuestion();'''

content = re.sub(r'    function renderQuestion\(\) \{.*    renderQuestion\(\);', new_logic, content, flags=re.DOTALL)

with open('script.js', 'w', encoding='utf-8') as f:
    f.write(content)

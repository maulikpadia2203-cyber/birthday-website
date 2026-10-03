with open('script.js', 'r', encoding='utf-8') as f:
    js = f.read()

bad_logic = '''        if (currentQ >= CONFIG.quiz.length) {
            const finalBlock = document.createElement('div');
            finalblock.className = "question-block mt-5";
        if (currentQ > 0) block.style.marginTop = "150vh";
            finalBlock.style.textAlign = "center";'''

good_logic = '''        if (currentQ >= CONFIG.quiz.length) {
            const finalBlock = document.createElement('div');
            finalBlock.className = "question-block mt-5";
            if (currentQ > 0) finalBlock.style.marginTop = "150vh";
            finalBlock.style.textAlign = "center";'''

js = js.replace(bad_logic, good_logic)

with open('script.js', 'w', encoding='utf-8') as f:
    f.write(js)

import re

with open('script.js', 'r', encoding='utf-8') as f:
    js = f.read()

# Remove the H2 containing successMsg ("Bilkul Sahi! ?")
old_html = '''                    block.innerHTML = `
                        <h2 class="glow-text mb-5 text-center" style="font-size: 2.5rem;">${qData.successMsg}</h2>
                        <div class="orbit-gallery"'''

new_html = '''                    block.innerHTML = `
                        <div class="orbit-gallery"'''

js = js.replace(old_html, new_html)

# Also fix the quizContainer background
# I will append quizContainer styles right after block styles
old_styles = '''                    block.style.background = "transparent"; block.style.boxShadow = "none";

                    block.innerHTML = `'''

new_styles = '''                    block.style.background = "transparent"; block.style.boxShadow = "none";
                    
                    let qc = document.getElementById('quiz-container');
                    if(qc) {
                        qc.style.background = 'transparent';
                        qc.style.boxShadow = 'none';
                        qc.style.border = 'none';
                    }

                    block.innerHTML = `'''

js = js.replace(old_styles, new_styles)

with open('script.js', 'w', encoding='utf-8') as f:
    f.write(js)

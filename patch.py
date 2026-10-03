with open('script.js', 'r', encoding='utf-8') as f:
    content = f.read()

content = content.replace('successMsg: "Bilkul Sahi! ✨"', 'successMsg: "Bilkul Sahi! ✨",\n            successImages: ["images/q1_ans1.jpg","images/q1_ans2.jpg","images/q1_ans3.jpg","images/q1_ans4.jpg","images/q1_ans5.jpg","images/q1_ans6.jpg","images/q1_ans7.jpg","images/q1_ans8.jpg","images/q1_ans9.jpg","images/q1_ans10.jpg","images/q1_ans11.jpg","images/q1_ans12.jpg"]')

with open('script.js', 'w', encoding='utf-8') as f:
    f.write(content)

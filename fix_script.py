with open('script.js', 'r', encoding='utf-8') as f:
    content = f.read()

import re

# We need to replace that garbage block back to the proper array.
new_val = "successImages: ['images/q1_photos/1.jpg','images/q1_photos/2.jpg','images/q1_photos/3.jpg','images/q1_photos/4.jpg','images/q1_photos/5.jpg','images/q1_photos/6.jpg','images/q1_photos/7.jpg','images/q1_photos/8.jpg','images/q1_photos/9.jpg','images/q1_photos/10.jpg','images/q1_photos/11.jpg','images/q1_photos/12.jpg']\n        },"

content = re.sub(r"successImages: \[\s*param\(\$match\).*?\],\s*", new_val, content, flags=re.DOTALL)

with open('script.js', 'w', encoding='utf-8') as f:
    f.write(content)

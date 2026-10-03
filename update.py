import sys, re
with open('script.js', 'r', encoding='utf-8') as f:
    content = f.read()

new_photos = '''    photos: [
        { src: "images/p1.jpg", date: "12 Dec 2023", note: "Mari cuteeeee sache bauu cute lage cheeee bachaaa aama bhale me aane chidava game te kidhu hoyyy butt dhinglu che marruuuuu 🥹😘😘☺️" },
        { src: "images/p2.jpg", date: "25 Jan 2024", note: "Bacha tane tara 22 year pura thaya pan tu sache j haji bi aavi j cute lage che ☺️😊 sachu kauu to kyare k to mane am thay che ke tu sache j mari bachuu 🐥(i love you bachaaaa🥹)" },
        { src: "images/p3.jpg", date: "14 Feb 2024", note: "Aama to mari radha etli pyari pyari lage che ne sache jo tari smile ayyyyyyy hyyyyyyy 😌 joi ne khushi thay che mane to joii ne aavu j feel thayu jane mari j rah naii joti m j lage che hmana maro kano aavse 🤣" },
        { src: "images/p4.jpg", date: "10 Mar 2024", note: "i feel ki tu nan pan thi j mane joii gaii haiis ne tane khabar padi gaii che ke aane mare  sidho karvo padse atle jo kevuu kamre hath rakhi ne ready che ke mane to su naii sidho dor kari daiss sache mane bauuj game ki hun maru dhyan naii rakhu netyare mane khijaii ne bolee bauu cuteeeee lage che bachaaaa😎😊" },
        { src: "images/p5.jpg", date: "05 Apr 2024", note: "Namaste namaste pele thi j election ma javu che ke su taree mane keje mara ma bhi raj yog bane che to bane jode rajniti ma aavsuuu 🤭🤭🤭🤭🤭🤭" }
    ],'''

content = re.sub(r'    photos: \[.*?    \],', new_photos, content, flags=re.DOTALL)

with open('script.js', 'w', encoding='utf-8') as f:
    f.write(content)

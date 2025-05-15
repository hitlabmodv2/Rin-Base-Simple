
<p align="center">
  <img src="https://files.catbox.moe/hubkvg.jpg" width="250"/>
</p>

<h1 align="center">Rin Okumura - WhatsApp Bot</h1>


---

## 👤 Owner

> GitHub: [LeooxzyDekuu](https://github.com/LeooxzyDekuu.png)  
> Project: **Rin Okumura WhatsApp Bot**

---

> A powerful modular WhatsApp bot using JavaScript, built with a plugin system for maximum flexibility. Inspired by **Rin Okumura** from *Blue Exorcist*, this bot brings both fire and discipline to your chats!

---

## 📌 Features

- Plugin-based architecture
- Written in JavaScript
- CommonJS & ESModule compatible
- Easy command creation
- Inspired by anime character Rin Okumura

---

## ⚙️ Config.js

```javascript
const config = {
    owner: ["6282172589188"],
    name: "Rin-Kun",
    ownername: 'Leooxzy', 
    ownername2: 'Dxyz',
    image: { url: 'https://i.pinimg.com/1200x/a0/91/28/a09128ba3e6cb7b34f6df2f2c9938410.jpg' }, //thumbnail: fs.readFileSync('./image/tambahkan-ft-trus-kasih-nama')
    thumbnail: {
      thumbnailUrl: 'https://i.pinimg.com/1200x/a0/91/28/a09128ba3e6cb7b34f6df2f2c9938410.jpg'
      //thumbnail: fs.readFileSync('./image/tambahkan-ft-trus-kasih-nama')
    },
    prefix: [".", "?", "!", "/", "#"], //Tambahin sendiri prefix nya kalo kurang
    wagc: [ "https://chat.whatsapp.com/JyeT1hdCPJeLy95tzx5eyI", "https://chat.whatsapp.com/DfffgArbTUu46nqCgmCbE0" ],
    saluran: '120363279195205552@newsletter', 
    jidgroupnotif: '120363266755712733@g.us', 
    saluran2: '120363335701540699@newsletter', 
    jidgroup: '120363267102694949@g.us', 
    wach: 'https://whatsapp.com/channel/0029VadFS3r89inc7Jjus03W', 
    sessions: "sessions",
    groq: {
     api: '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'
    },
    link: {
     tt: "https://www.tiktok.com/@leooxzy_ganz/"
    },
    sticker: {
      packname: "〆 Rin-Kun",
      author: "By: Deku/Dxyz 〆"
    },
   messages: {
      wait: "*( Loading )* Tunggu Sebentar...",
      owner: "*( Denied )* Kamu bukan owner ku !",
      premium: "*( Denied )* Fitur ini khusus user premium",
      group: "*( Denied )* Fitur ini khusus group",
      botAdmin: "*( Denied )* Lu siapa bukan Admin group",
      grootbotbup: "*( Denied )* Jadiin Yuta-Botz admin dulu baru bisa akses",
   },
   database: "hanako-db",
   tz: "Asia/Jakarta"
}

module.exports = config
```

## ⚙️ Installation
```bash
$ git clone https://github.com/FrankXz12/HanakoBotz
$ cd HanakoBotz
$ npm install
$ npm start
```

## 🌐 Commonjs Module Example File .js

## 🧠 Example Plugin (No Regex)

```javascript
let handler = async (m, { conn, ctx, client, sock, text, Func, config, Scraper }) => {
  // code
};

handler.command = ['expired', 'exp'];
handler.help = ['expired', 'exp'];
handler.tags = ['run'];
handler.limit = false;
handler.loading = false;
handler.owner = false;
handler.group = false;
handler.admin = false;
handler.botAdmin = false;

module.exports = handler;
```

---

## ⚡ Example Plugin (With Regex)

```javascript
let handler = async (m, { conn, ctx, client, sock, text, Func, config, Scraper }) => {
  // code
};

handler.command = /^(expired|exp)$/i;
handler.help = ['expired', 'exp'];
handler.tags = ['run'];
handler.limit = false;
handler.loading = false;
handler.owner = false;
handler.group = false;
handler.admin = false;
handler.botAdmin = false;

module.exports = handler;
```

---

## 🌐 ECMAScript Module Example File .mjs

## 🧠 Example Plugin (No Regex)

```javascript
let handler = async (m, { conn, ctx, client, sock, text, Func, config, Scraper }) => {
  // code
};

handler.command = ['expired', 'exp'];
handler.help = ['expired', 'exp'];
handler.tags = ['run'];
handler.limit = false;
handler.loading = false;
handler.owner = false;
handler.group = false;
handler.admin = false;
handler.botAdmin = false;

export default handler;
```

---

## ⚡ Example Plugin (With Regex)

```javascript
let handler = async (m, { conn, ctx, client, sock, text, Func, config, Scraper }) => {
  // code
};

handler.command = /^(expired|exp)$/i;
handler.help = ['expired', 'exp'];
handler.tags = ['run'];
handler.limit = false;
handler.loading = false;
handler.owner = false;
handler.group = false;
handler.admin = false;
handler.botAdmin = false;

export default handler;
```

---

## 💡 Menu Command

```
.menu       - Show main menu
.menu all   - Show all commands
.menu tags  - Show commands by tags
```

---


## 👥 All Contributors
[![LeooxzyDekuu](https://github.com/LeooxzyDekuu.png?size=100)](https://github.com/LeooxzyDekuu) | [![AxellNetwork](https://github.com/AxellNetwork.png?size=100)](https://github.com/AxellNetwork) | [![AndhikaGG](https://github.com/AndhikaGG.png?size=100)](https://github.com/AndhikaGG)  
---|---|---  
[LeooxzyDekuu](https://github.com/LeooxzyDekuu) | [AxellNetwork](https://github.com/AxellNetwork) | [AndhikaGG](https://github.com/AndhikaGG)  
Remake Base | Base Script | Penyumbang fitur

---

> *"The flames of the exorcist will guide your command. Don't fear the demon, become the master."*

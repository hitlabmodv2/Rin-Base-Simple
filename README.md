
<p align="center">
  <img src="https://files.catbox.moe/hubkvg.jpg" width="250"/>
</p>

<h1 align="center">Rin Okumura - WhatsApp Bot</h1>


---

## 👤 Owner

> GitHub: [LeooxzyDekuu](https://github.com/LeooxzyDekuu.png)  
> Project: **Rin Okumura WhatsApp Bot**

---

> Bot WhatsApp modular yang kuat menggunakan JavaScript, dibuat dengan sistem plugin untuk fleksibilitas maksimal. Terinspirasi oleh **Rin Okumura** dari *Blue Exorcist*, bot ini menghadirkan semangat dan disiplin dalam obrolan Anda!

---

## 📌 Features

- Arsitektur berbasis plugin
- Ditulis dalam JavaScript
- Kompatibel dengan CommonJS & ESModule
- Pembuatan perintah yang mudah
- Terinspirasi oleh karakter anime Rin Okumura

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
    isQr = true,
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

## ⚙️ Install
```bash
$ git clone https://github.com/FrankXz12/HanakoBotz
$ cd HanakoBotz
$ npm install
$ npm start
```

## 🌐 Commonjs Example File .js

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

## 💡 Command Fitur Plugin/Scrape

```Plugin
.plugin - buat liat list plugins
.plugin --add file/file.js / .plugin --add file/file.mjs - Buat Add Fitur
.plugin --get file/file.js / .plugin --get file/file.mjs - Buat Get Fitur
.plugin --delete file/file.js / .plugin --delete file/file.mjs - Buat Delete Fitur
```

```Scrape
.skrep - buat liat list skrep
.skrep --add file/file.js / .skrep --add file/file.mjs - Buat Add Skrep
.skrep --get file/file.js / .skrep --get file/file.mjs - Buat Get Skrep
.skrep --delete file/file.js / .skrep --delete file/file.mjs - Buat Delete Skrep
```

---

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

> *"Api pengusir setan akan menuntun perintahmu. Jangan takut pada iblis, jadilah tuan."*

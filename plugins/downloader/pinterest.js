// © HanakoBotz
// • By: Leooxzy - Deku
// • Owner: 6283136099660

// By: Leooxzy
// Bio cr: Krz

let deku = async (m, {
    conn,
    Func,
    Scraper,
    config,
    text,
    Uploader
}) => {
    if (!text) throw "> Masukan query/link dari pinterest !"
    if (Func.isUrl(text)) {
        if (!/pinterest.com|pin.it/.test(text)) throw "> Masukan link dari pinterest !";
        let data = await Scraper.pinterest.download(text);
        let cap = "*– 乂 Pinterest - Downloader*\n"
        cap += `> *-* Title : ${data.title}\n`
        cap += `> *-* Keyword : ${data.keyword.join(", ")}\n`
        cap += `> *-* Author : ${data.author.name}\n`

        conn.sendFile(m.cht, data.download, null, cap, m);
    } else {
        const a = await Scraper.pinterest.search(text);
        let pickget = a.pins[Math.floor(Math.random() * a.pins.length)];
        const result = pickget.media.images.orig.url
        if (!result && !result.length > 0) throw 'maaf yg anda search tidak di temukan😹';
        let cap = `🔍 Search [ ${text} ]`;
        cap += `\n> Kalau Kamu Salah Dan Ga Suka\n> Ketik \`[ Next / Lanjut ]\``;

        await conn.sendAliasMessage(m.cht, {
            image: {
                url: result
            },
            caption: cap
        }, [{
            alias: `next`,
            response: `${m.prefix + m.command} ${text}`
        }, {
            alias: `lanjut`,
            response: `${m.prefix + m.command} ${text}`
        }], m);
    }
}

deku.command = ["pinterest", "pin", "pindl"];
deku.help = ["pinterest", "pin", "pindl"].map(v => v + ' *[ Search/Download Pinterest ]* ');
deku.tags = ["downloader", "internet"];

deku.limit = true;
deku.loading = true;

module.exports = deku;

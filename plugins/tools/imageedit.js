// © HanakoBotz
// • By: Leooxzy - Deku
// • Owner: 6283136099660

// By: Leooxzy
// Bio cr: Krz

const gemini = require('btch-gemini');
const uploader = require('cloudku-uploader');

let handler = async (m, { ctx, text }) => {
    if (!text) throw '⚠️Kirim Gambar/Reply Gambar Dan Masukan Teks Prompt Nya !'
    let quoted = m.isQuoted ? m.quoted : m;
    const url = await uploader(await quoted.download());

    await gemini.gemini_imgedit(text, url.result.url).then(async (a) => {
        await ctx.sendMessage(m.chat, {
            image: a,
            caption: '📝Request: ' + text
        }, {
            quoted: m
        });
    });
};

handler.help = ['imageedit', 'imgedt'].map(v => v + ' *[ Buat Edit Foto Orang Atau Anime ]* ');
handler.command = ['imageedit', 'imgedt'];
handler.tags = ['tools'];
handler.loading = true;

module.exports = handler;

// © HanakoBotz
// • By: Leooxzy - Deku
// • Owner: 6283136099660

// By: Leooxzy
// Bio cr: Krz

import gemini from 'btch-gemini';
import cloudku from 'cloudku-uploader';

export default {
    help: ['ocr', 'copygambarimage'].map(v => `${v} *[ Buat Copy Gambar Teks ]*`),
    command: ['ocr', 'copygambarimage'],
    tags: ['tools'],
    code: async (m, {
        conn
    }) => {
        await conn.sendMessage(m.chat, {
            react: {
                text: '🕒',
                key: m.key
            }
        });

        const client = m.isQuoted ? m.quoted : m;
        if (!/image/.test(client.msg.mimetype)) throw 'Maaf, kirim atau reply gambar untuk OCR!';
        try {
            const media = await client.download();
            const tourl = await cloudku(media);

            const prompt = 'OCR gambar ini tanpa kata-kata tambahan, hanya teks dari gambar.';
            const result = await gemini.gemini_image(prompt, tourl.result.url);

            m.reply(result.content);
        } catch (e) {
            m.reply('❌ Maaf, terjadi kesalahan. Mungkin terlalu banyak request.');
            console.error('Error:', e);
        }
    }
};

// 🔥® Rin-Okumura™ 🔥
// 👿 Creator: Dxyz
// ⚡ Plugin: downloader/play.mjs

import axios from 'axios';
import fs from 'fs';

let yukio = async (m, {
    conn,
    text,
    Scraper,
    Uploader,
    Func
}) => {
    switch (m.command) {
        case 'play': {
            if (!text) throw '⚠️Masukan Nama Lagu Yg Pengen Anda Cari !'
            const {
                all
            } = await (await import('yt-search')).default({
                search: text,
                hl: 'id',
                gl: 'ID'
            });
            if (!all && all.length > 0) throw '⚠️Maaf Lagu Yang Anda Search Tidak Di Temukan !'
            const result = all[0];
            let caption = `\`🔥━━━━━━━━━━━━━━━━━━🔥
   👹 *RIN'S PLAYER* 👹
🔥━━━━━━━━━━━━━━━━━━🔥

🗡️ *Title:* ${result.title || ''}
💢 *Video ID:* ${result.videoId || ''}
👿 *Author:* ${result.author.name || ''}
🔪 *URL:* ${result.url || ''}
⚔️ *Type:* Audio

🔥━━━━━━━━━━━━━━━━━━🔥
"Let's rock, human!" - Rin
🔥━━━━━━━━━━━━━━━━━━🔥\``;
            conn.sendMessage(m.chat, {
                text: caption,
                contextInfo: {
                    isForwarded: true,
                    forwardingScore: 99999,
                    externalAdReply: {
                        title: result.title,
                        body: result.timestamp + ' / ' + result.author.name + ' / ' + result.type,
                        mediaType: 1,
                        thumbnailUrl: result.thumbnail,
                        renderLargerThumbnail: true,
                        sourceUrl: result.url
                    }
                }
            }, {
                quoted: m
            });

            let ytdl;
            let format;
            try {
                const {
                    result: savetube
                } = await Scraper.savetube.download(result.url, "mp3");
                format = 'mp3';
                ytdl = savetube.download;
            } catch (e) {
                try {
                    const ddownr = await Scraper.ddownr.download(result.url, 'mp3');
                    format = 'mp3';
                    ytdl = ddownr.downloadUrl;
                } catch (e) {}
            }
            const buff = await axios.get(ytdl, {
                responseType: 'arraybuffer'
            });
            const array = Buffer.from(buff.data)
            const size = await Func.formatSize(array.length);
            conn.sendMessage(m.chat, {
                audio: Buffer.from(array),
                mimetype: 'audio/mpeg',
                contextInfo: {
                    isForwarded: true,
                    forwardingScore: 99999,
                    externalAdReply: {
                        title: result.title,
                        body: result.timestamp + ' / ' + size + ' / ' + format,
                        mediaType: 1,
                        thumbnailUrl: result.thumbnail,
                        renderLargerThumbnail: false,
                        sourceUrl: result.url
                    }
                }
            }, {
                quoted: m
            });
        }
        break;
        case 'spotifyplay':
        case 'splay': {
            let outputPath = `./tmp/spotify-${Date.now()}.mp3`
            
            const search = await Scraper.spotify.search(text);
            if (!search && !search.length > 0) throw '⚠️ Maaf Lagu Yg Anda Search Tidak Di Temukan';
            const { metadata: detail } = await Scraper.spotify.download(search[0].url);

            const caption = `╭───────────────────────────────╮
│  🔥 RIN'S SPOTIFY DOWNLOADER  │
├───────────────────────────────┤
│ 🎵 ${detail.name || ''}               │
│ 🎤 ${detail.artist || ''}          │
│ 💿 ${detail.album_name || ''} │
│ 🔗 ${detail.url || ''} │
├───────────────────────────────┤
│ 🗡️ (•̀ᴗ•́)و ︻デ═一            │
│ 📥 Downloading...              │
│ 💽 Format: MP3               │
╰───────────────────────────────╯
"Not bad... for human music." - Rin Okumura`;
            ctx.reply(m.chat, caption, m);
            const { download: spdl } = await Scraper.spotify.download(detail.url);
            const media = await axios.get(spdl.file_url, { responseType: 'arraybuffer' });
            await fs.writeFileSync(outputPath, media.data);
            let audio = await fs.readFileSync(outputPath);

            conn.sendMessage(m.chat, {
               audio: Buffer.from(audio),
               mimetype: 'audio/mpeg'
            }, {
                quoted: m
            });
            await conn.delay(200);
            await fs.unlinkSync(outputPath);
        }
        break;
    };
};

yukio.help = ["play", "spotifyplay", "splay"].map(v => v + ' *[ Request Lagu Yt Yg Pengen Di Putar ]* ');
yukio.tags = ["downloader", "internet"];
yukio.command = ["play", "spotifyplay", "splay"];
yukio.loading = true;
yukio.limit = true;

export default yukio;

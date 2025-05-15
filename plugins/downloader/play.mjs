// 🔥® Rin-Okumura™ 🔥
// 👿 Creator: Dxyz
// ⚡ Plugin: downloader/play.mjs

import axios from 'axios';

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
            let api = 'https://spotifyapi.caliphdev.com'
            if (!text) throw '⚠️Masukan Nama Lagu Yg Pengen Anda Cari !'
            const {
                data: search
            } = await axios(api + '/api/search/tracks', {
                post: 'GET',
                params: {
                    q: text
                }
            });
            if (!search && !search.length > 0) throw '⚠️ Maaf Lagu Yg Anda Search Tidak Di Temukan';
            const {
                data: detail
            } = await axios(api + '/api/info/track', {
                post: 'GET',
                params: {
                    url: search[0].url
                }
            });

            let linkurl;
            try {
                const {
                    result: spdl
                } = await Scraper.spotiDown(detail.url)
                linkurl = spdl.download
            } catch (e) {
                try {
                    linkurl = `${api + '/api/download/track?url=' + detail.url}`
                } catch (e) {}
            }
            const caption = `📁 Spotify Downloader
> • *Title:* ${detail.title || ''}
> • *Artist:* ${detail.artist || ''}
> • *Album:* ${detail.album || ''}
> • *Url:* ${detail.url || ''}
> • *Link-Download:* ${linkurl || ''}`;
            m.reply(caption);
            let audio;
            try {
                const {
                    result: spdl
                } = await Scraper.spotiDown(detail.url)
                audio = {
                    url: spdl.download
                }
            } catch (e) {
                try {
                    const {
                        data
                    } = await axios(api + '/api/download/track', {
                        post: 'GET',
                        params: {
                            url: detail.url
                        },
                        responseType: 'arraybuffer'
                    });
                    audio = await Buffer.from(data)
                } catch (e) {}
            }

            conn.sendMessage(m.chat, {
                audio,
                mimetype: 'audio/mpeg'
            }, {
                quoted: m
            });
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

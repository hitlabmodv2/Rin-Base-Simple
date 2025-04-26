// © HanakoBotz
// • By: Leooxzy - Deku
// • Owner: 6283136099660

// By: Leooxzy
// Bio cr: Krz


let axios = require('axios');

let yukio = async (m, {
    conn,
    text,
    Scraper,
    Uploader,
    Func
}) => {
    switch (m.command) {
        case 'ytmp4':
        case 'ytv': {
            if (!text.includes('youtu')) throw '⚠️Masukan Masukan Link Yt !'
            const regex = /(?:https?:\/\/)?(?:www\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=|shorts\/))([^\?&]+)(?:\?is=[^&]*)?(?:\?si=[^&]*)?(?:&.*)?/;
            const videoId = text.match(regex);
            const result = await require('yt-search')({
                videoId: videoId[1],
                hl: 'id',
                gl: 'ID'
            });
            if (!result) throw '⚠️Maaf Link Lagu Tidak Dapat Di Download'
            let caption = `📁 Download YouTube
> • *Title:* ${result.title || ''}
> • *Id:* ${result.videoId || ''}
> • *Ago:* ${result.ago || ''}
> • *Author:* ${result.author.name || ''}
> • *Url:* ${result.url || ''}`;
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
                    } = await Scraper.savetube.download(text, "720");
                    format = 'mp3';
                    ytdl = savetube.download;
                } catch (e) {
                    try {
                        const ddownr = await Scraper.ddownr.download(text, '720');
                        format = '720';
                        ytdl = ddownr.downloadUrl;
                    } catch (e) {}
                }
            const buff = await axios.get(ytdl, {
                responseType: 'arraybuffer'
            });
            const array = Buffer.from(buff.data)
            const url = await Uploader.tmpfiles(array);
            const size = await Func.getSize(url);
            if (size > 100 * 1024 * 1024) {
                await sock.sendMessage(m.chat, {
                    document: Buffer.from(buff.data),
                    mimetype: "video/mp4",
                    fileName: `${result.title}.mp4`,
                }, {
                    quoted: m
                });
            } else {
                conn.sendMessage(m.chat, {
                    video: Buffer.from(buff.data),
                    caption: 'Title: ' + result.title,
                }, {
                    quoted: m
                });
            }
        }
        break;
        case 'ytmp3':
        case 'yta': {
            if (!text.includes('youtu')) throw '⚠️Masukan Masukan Link Yt !';
            const regex = /(?:https?:\/\/)?(?:www\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=|shorts\/))([^\?&]+)(?:\?is=[^&]*)?(?:\?si=[^&]*)?(?:&.*)?/;
            const videoId = text.match(regex);
            const result = await require('yt-search')({
                videoId: videoId[1],
                hl: 'id',
                gl: 'ID'
            });
            if (!result) throw '⚠️Maaf Link Video Tidak Dapat Di Download'
            let caption = `📁 Download YouTube
> • *Title:* ${result.title || ''}
> • *Id:* ${result.videoId || ''}
> • *Ago:* ${result.ago || ''}
> • *Author:* ${result.author.name || ''}
> • *Url:* ${result.url || ''}`;
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
                    } = await Scraper.savetube.download(text, "mp3");
                    format = 'mp3';
                    ytdl = savetube.download;
                } catch (e) {
                    try {
                        const ddownr = await Scraper.ddownr.download(finalUrl, 'mp3');
                        format = 'mp3';
                        ytdl = ddownr.downloadUrl;
                    } catch (e) {}
                }

            const buff = await axios.get(ytdl, {
                responseType: 'arraybuffer'
            });
            const url = await Uploader.tmpfiles(buff.data);
            const size = await Func.getSize(url);
            if (size > 100 * 1024 * 1024) {
                await sock.sendMessage(m.cht, {
                    document: Buffer.from(buff.data),
                    mimetype: "audio/mpeg",
                    fileName: `${result.title}.mp3`,
                }, {
                    quoted: m
                });
            } else {
                await conn.sendMessage(m.chat, {
                    audio: Buffer.from(buff.data),
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
        }
        break;
    }
};

yukio.help = ["ytmp3", "ytmp4", "yta", "ytv"].map(v => v + ' *[ Request Lagu Yt Yg Pengen Di Putar ]* ');
yukio.tags = ["downloader"];
yukio.command = ["ytmp3", "ytmp4", "yta", "ytv"];
yukio.loading = true;
yukio.limit = true;

module.exports = yukio;

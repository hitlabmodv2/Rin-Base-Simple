// © HanakoBotz
// • By: Leooxzy - Deku
// • Owner: 6283136099660

// By: Leooxzy
// Bio cr: Krz

class RinOkumura {
    constructor() {
        this.help = ["tiktok", "tt", "ttdl"].map(v => v + ' *[ Buat Downloader Tiktok ]* ')
        this.tags = ["downloader"]
        this.command = ["tiktok", "tt", "ttdl"]
        this.loading = true
        this.limit = true
    }
    code = async (m, {
        conn,
        text,
        Scraper
    }) => {
        if (!text.includes('tiktok')) throw '⚠️Masukan Link TikTok !'
        const isHd = m.args.includes("--hd");
        const input = text.replace(/--\w+(\=\w+)?/g, "").trim();
        const meta = await metadata(input)
        const ttsave = await Scraper.ttsave(input)

        let caption = `📁 Downloader Tiktok
> • *Title:* ${meta.title || ''}
> • *Author:* ${meta.author.nickname || ''}`;

        if (ttsave.type === "video") {
            caption += `\n> • *Type:* Video`;
            await conn.sendMessage(m.chat, {
                video: {
                    url: ttsave.videoInfo.nowm
                },
                caption,
            }, {
                quoted: m
            });
            await conn.sendMessage(m.chat, {
                audio: {
                    url: ttsave.dlink.audio
                },
                mimetype: 'audio/mpeg'
            }, {
                quoted: m
            });
        } else if (ttsave.type === "slide") {
            caption += `\n> • *Type:* Image`
            for (let i of ttsave.slides) {
                await conn.sendMessage(m.cht, {
                    image: {
                        url: i.url
                    },
                    caption
                }, {
                    quoted: m
                });
            }
        }
    };
};

async function metadata(url) {
    let axios = require('axios');
    let retries = 0;
    let response;
    let maxRetries = 10;
    let retryDelay = 4000;
    while (retries < maxRetries) {
        try {
            response = await axios(`https://tikwm.com/api/?url=${url}`).catch(e => e.response);
            if (response && response.data && response.data.data) {
                return response.data.data;
            } else if (response && response.data && response.data.msg) {
                console.error(`Error from API: ${response.data.msg}`);
                throw new Error(`API Error: ${response.data.msg}`);
            } else {
                console.error("Unexpected response from API. Retrying...");
                throw new Error("Unexpected API response");
            }
        } catch (error) {
            console.error(`Attempt ${retries + 1} failed: ${error.message}`);
            retries++;
            if (retries < maxRetries) {
                await new Promise(resolve => setTimeout(resolve, retryDelay));
            } else {
                console.error(`Max retries reached. Giving up after ${maxRetries} attempts.`);
                throw error;
            }
        }
    }
};

module.exports = new RinOkumura()

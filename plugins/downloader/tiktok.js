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
        const tikwm = await Scraper.tikwm(input);

        let caption = `📁 Downloader Tiktok
> • *Title:* ${tikwm.metadata.title || ''}
> • *Author:* ${tikwm.metadata.author.nickname || ''}`;

        if (tikwm.type === "video") {
            caption += `\n> • *Type:* Video`;
            await conn.sendAliasMessage(m.chat, {
                video: {
                    url: tikwm.download.video
                },
                caption,
            }, {
                quoted: m
            });
            await conn.sendMessage(m.chat, {
                audio: {
                    url: tikwm.download.music.play
                },
                mimetype: 'audio/mpeg'
            }, {
                quoted: m
            });
        } else if (tikwm.type === "image") {
            caption += `\n> • *Type:* Image`
            for (let i of tikwm.download.images) {
                await conn.sendMessage(m.cht, {
                    image: {
                        url: i
                    },
                    caption
                }, {
                    quoted: m
                });
            }
        }
    };
};

module.exports = new RinOkumura()

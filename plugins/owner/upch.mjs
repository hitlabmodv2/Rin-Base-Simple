// 🔥® Rin-Okumura™ 🔥
// 👿 Creator: Dxyz
// ⚡ Plugin: owner/upch.mjs

let {
    writeExif,
    videoToWebp
} = await import(process.cwd() + '/lib/sticker.js');

let yukio = async (m, {
    ctx,
    Func,
    text,
    config
}) => {
    let q = m.quoted ? m.quoted : m;
    let mime = (q.msg || q).mimetype || "";

    let [linkChannel, ...captionArray] = text.split(' ');

    if (!Func.isUrl(linkChannel)) throw `*[ ! ]* Input URL not valid. Please provide a valid channel link.`;

    const url = new URL(linkChannel);
    const id = url.pathname.split('/')[2];
    if (!id) throw `*[ ! ]* Channel ID not found. Please check the URL.`;

    let data;
    try {
        data = await ctx.newsletterMetadata("invite", id);
    } catch (e) {
        throw `*[ ! ]* Failed to retrieve channel data. Please check the channel link.`;
    }

    let hai = await ctx.newsletterMetadata("jid", data.id);
    if (hai.viewer_metadata.role === 'SUBSCRIBER') {
        return m.reply(`*[ ! ]* Bot does not have admin access rights on this channel. Please make bot an admin to continue.`);
    }

    let caption = captionArray.join(' ') || "";
    let {
        key
    } = await ctx.sendMessage(m.chat, {
        text: "Uploading..."
    }, {
        quoted: m
    });
    const contextInfo = {
        contextInfo: {
            mentionedJid: [m.sender],
            isForwarded: !0,
            forwardingScore: 127,
            forwardedNewsletterMessageInfo: {
                newsletterJid: config.saluran,
                newsletterName: Func.Styles(`ᴘᴜsʜᴄʜ ${config.name}`),
                serverMessageId: -1
            },
            externalAdReply: {
                title: Func.Styles(`Pushch Oleh: ${m.pushName}`),
                body: Func.Styles(`${config.ownername2} | ${config.name}`),
                mediaType: 1,
                thumbnailUrl: await ctx.profilePictureUrl(m.sender, 'image').catch(e => 'https://files.catbox.moe/e1xs2q.jpg'),
                sourceUrl: config.link.tt
            }
        }
    }
    try {
        if (mime.includes("audio")) {
            await ctx.sendMessage(data.id, {
                audio: await q.download(),
                mimetype: "audio/mpeg",
                ptt: true,
                ...contextInfo
            });
            await ctx.sendMessage(m.chat, {
                text: `• Successfully sent audio with mimetype: *[ ${mime} ]*`,
                edit: key
            }, {
                quoted: m
            });
        } else if (mime === "image/webp") {
            let sticker = await writeExif({
                mimetype: mime,
                data: await q.download(),
            }, {
                packName: config.sticker.packname,
                packPublish: config.sticker.author,
            });
            await ctx.sendMessage(data.id, {
                sticker,
                ...contextInfo
            });
            await ctx.sendMessage(m.chat, {
                text: `• Successfully sent sticker with mimetype: *[ ${mime} ]*`,
                edit: key
            }, {
                quoted: m
            });
        } else if (mime === "image/jpeg" || mime === "image/png") {
            await ctx.sendMessage(data.id, {
                image: await q.download(),
                caption: caption || q.text,
                ...contextInfo
            });
            await ctx.sendMessage(m.chat, {
                text: `• Successfully sent image with mimetype: *[ ${mime} ]*`,
                edit: key
            }, {
                quoted: m
            });
        } else if (mime.includes("video")) {
            await ctx.sendMessage(data.id, {
                video: await q.download(),
                caption: caption || q.text,
                contextInfo: {
                    isForwarded: true,
                    forwardedNewsletterMessageInfo: {
                        newsletterJid: data.id,
                        serverMessageId: 173,
                        newsletterName: data.name,
                    },
                },
            });
            await ctx.sendMessage(m.chat, {
                text: `• Successfully sent video with mimetype: *[ ${mime} ]*`,
                edit: key
            }, {
                quoted: m
            });
        } else {
            await ctx.sendMessage(data.id, {
                text: caption || q.text,
                ...contextInfo
            });
            await ctx.sendMessage(m.chat, {
                text: `• Successfully sent text message : "${caption || q.text}"`,
                edit: key
            }, {
                quoted: m
            });
        }
    } catch (e) {
        throw `*[ ! ]* Failed to send media. Please try again. Error: ${e.message || e}`;
    }
}

yukio.command = /^(upch|uploadch)$/i;
yukio.help = ["upch", "uploadch"];
yukio.tags = ["tools"];
yukio.owner = true;
yukio.loading = true;

export default yukio;

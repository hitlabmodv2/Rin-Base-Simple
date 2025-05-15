// 🔥® Rin-Okumura™ 🔥
// 👿 Creator: Dxyz
// ⚡ Plugin: info/ci.js

module.exports = {
    help: ['cekidch', 'ci'],
    command: ['cekidch', 'ci'],
    tags: ['info'],
    loading: true,
    code: async (m, {
        ctx,
        text
    }) => {
        if (!/whatsapp.com\/channel/.test(text)) throw '⚠️ Mana Link Channel Nya !';
        let id = text.replace(new RegExp(/https:\/\/\whatsapp.com\/channel\//, "gi"), "");
        await ctx.newsletterMetadata('invite', id).then(async (a) => {
            let caption = `𒁍⛶  \`Cek Newsletter\`
🔖Name: ${a.name || ''}
🧩Id: ${a.id || ''}
👥Subscribe: ${a.subscribers || ''}
🔗Link: ${'https://whatsapp.com/channel/' + a.invite || ''}
⏰Date: ${new Date(a.creation_time * 1000).toLocaleString()}`
            await ctx.sendMessage(m.chat, {
                image: {
                    url: "https://pps.whatsapp.net" + a.preview ? a.preview : ''
                },
                caption
            }, {
                quoted: m
            })
        })
    },
};

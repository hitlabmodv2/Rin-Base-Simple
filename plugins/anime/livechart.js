// © HanakoBotz
// • By: Leooxzy - Deku
// • Owner: 6283136099660

// By: Leooxzy
// Bio cr: Krz

module.exports = {
    help: ['livechart', 'lvch'].map(a => a + ' *[ Latest/Detail/Search ]* '),
    tags: ['anime'],
    command: ['livechart', 'lvch'],
    code: async (m, { ctx, text, Scraper, Func }) => {
        const latest = await Scraper.livechart.latest()
        let message = `✮Latest Livechart\n`
        message += latest.map((a, i) => `> ${i + 1}\n📙Title: ${a.title || ''}\n🎬 Episode: ${a.eps || ''}\n👤Studio: ${a.studio || ''}\n🧩Genre: ${a.tags || ''}\n🔗Link: ${a.link || ''}`).join("\n\n")

        if (!text) return ctx.sendAliasMessage(m.chat, {
            text: `⚠️ Masukan Query/Link\n\n⚠️Contoh:\n${m.prefix + m.command} danjo no yuujou wa seiritsu suru? (Iya, shinai!!)\n${m.prefix + m.command} https://www.livechart.me/anime/11364\n\n${message}`
        }, latest.map((a, i) => ({
            alias: `${i + 1}`,
            response: `${m.prefix + m.command} ${a.link}`
        })), m)
        if (Func.isUrl(text)) {
            if (!/www.livechart.me/.test(text)) throw '⚠️ Mana Link Nya !';
            Scraper.livechart.detail(text).then(async (a) => {
                let caption = `✮Detail Livechart\n`;
                caption += `📙Title: ${a.title || ''}\n`;
                caption += `🎐Premiere: ${a.premiereDate || ''}\n`;
                caption += `⭐Rating: ${a.rating || ''}\n`;
                caption += `👥Source: ${a.source || ''}\n`;
                caption += `👤Studios: ${a.studios.map(a => a).join(', ') || ''}\n`;
                caption += `🧩Tags: ${a.tags.map(a => a).join(', ') || ''}`;
                await m.reply(caption);
            });
        } else {
            const search = await Scraper.livechart.search(text)
            let caption = `✮Search Livechart\n\n`
            caption += search.map((a, i) => `> ${i + 1}\n📙Title: ${a.title || ''}\n📅Release: ${a.release || ''}\n⭐Ratting: ${a.rating || ''}\n🧩Type: ${a.type || ''}\n🔗Link: ${a.link || ''}`).join("\n\n")

           await ctx.sendAliasMessage(m.chat, {
                text: caption
            }, search.map((a, i) => ({
                alias: `${i + 1}`,
                response: `${m.prefix + m.command} ${a.link}`
            })), m)
        };
    },
};

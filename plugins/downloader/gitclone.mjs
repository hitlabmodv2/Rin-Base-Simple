import axios from "axios";

const regex =
    /(?:https|git)(?::\/\/|@)github\.com[\/:]([^\/:]+)\/(.+?)(?:[\/]|$)/i;

let rin = {
    help: ['gitclone', 'git'].map(v => v + ' <link>'),
    tags: ['downloader'],
    command: ['gitclone', 'git'],
    code: async (m, { ctx, text, Func }) => {
        if (!/github.com/.test(text)) throw ' < ! > Mana Link Gitclone !';
        const [_, author, repo] = text.match(regex);
        if (!author && !repo) throw ' < ! > Repo Sama Author Nya Mana !';
        const api = `https://api.github.com/repos/${author}/${repo}`;
        const file = await axios.get(api + '/zipball', {
            responseType: 'arraybuffer'
        });
        const size = await Func.formatSize(file.data.length);
        let cap = `📁 Gitclone Downloader
👤Author: ${author}
🧩Repo: ${repo}
🗃️Size: ${size}

> Mohon Bersabar File Nya Lagi Di Kirim`;
        await ctx.sendMessage(m.chat, {
            text: cap
        }, {
            quoted: m
        });
        await ctx.sendMessage(m.chat, {
            document: file.data,
            fileName: `${author}-${repo}-${Date.now()}.zip`,
            mimetype: 'application/zip'
        }, {
            quoted: m
        });
    },
}

export default rin;

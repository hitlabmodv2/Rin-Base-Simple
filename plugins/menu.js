// © HanakoBotz
// • By: Leooxzy - Deku
// • Owner: 6283136099660

// By: Leooxzy
// Bio cr: Krz

let rin = {
    help: [],
    command: ["menu", "rinmenu"],
    tags: ["run"],
    loading: true,
    code: async (m, {
        conn,
        text,
        config,
        Func
    }) => {
        if (text === "all") {
            const tagCount = {};
            const tagHelpMapping = {};
            Object.keys(pg.plugins)
                .filter((plugin) => !plugin.disabled)
                .forEach((plugin) => {
                    const tagsArray = Array.isArray(pg.plugins[plugin].tags) ?
                        pg.plugins[plugin].tags : [];

                    if (tagsArray.length > 0) {
                        const helpArray = Array.isArray(pg.plugins[plugin].help) ?
                            pg.plugins[plugin].help : [pg.plugins[plugin].help];

                        tagsArray.forEach((tags) => {
                            if (tags) {
                                if (tagCount[tags]) {
                                    tagCount[tags]++;
                                    tagHelpMapping[tags].push(...helpArray);
                                } else {
                                    tagCount[tags] = 1;
                                    tagHelpMapping[tags] = [...helpArray];
                                }
                            }
                        });
                    }
                });

            const allTagsAndHelp = Object.keys(tagCount)
                .map((tags) => {
                    const daftarHelp = tagHelpMapping[tags]
                        .map((helpItem, index, i) => {
                            return `${'.' + helpItem}`;
                        })
                        .join("\n");
                    return Func.Styles(` -> ${tags.toUpperCase()}
${daftarHelp}`);
                }).join("\n\n");
            let caption = `Hai ${m.pushName}!

Saya senang sekali bertemu denganmu! Saya adalah Rin-Okumura, tapi kamu bisa memanggil saya Rin aja deh!

Bot WhatsApp saya sudah cukup bagus, bisa melakukan banyak hal seperti mengirim pesan, bermain permainan, dan bahkan bisa membantu kamu dengan pertanyaan atau masalahmu!

Apa yang ingin kamu lakukan hari ini, ${m.pushName}?
Command:
${allTagsAndHelp}`;

            await conn.sendMessage(m.chat, {
                text: Func.Styles(caption), // Use this if you are using an image or video
                footer: `© ${config.name}`,
                contextInfo: {
                    mentionedJid: [...conn.parseMention(caption)],
                    isForwarded: true,
                    externalAdReply: {
                        mediaType: 1,
                        title: Func.Styles("© " + config.name + " | Playground"),
                        body: config.owner + ' / ' + config.ownername2,
                        ...config.menu,
                        sourceUrl: config.link.tt,
                        renderLargerThumbnail: true,
                    },
                },
            }, {
                quoted: m
            });
        } else {
            let sections = [{
                type: "list",
                title: "Pilih Menu",
                value: [{
                    headers: "– 乂 Menu Favorite",
                    rows: [{
                            headers: `Menu All`,
                            title: `- Melihat semua fitur yang tersedia`,
                            command: `${m.prefix}menu all`
                        },
                        {
                            headers: `Script`,
                            title: ` - Mau Liat Script`,
                            command: `${m.prefix}sc`
                        },
                    ],
                }],
            }, ]
            const caption = Func.Styles(`Hai ${m.pushName}!

Saya senang sekali bertemu denganmu! Saya adalah Rin-Okumura, tapi kamu bisa memanggil saya Rin aja deh!

Kilik Button Di Bawah Ini`)
            conn.sendButton(m.cht, sections, m, {
                document: {
                    url: "https://www.npmjs.com/"
                },
                mimetype: "application/msword",
                fileName: config.ownername + ' / ' + config.ownername2,
                fileLength: 10,
                pageCount: 10,
                contextInfo: {
                    mentionedJid: [...conn.parseMention(caption)],
                    isForwarded: true,
                    externalAdReply: {
                        mediaType: 1,
                        title: Func.Styles("© " + config.name + " | Playground"),
                        body: "👨‍💻 Bot WhatsApp - Simple",
                        ...config.menu,
                        sourceUrl: config.link.tt,
                        renderLargerThumbnail: true,
                    },
                },
                caption,
                footer: config.name,
            })
        }
    }
};

module.exports = rin

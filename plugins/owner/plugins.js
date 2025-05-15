// 🔥® Rin-Okumura™ 🔥
// 👿 Creator: Dxyz
// ⚡ Plugin: owner/plugins.js

const fs = require("node:fs");
const beautify = require('js-beautify');

module.exports = {
    help: ["plugins", "plugin"].map(v => v + " *[ Untuk Mengelola File Plugin ]* "),
    tags: ["owner"],
    command: ["plugins", "plugin"],
    owner: true,
    code: async (m, {
        sock,
        config,
        plugin,
        Func,
        text
    }) => {
        let src = pg.plugins;
        if (!text)
            throw `🔥 乂 Cara Penggunaan 乂 🔥
\`--get\` ➠ Ambil plugins (Rin-style)
\`--add\` ➠ Tambah plugins (Yukio-mode)
\`--delete\` ➠ Hapus plugins (Demon force)

⚡ List Plugins Tersedia ⚡:
${Object.keys(src)
  .map((a, i) => `${i + 1}. ${a.split("plugins/")[1]} ${i % 2 === 0 ? "👿" : "👓"}`)
  .join("\n")}`;

        if (text.includes("--get")) {
            let input = text.replace("--get", "").trim();
            if (!isNaN(input)) {
                let list = Object.keys(src).map((a) => a.split("plugins/")[1]);
                let file = pg.directory + "/" + list[parseInt(input) - 1];
                try {
                    m.reply(fs.readFileSync(beautify(file.trim()).toString()));
                } catch (e) {
                    m.reply(`❌ Plugins ${file} tidak ditemukan! (Rin: "Coba cek lagi, manusia!")`);
                }
            } else {
                try {
                    let file = pg.directory + "/" + input;
                    m.reply(fs.readFileSync(file.trim()).toString());
                } catch (e) {
                    m.reply(`❌ Plugins ${input} hilang! (Yukio: "Fokus, jangan asal ketik!")`);
                }
            }
        } else if (m.text.includes("--add")) {
            if (!m.quoted) throw "👿 Reply plugins yang mau disimpan! (Rin: \"Jangan main-main!\")";
            let input = m.text.replace("--add", "").trim();
            try {
                let file = pg.directory + "/" + input;
                fs.writeFileSync(file.trim(), `// 🔥® Rin-Okumura™ 🔥
// 👿 Creator: ${config.ownername2}
// ⚡ Plugin: ${input}

${beautify(m.quoted.body)}`);
                m.reply(`✅ Berhasil menyimpan plugins: ${input} (Rin: "Nah, gitu dong!")`);
            } catch (e) {
                m.reply(`❌ Gagal menyimpan! (Yukio: "Ada error, periksa kode!")`);
            }
        } else if (text.includes("--delete")) {
            let input = text.replace("--delete", "").trim();
            if (!isNaN(input)) {
                let list = Object.keys(src).map((a) => a.split("plugins/")[1]);
                let file = pg.directory + "/" + list[parseInt(input) - 1];
                try {
                    fs.unlinkSync(file.trim());
                    m.reply(`🗑️ Plugins dihapus! (Rin: "Dihancurkan kayak iblis!")`);
                } catch (e) {
                    m.reply(`❌ Plugins ${file} tidak ada! (Yukio: "Jangan asal hapus!")`);
                }
            } else {
                try {
                    let file = pg.directory + "/" + input;
                    fs.unlinkSync(file.trim());
                    m.reply(`🗑️ Plugins ${input} hilang! (Rin: "Mampus deh!")`);
                } catch (e) {
                    m.reply(`❌ Gagal menghapus! (Yukio: "Kode ini dilindungi exorcist!")`);
                }
            }
        }
    }
};

const cheerio = require('cheerio');
const axios = require('axios');

class livechart {
    search = async function search(query) {
        try {
            const response = await axios.get(`https://www.livechart.me/search?q=${query}`, {
                headers: {
                    "accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7",
                    "accept-language": "id-ID,id;q=0.9,en-US;q=0.8,en;q=0.7",
                    "Referer": "https://www.livechart.me/search",
                }
            });

            const html = await response.data;
            const $ = cheerio.load(html);
            const animeList = [];
            $('.callout.grouped-list.anime-list li.grouped-list-item.anime-item').each((index, element) => {
                const title = $(element).find('.anime-item__body__title a').text().trim();
                const release = $(element).find('.info span[data-action="click->anime-item#showPremiereDateTime"]').text().trim();
                const rating = $(element).find('.info .fake-link').text().trim();
                const url = $(element).find('.anime-item__body__title a').attr('href');
                const type = $(element).find('.anime-item__body__title span.title-extra').text().trim();
                const imageUrl = $(element).find('.anime-item__poster-wrap img').attr('src');

                animeList.push({
                    title,
                    release,
                    rating,
                    type,
                    imageUrl,
                    link: `https://www.livechart.me${url}`
                });
            });

            return animeList;
        } catch (error) {
            throw new Error(`Results not found`);
        }
    }

    latest = async function() {
        return new Promise((resolve, reject) => {
            const abc = "https://www.livechart.me"
            try {
                axios.get(abc).then(({
                    data
                }) => {
                    const $ = cheerio.load(data)
                    const catoz = [];

                    $('div[class="anime-card"]').each((a, b) => {
                        const o = $(b).find("img").attr("src")
                        const g = $(b).find("img").attr("alt")
                        const x = $(b).find(".poster-container").children(".episode-countdown").text()
                        const m = $(b).find('.anime-info').children(".anime-studios").text()
                        const h = $(b).find(".anime-synopsis").text()
                        const j = $(b).find(".anime-extras").text()
                        const w = $(b).find(".anime-info").text()
                        const f = $(b).find(".anime-tags li").map((i, el) => $(el).text()).get().join(" ")
                        const q = "scraper-by catozolala"
                        const u = $(b).find(`h3.main-title`).children("a").attr('href')

                        catoz.push({
                            author: q,
                            image: o,
                            title: g,
                            eps: x,
                            studio: m,
                            synopsis: h,
                            bintang: j,
                            inforilis: w,
                            tags: f,
                            link: abc + u
                        })
                    })
                    resolve(catoz)
                })

            } catch (error) {
                console.error('Error:', error);
            }
        })
    }

    detail = async function detail(url) {
        try {
            const urlParts = url.split('/');
            const animeId = urlParts[urlParts.length - 1];
            const response = await axios.get(url, {
                headers: {
                    "accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7",
                    "accept-language": "id-ID,id;q=0.9,en-US;q=0.8,en;q=0.7",
                    "Referer": url,
                }
            });

            const html = await response.data;
            const $ = cheerio.load(html);
            const animeDetails = {
                title: $(`div[data-anime-details-id="${animeId}"] .text-xl`).first().text().trim(),
                premiereDate: $(`div[data-anime-details-id="${animeId}"] .font-medium:contains("Premiere")`).next().text().trim(),
                rating: $(`div[data-anime-details-id="${animeId}"] .text-lg.font-medium`).first().text().trim(),
                imageUrl: $(`div[data-anime-details-id="${animeId}"] img`).attr('src'),
                synopsis: $(`div[data-anime-details-id="${animeId}"] .lc-expander-content`).text().trim(),
                source: $(`div[data-anime-details-id="${animeId}"] .text-xs:contains("Source")`).next().find('a').text().trim(),
                tags: [],
                studios: []
            };
            $(`div[data-anime-details-id="${animeId}"] .flex.flex-wrap.gap-2 a.lc-chip-button`).each((index, element) => {
                animeDetails.tags.push($(element).text().trim());
            });
            $(`div[data-anime-details-id="${animeId}"] .flex.flex-wrap.gap-2 a.lc-chip-button[href^="/studios"]`).each((index, element) => {
                animeDetails.studios.push($(element).text().trim());
            });
            return animeDetails;
        } catch (error) {
            throw new Error(`Results not found`);
        }
    }
}

module.exports = new livechart()

/**
 * ======================================
 * @Scrape: Tikwm
 * @type: cjs
 * @source: https://whatsapp.com/channel/0029VadFS3r89inc7Jjus03W
 * @web: https://tikwm.com/
 * @note: no apus wm ini credit dxyz
 * ======================================
**/

const axios = require('axios');

async function tikwm(url, type) {
    const result = {
        metadata: {},
        type: '',
        download: {}
    };

    try {
        if (!url.includes('tiktok')) throw 'Gada Link/Link Salah Jgn Di Request in lagi dong😹'
        if (type === "hd") {
            const tikwm = await axios.post(`https://tikwm.com/api/?url=${url}&count=12&cursor=0&web=1&hd=1`, { timeout: 50000 }).then(a => a.data.data);

            result.metadata.title = tikwm.title || '';
            result.metadata.id = tikwm.id || '';
            result.metadata.region = tikwm.region || '';
            result.metadata.duration = tikwm.duration || '';
            result.metadata.author = tikwm.author || ''
            result.download = {
                original: 'https://tikwm.com' + tikwm.play,
                hd: 'https://tikwm.com' + tikwm.hdplay,
                music: tikwm.music_info
            }
            return result;
        } else {
            const {
                data
            } = await axios.post(`https://tikwm.com/api/?url=${url}`, { timeout: 50000 });

            const tikwm = data.data;
            result.metadata.title = tikwm.title || '';
            result.metadata.id = tikwm.id || '';
            result.metadata.region = tikwm.region || '';
            result.metadata.duration = tikwm.duration || '';
            result.metadata.author = tikwm.author || '';

            if (tikwm.images) {
                result.type = 'image'
                result.download = {
                    images: tikwm.images,
                    music: tikwm.music_info
                }
            } else {
                result.type = 'video'
                result.download = { 
                    video: tikwm.play,
                    music: tikwm.music_info
                }
            };
            return result;
        };
    } catch (e) {
        console.log('Error: ' + e);
        result.msg = e
        return result;
    }
};

module.exports = tikwm;

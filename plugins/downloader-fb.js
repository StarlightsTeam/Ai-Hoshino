import axios from 'axios'
import fetch from 'node-fetch'

let handler = async (m, { args }) => {
    if (!args[0]) {
        return conn.reply(m.chat, '*🚩 Escribe la URL de un video de Facebook que deseas descargar.*', m, adReply)
    }
    try {
    await m.react('🕓')
        const url = args[0];
        const headersList = {
            "Accept": "*/*",
            "User-Agent": "Thunder Client (https://www.thunderclient.com)"
        }

        const reqOptions = {
            url: `https://backend.shirokamiryzen.repl.co/fb?u=${url}`,
            method: "GET",
            headers: headersList,
        }

        const response = await axios.request(reqOptions);
        const firstUrls = response.data.map(item => item.split(','))

        const hdMedia = firstUrls[0][0]

            const hdFile = await fetch(hdMedia);
            await conn.sendFile(m.chat, await hdFile.buffer(), 'video_hd.mp4', null, estilo)
            await m.react('✅')

} catch (error) {
conn.reply(m.chat, '*☓ Ocurrió un error inesperado*', m, adReply).then(_ => m.react('✖️'))
}}
handler.help = ['facebook'].map(v => v + ' <url fb>')
handler.tags = ['downloader']
handler.command = /^((facebook|fb)(downloder|dl)?)$/i
handler.star = 2
handler.register = true 
export default handler
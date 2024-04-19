import Scraper from "@SumiFX/Scraper"

let handler = async (m, { conn, args, usedPrefix, command }) => {
if (!args[0]) return m.reply('🍭 Ingresa el enlace del vídeo de YouTube junto al comando.\n\n`Ejemplo:`\n' + `> *${usedPrefix + command}* https://youtu.be/QSvaCSt8ixs`)

let user = global.db.data.users[m.sender]
try {
let { title, size, quality, thumbnail, dl_url } = await Scraper.ytmp3(args[0])
if (size.includes('GB') || size.replace(' MB', '') > 200) { return await m.reply('El archivo pesa mas de 200 MB, se canceló la Descarga.')}
let txt = `╭─⬣「 *YouTube Download* 」⬣\n`
    txt += `│  ≡◦ *🍭 Titulo ∙* ${title}\n`
    txt += `│  ≡◦ *🪴 Calidad ∙* ${quality}\n`
    txt += `│  ≡◦ *⚖ Peso ∙* ${size}\n`
    txt += `╰─⬣`
await conn.sendFile(m.chat, thumbnail, 'thumbnail.jpg', txt, m)
await conn.sendFile(m.chat, dl_url, title + '.mp3', `*🍭 Titulo ∙* ${title}\n*🪴 Calidad ∙* ${quality}`, m, false, { mimetype: 'audio/mpeg', asDocument: user.useDocument })
} catch {
}}
handler.help = ['ytmp3 <yt url>']
handler.tags = ['downloader']
handler.command = ['ytmp3', 'yta']
handler.register = true 
export default handler
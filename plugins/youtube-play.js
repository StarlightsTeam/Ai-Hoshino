import Scraper from '@SumiFX/Scraper'

let handler = async (m, { conn, text, args, usedPrefix, command }) => {
if (!text) return conn.reply(m.chat, '🍭 Ingresa el título de un video o canción de YouTube.\n\n`Ejemplo:`\n' + `> *${usedPrefix + command}* Gemini Aaliyah - If Only`, m)

let user = global.db.data.users[m.sender]
try {
let res = await Scraper.ytsearch(text)
let { title, size, quality, thumbnail, dl_url } = await Scraper.ytmp3(res[0].url)
if (size.includes('GB') || size.replace(' MB', '') > 200) { return await m.reply('El archivo pesa mas de 200 MB, se canceló la Descarga.')}
let txt = `╭─⬣「 *YouTube Play* 」⬣\n`
    txt += `│  ≡◦ *🍭 Titulo ∙* ${title}\n`
    txt += `│  ≡◦ *📅 Publicado ∙* ${res[0].published}\n`
    txt += `│  ≡◦ *🕜 Duración ∙* ${res[0].duration}\n`
    txt += `│  ≡◦ *👤 Autor ∙* ${res[0].author}\n`
    txt += `│  ≡◦ *⛓ Url ∙* ${res[0].url}\n`
    txt += `│  ≡◦ *🪴 Calidad ∙* ${quality}\n`
    txt += `│  ≡◦ *⚖ Peso ∙* ${size}\n`
    txt += `╰─⬣`
await conn.sendFile(m.chat, thumbnail, 'thumbnail.jpg', txt, m)
await conn.sendFile(m.chat, dl_url, title + '.mp3', `*🍭 Titulo ∙* ${title}\n*🪴 Calidad ∙* ${quality}`, m, false, { mimetype: 'audio/mpeg', asDocument: user.useDocument })
} catch {
}}
handler.help = ["play <búsqueda>"]
handler.tags = ["downloader"]
handler.command = ["play"]
handler.register = true 
//handler.limit = 1
export default handler
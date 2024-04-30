import Scraper from "@SumiFX/Scraper"

let handler = async (m, { conn, args, usedPrefix, command }) => {
if (!args[0]) return m.reply('🍭 Ingresa el enlace de algún Track de SoundCloud.\n\n`Ejemplo:`\n' + `> *${usedPrefix + command}* https://m.soundcloud.com/geminiaaliyah/if-only`)

let user = global.db.data.users[m.sender]
try {
let { title, views, thumbnail, dl_url } = await Scraper.soundl(args[0])
let txt = `╭─⬣「 *SoundCloud Download* 」⬣\n`
    txt += `│  ≡◦ *🍭 Nombre ∙* ${title}\n`
    txt += `│  ≡◦ *🪴 Vistas ∙* ${views}\n`
    txt += `╰─⬣`
await conn.sendFile(m.chat, thumbnail, 'thumbnail.jpg', txt, m)
await conn.sendFile(m.chat, dl_url, title + '.mp3', `*🍭 Titulo ∙* ${title}\n*🪴 Visitas ∙* ${views}`, m, false, { mimetype: 'audio/mpeg', asDocument: user.useDocument })
} catch {
}}
handler.help = ['soundl <url sound>']
handler.tags = ['downloader']
handler.command = ['soundl']
handler.register = true 
export default handler
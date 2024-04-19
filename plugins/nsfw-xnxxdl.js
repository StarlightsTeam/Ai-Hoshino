import Scraper from "@SumiFX/Scraper"

let handler = async (m, { conn, args, usedPrefix, command }) => {
if (!global.db.data.chats[m.chat].nsfw) return m.reply(`El grupo no admite contenido *Nsfw.*`)
if (!args[0]) return m.reply('🍭 Ingresa el enlace del vídeo de Xnxx junto al comando.')

let user = global.db.data.users[m.sender]
try {
let { title, duration, quality, dl_url } = await Scraper.xnxxdl(args[0])
let txt = `╭─⬣「 *Xnxx Download* 」⬣\n`
    txt += `│  ≡◦ *🍭 Titulo ∙* ${title}\n`
    txt += `│  ≡◦ *🪴 Calidad ∙* ${quality}\n`
    txt += `│  ≡◦ *🕜 Duración ∙* ${duration}\n`
    txt += `╰─⬣`
await m.reply(txt)
await conn.sendFile(m.chat, dl_url, title + '.mp4', `*🍭 Titulo ∙* ${title}\n*🪴 Calidad ∙* ${quality}`, m, false, { asDocument: user.useDocument })
} catch {
}}
handler.help = ['xnxxdl <url>']
handler.tags = ['nsfw']
handler.command = ['xnxxdl']
handler.register = true 
handler.group = true 
export default handler
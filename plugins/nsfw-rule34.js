import Scraper from "@SumiFX/Scraper"

let handler = async (m, { conn, text, usedPrefix, command }) => {
if (!global.db.data.chats[m.chat].nsfw) return m.reply(`El grupo no admite contenido *Nsfw.*`)
if (!text) return m.reply('🍭 Ingresa el nombre de la imágen que estas buscando.')
try {
let { dl_url } = await Scraper.rule34(text)
await conn.sendFile(m.chat, dl_url, 'thumbnail.jpg', null, m)
} catch {
}}
handler.help = ['rule34 <búsqueda>']
handler.tags = ['nsfw']
handler.command = ['rule34', 'r34']
handler.register = true 
handler.limit = 20
handler.group = true 
export default handler
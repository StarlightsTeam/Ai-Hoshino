import Scraper from "@SumiFX/Scraper"

let handler = async (m, { conn, text, usedPrefix, command }) => {
if (!text) return m.reply('🍭 Ingresa el nombre de la imágen que estas buscando.\n\n`Ejemplo:`\n' + `> *${usedPrefix + command}* Sumi Sakurasawa Icons`)
try {
let { dl_url } = await Scraper.GoogleImage(text)
await conn.sendFile(m.chat, dl_url, 'thumbnail.jpg', null, m)
} catch {
}}
handler.help = ['imagen <búsqueda>']
handler.tags = ['img']
handler.command = ['image', 'gimage', 'imagen']
handler.register = true 
//handler.limit = 1
export default handler
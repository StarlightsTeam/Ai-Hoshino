import Scraper from '@SumiFX/Scraper'

let handler = async (m, { conn, args, usedPrefix, command }) => {
if (!args[0]) return m.reply('🍭 Ingresa el enlace del vídeo de Instagram junto al comando.\n\n`Ejemplo:`\n' + `> *${usedPrefix + command}* https://www.instagram.com/reel/CijhxhAD53X/?igsh=amJqMDQ1cW9zOG9s`)

try {
let { dl_url } = await Scraper.igdl(args[0])
await conn.sendMessage(m.chat, { video: { url: dl_url }, caption: null }, { quoted: m})
} catch {
}}
handler.help = ['instagram <url ig>']
handler.tags = ['downloader']
handler.command = ['ig', 'igdl', 'instagram']
handler.register = true 
export default handler
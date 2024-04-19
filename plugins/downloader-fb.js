import Scraper from '@SumiFX/Scraper'

let handler = async (m, { conn, args, usedPrefix, command }) => {
if (!args[0]) return m.reply('🍭 Ingresa el enlace del vídeo de FaceBook junto al comando.\n\n`Ejemplo:`\n' + `> *${usedPrefix + command}* https://www.facebook.com/official.trash.gang/videos/873759786348039/?mibextid=rS40aB7S9Ucbxw6v`)

try {
let { title, SD, HD } = await Scraper.fbdl(args[0])
await conn.sendMessage(m.chat, { video: { url: HD || SD }, caption: `*🍭 Titulo ∙* ${title}` }, { quoted: m})
} catch {
}}
handler.help = ['facebook <url fb>']
handler.tags = ['downloader']
handler.command = ['fb', 'fbdl', 'facebookdl', 'facebook']
handler.register = true 
export default handler
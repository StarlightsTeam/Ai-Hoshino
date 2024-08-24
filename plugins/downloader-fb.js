import Starlights from '@StarlightsTeam/Scraper'

let handler = async (m, { conn, args, usedPrefix, command }) => {
if (!args || !args[0]) return conn.reply(m.chat, '🚩 Ingresa el enlace del vídeo de Facebook junto al comando.\n\n`Ejemplo:`\n' + `> *${usedPrefix + command}* https://www.facebook.com/official.trash.gang/videos/873759786348039/?mibextid=rS40aB7S9Ucbxw6v`, m, rcanal)
await m.react('🕓')
try {
let { dl_url } = await Starlights.fbdl(args[0])
await conn.sendFile(m.chat, dl_url, 'fbdl.mp4', listo, m, null, rcanal)
await m.react('✅')
} catch {
await m.react('✖️')
}}
handler.help = ['fb *<link fb>*']
handler.tags = ['downloader'] 
handler.command = /^(facebook|fb|facebookdl|fbdl)$/i
//handler.limit = 1
handler.register = true
export default handler
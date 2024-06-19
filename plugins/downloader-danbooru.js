import Starlights from "@StarlightsTeam/Scraper"

let handler = async (m, { conn, args, usedPrefix, command }) => {
if (!args[0]) return conn.reply(m.chat, '🚩 Ingresa un enlace de https://danbooru.donmai.us\n\n`Ejemplo:`\n' + `> *${usedPrefix + command}* https://danbooru.donmai.us/posts/7665436`, m, rcanal)
await m.react('🕓')
try {
let { dl_url } = await Starlights.danbooru(args[0])
await conn.sendFile(m.chat, dl_url, 'thumbnail.jpg', listo, m, null, rcanal)
await m.react('✅')
} catch {
await m.react('✖️')
}}
handler.help = ['danbooru *<url>*']
handler.tags = ['downloader']
handler.command = ['danbooru']
//handler.limit = 1
handler.register = true 
export default handler
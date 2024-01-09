import { googleImage, pinterest } from '@bochilteam/scraper'

let handler = async (m, { conn, text, usedPrefix, command }) => {
if (!global.db.data.chats[m.chat].nsfw) return conn.reply(m.chat, `❎ En este grupo no esta permitido el contenido *+18*`, m, adReply).then(_ => m.react('✖️'))
await conn.reply(m.chat, `*↻ Espera @${m.sender.split`@`[0]}, soy lenta. . .*`, estilo, adNsfw)
await m.react('🕓')
try {
let res = await (await googleImage('Imagen ' + 'hentai')).getRandom()
await conn.sendFile(m.chat, res, 'error.jpg', `*––––––『 NSFW HENTAI 』––––––*\n\n*Resultado de ∙* Hentai\n\n${namebot}`, estilo)
await m.react('✅')
} catch (err) {
}}
handler.help = ['hentai']
handler.tags = ['nsfw']
handler.command = ['hentai']
handler.group = true 
handler.register = true
handler.star = 1
export default handler
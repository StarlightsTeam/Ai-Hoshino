import { googleImage } from '@bochilteam/scraper'
let handler = async (m, { conn, text, usedPrefix, command }) => {
if (!text) return conn.reply(m.chat, `*🚩 Ingresa que imagen deseas buscar en Google.*`, m, adReply)
await m.react('🕓')
let res = await googleImage(text)
await conn.sendFile(m.chat, res.getRandom(), 'out.png', `*––––––『 GOOGLE IMAGE 』––––––*\n\n*Resultado de ∙* ${text}\n\n${namebot}`.trim(), estilo)
await m.react('✅')
}
handler.help = ['imagen <texto>']
handler.tags = ['search', 'img']
handler.command = ['img', 'image', 'imagen'] 
handler.star = 1
handler.register = true 

export default handler
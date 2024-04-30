import Scraper from '@SumiFX/Scraper'

let handler = async (m, { conn, text, usedPrefix, command }) => {
if (!text) return m.reply('🍭 Ingresa una petición que deseas que Sumi realice.\n\n`Ejemplo:`\n' + `> *${usedPrefix + command}* hola, cómo te llamas?`)

try {
let { msg } = await Scraper.openAi(text)
await conn.reply(m.chat, msg, m)
} catch {
}}
handler.help = ['sumi <petición>']
handler.tags = ['tools']
handler.command = ['sumi', 'ai', 'ia', 'chatgpt', 'gpt']
handler.register = true
export default handler
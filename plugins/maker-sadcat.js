let handler = async (m, { conn, text, args, usedPrefix, command }) => {
let response = args.join(' ').split('|')
if (!text) return m.reply(`🍭 Ingresa un texto junto al comando.`)
try {
let res = `https://api.popcat.xyz/sadcat?text=${text}`
await conn.sendFile(m.chat, res, 'thumbnail.jpg', null, m)
} catch {
}}
handler.help = ['sadcat <texto>']
handler.tags = ['logo']
handler.command = ['sadcat', 'catsad']
//handler.limit = 1
handler.register = true 
export default handler
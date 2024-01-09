import fetch from 'node-fetch'
let handler = async (m, { conn, command, args }) => {
if (!args[0]) return conn.reply(m.chat, `*🚩 Escribe la URL de una página.*`, m, adReply)
await m.react('🕓')
let ss = await (await fetch(`https://image.thum.io/get/fullpage/${args[0]}`)).buffer()
await conn.sendFile(m.chat, ss, 'error.png', null, estilo)
await m.react('✅')
}
handler.help = ['ssweb'].map(v => v + ' <url>')
handler.tags = ['tools']
handler.command = ['ss', 'ssweb']
handler.register = true 
handler.star = 1
export default handler
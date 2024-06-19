import fetch from 'node-fetch';
let handler = async (m, {conn, args, text}) => {
try {
if (!text) return m.reply('🚩 Ingresa el enlace que deseas acortar.')
let shortUrl1 = await (await fetch(`https://tinyurl.com/api-create.php?url=${args[0]}`)).text();
if (!shortUrl1) return m.reply(`🚩 Ingresa el enlace que deseas acortar.`)
let done = `*» Url Acortado* : ${shortUrl1}`
m.reply(done)
} catch { 
await m.react('✖️')
}}
handler.help = ['acortar'].map((v) => v + ' *<url>*')
handler.tags = ['tools']
handler.command = /^(tinyurl|short|acortar|corto)$/i;
handler.fail = null
handler.register = true 
export default handler
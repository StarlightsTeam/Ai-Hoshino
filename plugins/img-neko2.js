import fetch from 'node-fetch'

let handler = async(m, { conn }) => {
try {
await m.react('🕓')
let response = await fetch('https://nekos.life/api/v2/img/neko')
let data = await response.json()
let imageUrl = data.url
await conn.sendFile(m.chat, imageUrl, 'thumbnail.jpg', listo, m)
await m.react('✅')
} catch {
await m.react('✖️')
}}
handler.command = ['neko2']
handler.tags = ['img']
handler.help = ['neko2']
//handler.limit = 1
handler.register = true 

export default handler
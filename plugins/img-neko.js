import fetch from 'node-fetch'

let handler = async (m, { conn, usedPrefix, command }) => {
try {
let res = await fetch('https://api.waifu.pics/sfw/neko')
if (!res.ok) return 
let json = await res.json()
if (!json.url) return 
await conn.sendFile(m.chat, json.url, 'thumbnail.jpg', null, m)
await m.react('✅')
} catch {
}}
handler.help = ['neko']
handler.tags = ['img']
handler.command = ['neko']
handler.register = true 

export default handler
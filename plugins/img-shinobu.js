import fetch from 'node-fetch'

let handler = async (m, { conn, usedPrefix, command }) => {
try {
let res = await fetch('https://api.waifu.pics/sfw/shinobu')
if (!res.ok) return
let json = await res.json()
if (!json.url) return
await conn.sendFile(m.chat, json.url, 'thumbnail.jpg', null, m)
} catch {
}}
handler.help = ['shinobu']
handler.tags = ['img']
handler.command = ['shinobu']
//handler.limit = 1
handler.register = true 

export default handler
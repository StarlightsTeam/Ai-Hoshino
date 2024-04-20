import fetch from 'node-fetch'

let handler = async (m, { conn, usedPrefix, command }) => {
try {
let res = await fetch('https://api.waifu.pics/sfw/megumin')
if (!res.ok) return
let json = await res.json()
if (!json.url) return
await conn.sendFile(m.chat, json.url, 'thumbnail.jpg', null, m)
} catch {
}}
handler.help = ['megumin']
handler.tags = ['img']
handler.command = ['megumin']
handler.register = true 
//handler.limit = 1
export default handler
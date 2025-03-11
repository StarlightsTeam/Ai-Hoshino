//汉塞尔和安吉拉❤️    
//Revive los colores de tu imagen 
import fs from 'fs'
import FormData from 'form-data'
import axios from 'axios'
import fetch from 'node-fetch'

let handler = async (m, { conn }) => {
let q = m.quoted ? m.quoted : m
let mime = (q.msg || q).mimetype || ''
if (!mime.startsWith('image/')) return m.reply('🚩 Responde a una *Imagen.*')
await m.react('🕓')
let media = await q.download()
let formData = new FormData()
formData.append('image', media, { filename: 'file' })
let upload = await axios.post('https://api.imgbb.com/1/upload?key=10604ee79e478b08aba6de5005e6c798', formData, {
headers: {
...formData.getHeaders()
}})
let imgs = upload.data.data.url
let colors = await fetch(`https://apis-starlights-team.koyeb.app/starlight/colorize-ai?url=${imgs)}`)
let json = await colors.json()
await conn.sendFile(m.chat, json.url, 'colorized.jpg', null, m)
await m.react('✅')
}
handler.tags = ['tools']
handler.help = ['colorize']
handler.command = /^(colorize|colorizai)$/i
handler.register = true 
export default handler

import moment from 'moment-timezone'
import fetch from 'node-fetch'

let handler = async (m, { conn }) => {
let res = await fetch('https://api.github.com/repos/StarlightsTeam/Ai-Hoshino')
let json = await res.json()
try {
let txt = '*`—  S C R I P T  〤  M A I N`*\n\n'
    txt += `*» Nombre* :: ${json.name}\n`
    txt += `*» Visitas* :: ${json.watchers_count}\n`
    txt += `*» Peso* :: ${(json.size / 1024).toFixed(2)} MB\n`
    txt += `*» Actualizado* :: ${moment(json.updated_at).format('DD/MM/YY - HH:mm:ss')}\n`
    txt += `*» Url* :: ${json.html_url}\n`
    txt += `*» Forks* :: ${json.forks_count}\n`
    txt += `*» Stars* :: ${json.stargazers_count}\n\n`
    txt += `> [ ✰ ] *${textbot}*`
let img = `https://i.pinimg.com/736x/f1/47/61/f14761a3be3914b0b168d498064fb598.jpg`

await conn.sendFile(m.chat, img, 'sc.jpg', txt, m, null, rcanal)
} catch {
await m.react('✖️')
}}

handler.help = ['script']
handler.tags = ['main']
handler.command = ['script', 'sc']
handler.register = true 

export default handler

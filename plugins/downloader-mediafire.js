import Starlights from "@StarlightsTeam/Scraper"

let handler = async (m, { conn, args, usedPrefix, command }) => {
if (!args[0]) return conn.reply(m.chat, '🚩 Ingrese el enlace de un archivo de Mediafire.', m, rcanal)
if (!args[0].match(/mediafire/gi)) return conn.reply(m.chat, 'El enlace deve ser de un archivo de Mediafire.', m, rcanal)
await m.react('🕓')
try {
let { title, ext, aploud, size, dl_url } = await Starlights.mediafire(args[0])
let txt = `乂  *M E D I A F I R E  -  D O W N L O A D*\n\n`
    txt += `	✩  *Nombre* : ${title}\n`
    txt += `	✩  *Peso* : ${size}\n`
    txt += `	✩  *Publicado* : ${aploud}\n`
    txt += `	✩  *MimeType* : ${ext}\n\n`
    txt += `*- ↻ El archivo se esta enviando espera un momento, soy lenta. . .*`
let img = await (await fetch('https://i.ibb.co/wLQFn7q/logo-mediafire.jpg')).buffer()
await conn.sendFile(m.chat, img, 'thumbnail.jpg', txt, m, null, rcanal)
await conn.sendFile(m.chat, dl_url, title, null, m, null, { mimetype: ext, asDocument: true })
await m.react('✅')
} catch {
await m.react('✖️')
}}
handler.help = ['mediafire'].map(v => v + ' *<url>*')
handler.tags = ['downloader', 'premium']
handler.command = ['mediafire', 'mdfire', 'mf']
handler.premium = true 

export default handler
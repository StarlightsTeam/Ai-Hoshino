import Starlights from '@StarlightsTeam/Scraper'

let handler = async (m, { conn, args, usedPrefix, command }) => {
    if (!args[0]) return m.reply(`*• Ingresa el enlace del vídeo de TikTok junto al comando.*\n\nEjemplo:\n*${usedPrefix + command}* https://vm.tiktok.com/ZMMcFkG1L/`)
await m.react('🕓')
try {
let { title, author, duration, views, likes, comment, share, published, downloads, dl_url } = await Starlights.tiktokdl(args[0])
let txt = `*乂 ⺀ T I K T O K  -  D O W N L O A D ⺀ 乂*\n\n`
    txt += `	◦  *Título* : ${title}\n`
    txt += `	◦  *Autor* : ${author}\n`
    txt += `	◦  *Duración* : ${duration} segundos\n`
    txt += `	◦  *Vistas* : ${views}\n`
    txt += `	◦  *Likes* : ${likes}\n`
    txt += `	◦  *Comentarios* : ${comment}\n`
    txt += `	◦  *Compartidos* : ${share}\n`
    txt += `	◦  *Publicado* : ${published}\n`
    txt += `	◦  *Descargas* : ${downloads}\n\n`
    txt += `*${textbot}*`
await conn.sendMessage(m.chat, { video: { url: dl_url }, caption: txt }, { quoted: m })
await m.react('✅')
} catch {
await m.react('✖️')
}}
handler.help = ['tiktok <url tt>']
handler.tags = ['downloader']
handler.command = ['tiktok', 'ttdl', 'tiktokdl', 'tiktoknowm']
handler.register = true

export default handler
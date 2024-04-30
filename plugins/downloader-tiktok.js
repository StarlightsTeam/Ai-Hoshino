import Scraper from '@SumiFX/Scraper'
import axios from 'axios'

let handler = async (m, { conn, args, usedPrefix, command }) => {
if (!args[0]) return m.reply('🍭 Ingresa un enlace del vídeo de TikTok junto al comando.\n\n`Ejemplo:`\n' + `> *${usedPrefix + command}* https://vm.tiktok.com/ZMMCYHnxf/`)

try {
let { title, published, quality, likes, commentCount, shareCount, views, dl_url } = await Scraper.tiktokdl(args[0])
let txt = `╭─⬣「 *TikTok Download* 」⬣\n`
    txt += `│  ≡◦ *🍭 Titulo ∙* ${title}\n`
    txt += `│  ≡◦ *📅 Publicado ∙* ${published}\n`
    txt += `│  ≡◦ *🪴 Calidad ∙* ${quality}\n`
    txt += `│  ≡◦ *👍 Likes ∙* ${likes}\n`
    txt += `│  ≡◦ *🗣 Comentarios ∙* ${commentCount}\n`
    txt += `│  ≡◦ *💫 Share ∙* ${shareCount}\n`
    txt += `│  ≡◦ *📹 Visitas ∙* ${views}\n`
    txt += `╰─⬣`
await conn.sendMessage(m.chat, { video: { url: dl_url }, caption: txt }, { quoted: m})
} catch {
try {
const api = await fetch(`https://api-starlights-team.koyeb.app/api/tiktok?url=${args[0]}`)
const data = await api.json()
if (data.status) {
const { author, view, comment, play, share, download, duration, title, video } = data.data
let txt = `╭─⬣「 *TikTok Download* 」⬣\n`
    txt += `│  ≡◦ *🍭 Título ∙* ${title}\n`
    txt += `│  ≡◦ *📚 Autor ∙* ${author.nickname}\n`
    txt += `│  ≡◦ *🕜 Duración ∙* ${duration} Segundos\n`
    txt += `│  ≡◦ *🌵 Descargas ∙* ${download}\n`
    txt += `│  ≡◦ *🗣 Comentarios ∙* ${comment}\n`
    txt += `│  ≡◦ *💫 Share ∙* ${share}\n`
    txt += `│  ≡◦ *🐢 Visitas ∙* ${play}\n`
    txt += `╰─⬣`
await conn.sendMessage(m.chat, { video: { url: video }, caption: txt }, { quoted: m})
} else {
}
} catch {
}}}
handler.help = ['tiktok <url tt>']
handler.tags = ['downloader']
handler.command = ['tiktok', 'ttdl', 'tiktokdl', 'tiktoknowm']
handler.register = true 
//handler.limit = 1
export default handler
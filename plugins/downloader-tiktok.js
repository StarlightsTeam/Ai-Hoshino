import Scraper from '@SumiFX/Scraper'

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
}}
handler.help = ['tiktok <url tt>']
handler.tags = ['downloader']
handler.command = ['tiktok', 'ttdl', 'tiktokdl', 'tiktoknowm']
handler.register = true 
//handler.limit = 1
export default handler
import fg from 'api-dylux' 
import { tiktokdl } from '@bochilteam/scraper'
let handler = async (m, { conn, text, args, usedPrefix, command}) => {
if (!args[0]) throw `*🚩 Escribe la URL de un video de TikTok que deseas descargar.*`
if (!args[0].match(/tiktok/gi)) throw `verifica que el link sea de TikTok`
await m.react('🕓')
try {
    let p = await fg.tiktok(args[0])
    await conn.sendFile(m.chat, p.play, "out.png", listo, m)
    await m.react('✅')
    } catch {
    try { 
    let api = await fetch(`https://skizo.tech/api/tiktok?url=${args[0]}&apikey=${skizo}`)
    let res = await api.json()
    let dl_url = res.data.hdplay
    await conn.sendFile(m.chat, dl_url, "out.png", listo, m)
    await m.react('✅')
    } catch {
    try {
    let api = await fetch(`https://kiicodeofficial.my.id/api/downloader/tiktok?url=${args[0]}&apikey=${kiicode}`)
    let res = await api.json()
    let dl_url = res.data.hdplay
    await conn.sendFile(m.chat, dl_url, "out.png", listo, m)
    await m.react('✅')
    } catch {
    try {
	const { video } = await tiktokdl(args[0])
    const url = video.no_watermark2 || video.no_watermark || 'https://tikcdn.net' + video.no_watermark_raw || video.no_watermark_hd
    if (!url) throw global.error
    await conn.sendFile(m.chat, url, "out.png", listo, m)
    await m.react('✅')
    } catch {
    await conn.reply(m.chat, `${global.error}`, m).then(_ => m.react('✖️'))
}}}}}
handler.help = ['tiktok <url tt>']
handler.tags = ['downloader']
handler.command = /^(tiktok|ttdl|tiktokdl|tiktoknowm)$/i
handler.limit = 1
handler.register = true 

export default handler
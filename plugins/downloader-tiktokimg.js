import Starlights from '@StarlightsTeam/Scraper'

let handler = async (m, { conn, usedPrefix, command, args }) => {
if (!args[0]) return conn.reply(m.chat, `[ ✰ ]  Ingresa un link de tiktok que contenga *imagenes*`, m, rcanal)
if (!args[0].match(/tiktok/gi)) return conn.reply(m.chat, `[ ✰ ]  Verifica que el link sea de *TikTok*`, m, rcanal)
await m.react('🕓')
try {
let { username, views, comments, shares, downloads, profile, dl_urls } = await Starlights.tiktokdlV2(args[0])
let txt = '`乂  T I K T O K - I M G`\n\n'
    txt += `\t\t*» Usuario* : ${username}\n`
    txt += `\t\t*» Visitas* : ${views}\n`
    txt += `\t\t*» Comentarios* : ${comments}\n`
    txt += `\t\t*» Compartidos* : ${shares}\n`
    txt += `\t\t*» Descargas* : ${downloads}\n`
       
for (let i = 0; i < dl_urls.length; i++) {
await conn.sendFile(m.chat, dl_urls[i].dl_url, `tiktokimg${i + 1}.jpg`, txt, m, null, rcanal)
await m.react('✅')
}} catch {
await m.react('✖️')
}}

handler.help = ['tiktokimg *<url tt>*']
handler.tags = ['downloader']
handler.command = ['tiktokimg', 'tiktokimgs', 'ttimg', 'ttimgs']
handler.register = true

export default handler

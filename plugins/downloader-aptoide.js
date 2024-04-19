import Scraper from "@SumiFX/Scraper"

let handler = async (m, { conn, text, usedPrefix, command }) => {
if (!text) return m.reply('🍭 Ingresa el nombre de la aplicación que deseas descargar.\n\n`Ejemplo:`\n' + `> *${usedPrefix + command}* WhatsApp`)

try {
let { name, packname, update, size, thumbnail, dl_url } = await Scraper.aptoide(text)
if (size.includes('GB') || size.replace(' MB', '') > 300) { return await m.reply('El archivo pesa mas de 300 MB, se canceló la Descarga.')}
let txt = `╭─⬣「 *Aptoide Download* 」⬣\n`
    txt += `│  ≡◦ *🍭 Nombre ∙* ${name}\n`
    txt += `│  ≡◦ *🪴 Packname ∙* ${packname}\n`
    txt += `│  ≡◦ *⚖ Peso ∙* ${size}\n`
    txt += `│  ≡◦ *🕜 Peso ∙* ${update}\n`
    txt += `╰─⬣`
await conn.sendFile(m.chat, thumbnail, 'thumbnail.jpg', txt, m)
await conn.sendMessage(m.chat, {document: { url: dl_url }, mimetype: 'application/vnd.android.package-archive', fileName: name + '.apk', caption: null }, {quoted: m})
} catch {
}}
handler.help = ['aptoide <búsqueda>']
handler.tags = ['downloader']
handler.command = ['aptoide', 'apk']
handler.register = true 
export default handler
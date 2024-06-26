import Starlights from "@StarlightsTeam/Scraper"

let handler = async (m, { conn, text, usedPrefix, command }) => {
if (!text) return conn.reply(m.chat, `*• Ingresa el nombre de la aplicación que deseas descargar.*\n\nEjemplo:\n*${usedPrefix + command}* WhatsApp`, m, rcanal)
await m.react('🕓')
try {
let { name, packname, update, size, thumbnail, dl_url } = await Starlights.aptoide(text)
if (size.includes('GB') || size.replace(' MB', '') > 300) { return await m.reply('El archivo pesa mas de 300 MB, se canceló la Descarga.')}
let txt = `*乂  A P T O I D E  -  D O W N L O A D*\n\n`
    txt += `	✩   *Nombre* : ${name}\n`
    txt += `	✩   *Package* : ${packname}\n`
    txt += `	✩   *Update* : ${update}\n`
    txt += `	✩   *Peso* :  ${size}\n\n`
    txt += `*- ↻ El archivo se esta enviando espera un momento, soy lenta. . .*`
await conn.sendFile(m.chat, thumbnail, 'thumbnail.jpg', txt, m, null, rcanal)
await conn.sendMessage(m.chat, {document: { url: dl_url }, mimetype: 'application/vnd.android.package-archive', fileName: name + '.apk', caption: null }, {quoted: m})
await m.react('✅')
} catch {
await m.react('✖️')
}}
handler.help = ['aptoide *<búsqueda>*']
handler.tags = ['downloader']
handler.command = ['aptoide', 'apk']
handler.register = true 
//handler.limit = 5
export default handler
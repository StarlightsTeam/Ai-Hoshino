import Scraper from "@SumiFX/Scraper"

let handler = async (m, { conn, args, usedPrefix, command }) => {
if (!args[0]) return m.reply('🍭 Ingresa el enlace del archivo de Mediafire junto al comando.\n\n`Ejemplo:`\n' + `> *${usedPrefix + command}* https://www.mediafire.com/file/433hbpsc95unywu/Oshi_no_Ko_01.mp4/file?dkey=jpivv6z5osa&r=1587`)
if (!args[0].match(/mediafire/gi)) return m.reply('El enlace deve ser de un archivo de Mediafire.')
try {
let { title, ext, aploud, size, dl_url } = await Scraper.mediafire(args[0])
if (size.includes('GB') || size.replace(' MB', '') > 300) { return await m.reply('El archivo pesa mas de 300 MB, se canceló la Descarga.')}
let txt = `╭─⬣「 *Mediafire Download* 」⬣\n`
    txt += `│  ≡◦ *🍭 Nombre ∙* ${title}\n`
    txt += `│  ≡◦ *🪴 Subido ∙* ${aploud}\n`
    txt += `│  ≡◦ *📚 MimeType ∙* ${ext}\n`
    txt += `│  ≡◦ *⚖ Peso ∙* ${size}\n`
    txt += `╰─⬣`
await m.reply(txt)
await conn.sendFile(m.chat, dl_url, title, null, m, null, { mimetype: ext, asDocument: true })
} catch {
}}
handler.help = ['mediafire <url mf>']
handler.tags = ['downloader']
handler.command = ['mediafire', 'mdfire', 'mf']
handler.register = true 
export default handler
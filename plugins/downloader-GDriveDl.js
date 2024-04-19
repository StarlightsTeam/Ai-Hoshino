import Scraper from '@SumiFX/Scraper'

let handler = async (m, { conn, args, usedPrefix, command }) => {
if (!args[0]) return m.reply('🍭 Ingresa el enlace del archivo de Mediafire junto al comando.\n\n`Ejemplo:`\n' + `> *${usedPrefix + command}* https://drive.google.com/file/u/0/d/1-AV4MoowegNw6eS8bCZdwqn84_SPfQM0/view?usp=drivesdk&pli=1`)

try {
let { title, size, type, dl_url } = await Scraper.GDriveDl(args[0])
if (size.includes('GB') || size.replace(' MB', '') > 300) { return await m.reply('El archivo pesa mas de 300 MB, se canceló la Descarga.')}
let txt = `╭─⬣「 *GDrive Download* 」⬣\n`
    txt += `│  ≡◦ *🍭 Nombre ∙* ${title}\n`
    txt += `│  ≡◦ *📚 MimeType ∙* ${type}\n`
    txt += `│  ≡◦ *⚖ Peso ∙* ${size}\n`
    txt += `╰─⬣`
await m.reply(txt)
await conn.sendMessage(m.chat, { document: { url: dl_url }, fileName: title, mimetype: type }, { quoted: m })
} catch {
}}
handler.help = ['gdrive <url gdrive>']
handler.tags = ['downloader']
handler.command = ['gdrive']
handler.register = true 
export default handler
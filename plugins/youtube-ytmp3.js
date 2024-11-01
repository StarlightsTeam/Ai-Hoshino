// Puedes agregarle datas a los audios cambiando los codecs y britates del audio a 128 , si lo aumentas a mas los audios seran más pesados y el envio sera lento, puedes modificarlos usando child_process y node-id3 update 
import Starlights from '@StarlightsTeam/Scraper'
import fetch from 'node-fetch'
import Sph from 'ytdl-mp3'

let limit = 100

let handler = async (m, { conn, args, text, isPrems, isOwner, usedPrefix, command }) => {
if (!args[0]) return conn.reply(m.chat, '[ ✰ ] Ingresa el enlace del vídeo de *YouTube* junto al comando.\n\n`» Ejemplo :`\n' + `> *${usedPrefix + command}* https://youtu.be/QSvaCSt8ixs`, m, rcanal)
    await m.react('🕓')
    try {
    let { title, duration, size, thumbnail, dl_url } = await Starlights.ytmp3v2(args[0])
    let img = await (await fetch(`${thumbnail}`)).buffer()
    if (size.split('MB')[0] >= limit) return conn.reply(m.chat, `El archivo pesa más de ${limit} MB, se canceló la descarga.`, m, rcanal).then(_ => m.react('✖️'))
    let txt = '`乂  Y O U T U B E  -  M P 3`\n\n'
    txt += `	✩   *Titulo* : ${title}\n`
    txt += `	✩   *Duración* : ${duration}\n`
    txt += `	✩   *Tamaño* : ${size}\n\n`
    txt += `> *- ↻ El audio se está enviando, espera un momento...*`
    await conn.sendMessage(m.chat, { image: img, caption: txt }, { quoted: m })
    await conn.sendMessage(m.chat, { audio: { url: dl_url }, fileName: title + '.mp3', mimetype: 'audio/mp4' }, { quoted: m })
    await m.react('✅')
    } catch {
    try {
    let { title, size, quality, thumbnail, dl_url } = await Starlights.ytmp3(args[0])
    let img = await (await fetch(`${thumbnail}`)).buffer()
    if (size.split('MB')[0] >= limit) return conn.reply(m.chat, `El archivo pesa más de ${limit} MB, se canceló la descarga.`, m, rcanal).then(_ => m.react('✖️'))
    let txt = '`乂  Y O U T U B E  -  M P 3`\n\n'
    txt += `	✩   *Titulo* : ${title}\n`
    txt += `	✩   *Calidad* : ${quality}\n`
    txt += `	✩   *Tamaño* : ${size}\n\n`
    txt += `> *- ↻ El audio se está enviando, espera un momento...*`
    await conn.sendFile(m.chat, img, 'thumbnail.jpg', txt, m, null, rcanal)
    await conn.sendMessage(m.chat, { audio: { url: dl_url }, fileName: title + '.mp3', mimetype: 'audio/mp4' }, { quoted: m })
    await m.react('✅')
    } catch {
    try {
    //En caso de error escribeme: https://wa.me/+5491168239750
    //Rest Apis : https://apis-starlights-team.koyeb.app
    let cxf = await Sph.ytdl(args[0])
    let txt = '`乂  Y O U T U B E  -  M P 3`\n\n'
    txt += `	✩   *Titulo* : ${cxf.title}\n`
    txt += `	✩   *Calidad* : ${cxf.quality}\n`
    txt += `	✩   *Url* : ${cxf.url}\n\n`
    txt += `> *- ↻ El audio se está enviando, espera un momento...*`
    await conn.sendMessage(m.chat, { image: { url: cxf.thumbnail }, caption: txt }, { quoted: m })
    await conn.sendMessage(m.chat, { audio: { url: cxf.dl_url }, fileName: cxf.title + '.mp3', mimetype: 'audio/mp4' }, { quoted: m })
    await m.react('✅')
    } catch (error) {
    await m.react('✖️')
    }}}}
handler.help = ['ytmp3 *<link yt>*']
handler.tags = ['downloader']
handler.command = ['ytmp3', 'yta', 'fgmp3']
//handler.limit = 1
handler.register = true
export default handler


/*import Starlights from '@StarlightsTeam/Scraper'
import fetch from 'node-fetch' 
let limit = 100

let handler = async (m, { conn, args, text, isPrems, isOwner, usedPrefix, command }) => {
if (!args[0]) return conn.reply(m.chat, '[ ✰ ] Ingresa el enlace del vídeo de *YouTube* junto al comando.\n\n`» Ejemplo :`\n' + `> *${usedPrefix + command}* https://youtu.be/QSvaCSt8ixs`, m, rcanal)

await m.react('🕓')
try {
let { title, duration, size, thumbnail, dl_url } = await Starlights.ytmp3v2(args[0])

let img = await (await fetch(`${thumbnail}`)).buffer()
if (size.split('MB')[0] >= limit) return conn.reply(m.chat, `El archivo pesa mas de ${limit} MB, se canceló la Descarga.`, m, rcanal).then(_ => m.react('✖️'))
	let txt = '`乂  Y O U T U B E  -  M P 3`\n\n'
       txt += `	✩   *Titulo* : ${title}\n`
       txt += `	✩   *Duración* : ${duration}\n`
       txt += `	✩   *Tamaño* : ${size}\n\n`
       txt += `> *- ↻ El audio se esta enviando espera un momento, soy lenta. . .*`
await conn.sendMessage(m.chat, {image: img, caption: txt }, {quoted: m})
await conn.sendMessage(m.chat, { audio: { url: dl_url }, fileName: title + '.mp3', mimetype: 'audio/mp4' }, { quoted: m })
await m.react('✅')
} catch {
try {
let { title, size, quality, thumbnail, dl_url } = await Starlights.ytmp3(args[0])

let img = await (await fetch(`${thumbnail}`)).buffer()
if (size.split('MB')[0] >= limit) return conn.reply(m.chat, `El archivo pesa mas de ${limit} MB, se canceló la Descarga.`, m, rcanal).then(_ => m.react('✖️'))
	let txt = '`乂  Y O U T U B E  -  M P 3`\n\n'
       txt += `	✩   *Titulo* : ${title}\n`
       txt += `	✩   *Calidad* : ${quality}\n`
       txt += `	✩   *Tamaño* : ${size}\n\n`
       txt += `> *- ↻ El audio se esta enviando espera un momento, soy lenta. . .*`
await conn.sendFile(m.chat, img, 'thumbnail.jpg', txt, m, null, rcanal)
await conn.sendMessage(m.chat, { audio: { url: dl_url }, fileName: title + '.mp3', mimetype: 'audio/mp4' }, { quoted: m })
await m.react('✅')
} catch {
await m.react('✖️')
}}}
handler.help = ['ytmp3 *<link yt>*']
handler.tags = ['downloader']
handler.command = ['ytmp3', 'yta', 'fgmp3']
//handler.limit = 1
handler.register = true 

export default handler*/

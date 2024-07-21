//Colocar en Package.json: 
//"ytdl-core": "github:HanSamu-27/ytdl-core#main"

import ytdl from 'ytdl-core' 
import axios from 'axios'
import fetch from 'node-fetch' 
import sharp from 'sharp'

let handler = async (m, { conn: star, args, text, isPrems, isOwner, usedPrefix, command }) => {
if (!args || !args[0]) return star.reply(m.chat, '🚩 Ingresa el enlace del vídeo de YouTube junto al comando.\n\n`Ejemplo:`\n' + `> *${usedPrefix + command}* https://music.youtube.com/watch?v=Z-EAVUGEqQw&si=FRirpjd2h8BZm0Sl`, m, rcanal)
if (!args[0].match(/youtu/gi)) return star.reply(m.chat, `Verifica que el enlace sea de YouTube.`, m, rcanal).then(_ => m.react('✖️'))
await m.react('🕓')
try {
let v = args[0]
let yt = await ytdl.youtubedl(v)
let mpeg = yt.link
let title = yt.title
let thumb = yt.image
let size = ''
try {
let szi = await axios.head(mpeg)
let lengt = szi.headers['content-length']
size = formats(parseInt(lengt))
} catch (error) {
}
let buffer = await (await fetch(`${thumb}`)).buffer()
let jpg = await sharp(buffer).jpeg().toBuffer()
let txt = '`乂  Y O U T U B E  -  M P 3`\n\n'
txt += `	✩   *Titulo* : ${title}\n`
txt += `	✩   *Calidad* : 128kbps\n`
txt += `	✩   *Tamaño* : ${size}\n\n`
txt += `> *- ↻ El audio se esta enviando espera un momento, soy lenta. . .*`
await star.sendFile(m.chat, jpg, 'thumb.jpg', txt, m, null, rcanal)
await star.sendMessage(m.chat, { audio: { url: mpeg }, fileName: title + '.mp3', mimetype: 'audio/mp4' }, { quoted: m })
await m.react('✅')
} catch {
await m.react('✖️')
}}
handler.help = ['ytmp3 *<link yt>*']
handler.tags = ['downloader']
handler.command = ['ytmp3', 'yta', 'fgmp3']
handler.limit = 2
handler.register = true 
export default handler

function formats(bytes, decimals = 2) {
if (bytes === 0) return '0 Bytes'
let k = 1024
let dm = decimals < 0 ? 0 : decimals
let sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']
let i = Math.floor(Math.log(bytes) / Math.log(k))
return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i]
}







/*import fg from 'api-dylux'
import yts from 'yt-search'
import { youtubedl, youtubedlv2 } from '@bochilteam/scraper'
import fetch from 'node-fetch' 
let limit = 100

let handler = async (m, { conn: star, args, text, isPrems, isOwner, usedPrefix, command }) => {
if (!args || !args[0]) return star.reply(m.chat, '🚩 Ingresa el enlace del vídeo de YouTube junto al comando.\n\n`Ejemplo:`\n' + `> *${usedPrefix + command}* https://youtu.be/QSvaCSt8ixs`, m, rcanal)
if (!args[0].match(/youtu/gi)) return star.reply(m.chat, `Verifica que el enlace sea de YouTube.`, m, rcanal).then(_ => m.react('✖️'))
let q = '128kbps'

await m.react('🕓')
try {
let v = args[0]
let yt = await youtubedl(v).catch(async () => await youtubedlv2(v))
let dl_url = await yt.audio[q].download()
let title = await yt.title
let size = await yt.audio[q].fileSizeH
let thumbnail = await yt.thumbnail

let img = await (await fetch(`${thumbnail}`)).buffer()  
if (size.split('MB')[0] >= limit) return star.reply(m.chat, `El archivo pesa mas de ${limit} MB, se canceló la Descarga.`, m, rcanal).then(_ => m.react('✖️'))
	let txt = '`乂  Y O U T U B E  -  M P 3`\n\n'
       txt += `	✩   *Titulo* : ${title}\n`
       txt += `	✩   *Calidad* : ${q}\n`
       txt += `	✩   *Tamaño* : ${size}\n\n`
       txt += `> *- ↻ El audio se esta enviando espera un momento, soy lenta. . .*`
await star.sendFile(m.chat, img, 'thumbnail.jpg', txt, m, null, rcanal)
await star.sendMessage(m.chat, { audio: { url: dl_url }, fileName: title + '.mp3', mimetype: 'audio/mp4' }, { quoted: m })
await m.react('✅')
} catch {
try {
let yt = await fg.yta(args[0], q)
let { title, dl_url, size } = yt 
let vid = (await yts(text)).all[0]
let { thumbnail, url } = vid

let img = await (await fetch(`${vid.thumbnail}`)).buffer()  
if (size.split('MB')[0] >= limit) return star.reply(m.chat, `El archivo pesa mas de ${limit} MB, se canceló la Descarga.`, m, rcanal).then(_ => m.react('✖️'))
	let txt = '`乂  Y O U T U B E  -  M P 3`\n\n'
       txt += `	✩   *Titulo* : ${title}\n`
       txt += `	✩   *Calidad* : ${q}\n`
       txt += `	✩   *Tamaño* : ${size}\n\n`
       txt += `> *- ↻ El audio se esta enviando espera un momento, soy lenta. . .*`
await star.sendFile(m.chat, img, 'thumbnail.jpg', txt, m, null, rcanal)
await star.sendMessage(m.chat, { audio: { url: dl_url }, fileName: title + '.mp3', mimetype: 'audio/mp4' }, { quoted: m })
await m.react('✅')
} catch {
try {
let yt = await fg.ytmp3(args[0], q)
let { title, dl_url, size, thumb } = yt 

let img = await (await fetch(`${thumb}`)).buffer()
if (size.split('MB')[0] >= limit) return star.reply(m.chat, `El archivo pesa mas de ${limit} MB, se canceló la Descarga.`, m, rcanal).then(_ => m.react('✖️'))
	let txt = '`乂  Y O U T U B E  -  M P 3`\n\n'
       txt += `	✩   *Titulo* : ${title}\n`
       txt += `	✩   *Calidad* : ${q}\n`
       txt += `	✩   *Tamaño* : ${size}\n\n`
       txt += `> *- ↻ El audio se esta enviando espera un momento, soy lenta. . .*`
await star.sendFile(m.chat, img, 'thumbnail.jpg', txt, m, null, rcanal)
await star.sendMessage(m.chat, { audio: { url: dl_url }, fileName: title + '.mp3', mimetype: 'audio/mp4' }, { quoted: m })
await m.react('✅')
} catch {
await m.react('✖️')
}}}}
handler.help = ['ytmp3 *<link yt>*']
handler.tags = ['downloader']
handler.command = ['ytmp3', 'yta', 'fgmp3']
//handler.limit = 1
handler.register = true 

export default handler*/

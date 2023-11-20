import { 
    youtubedl,
    youtubedlv2
} from '@bochilteam/scraper'
import yts from 'yt-search'
import fetch from 'node-fetch' 
let limit = 100
let handler = async (m, { conn, args, isPrems, isOwner, text }) => {
if (!args || !args[0]) return conn.reply(m.chat, `*🚩 Escribe la URL de un video de YouTube que deseas descargar.*`, m, adReply)
  if (!args[0].match(/youtu/gi)) conn.reply(m.chat, `Verifica que la *URL* sea de YouTube`, m, adReply).then(_ => m.react('✖️'))
  await m.react('🕓')
try {

  let q = '128kbps'
  let v = args[0]


const yt = await youtubedl(v).catch(async () => await  youtubedlv2(v))
const dl_url = await yt.audio[q].download()
const size = await yt.audio[q].fileSizeH

let vid = (await yts(text)).all[0]

let { title, description, thumbnail, videoId, timestamp, views, ago, url } = vid

let ytestilo = { key: {  fromMe: false, participant: `0@s.whatsapp.net`, ...(false ? { remoteJid: "5219992095479-1625305606@g.us" } : {}) }, message: { orderMessage: { itemCount : -999999, status: 1, surface : 1, message: `${title}`, orderTitle: 'Bang', thumbnail: catalogo, sellerJid: '0@s.whatsapp.net'}}}

if (size.split('MB')[0] >= limit) return conn.reply(m.chat,`El archivo pesa mas de ${limit} MB, se canceló la Descarga.`, m, adReply).then(_ => m.react('✖️'))

await conn.reply(m.chat, `🍭 *Título ∙* ${title}\n⚖️ *Tamaño ∙* ${size}\n\n*↻ Espera @${m.sender.split`@`[0]}, soy lenta. . .*`, ytestilo, adYT)

await conn.sendMessage(m.chat, { audio: { url: dl_url }, mimetype: "audio/mp4", fileName: title + '.mp3', quoted: m, contextInfo: {
'forwardingScore': 200,
'isForwarded': true,
externalAdReply:{
showAdAttribution: false,
title: `${title}`,
body: `${vid.author.name}`,
mediaType: 2, 
sourceUrl: `${url}`,
thumbnail: await (await fetch(thumbnail)).buffer()}}}, { quoted: m })
await m.react('✅')
}catch(e){
conn.reply(m.chat, `*☓ Ocurrió un error inesperado*`, m, adReply).then(_ => m.react('✖️'))
console.log(e)}
}
handler.help = ['ytmp3 <url yt>']
handler.tags = ['downloader']
handler.command = /^(fgmp3|dlmp3|getaud|yt(a|mp3))$/i
handler.star = 2
handler.register = true 
export default handler
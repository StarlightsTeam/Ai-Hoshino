import yts from 'yt-search'
import fetch from 'node-fetch' 
import { youtubedl, youtubedlv2 } from '@bochilteam/scraper'
let limit = 100
let handler = async (m, { conn, text, args, usedPrefix, command }) => {
  if (!text) return conn.reply(m.chat, `*🚩 Ingresa el titulo de un video o musica de YouTube.*`, m, adReply)
  await m.react('🕓')
  try {
    let ytse = await yts(args.join(" "))
    let vid = ytse.all.find(v => v.type === "video")
    let q = '128kbps'
    let v = vid.url
    let yt = await youtubedl(v).catch(async _ => await youtubedlv2(v))
    let dl_url = await yt.audio[q].download()
    let ttl = await yt.title
    let size = await yt.audio[q].fileSizeH
    let ytmsg = { key: { fromMe: false, participant: `0@s.whatsapp.net`, ...(false ? { remoteJid: "17608914335-1625305606@g.us" } : {}) }, message: { "extendedTextMessage": { "text":'Downloader YT', "title": 'Miku Bot - MD', 'jpegThumbnail': ytlogo}}}
    let { title, description, thumbnail, videoId, timestamp, views, ago, url } = vid
    if (size.split('MB')[0] >= limit) return conn.reply(m.chat,`El archivo pesa mas de ${limit} MB, se canceló la Descarga.`, m, adReply).then(_ => m.react('✖️'))
    let txt = `╭──────────✰\n`
        txt += `│🍭 *Título ∙* ${vid.title}\n`
        txt += `│🕜 *Duración ∙* ${vid.timestamp}\n`
        txt += `│👁 *Visitas ∙* ${vid.views}\n`
        txt += `│📅 *Publicado ∙* ${eYear(ago) || ago || '×'}\n`
        txt += `│⚖️ *Tamaño* : ${size}\n`
        txt += `│🎞️ *Calidad* : ${q}\n`
        txt += `╰──────────✰`
       
let buttonMessage= {
'document': { url: `https://github.com/` },
'mimetype': `application/pdf`,
'fileName': `✯ | YᴏᴜTᴜʙᴇ Pʟᴀʏ 📥`,
'fileLength': 99999999999999,
'pageCount': 200,
'contextInfo': {
'forwardingScore': 200,
'isForwarded': true,
'externalAdReply': {
'mediaUrl': `${vid.url}`,
'mediaType': 2,
'previewType': 'VIDEO',
'title': `${vid.title}`,
'body': null,
'thumbnail': await (await fetch(vid.thumbnail)).buffer(),
'sourceUrl': 'https://youtube.com/' }},
'caption': txt,
'footer': '\nVideos de YouTube',
'headerType': 6 }
conn.sendMessage(m.chat, buttonMessage, { quoted: ytmsg })

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
handler.help = ["play"].map(v => v + " <búsqueda>")
handler.tags = ["downloader"]
handler.command = /^play$/i
handler.register = true 
handler.star = 2
export default handler

function sNum(num) {
    return new Intl.NumberFormat('en-GB', { notation: "compact", compactDisplay: "short" }).format(num)
}

function eYear(txt) {
    if (!txt) {
        return '×'
    }
    if (txt.includes('month ago')) {
        var T = txt.replace("month ago", "").trim()
        var L = 'hace '  + T + ' mes'
        return L
    }
    if (txt.includes('months ago')) {
        var T = txt.replace("months ago", "").trim()
        var L = 'hace ' + T + ' meses'
        return L
    }
    if (txt.includes('year ago')) {
        var T = txt.replace("year ago", "").trim()
        var L = 'hace ' + T + ' año'
        return L
    }
    if (txt.includes('years ago')) {
        var T = txt.replace("years ago", "").trim()
        var L = 'hace ' + T + ' años'
        return L
    }
    if (txt.includes('hour ago')) {
        var T = txt.replace("hour ago", "").trim()
        var L = 'hace ' + T + ' hora'
        return L
    }
    if (txt.includes('hours ago')) {
        var T = txt.replace("hours ago", "").trim()
        var L = 'hace ' + T + ' horas'
        return L
    }
    if (txt.includes('minute ago')) {
        var T = txt.replace("minute ago", "").trim()
        var L = 'hace ' + T + ' minuto'
        return L
    }
    if (txt.includes('minutes ago')) {
        var T = txt.replace("minutes ago", "").trim()
        var L = 'hace ' + T + ' minutos'
        return L
    }
    if (txt.includes('day ago')) {
        var T = txt.replace("day ago", "").trim()
        var L = 'hace ' + T + ' dia'
        return L
    }
    if (txt.includes('days ago')) {
        var T = txt.replace("days ago", "").trim()
        var L = 'hace ' + T + ' dias'
        return L
    }
    return txt
}
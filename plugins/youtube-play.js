import fg from 'api-dylux'
import { youtubedl, youtubedlv2 } from '@bochilteam/scraper'
import yts from 'yt-search'
import fetch from 'node-fetch' 

let handler = async (m, { conn, args, usedPrefix, text, command }) => {
    let lister = [
        "mp3",
        "mp4", 
        "mp3doc",
        "mp4doc"
    ]
    let ytmsg = { key: { fromMe: false, participant: `0@s.whatsapp.net`, ...(false ? { remoteJid: "17608914335-1625305606@g.us" } : {}) }, message: { "extendedTextMessage": { "text":'Downloader YouTube', "title": 'Ai Hoshino - MD', 'jpegThumbnail': ytlogo}}}
    
    let [feature, inputs, inputs_, inputs__, inputs___] = text.split(" ")
    if (!lister.includes(feature)) return conn.reply(m.chat, `*🚩 Ingresa el formato en que deseas descargar más el titulo de un video o musica de YouTube.*\n\nEjemplo : ${usedPrefix + command} *mp3* SUICIDAL-IDOL - ecstacy\n\nFormatos disponibles :\n${usedPrefix + command} *mp3*\n${usedPrefix + command} *mp3doc*\n${usedPrefix + command} *mp4*\n${usedPrefix + command} *mp4doc*`, m, adReply)
    if (lister.includes(feature)) {
        if (feature == "mp3") {
            if (!inputs) return conn.reply(m.chat, `*🚩 Ingresa el titulo de un video o musica de YouTube.*`, m, adReply)
    await m.react('🕓')
    let res = await yts(text)
    let vid = res.videos[0]
    let q = '128kbps'
    let txt = `╭──────────✰\n`
	   txt += `│🍭 *Título ∙* ${vid.title}\n`
       txt += `│🕜 *Duración ∙* ${vid.timestamp}\n`
       txt += `│👁 *Visitas ∙* ${vid.views}\n`
       txt += `│📚 *Autor ∙* ${vid.author.name}\n`
       txt += `│📅 *Publicado ∙* ${vid.ago}\n`
       txt += `│⛓ *Url ∙* ${'https://youtu.be/' + vid.videoId}\n`
       txt += `╰──────────✰\n\n`
       txt += `*↻ Espera @${m.sender.split`@`[0]}, soy lenta. . .*`
let buttonMessage= {
'document': { url: `https://github.com/NakanoTeam/Ai-Hoshino` },
'mimetype': `application/pdf`,
'fileName': `✰ | YᴏᴜTᴜʙᴇ Pʟᴀʏ 📥`,
'fileLength': 99999999999999,
'pageCount': 200,
'contextInfo': {
'mentionedJid': [m.sender],
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
       
       try {
       let yt = await fg.yta(vid.url, q)
       let { title, dl_url, size } = yt
       let limit = 100
       
if (size.split('MB')[0] >= limit) return conn.reply(m.chat,`El archivo pesa mas de ${limit} MB, se canceló la Descarga.`, m, adReply).then(_ => m.react('✖️'))
       
await conn.sendMessage(m.chat, { audio: { url: dl_url }, mimetype: "audio/mp4", fileName: vid.title + '.mp3', quoted: m, contextInfo: {
'forwardingScore': 200,
'isForwarded': true,
externalAdReply:{
showAdAttribution: false,
title: `${vid.title}`,
body: `${vid.author.name}`,
mediaType: 2, 
sourceUrl: `${vid.url}`,
thumbnail: await (await fetch(vid.thumbnail)).buffer()}}}, { quoted: m })
       await m.react('✅')
       } catch {
       try {
       let yt = await fg.ytmp3(vid.url, q)
       let { title, dl_url, size } = yt
       let limit = 100
       
if (size.split('MB')[0] >= limit) return conn.reply(m.chat,`El archivo pesa mas de ${limit} MB, se canceló la Descarga.`, m, adReply).then(_ => m.react('✖️'))
       
       await conn.sendMessage(m.chat, { audio: { url: dl_url }, mimetype: "audio/mp4", fileName: vid.title + '.mp3', quoted: m, contextInfo: {
'forwardingScore': 200,
'isForwarded': true,
externalAdReply:{
showAdAttribution: false,
title: `${vid.title}`,
body: `${vid.author.name}`,
mediaType: 2, 
sourceUrl: `${vid.url}`,
thumbnail: await (await fetch(vid.thumbnail)).buffer()}}}, { quoted: m })
       await m.react('✅')
       } catch (error) {
        await conn.reply(m.chat,`*☓ Ocurrió un error inesperado*`, m, adReply).then(_ => m.react('✖️'))
        console.error(error)
    }}}
        
        if (feature == "mp4") {
            if (!inputs) return conn.reply(m.chat, `*🚩 Ingresa el titulo de un video o musica de YouTube.*`, m, adReply)
    await m.react('🕓')
    let res = await yts(text)
    let vid = res.videos[0]
    let q = '360p'
	let txt = `╭──────────✰\n`
	   txt += `│🍭 *Título ∙* ${vid.title}\n`
       txt += `│🕜 *Duración ∙* ${vid.timestamp}\n`
       txt += `│👁 *Visitas ∙* ${vid.views}\n`
       txt += `│📚 *Autor ∙* ${vid.author.name}\n`
       txt += `│📅 *Publicado ∙* ${vid.ago}\n`
       txt += `│⛓ *Url ∙* ${'https://youtu.be/' + vid.videoId}\n`
       txt += `╰──────────✰\n\n`
       txt += `*↻ Espera @${m.sender.split`@`[0]}, soy lenta. . .*`
let buttonMessage= {
'document': { url: `https://github.com/NakanoTeam/Ai-Hoshino` },
'mimetype': `application/pdf`,
'fileName': `✰ | YᴏᴜTᴜʙᴇ Pʟᴀʏ 📥`,
'fileLength': 99999999999999,
'pageCount': 200,
'contextInfo': {
'mentionedJid': [m.sender],
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
       
       let ytestilo = { key: {  fromMe: false, participant: `0@s.whatsapp.net`, ...(false ? { remoteJid: "5219992095479-1625305606@g.us" } : {}) }, message: { orderMessage: { itemCount : -999999, status: 1, surface : 1, message: `${vid.title}`, orderTitle: 'Bang', thumbnail: catalogo, sellerJid: '0@s.whatsapp.net'}}}
       
       try {
       let yt = await fg.ytv(vid.url, q)
       let { title, dl_url, size } = yt
       let limit = 100
       
if (size.split('MB')[0] >= limit) return conn.reply(m.chat,`El archivo pesa mas de ${limit} MB, se canceló la Descarga.`, m, adReply).then(_ => m.react('✖️'))
       
       await conn.sendFile(m.chat, dl_url, 'yt.jpg', `${vid.title}\n⇆ㅤㅤ◁ㅤㅤ❚❚ㅤㅤ▷ㅤㅤ↻\n00:15 ━━━━●────── ${vid.timestamp}`, ytestilo)
       await m.react('✅')
       } catch {
       try {
       let yt = await fg.ytmp4(vid.url, q)
       let { title, dl_url, size } = yt
       let limit = 100
       
if (size.split('MB')[0] >= limit) return conn.reply(m.chat,`El archivo pesa mas de ${limit} MB, se canceló la Descarga.`, m, adReply).then(_ => m.react('✖️'))
       
       await conn.sendFile(m.chat, dl_url, 'yt.jpg', `${vid.title}\n⇆ㅤㅤ◁ㅤㅤ❚❚ㅤㅤ▷ㅤㅤ↻\n00:15 ━━━━●────── ${vid.timestamp}`, ytestilo)
       await m.react('✅')
       } catch (error) {
        await conn.reply(m.chat,`*☓ Ocurrió un error inesperado*`, m, adReply).then(_ => m.react('✖️'))
        console.error(error)
    }}}
    
    if (feature == "mp3doc") {
            if (!inputs) return conn.reply(m.chat, `*🚩 Ingresa el titulo de un video o musica de YouTube.*`, m, adReply)
    await m.react('🕓')
    let res = await yts(text)
    let vid = res.videos[0]
    let q = '128kbps'
	let txt = `╭──────────✰\n`
	   txt += `│🍭 *Título ∙* ${vid.title}\n`
       txt += `│🕜 *Duración ∙* ${vid.timestamp}\n`
       txt += `│👁 *Visitas ∙* ${vid.views}\n`
       txt += `│📚 *Autor ∙* ${vid.author.name}\n`
       txt += `│📅 *Publicado ∙* ${vid.ago}\n`
       txt += `│⛓ *Url ∙* ${'https://youtu.be/' + vid.videoId}\n`
       txt += `╰──────────✰\n\n`
       txt += `*↻ Espera @${m.sender.split`@`[0]}, soy lenta. . .*`
let buttonMessage= {
'document': { url: `https://github.com/NakanoTeam/Ai-Hoshino` },
'mimetype': `application/pdf`,
'fileName': `✰ | YᴏᴜTᴜʙᴇ Pʟᴀʏ 📥`,
'fileLength': 99999999999999,
'pageCount': 200,
'contextInfo': {
'mentionedJid': [m.sender],
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
       
       try {
       let yt = await fg.yta(vid.url, q)
       let { title, dl_url, size } = yt
       let limit = 100
       
if (size.split('MB')[0] >= limit) return conn.reply(m.chat,`El archivo pesa mas de ${limit} MB, se canceló la Descarga.`, m, adReply).then(_ => m.react('✖️'))
       
       await conn.sendMessage(m.chat, { document: { url: dl_url }, mimetype: "audio/mpeg", fileName: vid.title + '.mp3', quoted: m, contextInfo: {
'forwardingScore': 200,
'isForwarded': true,
externalAdReply:{
showAdAttribution: false,
title: `${vid.title}`,
body: `${vid.author.name}`,
mediaType: 2, 
sourceUrl: `${vid.url}`,
thumbnail: await (await fetch(vid.thumbnail)).buffer()}}}, { quoted: m })
       await m.react('✅')
       } catch {
       try {
       let yt = await fg.ytmp3(vid.url, q)
       let { title, dl_url, size } = yt
       let limit = 100
       
if (size.split('MB')[0] >= limit) return conn.reply(m.chat,`El archivo pesa mas de ${limit} MB, se canceló la Descarga.`, m, adReply).then(_ => m.react('✖️'))
       
       await conn.sendMessage(m.chat, { document: { url: dl_url }, mimetype: "audio/mpeg", fileName: vid.title + '.mp3', quoted: m, contextInfo: {
'forwardingScore': 200,
'isForwarded': true,
externalAdReply:{
showAdAttribution: false,
title: `${vid.title}`,
body: `${vid.author.name}`,
mediaType: 2, 
sourceUrl: `${vid.url}`,
thumbnail: await (await fetch(vid.thumbnail)).buffer()}}}, { quoted: m })
       await m.react('✅')
       } catch (error) {
        await conn.reply(m.chat,`*☓ Ocurrió un error inesperado*`, m, adReply).then(_ => m.react('✖️'))
        console.error(error)
    }}}
    
    if (feature == "mp4doc") {
            if (!inputs) return conn.reply(m.chat, `*🚩 Ingresa el titulo de un video o musica de YouTube.*`, m, adReply)
    await m.react('🕓')
    let res = await yts(text)
    let vid = res.videos[0]
    let q = '360p'
	let txt = `╭──────────✰\n`
	   txt += `│🍭 *Título ∙* ${vid.title}\n`
       txt += `│🕜 *Duración ∙* ${vid.timestamp}\n`
       txt += `│👁 *Visitas ∙* ${vid.views}\n`
       txt += `│📚 *Autor ∙* ${vid.author.name}\n`
       txt += `│📅 *Publicado ∙* ${vid.ago}\n`
       txt += `│⛓ *Url ∙* ${'https://youtu.be/' + vid.videoId}\n`
       txt += `╰──────────✰\n\n`
       txt += `*↻ Espera @${m.sender.split`@`[0]}, soy lenta. . .*`
let buttonMessage= {
'document': { url: `https://github.com/NakanoTeam/Ai-Hoshino` },
'mimetype': `application/pdf`,
'fileName': `✰ | YᴏᴜTᴜʙᴇ Pʟᴀʏ 📥`,
'fileLength': 99999999999999,
'pageCount': 200,
'contextInfo': {
'mentionedJid': [m.sender],
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
       
       try {
       let yt = await fg.ytv(vid.url, q)
       let { title, dl_url, size } = yt
       let limit = 300
       
if (size.split('MB')[0] >= limit) return conn.reply(m.chat,`El archivo pesa mas de ${limit} MB, se canceló la Descarga.`, m, adReply).then(_ => m.react('✖️'))
       
       await conn.sendMessage(m.chat, { document: { url: dl_url }, caption: `${vid.title}\n⇆ㅤㅤ◁ㅤㅤ❚❚ㅤㅤ▷ㅤㅤ↻\n00:15 ━━●────── ${vid.timestamp}`, mimetype: 'video/mp4', fileName: `${vid.title}` + `.mp4`, quoted: m, contextInfo: {
'forwardingScore': 200,
'isForwarded': true,
externalAdReply:{
showAdAttribution: false,
title: `${vid.title}`,
body: `${vid.author.name}`,
mediaType: 2, 
sourceUrl: `${vid.url}`,
thumbnail: await (await fetch(vid.thumbnail)).buffer()}}}, { quoted: m })
       await m.react('✅')
       } catch {
       try {
       let yt = await fg.ytmp4(vid.url, q)
       let { title, dl_url, size } = yt
       let limit = 300
       
if (size.split('MB')[0] >= limit) return conn.reply(m.chat,`El archivo pesa mas de ${limit} MB, se canceló la Descarga.`, m, adReply).then(_ => m.react('✖️'))
       
       await conn.sendMessage(m.chat, { document: { url: dl_url }, caption: `${vid.title}\n⇆ㅤㅤ◁ㅤㅤ❚❚ㅤㅤ▷ㅤㅤ↻\n00:15 ━━●────── ${vid.timestamp}`, mimetype: 'video/mp4', fileName: `${vid.title}` + `.mp4`, quoted: m, contextInfo: {
'forwardingScore': 200,
'isForwarded': true,
externalAdReply:{
showAdAttribution: false,
title: `${vid.title}`,
body: `${vid.author.name}`,
mediaType: 2, 
sourceUrl: `${vid.url}`,
thumbnail: await (await fetch(vid.thumbnail)).buffer()}}}, { quoted: m })
       await m.react('✅')
       } catch (error) {
        await conn.reply(m.chat,`*☓ Ocurrió un error inesperado*`, m, adReply).then(_ => m.react('✖️'))
        console.error(error)
}}}}}
handler.help = ["play"].map(v => v + " <formato> <búsqueda>")
handler.tags = ["downloader"]
handler.command = ['play']
handler.register = true 
handler.star = 2
export default handler
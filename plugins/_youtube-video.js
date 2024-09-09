import fg from 'api-dylux'
import yts from 'yt-search'
import { youtubedl, youtubedlv2 } from '@bochilteam/scraper'
let limit = 300
let handler = async (m, { conn, text, isPrems, isOwner, usedPrefix, command }) => {
if (!m.quoted) return conn.reply(m.chat, `🚩 Etiqueta el mensaje que contenga el resultado de YouTube Play.`, m, rcanal).then(_ => m.react('✖️'))
if (!m.quoted.text.includes("乂  Y O U T U B E  -  P L A Y")) return conn.reply(m.chat, `🚩 Etiqueta el mensaje que contenga el resultado de YouTube Play.`, m, rcanal).then(_ => m.react('✖️'))
//if (!m.quoted.isBaileys) return conn.reply(m.chat, `🚩 Etiqueta el mensaje que contenga el resultado de YouTube Play.`, m, rcanal).then(_ => m.react('✖️'))
let urls = m.quoted.text.match(new RegExp(/(?:https?:\/\/)?(?:youtu\.be\/|(?:www\.|m\.)?youtube\.com\/(?:watch|v|embed|shorts)(?:\.php)?(?:\?.*v=|\/))([a-zA-Z0-9\_-]+)/, 'gi'))
if (!urls) return conn.reply(m.chat, `Resultado no Encontrado.`, m, rcanal).then(_ => m.react('✖️'))
if (urls.length < text) return conn.reply(m.chat, `Resultado no Encontrado.`, m, rcanal).then(_ => m.react('✖️'))
let user = global.db.data.users[m.sender]
let q = urls[1] || '480p'

await m.react('🕓')
try {
let v = urls[0]
let yt = await youtubedl(v).catch(async () => await youtubedlv2(v))
let dl_url = await yt.video[q].download()
let title = await yt.title
let size = await yt.video[q].fileSizeH 

if (size.split('MB')[0] >= limit) return m.reply(`El archivo pesa mas de ${limit} MB, se canceló la Descarga.`).then(_ => m.react('✖️'))

await conn.sendFile(m.chat, dl_url, title + '.mp4', `*» Título* : ${title}\n*» Calidad* : ${q}`, m, false, { asDocument: user.useDocument })
await m.react('✅')
} catch {
try {
const yt = await fg.ytv(urls[0], q)
let { title, dl_url, size } = yt 

if (size.split('MB')[0] >= limit) return m.reply(`El archivo pesa mas de ${limit} MB, se canceló la Descarga.`).then(_ => m.react('✖️'))

await conn.sendFile(m.chat, dl_url, title + '.mp4', `*» Título* : ${title}\n*» Calidad* : ${q}`, m, false, { asDocument: user.useDocument })
await m.react('✅')
} catch {
try {
let yt = await fg.ytmp4(urls[0], q)
let { title, size, dl_url } = yt

if (size.split('MB')[0] >= limit) return m.reply(`El archivo pesa mas de ${limit} MB, se canceló la Descarga.`).then(_ => m.react('✖️'))

await conn.sendFile(m.chat, dl_url, title + '.mp4', `*» Título* : ${title}\n*» Calidad* : ${q}`, m, false, { asDocument: user.useDocument })
await m.react('✅')
} catch {
await m.react('✖️')
}}}}
handler.help = ['Video']
handler.tags = ['downloader']
handler.customPrefix = /^(Video|video|vídeo|Vídeo)/
handler.command = new RegExp
//handler.limit = 1

export default handler
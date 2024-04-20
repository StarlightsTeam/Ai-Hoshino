import { toAudio } from '../lib/converter.js'

let handler = async (m, { conn, usedPrefix, command }) => {
let q = m.quoted ? m.quoted : m
let mime = (m.quoted ? m.quoted : m.msg).mimetype || ''
if (!/video|audio/.test(mime)) throw `🍭 Responde al *Video* o *Nota de Voz* que desea convertir a mp3.`
try {
let media = await q.download?.()
if (!media) return null
let audio = await toAudio(media, 'mp4')
if (!audio.data) return null
await conn.sendFile(m.chat, audio.data, 'audio.mp3', '', m, null, { mimetype: 'audio/mp4' })
} catch {
}}
handler.help = ['tomp3']
handler.tags = ['tools']
handler.command = ['tomp3', 'toaudio', 'mp3'] 
handler.register = true

export default handler
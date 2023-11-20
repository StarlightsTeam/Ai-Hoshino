import {webp2png} from '../lib/webp2mp4.js';
let handler = async (m, {conn, usedPrefix, command}) => {
  if (!m.quoted) return conn.reply(m.chat, `Responde a un *Sticker*`, m, adReply)
  let q = m.quoted || m
  let mime = q.mediaType || ''
  if (!/sticker/.test(mime)) return conn.reply(m.chat, `Responde a un *Sticker*`, m, adReply)
  await m.react('🕓')
  let media = await q.download()
  let out = await webp2png(media).catch((_) => null) || Buffer.alloc(0)
  await conn.sendFile(m.chat, out, 'error.png', null, estilo)
  await m.react('✅')
}
handler.help = ['toimg']
handler.tags = ['sticker', 'tools']
handler.command = ['toimg', 'jpg', 'img']
handler.star = 1
handler.register = true 
export default handler
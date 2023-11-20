import {webp2mp4} from '../lib/webp2mp4.js'
import {ffmpeg} from '../lib/converter.js'
const handler = async (m, {conn, usedPrefix, command}) => {
  if (!m.quoted) return conn.reply(m.chat, `Responde a un *Sticker*`, m, adReply)
  const mime = m.quoted.mimetype || ''
  if (!/webp/.test(mime)) return conn.reply(m.chat, `Responde a un *Sticker*`, m, adReply)
  await m.react('🕓')
  const media = await m.quoted.download()
  let out = Buffer.alloc(0)
  if (/webp/.test(mime)) {
    out = await webp2mp4(media)
  } else if (/audio/.test(mime)) {
    out = await ffmpeg(media, [
      '-filter_complex', 'color',
      '-pix_fmt', 'yuv420p',
      '-crf', '51',
      '-c:a', 'copy',
      '-shortest',
    ], 'mp3', 'mp4')
  }
  await conn.sendFile(m.chat, out, 'out.mp4', null, estilo)
  await m.react('✅')
}
handler.help = ['tomp4']
handler.tags = ['sticker', 'tools']
handler.command = ['tovideo', 'tomp4', 'mp4', 'togif']
handler.star = 1
handler.register = true 
export default handler
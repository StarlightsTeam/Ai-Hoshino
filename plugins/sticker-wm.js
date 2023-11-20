import { addExif } from '../lib/sticker.js'
let handler = async (m, { conn, text }) => {
  if (!m.quoted) return conn.reply(m.chat, 'Responde a un *sticker.*', m, adReply)
  let stiker = false
  try {
    let [packname, ...author] = text.split('|')
    author = (author || []).join('|')
    let mime = m.quoted.mimetype || ''
    if (!/webp/.test(mime)) throw 'Responde a un *sticker.*'
    let img = await m.quoted.download()
    if (!img) return conn.reply(m.chat, 'Responde a un *sticker.*', m, adReply)
    stiker = await addExif(img, packname || '', author || '')
  } catch (e) {
    console.error(e)
    if (Buffer.isBuffer(e)) stiker = e
  } finally {
  await conn.reply(m.chat, `*↻ Espera @${m.sender.split`@`[0]}, soy lenta. . .*`, estilo, adSticker)
    if (stiker) conn.sendFile(m.chat, stiker, 'wm.webp', '', m, true, { contextInfo: { 'forwardingScore': 200, 'isForwarded': false, externalAdReply:{ showAdAttribution: true, title: gcname, body: `h`, mediaType: 2, sourceUrl: group, thumbnail: miniurl}}}, { quoted: m })
    else return conn.reply(m.chat, 'La conversión falló.', m, adReply)
  }
}
handler.help = ['wm <nombre>|<autor>']
handler.tags = ['sticker']
handler.command = ['take', 'robar', 'wm'] 

export default handler
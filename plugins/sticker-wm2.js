import { addExif } from '../lib/sticker.js'
let handler = async (m, { conn, text }) => {
  if (!m.quoted) return conn.reply(m.chat, `🚩 Responde a a un *Sticker.*`, m, rcanal)
  let stiker = false
  try {
    let mime = m.quoted.mimetype || ''
    if (!/webp/.test(mime)) throw isSticker
    let img = await m.quoted.download()
    if (!img) throw isSticker
    stiker = await addExif(img, global.packname, global.author)
  } catch (e) {
    console.error(e)
    if (Buffer.isBuffer(e)) stiker = e
  } finally {
    if (stiker) conn.sendFile(m.chat, stiker, 'wm.webp', '', m)
    else return conn.reply(m.chat, `🚩 Responde a a un *Sticker.*`, m, rcanal)
  }
}

handler.help = ['wm2']
handler.tags = ['sticker']
handler.command = /^(take2|robar2|wm2)$/i
handler.register = true

export default handler
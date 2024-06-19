import { addExif } from '../lib/sticker.js'
let handler = async (m, { conn, text }) => {
  if (!m.quoted) return conn.reply(m.chat, `🚩 Responde a a un *Sticker.*`, m, rcanal)
  let stiker = false
  try {
    let [packname, ...author] = text.split('|')
    author = (author || []).join('|')
    let mime = m.quoted.mimetype || ''
    if (!/webp/.test(mime)) return conn.reply(m.chat, `🚩 Responde a a un *Sticker.*`, m, rcanal)
    let img = await m.quoted.download()
    if (!img) return conn.reply(m.chat, `🚩 Responde a a un *Sticker.*`, m, rcanal)
    stiker = await addExif(img, packname || '', author || '')
  } catch (e) {
    console.error(e)
    if (Buffer.isBuffer(e)) stiker = e
  } finally {
    if (stiker) conn.sendFile(m.chat, stiker, 'wm.webp', '', m)
    else return conn.reply(m.chat, `🚩 Responde a a un *Sticker.*`, m, rcanal)
  }
}
handler.help = ['wm *<nombre>|<autor>*']
handler.tags = ['sticker']
handler.command = ['take', 'robar', 'wm'] 

export default handler
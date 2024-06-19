import uploadImage from '../lib/uploadImage.js'
import { sticker } from '../lib/sticker.js'
let handler = async (m, { conn, text, usedPrefix, command }) => {
    let [atas, bawah] = text.split`|`
    let q = m.quoted ? m.quoted : m
    let mime = (q.msg || q).mimetype || ''
    if (!mime) return m.reply(`🚩 Responde a una imagen e ingresa un texto junto al comando.`)
    try {
    if (!/image\/(jpe?g|png)/.test(mime)) return await m.react('✖️')
    await m.react('🕓')
    let img = await q.download()
    let url = await uploadImage(img)
    let meme = `https://api.memegen.link/images/custom/${encodeURIComponent(atas ? atas : '')}/${encodeURIComponent(bawah ? bawah : '')}.png?background=${url}`
    let stiker = await sticker(false, meme, global.packname, global.author)
    if (stiker) await conn.sendFile(m.chat, stiker, '', author, m, '', { asSticker: 1 })
    await m.react('✅')
} catch {
await m.react('✖️')
}}
handler.help = ['smeme *<texto>*']
handler.tags = ['sticker']
handler.command = /^(smeme)$/i
handler.register = true 
export default handler
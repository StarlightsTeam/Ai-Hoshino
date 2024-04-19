import fetch from 'node-fetch'
import { sticker } from '../lib/sticker.js'

let handler = async (m, {
    conn
}) => {
    let res = await fetch('https://nekos.life/api/v2/img/meow')
    let json = await res.json()
    let stiker = await sticker(null, json.url, global.packname, global.author)
    if (stiker) return conn.sendFile(m.chat, stiker, 'sticker.gif', '', m, false, {
        asSticker: true
    })
    throw stiker.toString()
}
handler.help = ['scat']
handler.tags = ['sticker']
handler.command = ["scat", "stickercat", "cats"]
handler.register = true 
export default handler
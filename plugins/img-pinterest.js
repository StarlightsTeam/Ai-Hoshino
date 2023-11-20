import cheerio from 'cheerio'
import fetch from 'node-fetch'

let handler = async(m, { conn, text, usedPrefix, command }) => {
if (!text) return conn.reply(m.chat, `*🚩 Ingresa que imagen deseas buscar en Pinterest.*`, m, adReply)
await m.react('🕓')
let res = await fetch(`https://www.pinterest.com/resource/BaseSearchResource/get/?source_url=%2Fsearch%2Fpins%2F%3Fq%3D${text}&data=%7B%22options%22%3A%7B%22isPrefetch%22%3Afalse%2C%22query%22%3A%22${text}%22%2C%22scope%22%3A%22pins%22%2C%22no_fetch_context_on_resource%22%3Afalse%7D%2C%22context%22%3A%7B%7D%7D&_=1619980301559`)
let json = await res.json()
let data = json?.resource_response?.data?.results
let img = data[~~(Math.random() * (data?.length))]?.images?.orig
if (!img) return conn.reply(m.chat, 'Imagen no encontrada, Intenta con otro Nombre.', m, adReply).then(_ => m.react('✖️'))
await conn.sendFile(m.chat, img.url, 'out.png', `*––––––『 PINTEREST IMAGE 』––––––*\n\n*Pinterest ∙* ${text}\n\n${namebot}`.trim(), estilo)
await m.react('✅')
}
handler.help = ['pinterest <texto>']
handler.tags = ['img']
handler.command = ['pinterest'] 
handler.star = 1
handler.register = true 
export default handler
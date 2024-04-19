import {googleIt} from '@bochilteam/scraper'
import google from 'google-it'
import axios from 'axios'
let handler = async (m, { conn, command, args, usedPrefix }) => {
const fetch = (await import('node-fetch')).default;
const text = args.join` `
if (!text) return conn.reply(m.chat, '🍭 Ingresa lo que deseas buscar en Google.', m)
const url = 'https://google.com/search?q=' + encodeURIComponent(text)
google({'query': text}).then(res => {
let teks = `*🔎 Resultado de* : ${text}\n\n`
for (let g of res) {
teks += `*🍭 Titulo ∙* ${g.title}\n*📚 Info ∙* ${g.snippet}\n*⛓ Url ∙* ${g.link}\n\n`
}
conn.reply(m.chat, teks, m)
})
}
handler.help = ['google <búsqueda>']
handler.tags = ['tools', 'search']
handler.command = /^googlef?$/i
handler.register = true 
export default handler
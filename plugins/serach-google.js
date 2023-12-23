import {googleIt} from '@bochilteam/scraper';
import google from 'google-it';
import axios from 'axios';
let handler = async (m, { conn, command, args, usedPrefix }) => {
const fetch = (await import('node-fetch')).default;
const text = args.join` `;
if (!text) return conn.reply(m.chat, '*🚩 Ingresa lo que deseas buscar en Google.*', m, adReply);
await conn.reply(m.chat, `*↻ Espera @${m.sender.split`@`[0]}, soy lenta. . .*`, estilo, adSearch).then(_ => m.react('🕓'))
const url = 'https://google.com/search?q=' + encodeURIComponent(text);
google({'query': text}).then(res => {
let teks = `*🔎 Resultado de* : ${text}\n\n`
for (let g of res) {
teks += `*Titulo ∙* ${g.title}\n*Link ∙* ${g.link}\n*Info ∙* ${g.snippet}\n\n`
}
conn.reply(m.chat, teks, m, adReply).then(_ => m.react('✅'))
})
}
handler.help = ['google <búsqueda>'];
handler.tags = ['tools', 'search'];
handler.command = /^googlef?$/i;
handler.star = 1
handler.register = true 
export default handler;
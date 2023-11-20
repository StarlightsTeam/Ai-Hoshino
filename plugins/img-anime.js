import axios from 'axios';
import fetch from 'node-fetch';
const handler = async (m, {command, conn}) => {
  
await m.react('🕓')
await conn.reply(m.chat, `*↻ Espera @${m.sender.split`@`[0]}, soy lenta. . .*`, estilo, {
contextInfo: { mentionedJid: [m.sender], externalAdReply :{ mediaUrl: null, mediaType: 1, showAdAttribution: true,
title: adanime,
body: desc,
previewType: 0, thumbnail: miniurl,
sourceUrl: null }}})

if (command == 'megumin') {
let res = await fetch('https://api.waifu.pics/sfw/megumin')
if (!res.ok) return m.react('❌')
let json = await res.json()
if (!json.url) return m.react('❌')
await conn.sendFile(m.chat, json.url, 'megumin.png', `*––––––『 ANIME IMAGE 』––––––*\n\n*Resultado de ∙* Megumin\n\n${namebot}`, estilo)
await m.react('✅')
}

if (command == 'neko') {
let res = await fetch('https://api.waifu.pics/sfw/neko')
if (!res.ok) return m.react('❌')
let json = await res.json()
if (!json.url) return m.react('❌')
await conn.sendFile(m.chat, json.url, 'neko.png', `*––––––『 ANIME IMAGE 』––––––*\n\n*Resultado de ∙* Neko\n\n${namebot}`, estilo)
await m.react('✅')
  }

if (command == 'shinobu') {
let res = await fetch('https://api.waifu.pics/sfw/shinobu')
if (!res.ok) return m.react('❌')
let json = await res.json()
if (!json.url) return m.react('❌')
await conn.sendFile(m.chat, json.url, 'shinobu.png', `*––––––『 ANIME IMAGE 』––––––*\n\n*Resultado de ∙* Shinobu\n\n${namebot}`, estilo)
await m.react('✅')
  }

if (command == 'waifu') {
let res = await fetch('https://api.waifu.pics/sfw/waifu')
if (!res.ok) return m.react('❌')
let json = await res.json()
if (!json.url) return m.react('❌')
await conn.sendFile(m.chat, json.url, 'waifu.png', `*––––––『 ANIME IMAGE 』––––––*\n\n*Resultado de ∙* Waifu\n\n${namebot}`, estilo)
await m.react('✅')
  }
}
handler.help = ['megumin', 'neko', 'shinobu', 'waifu']
handler.command = ['megumin', 'neko', 'shinobu', 'waifu']
handler.tags = ['img']
handler.star = 1
handler.register = true 
export default handler
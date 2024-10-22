import Starlights from '@StarlightsTeam/Scraper'
import fetch from 'node-fetch'

let handler = async (m, { conn, text, usedPrefix, command }) => {
if (!text) return conn.reply(m.chat,`*🚩 Ingrese su petición*\n*🪼 Ejemplo de uso:* ${usedPrefix + command} como hacer estrella de papel`, m, rcanal)
await m.react('💬')
try {
let { msg } = await Starlights.openAi(text)
await conn.reply(m.chat, msg, m, rcanal)
} catch {
try {
let { result } = await Starlights.ChatGpt(text)
await conn.reply(m.chat, result, m, rcanal)
} catch {
try {
let { result } = await Starlights.ChatGptV2(text)
await conn.reply(m.chat, result, m, rcanal)
} catch {
try {
let api = await fetch(`https://apis-starlights-team.koyeb.app/starlight/chatgpt?text=${text}`)
let json = await api.json()

if (json.result) {
await conn.reply(m.chat, json.result, m, rcanal)
} else {
await m.react('✖️')
}
} catch {
await m.react('✖️')
}}}}}

handler.help = ['ia *<petición>*']
handler.tags = ['tools']
handler.command = /^(miku|ia|chatgpt|gpt)$/i
handler.register = true

export default handler

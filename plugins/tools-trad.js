import translate from '@vitalets/google-translate-api'
import fetch from 'node-fetch'
let handler = async (m, { args, usedPrefix, command }) => {
let msg = `*乂 EJEMPLO 乂*

◦${usedPrefix + command} <idioma> [texto]
◦${usedPrefix + command} es Hello World

❄️ Lista de idiomas ❄️

*https://cloud.google.com/translate/docs/languages*`
if (!args || !args[0]) return m.reply(msg)  
let lang = args[0]
let text = args.slice(1).join(' ')
const defaultLang = 'es'
if ((args[0] || '').length !== 2) {
lang = defaultLang
text = args.join(' ')}
if (!text && m.quoted && m.quoted.text) text = m.quoted.text
try {      
let result = await translate(`${text}`, { to: lang, autoCorrect: true })
await m.reply('*Traducción:* ' + result.text)
} catch {
try {    
let lol = await fetch(`https://api.lolhuman.xyz/api/translate/auto/${lang}?apikey=${lolkeysapi}&text=${text}`)
let loll = await lol.json()
let result2 = loll.result.translated
await conn.reply(m.chat, '*Traducción ∙* ' + result2, m, adReply)
} catch { 
await conn.reply(m.chat, '*☓ Ocurrió un error inesperado*', m, adReply).then(_ => m.react('✖️'))
}}}
handler.help = ['trad <leng> <texto>']
handler.tags = ['tools']
handler.command = /^(translate|traducir|trad)$/i
handler.star = 1
handler.register = true 
export default handler
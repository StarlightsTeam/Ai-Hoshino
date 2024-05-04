import fetch from 'node-fetch'
const regex = /(?:https|git)(?::\/\/|@)github\.com[\/:]([^\/:]+)\/(.+)/i
let handler = async (m, { conn, args, usedPrefix, command }) => {
if (!args[0]) return m.reply('🍭 Ingresa el enlace del vídeo de Instagram junto al comando.\n\n`Ejemplo:`\n' + `> *${usedPrefix + command}* https://github.com/StarlightsTeam/Sumi-Sakurasawa`)
try {
if (!regex.test(args[0])) return `La Url es invalida.`
let [_, user, repo] = args[0].match(regex) || []
repo = repo.replace(/.git$/, '')
let url = `https://api.github.com/repos/${user}/${repo}/zipball`
let filename = (await fetch(url, { method: 'HEAD' })).headers.get('content-disposition').match(/attachment; filename=(.*)/)[1]
await conn.sendFile(m.chat, url, filename, null, m)
} catch {
}}
handler.help = ['gitclone <url git>']
handler.tags = ['downloader']
handler.command = ['gitclone'] 
handler.register = true 
//handler.limit = 1
export default handler
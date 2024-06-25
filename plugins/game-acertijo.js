import fs from 'fs'

let cooldown = 60000 
let poin = 450

let handler = async (m, { conn, usedPrefix }) => {
let now = new Date()
let lastUsage = global.db.data.users[m.sender].lastAcet || 0
if (now - lastUsage < cooldown) {
let remainingTime = cooldown - (now - lastUsage)
return m.reply(`⏱️ ¡Espera ${msToTime(remainingTime)} antes de volver a usar el comando!`)
}
conn.tekateki = conn.tekateki ? conn.tekateki : {}
let id = m.chat
if (id in conn.tekateki) {
conn.reply(m.chat, 'Todavía hay acertijos sin responder en este chat', conn.tekateki[id][0])
return null
}
let tekateki = JSON.parse(fs.readFileSync(`./plugins/_acertijo.json`))
let json = tekateki[Math.floor(Math.random() * tekateki.length)]
let _clue = json.response
let clue = _clue.replace(/[A-Za-z]/g, '_')
let caption = `
ⷮ *${json.question}*
*• Tiempo:* ${(cooldown / 1000).toFixed(2)} segundos
*• Bono:* +${poin} Exp
`.trim()
conn.tekateki[id] = [
await conn.reply(m.chat, caption, m), json, poin,
setTimeout(async () => {
if (conn.tekateki[id]) {
await conn.reply(m.chat, `Se acabó el tiempo!\n*Respuesta:* ${json.response}`, conn.tekateki[id][0])
delete conn.tekateki[id]
}
}, cooldown)
]
global.db.data.users[m.sender].lastAcet = now
}
handler.help = ['acertijo']
handler.tags = ['game']
handler.command = /^(acertijo|acert|pregunta|adivinanza|tekateki)$/i
export default handler

function msToTime(duration) {
    var seconds = Math.floor((duration / 1000) % 60),
        minutes = Math.floor((duration / (1000 * 60)) % 60)

    minutes = (minutes < 10) ? "0" + minutes : minutes
    seconds = (seconds < 10) ? "0" + seconds : seconds

    return minutes + " Minuto(s) " + seconds + " Segundo(s)"
}
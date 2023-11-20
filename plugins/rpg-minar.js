import db from '../lib/database.js'

let handler = async (m, { conn }) => {

  let stars = Math.floor(Math.random() * 20)
  let time = global.db.data.users[m.sender].lastmiming + 14400000
  if (new Date - global.db.data.users[m.sender].lastmiming < 14400000) return conn.reply(m.chat, `Espera *${msToTime(time - new Date())}* para regresar a la Mina`, m, adReply)
  global.db.data.users[m.sender].star += stars
  conn.reply(m.chat, `🚩 Genial! minaste *${stars} ⭐ Estrellas*`, m, adReply)
  global.db.data.users[m.sender].lastmiming = new Date * 1
}
handler.help = ['minar']
handler.tags = ['rpg']
handler.command = ['minar', 'miming', 'mine'] 
handler.register = true 
export default handler

function msToTime(duration) {
  var milliseconds = parseInt((duration % 1000) / 100),
    seconds = Math.floor((duration / 1000) % 60),
    minutes = Math.floor((duration / (1000 * 60)) % 60),
    hours = Math.floor((duration / (1000 * 60 * 60)) % 24)

  hours = (hours < 10) ? "0" + hours : hours
  minutes = (minutes < 10) ? "0" + minutes : minutes
  seconds = (seconds < 10) ? "0" + seconds : seconds

  return hours + " hora(s) " + minutes + " minuto(s) " + seconds + " segundo(s)" 
}
import db from '../lib/database.js'

const cooldown = 604800000 // 7 días 

let handler = async (m) => {
   let user = global.db.data.users[m.sender]
   if (new Date - user.lastsemanal < cooldown) return conn.reply(m.chat, `🧭 Espera *${((user.lastsemanal + cooldown) - new Date()).toTimeString()}* para volver a Reclamar.`, m, adReply)
   let txt = `Felicidades 🎉, reclamaste *140 ⭐ Estrellas*.`
   user.star += 140
   user.lastsemanal = new Date * 1
   await conn.reply(m.chat, txt, m, adReply)
}

handler.help = ['semanal']
handler.tags = ['rpg']
handler.command = ['semanal', '.weekly']
handler.register = true 
handler.cooldown = cooldown

export default handler
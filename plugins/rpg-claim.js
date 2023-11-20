import db from '../lib/database.js'

const cooldown = 86400000 // 24 Horas

let handler = async (m) => {
   let user = global.db.data.users[m.sender]
   if (new Date - user.lastclaim < cooldown) return conn.reply(m.chat, `🧭 Espera *${((user.lastclaim + cooldown) - new Date()).toTimeString()}* para volver a Reclamar.`, m, adReply)
   let txt = `Felicidades 🎉, reclamaste *20 ⭐ Estrellas*.`
   user.star += 20
   user.lastclaim = new Date * 1
   await conn.reply(m.chat, txt, m, adReply)
}

handler.help = ['claim']
handler.tags = ['rpg']
handler.command = ['daily', 'claim']
handler.register = true 
handler.cooldown = cooldown

export default handler
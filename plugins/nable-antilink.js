import db from '../lib/database.js'

let handler = async (m, { conn, args, usedPrefix, command }) => {
   let chat = global.db.data.chats[m.chat] || {}
   if (args[0] === 'on') {
      if (chat.antiLink) return conn.reply(m.chat, 'El Anti-Link ya esta Activado.', m, adReply)
      chat.antiLink = true
      await conn.reply(m.chat, '🚩 Anti-Link activado para este Grupo.', m, adReply)
   } else if (args[0] === 'off') {
      if (!chat.antiLink) return conn.reply(m.chat, 'El Anti-Link ya esta Desactivado.', m, adReply)
      chat.antiLink = false
      await conn.reply(m.chat, '🚩 Anti-Link desactivado para este Grupo.', m, adReply)
   } else {
      await conn.reply(m.chat, `*Configurar Anti-Link*. Escriba on para activar y off para Desactivar.`, m, adReply)
   }
}

handler.help = ['antilink on/off']
handler.tags = ['nable']
handler.command = ['antilink']
handler.use = ['on/off']
handler.group = true 
handler.admin = true

export default handler
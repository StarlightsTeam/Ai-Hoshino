import db from '../lib/database.js'

let handler = async (m, { conn, args, usedPrefix, command }) => {
   let chat = global.db.data.chats[m.chat] || {}
   if (args[0] === 'on') {
      if (chat.nsfw) return conn.reply(m.chat, 'Nsfw ya esta Activada.', m, adReply)
      chat.nsfw = true
      await conn.reply(m.chat, '🚩 Nsfw activada para este Grupo.', m, adReply)
   } else if (args[0] === 'off') {
      if (!chat.nsfw) return conn.reply(m.chat, 'Nsfw ya esta Desactivada.', m, adReply)
      chat.nsfw = false
      await conn.reply(m.chat, '🚩 Nsfw desactivada para este Grupo.', m, adReply)
   } else {
      await conn.reply(m.chat, `*Configurar Nsfw*. Escriba on para activar y off para Desactivar.`, m, adReply)
   }
}

handler.help = ['nsfw on/off']
handler.tags = ['nable']
handler.command = ['nsfw']
handler.use = ['on/off']
handler.group = true 
handler.admin = true

export default handler
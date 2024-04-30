let handler = async (m, { conn, args, usedPrefix, command }) => {
   let chat = global.db.data.chats[m.chat] || {}
   if (args[0] === 'on') {
      if (chat.welcome) return conn.reply(m.chat, 'La bienvenida ya esta Activada.', m)
      chat.welcome = true
      await conn.reply(m.chat, '🍭 Bienvenida activada para este Grupo.', m)
   } else if (args[0] === 'off') {
      if (!chat.welcome) return conn.reply(m.chat, 'La bienvenida ya esta Desactivada.', m)
      chat.welcome = false
      await conn.reply(m.chat, '🍭 Bienvenida desactivada para este Grupo.', m)
   } else {
      await conn.reply(m.chat, `*Configurar Bienvenida*. Escriba on para activar y off para Desactivar.`, m)
   }
}

handler.help = ['welcome <on/off>']
handler.tags = ['nable']
handler.command = ['welcome', 'bienvenida']
handler.use = ['on/off']
handler.group = true 
handler.admin = true

export default handler
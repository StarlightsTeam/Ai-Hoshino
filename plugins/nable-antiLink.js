let handler = async (m, { conn, args, usedPrefix, command }) => {
   let chat = global.db.data.chats[m.chat] || {}
   if (args[0] === 'on') {
      if (chat.antiLink) return conn.reply(m.chat, 'antiLink ya esta Activado.', m)
      chat.antiLink = true
      await conn.reply(m.chat, '🍭 Anti-Link activado para este Grupo.', m)
   } else if (args[0] === 'off') {
      if (!chat.antiLink) return conn.reply(m.chat, 'Anti-Link ya esta Desactivado.', m)
      chat.antiLink = false
      await conn.reply(m.chat, '🍭 Anti-Link desactivado para este Grupo.', m)
   } else {
      await conn.reply(m.chat, `*Configurar Anti-Link*. Escriba on para activar y off para Desactivar.`, m)
   }
}
handler.help = ['antiLink <on/off>']
handler.tags = ['nable']
handler.command = ['antiLink', 'antilink']
handler.use = ['on/off']
handler.group = true 
handler.admin = true

export default handler
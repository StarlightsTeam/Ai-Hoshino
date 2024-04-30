let handler = async (m, { conn, args, usedPrefix, command }) => {
   let user = global.db.data.users[m.sender]
   if (args[0] === 'on') {
      if (user.useDocument) return conn.reply(m.chat, 'Document ya esta Activado.', m)
      user.useDocument = true
      await conn.reply(m.chat, '🍭 Document activado para este Usuario.', m)
   } else if (args[0] === 'off') {
      if (!user.useDocument) return conn.reply(m.chat, 'Document ya esta Desactivado.', m)
      user.useDocument = false
      await conn.reply(m.chat, '🍭 Document desactivado para este Usuario.', m)
   } else {
      await conn.reply(m.chat, `*Configurar Document*. Escriba on para activar y off para Desactivar.`, m)
   }
}
handler.help = ['document <on/off>']
handler.tags = ['nable']
handler.command = ['document']
handler.use = ['on/off']

export default handler
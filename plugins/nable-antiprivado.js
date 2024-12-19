let handler = async (m, { conn, args, usedPrefix, command }) => {
   let setting = global.database.settings[conn.user.jid] || {}
   if (args[0] === 'on') {
      if (setting.antiPrivate) return conn.reply(m.chat, 'Anti-Privado ya esta Activada.', m)
      setting.antiPrivate = true
      await conn.reply(m.chat, '[ ✰ ] Anti-Privado activada para este Bot.', m)
   } else if (args[0] === 'off') {
      if (!setting.antiPrivate) return conn.reply(m.chat, 'Anti-Privado ya esta Desactivada.', m)
      setting.antiPrivate = false
      await conn.reply(m.chat, '[ ✰ ] Anti-Privado desactivada para este Bot.', m)
   } else {
      await conn.reply(m.chat, `*Configurar Anti-Privado*. Escriba on para activar y off para Desactivar.`, m)
   }
}
handler.help = ['antiprivado *<on/off>*']
handler.tags = ['nable']
handler.command = ['antiprivado']
handler.use = ['on/off']

handler.owner = true

export default handler
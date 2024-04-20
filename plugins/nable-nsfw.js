let handler = async (m, { conn, args, usedPrefix, command }) => {
   let chat = global.db.data.chats[m.chat] || {}
   if (args[0] === 'on') {
      if (chat.nsfw) return conn.reply(m.chat, 'Nsfw ya esta Activado.', m)
      chat.nsfw = true
      await conn.reply(m.chat, '🍭 Nsfw activado para este Grupo.', m)
   } else if (args[0] === 'off') {
      if (!chat.nsfw) return conn.reply(m.chat, 'Nsfw ya esta Desactivado.', m)
      chat.nsfw = false
      await conn.reply(m.chat, '🍭 Nsfw desactivado para este Grupo.', m)
   } else {
      await conn.reply(m.chat, `*Configurar Nsfw*. Escriba on para activar y off para Desactivar.`, m)
   }
}
handler.help = ['nsfw <on/off>']
handler.tags = ['nable']
handler.command = ['nsfw']
handler.use = ['on/off']
handler.group = true 
handler.admin = true

export default handler
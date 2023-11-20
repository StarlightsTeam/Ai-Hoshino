import db from '../lib/database.js'

let handler = async (m, { conn, args, usedPrefix, command }) => {
   let setting = global.db.data.settings[conn.user.jid]
   if (args[0] === 'on') {
      if (setting.autoread) return conn.reply(m.chat, 'Auto-read ya esta Activada.', m, adReply)
      setting.autoread = true
      await conn.reply(m.chat, '🚩 Auto-read activada para este Bot.', m, adReply)
   } else if (args[0] === 'off') {
      if (!setting.autoread) return conn.reply(m.chat, 'Auto-read ya esta Desactivada.', m, adReply)
      setting.autoread = false
      await conn.reply(m.chat, '🚩 Auto-read desactivada para este Bot.', m, adReply)
   } else {
      await conn.reply(m.chat, `*Configurar Auto-read*. Escriba on para activar y off para Desactivar.`, m, adReply)
   }
}

handler.help = ['autoread on/off']
handler.tags = ['nable']
handler.command = ['autoread', 'autoleido']
handler.use = ['on/off']

handler.owner = true

export default handler
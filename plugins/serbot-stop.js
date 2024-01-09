let handler = async (m, { conn }) => {
  if (global.conn.user.jid === conn.user.jid) {
   await conn.reply(m.chat, '¿Por qué no vas directamente a la terminal?', m, adReply)
  } else {
    await conn.reply(m.chat, `Bot desconectado`, m, adReply)
    conn.ws.close()
  }
}
handler.help = ['stop']
handler.tags = ['serbot']
handler.command = ['stop', 'stopbot', 'stopbebot']
handler.owner = true

export default handler
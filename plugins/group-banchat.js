let handler = async (m) => {
   let chat = global.db.data.chats[m.chat]
   chat.isBanned = true
   await conn.reply(m.chat, '🚩 Chat baneado con Exito.', m, adReply)
}

handler.help = ['banchat']
handler.tags = ['group']
handler.command = ['banchat', 'banbot']
handler.admin = true
handler.group = true 
export default handler
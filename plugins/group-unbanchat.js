let handler = async (m) => {
   let chat = db.data.chats[m.chat]
   chat.isBanned = false
   await conn.reply(m.chat, '🚩 Chat desbaneado con Exito.', m, adReply)
}

handler.help = ['unbanchat']
handler.tags = ['group']
handler.command = ['unbanchat', 'unbanbot']
handler.admin = true
handler.group = true 

export default handler
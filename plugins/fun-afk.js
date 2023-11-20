let handler = async (m, { text, conn }) => {
    let user = global.db.data.users[m.sender]
    user.afk = new Date * 1
    user.afkReason = text
    await conn.reply(m.chat, `🚩 @${m.sender.split`@` [0]} ahora estas AFK.`, m, adReply)
}

handler.help = ['afk']
handler.tags = ['fun']
handler.command = ['afk']

export default handler
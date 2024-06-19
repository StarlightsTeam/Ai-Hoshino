let handler = async (m, { text, conn }) => {
    let user = global.db.data.users[m.sender]
    user.afk = + new Date
    user.afkReason = text
    await conn.reply(m.chat, `🚩 Ahora estás ausente hasta que vuelvas a enviar un nuevo mensaje, cuando te intenten tagear el usuario será notificado de tu ausencia con el motivo.\n\n*${conn.getName(m.sender)}* Esta AFK, Motivo *${text ? ': ' + text : ''}*`, m, rcanal)
}
handler.help = ['afk *<razón>*']
handler.tags = ['fun']
handler.command = ['afk']
handler.group = true

export default handler
let handler = async (m, { conn, text, usedPrefix, command }) => {
   let who
    if (m.isGroup) who = m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted ? m.quoted.sender : false
    else who = m.chat
    let user = global.db.data.users[who]
    if (!who) return m.reply(`🚩 Etiqueta a un usuario.`)
    let users = global.db.data.users
    users[who].banned = false
    conn.reply(m.chat, `🚩 @${who.split`@`[0]} ha sido desbaneado con exito, ahora podrá volver a usar mis comandos.`, m, { mentions: [who] })
}
handler.help = ['munban *@user*']
handler.tags = ['owner']
handler.command = /^munban$/i
handler.rowner = true

export default handler
let handler = async (m, { conn, args, usedPrefix, command }) => {
    let chat = global.db.data.chats[m.chat] || {};
    if (args[0] === 'on') {
        if (chat.antiBot) return conn.reply(m.chat, 'AntiBot ya está activado.', m, rcanal)
        chat.antiBot = true
        await conn.reply(m.chat, '🚩 AntiBot activado para este grupo.', m, rcanal)
    } else if (args[0] === 'off') {
        if (!chat.antiBot) return conn.reply(m.chat, 'AntiBot ya está desactivado.', m, rcanal)
        chat.antiBot = false
        await conn.reply(m.chat, '🚩 AntiBot desactivado para este grupo.', m, rcanal)
    } else {
        await conn.reply(m.chat, `*Configurar AntiBot*. Escriba "on" para activar y "off" para desactivar.`, m, rcanal)
    }
}
handler.help = ['antibot *<on/off>*']
handler.tags = ['group']
handler.command = ['antibot']
handler.use = ['on/off']
handler.group = true
handler.admin = true

export default handler

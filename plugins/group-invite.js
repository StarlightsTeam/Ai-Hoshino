let handler = async (m, { conn, args, text, usedPrefix, command }) => {
if (!text) return conn.reply(m.chat, `🚩 Ingrese el número al que quiere enviar una invitación al grupo.\n\n*Ejemplo:*\n*${usedPrefix + command}* 5218261275256`, m, rcanal)
if (text.includes('+')) return conn.reply(`🚩 Ingrese el número todo junto sin el *+*`, m, rcanal)
if (isNaN(text)) return conn.reply(m.chat, `*Ingrese sólo números más su código de país sin espacios*'
let group = m.chat
let link = 'https://chat.whatsapp.com/' + await conn.groupInviteCode(group)
 
      await conn.reply(text+'@s.whatsapp.net', `🚩 *INVITACIÓN A GRUPO*\n\nUn usuario te invitó a unirte a este grupo \n\n${link}`, m, {mentions: [m.sender]})
        m.reply(`Se envió un enlace de invitación al usuario.`) 

}
handler.help = ['invite *<521>*']
handler.tags = ['group']
handler.command = ['invite','invitar'] 
handler.group = true
handler.admin = false
handler.botAdmin = true

export default handler
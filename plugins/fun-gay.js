let handler = async (m, {conn}) => {
let who = m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : m.fromMe ? conn.user.jid : m.sender
  await conn.sendFile(m.chat, global.API('https://some-random-api.com', '/canvas/overlay/gay', {
    avatar: await conn.profilePictureUrl(who, 'image').catch((_) => 'https://telegra.ph/file/24fa902ead26340f3df2c.png'),
  }), 'error.png', '*Quien quiere violar a este gay?* 🏳️‍🌈', m)
}
handler.help = ['gay *@user*']
handler.tags = ['fun']
handler.command = /^(gay)$/i
export default handler
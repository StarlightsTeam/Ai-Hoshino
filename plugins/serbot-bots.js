async function handler(m, { conn, usedPrefix }) {
  const connectedUsers = new Set()
  const addedNumbers = new Set()
  global.conns
    .filter(conn => conn.user && conn.state !== 'close')
    .forEach(user => {
      const userJid = user.user.jid.replace(/[^0-9]/g, '');
      if (!addedNumbers.has(userJid)) {
        addedNumbers.add(userJid);
        const userName = user.user.name || "Ai Hoshino - MD"
        connectedUsers.add(`Wa.me/${userJid}?text=${usedPrefix}menu (${userName})`)
      }
    })
  const connectedUserCount = connectedUsers.size
  if (connectedUserCount > 0) {
    const userList = [...connectedUsers].join(`\n`)
    await m.reply(userList)
  } else {
    await m.reply('')
  }
}
handler.command = ['listjadibot', 'bots']
handler.help = ['bots']
handler.tags = ['serbot']
export default handler
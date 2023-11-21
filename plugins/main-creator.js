let handler = async (m, { conn, usedPrefix, isOwner }) => {
let vcard = `BEGIN:VCARD\nVERSION:3.0\nN:;おDaniel;;\nFN:おDaniel\nORG:おDaniel\nTITLE:\nitem1.TEL;waid=50662333781:50662333781\nitem1.X-ABLabel:おDaniel\nX-WA-BIZ-DESCRIPTION:\nX-WA-BIZ-NAME:おDaniel\nEND:VCARD`
await conn.sendMessage(m.chat, { contacts: { displayName: 'おDaniel', contacts: [{ vcard }] }}, {quoted: m})
}
handler.help = ['owner']
handler.tags = ['main']
handler.command = ['owner', 'creator', 'creador', 'dueño'] 

export default handler
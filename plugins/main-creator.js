let handler = async (m, { conn, usedPrefix, isOwner }) => {
let vcard = `BEGIN:VCARD\nVERSION:3.0\nN:;Irokz Dal ダーク;;\nFN:Irokz Dal ダーク\nORG:Irokz Dal ダーク\nTITLE:\nitem1.TEL;waid=639705083935:639705083935\nitem1.X-ABLabel:Irokz Dal ダーク⁩\nX-WA-BIZ-DESCRIPTION:\nX-WA-BIZ-NAME:Irokz Dal ダーク\nEND:VCARD`
await conn.sendMessage(m.chat, { contacts: { displayName: 'Irokz Dal ダーク⁩', contacts: [{ vcard }] }}, {quoted: m})
}
handler.help = ['owner']
handler.tags = ['main']
handler.command = ['owner', 'creator', 'creador', 'dueño'] 

export default handler

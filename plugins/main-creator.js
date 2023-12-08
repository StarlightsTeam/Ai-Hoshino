let handler = async (m, { conn, usedPrefix, isOwner }) => {
let vcard = `BEGIN:VCARD\nVERSION:3.0\nN:;おDanịel.xyz⁩;;\nFN:おDanịel.xyz⁩\nORG:おDanịel.xyz⁩\nTITLE:\nitem1.TEL;waid=5218132588591:5218132588591\nitem1.X-ABLabel:おDanịel.xyz⁩\nX-WA-BIZ-DESCRIPTION:\nX-WA-BIZ-NAME:おDanịel.xyz⁩\nEND:VCARD`
await conn.sendMessage(m.chat, { contacts: { displayName: 'おDanịel.xyz⁩', contacts: [{ vcard }] }}, {quoted: m})
}
handler.help = ['owner']
handler.tags = ['main']
handler.command = ['owner', 'creator', 'creador', 'dueño'] 

export default handler
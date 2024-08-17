let handler = async (m, { conn, usedPrefix, isOwner }) => {
await m.react('😺')
await conn.reply(m.chat, `Hola @${m.sender.split`@`[0]} si necesitas la ayuda de mi creador porfavor escribele al privado\n*- Solo asuntos importantes -*`, estilo, { mentions: [m.sender] })
let vcard = `BEGIN:VCARD\nVERSION:3.0\nN:;おDanịel.xyz⁩;;\nFN:おDanịel.xyz⁩\nORG:おDanịel.xyz⁩\nTITLE:\nitem1.TEL;waid=5218261000681:5218261000681\nitem1.X-ABLabel:おDanịel.xyz⁩\nX-WA-BIZ-DESCRIPTION:\nX-WA-BIZ-NAME:おDanịel.xyz⁩\nEND:VCARD`
await conn.sendMessage(m.chat, { contacts: { displayName: 'おDanịel.xyz⁩', contacts: [{ vcard }] }}, {quoted: m})
}
handler.customPrefix = /^(@5218261275256|@5218132588591|@5218139760662|@5215659171599)$/i
handler.command = new RegExp
export default handler
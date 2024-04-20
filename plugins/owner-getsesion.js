import fs from 'fs'
let handler = async (m, { conn, text }) => {
    let sessions = await fs.readFileSync('./sessions/creds.json')
    return await conn.sendMessage(m.chat, { document: sessions, mimetype: 'application/json', fileName: 'creds.json' }, { quoted: m })
}
handler.help = ['getsesion']
handler.tags = ['owner']
handler.command = /^(getsesion)$/i

handler.rowner = true

export default handler
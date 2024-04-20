import fs from 'fs'
let handler = async (m, { conn, text }) => {
    let db = await fs.readFileSync('./database.json')
    return await conn.sendMessage(m.chat, { document: db, mimetype: 'application/json', fileName: 'database.json' }, { quoted: m })
}
handler.help = ['getdb']
handler.tags = ['owner']
handler.command = /^(getdb)$/i

handler.rowner = true

export default handler
import fs from 'fs'
let handler = async (m, { conn, text }) => {
    await m.react('🕓')
    let dl_url = await fs.readFileSync('./storage/databases/database.json')
    await conn.sendMessage(m.chat, { document: dl_url, mimetype: 'application/json', fileName: 'database.json' }, { quoted: m })
    await m.react('✅')
}
handler.help = ['getdb']
handler.tags = ['owner']
handler.command = /^(getdb)$/i

handler.rowner = true

export default handler
import fs from 'fs'
let handler = async (m, { conn, text }) => {
    await m.react('🕓')
    let dl_url = await fs.readFileSync('./sessions/creds.json')
    await conn.sendMessage(m.chat, { document: dl_url, mimetype: 'application/json', fileName: 'creds.json' }, { quoted: m }).then(_ => m.react('✅'))
}
handler.help = ['getsesion']
handler.tags = ['owner']
handler.command = /^(getsesion)$/i

handler.rowner = true

export default handler
import fs from 'fs'
let handler = async (m, { text, usedPrefix, command }) => {
    if (!text) return conn.reply(m.chat, `Que nombre le pongo al archivo?`, m, adReply)
    if (!m.quoted.text) return conn.reply(m.chat, `Responder al mensaje!`, m, adReply)
    let path = `${text}.js`
    await fs.writeFileSync(path, m.quoted.text)
    await conn.reply(m.chat, `Guardado en ${path}`, m, adReply)
}
handler.help = ['savefile'].map(v => v + ' <nombre>')
handler.tags = ['owner']
handler.command = ["savefile"]

handler.rowner = true
export default handler
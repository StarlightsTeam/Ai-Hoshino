import fs from 'fs'
let handler = async (m, { text, usedPrefix, command }) => {
    if (!text) throw `uhm.. Que nombre le pongo al archivo?`
    if (!m.quoted.text) throw `Responder al mensaje!`
    let path = `${text}.js`
    await fs.writeFileSync(path, m.quoted.text)
    m.reply(`Guardado en ${path}`)
}
handler.help = ['savefile'].map(v => v + ' <nombre>')
handler.tags = ['owner']
handler.command = ["savefile"]

handler.rowner = true
export default handler
import Scraper from "@SumiFX/Scraper"

let handler = async (m, { conn, text, usedPrefix, command }) => {
if (!text) return m.reply('🍭 Ingresa el nombre de usuario de Instagram.\n\n`Ejemplo:`\n' + `> *${usedPrefix + command}* luisitocomunica`)

try {
let { username, name, post, followers, following, bio, thumbnail, url } = await Scraper.igstalk(text)
let txt = `╭─⬣「 *Instagram Stalk* 」⬣\n`
    txt += `│  ≡◦ *🍭 Username ∙* ${username}\n`
    txt += `│  ≡◦ *🪴 Nombre ∙* ${name}\n`
    txt += `│  ≡◦ *⚖ Posts ∙* ${post}\n`
    txt += `│  ≡◦ *🐢 Seguidores ∙* ${followers}\n`
    txt += `│  ≡◦ *😺 Seguidos ∙* ${following}\n`
    txt += `│  ≡◦ *✍ Bio∙* ${bio}\n`
    txt += `│  ≡◦ *⛓ Url∙* ${url}\n`
    txt += `╰─⬣`
await conn.sendFile(m.chat, thumbnail, 'thumbnail.jpg', txt, m)
} catch {
}}
handler.help = ['igstalk <username>']
handler.tags = ['tools']
handler.command = ['igstalk']
handler.register = true 
export default handler
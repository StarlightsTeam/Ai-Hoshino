import { canLevelUp, xpRange } from '../lib/levelling.js'
import { levelup } from '../lib/canvas.js'

let handler = async (m, { conn }) => {
	let name = conn.getName(m.sender)
    let user = global.db.data.users[m.sender]
    if (!canLevelUp(user.level, user.exp, global.multiplier)) {
        let { min, xp, max } = xpRange(user.level, global.multiplier)
        let lvl =  `
╭────═[ *L E V E L  -  U P* ]═─────⋆
│╭───────────────···
┴│✯ *🍭 Nombre* : ${name}
✩│✯ *📈 Nivel Actual* : ${user.level}
┬│✯ *💫 XP* : ${user.exp - min}/${xp}
│╰────────────────···
╰───────────═┅═──────────

Te falta *${max - user.exp}* de *XP* para subir de nivel
`.trim()
await conn.reply(m.chat, lvl, m, adReply)
    }
    let before = user.level * 1
    while (canLevelUp(user.level, user.exp, global.multiplier)) user.level++
    if (before !== user.level) {
        let str = `
╭────═[ *L E V E L  -  U P* ]═─────⋆
│╭───────────────···
┴│✯ *🍭 Nombre* : ${name}
✩│✯ *📈 Nivel Actual* : ${user.level}
┬│✯ *📈 Nivel Anterior* : ${before}
│╰────────────────···
╰───────────═┅═──────────
`.trim()
await conn.reply(m.chat, str, m, adReply)
    }
}

handler.help = ['levelup']
handler.tags = ['rpg']

handler.command = ['nivel', 'lvl', 'levelup', 'level'] 
handler.register = true 
export default handler
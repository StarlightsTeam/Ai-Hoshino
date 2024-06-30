import { readdirSync, statSync, unlinkSync, existsSync, readFileSync, watch, rmSync, promises as fs} from "fs"
import path, { join } from 'path'

let handler  = async (m, { conn: parentw, usedPrefix, command}, args) => {

let who = m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : m.fromMe ? conn.user.jid : m.sender
let uniqid = `${who.split`@`[0]}`
let userS = `${conn.getName(who)}`

try {
await fs.rmdir("./serbot/" + uniqid, { recursive: true, force: true })
await parentw.sendMessage(m.chat, { text: '🚩 Sub-Bot eliminado.' }, { quoted: m })
} catch(err) {
if (err.code === 'ENOENT' && err.path === `./serbot/${uniqid}`) {
await parentw.sendMessage(m.chat, { text: "No cuentas con ninguna sesión de Sub-Bot." }, { quoted: m })
} else {
await m.react('✖️')
}}}
handler.tags = ['serbot']
handler.help = ['delsession']
handler.command = /^(deletesess?ion|eliminarsesion|borrarsesion|delsess?ion|cerrarsesion|delserbot|logout)$/i
//handler.private = true
handler.fail = null

export default handler
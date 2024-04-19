import fs from 'fs'
import fetch from 'node-fetch'

let Reg = /\|?(.*)([.|] *?)([0-9]*)$/i
let handler = async function (m, { conn, text, usedPrefix, command }) {
  let tr = '🍭 Ingresa tu nombre y tu edad.\n\n`Ejemplo:`\n' + `> *${usedPrefix + command}* Sumi.19`
  let user = global.db.data.users[m.sender]
  let name2 = conn.getName(m.sender)
  if (user.registered === true) return m.reply(`🍭 Ya estás registrado.`)
  if (!Reg.test(text)) return m.reply(tr)
  let [_, name, splitter, age] = text.match(Reg)
  if (!name) return m.reply(tr)
  if (!age) return m.reply(tr)
  age = parseInt(age)
  if (age < 5) return m.reply('🚼  hay un abuelo bebé jsjsj.')
  user.name = name.trim()
  user.age = age
  user.regTime = + new Date
  user.registered = true
  let img = await (await fetch(`https://tinyurl.com/258rd289`)).buffer()
  let txt = `╭─⬣「 *User Registro* 」⬣\n`
    txt += `│  ≡◦ *🪴 Nombre ∙* ${name}\n`
    txt += `│  ≡◦ *🐢 Edad ∙* ${age} años\n`
    txt += `╰─⬣`
await conn.Sumi(m.chat, botname, txt, img, img, canal, m)
}
handler.help = ['reg <nombre.edad>']
handler.tags = ['rg']
handler.command = ['verify', 'reg', 'register', 'registrar'] 

export default handler
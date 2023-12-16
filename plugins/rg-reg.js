import db from '../lib/database.js'
import { createHash } from 'crypto'
import fs from 'fs'

let Reg = /\|?(.*)([.|] *?)([0-9]*)$/i
let handler = async function (m, { conn, text, usedPrefix, command }) {
  let user = global.db.data.users[m.sender]
  let name2 = conn.getName(m.sender)
  if (user.registered === true) return conn.reply(m.chat, `Ya estás registrado\n\n¿Quiere volver a registrarse?\n\nUse este comando para eliminar su registro \n*${usedPrefix}unreg* <Número de serie>`, m, adReply)
  if (!Reg.test(text)) return conn.reply(m.chat, `*Formato incorrecto*\n\nUso del comamdo: *${usedPrefix + command} nombre.edad*\nEjemplo : *${usedPrefix + command} ${name2}.16*`, m, adReply).then(_ => m.react('✖️'))
  let [_, name, splitter, age] = text.match(Reg)
  if (!name) return conn.reply(m.chat, 'El nombre no puede estar vacío', m, adReply)
  if (!age) return conn.reply(m.chat, 'La edad no puede estar vacía', m, adReply)
  if (name.length >= 100) return conn.reply(m.chat, 'El nombre es demasiado largo', m, adReply)
  age = parseInt(age)
  if (age > 100) return conn.reply(m.chat, '👴🏻 Wow el abuelo quiere jugar al bot', m, adReply)
  if (age < 5) return conn.reply(m.chat, '🚼  hay un abuelo bebé jsjsj ', m, adReply)
  user.name = name.trim()
  user.age = age
  user.regTime = + new Date
  user.registered = true
  user.star = + 50
  let txt = `\t\t\t*乂  R E G I S T R O*\n\n`
       txt += `*Nombre* : ${name}\n`
       txt += `*Edad* : ${age} años\n`
       txt += `*Estrellas* : +50 ⭐`
await conn.reply(m.chat, txt, m, adReply).then(_ => m.react('✅'))
}
handler.help = ['reg'].map(v => v + ' <nombre.edad>')
handler.tags = ['rg']

handler.command = ['verify', 'reg', 'register', 'registrar'] 

export default handler
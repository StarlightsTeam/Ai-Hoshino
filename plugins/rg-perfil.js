import { xpRange } from '../lib/levelling.js'
import PhoneNumber from 'awesome-phonenumber'
import fetch from 'node-fetch'

let handler = async (m, { conn }) => {
let who = m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : m.fromMe ? conn.user.jid : m.sender

  let user = global.db.data.users[who]
  let pp = await conn.profilePictureUrl(who, 'image').catch(_ => 'https://i.pinimg.com/736x/e9/73/17/e97317c8d423564fbaed0d9fc5554355.jpg')
  let { exp, limit, name, registered, age, level } = global.db.data.users[who]
  let { min, xp } = xpRange(user.level, global.multiplier)

  let prem = global.prems.includes(who.split`@`[0])

  let api = await axios.get(`https://delirius-apiofc.vercel.app/tools/country?text=${PhoneNumber('+' + who.replace('@s.whatsapp.net', '')).getNumber('international')}`)
  let userNationalityData = api.data.result
  let userNationality = userNationalityData ? `${userNationalityData.name} ${userNationalityData.emoji}` : 'Desconocido'
  let img = await (await fetch(`${pp}`)).buffer()
  let txt = ` –  *P E R F I L  -  U S E R*\n\n`
      txt += `┌  ✩  *Nombre* : ${name}\n`
      txt += `│  ✩  *Edad* : ${registered ? `${age} años` : '×'}\n`
      txt += `│  ✩  *Numero* : ${PhoneNumber('+' + who.replace('@s.whatsapp.net', '')).getNumber('international')}\n`
      txt += `│  ✩  *Nacionalidad* : ${userNationality}\n`
      txt += `│  ✩  *Link* : wa.me/${who.split`@`[0]}\n`
      txt += `│  ✩  *Estrellas* : ${limit}\n`
      txt += `│  ✩  *Nivel* : ${level}\n`
      txt += `│  ✩  *XP* : Total ${exp} (${user.exp - min}/${xp})\n`
      txt += `│  ✩  *Premium* : ${prem ? 'Si' : 'No'}\n`
      txt += `└  ✩  *Registrado* : ${registered ? 'Si': 'No'}`
await conn.sendFile(m.chat, img, 'thumbnail.jpg', txt, m)
}

handler.help = ['perfil', 'perfil *@user*']
handler.tags = ['rg']
handler.command = /^(perfil|profile)$/i
handler.register = true

export default handler

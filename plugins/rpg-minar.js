let cooldowns = {}

let handler = async (m, { conn }) => {

  let hasil = Math.floor(Math.random() * 5000)
  let name = conn.getName(m.sender)
  
  let tiempoEspera = 5 * 60
  if (cooldowns[m.sender] && Date.now() - cooldowns[m.sender] < tiempoEspera * 1000) {
    let tiempoRestante = segundosAHMS(Math.ceil((cooldowns[m.sender] + tiempoEspera * 1000 - Date.now()) / 1000))
    conn.reply(m.chat, `🚩 Hola ${name}, Ya has minado recientemente, espera ⏱ *${tiempoRestante}* para regresar a la Mina.`, m, rcanal)
    return
  }
  
  global.db.data.users[m.sender].exp += hasil
  let txt = `🚩 Genial! minaste *${hasil} 💫 XP.*`
  await m.react('⛏')
  await conn.reply(m.chat, txt, m, rcanal)
  
  cooldowns[m.sender] = Date.now()
}
handler.help = ['minar']
handler.tags = ['rpg']
handler.command = ['minar', 'miming', 'mine'] 
handler.register = true 
export default handler

function segundosAHMS(segundos) {
  let horas = Math.floor(segundos / 3600)
  let minutos = Math.floor((segundos % 3600) / 60)
  let segundosRestantes = segundos % 60
  return `${minutos} minutos y ${segundosRestantes} segundos`
}
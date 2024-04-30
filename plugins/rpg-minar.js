const cooldowns = {}

let handler = async (m, { conn }) => {

  let amount = Math.floor(Math.random() * 20)
  const tiempoEspera = 5 * 60 // 5 minutos
  if (cooldowns[m.sender] && Date.now() - cooldowns[m.sender] < tiempoEspera * 1000) {
    const tiempoRestante = segundosAHMS(Math.ceil((cooldowns[m.sender] + tiempoEspera * 1000 - Date.now()) / 1000))
    m.reply(`🕜 Espera *${tiempoRestante}* para volver a Minar.`)
    return
  }

  global.db.data.users[m.sender].limit += amount
  await m.reply(`Genial! minaste *${amount} 🍬 Dulces*`)
  cooldowns[m.sender] = Date.now()
}
handler.help = ['minar']
handler.tags = ['rpg']
handler.command = ['minar', 'miming', 'mine'] 
handler.register = true 
export default handler

function segundosAHMS(segundos) {
  const minutos = Math.floor((segundos % 3600) / 60)
  const segundosRestantes = segundos % 60
  return `${minutos} minutos y ${segundosRestantes} segundos`
}
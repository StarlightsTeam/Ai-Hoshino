const cooldowns = {}

let handler = async (m) => {
   let user = global.db.data.users[m.sender]
   const tiempoEspera = 24 * 60 * 60 // 24 horas
  if (cooldowns[m.sender] && Date.now() - cooldowns[m.sender] < tiempoEspera * 1000) {
    const tiempoRestante = segundosAHMS(Math.ceil((cooldowns[m.sender] + tiempoEspera * 1000 - Date.now()) / 1000))
    m.reply(`🕜 Espera *${tiempoRestante}* para volver a Reclamar.`)
    return
  }
  
   let claim = `Felicidades 🎉, reclamaste *20 🍬 Dulces*.`
   user.limit += 20
   await m.reply(claim)
   cooldowns[m.sender] = Date.now()
}
handler.help = ['claim']
handler.tags = ['rpg']
handler.command = ['daily', 'claim']
handler.register = true 

export default handler

function segundosAHMS(segundos) {
  const horas = Math.floor(segundos / 3600)
  const minutos = Math.floor((segundos % 3600) / 60)
  const segundosRestantes = segundos % 60
  return `${horas} horas, ${minutos} minutos y ${segundosRestantes} segundos`
}
let handler = async (m, { conn }) => {
	
let _uptime = process.uptime() * 1000
let uptime = clockString(_uptime)
  
m.reply(`*» Bot activo durante* : ${uptime}`) 
	
}

handler.help = ['runtime']
handler.tags = ['main']
handler.command = ['runtime', 'uptime']

export default handler

function clockString(ms) {
  const d = Math.floor(ms / 86400000)
  const h = Math.floor(ms / 3600000) % 24
  const m = Math.floor(ms / 60000) % 60
  const s = Math.floor(ms / 1000) % 60
  return `${d}d ${h}h ${m}m ${s}s`
}

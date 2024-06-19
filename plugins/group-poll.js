let handler = async (m, { conn, text, usedPrefix, command, participants }) => {
	text = text.split(`|`)
	if (!text || text.length == 1) return conn.reply(m.chat, `🚩 Ingresa la pregunta y opciones.\n\n*Ejemplo:*\n*${usedPrefix + command}* Ai Hoshino es el mejor bot de WhatsApp?|si|no`, m, rcanal)
	if (text.length > 1 && text.length < 3) return m.reply(`Mínimo *2* opciones.`)
	if (text.length > 13) return m.reply(`Máximo *12* opciones`)
	let array = []
	text.slice(1).forEach(function(i) { array.push(i) })
	await conn.sendPoll(m.chat, text[0], array)
}
handler.tags = ['group']
handler.help = ['encuesta *<pregunta|opciones>*']
handler.command = ['encuesta', 'poll']
handler.group = true
handler.register = true 

export default handler
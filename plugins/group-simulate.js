let handler = async (m, { conn, usedPrefix, command, args: [event], text }) => {

  let chat = global.db.data.chats[m.chat]
  if (!chat.welcome) return conn.reply(m.chat, `✳️ Para usar este comando debe actvar las Bienvenidas con\n\n *${usedPrefix}welcome* on`, m, adReply)
  let te = `
  ┌─⊷ *EVENTOS*
  ▢ welcome
  ▢ bye
  └───────────
  
  📌 Ejemplo :
  
  *${usedPrefix + command}* welcome @user`

if (!event) return await conn.reply(m.chat, te, m, adReply) 

let mentions = text.replace(event, '').trimStart()
let who = mentions ? conn.parseMention(mentions) : []
let part = who.length ? who : [m.sender]
let act = false
conn.reply(m.chat, `✅ Simulando ${event}...`, m, adReply)
switch (event.toLowerCase()) {
        case 'add':
        case 'bienvenida':
        case 'invite':
        case 'welcome':
           act = 'add'
         break 
        case 'bye':
        case 'despedida':
        case 'leave':
        case 'remove':
         act = 'remove'
        break

default:

throw te
}
if (act) return conn.participantsUpdate({
id: m.chat,
participants: part,
action: act
})
}
handler.help = ['simulate <event> @user']
handler.tags = ['group']
handler.command = ['simular', 'simulate'] 
handler.admin = true
handler.group = true

export default handler
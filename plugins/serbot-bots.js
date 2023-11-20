
import ws from 'ws';
async function handler(m, { usedPrefix }) {
  let users = [...new Set([...global.conns.filter(conn => conn.user && conn.ws.socket && conn.ws.socket.readyState !== ws.CLOSED).map(conn => conn.user)])]
  let b = users.map((v, i) => `${i + 1}- wa.me/${v.jid.replace(/[^0-9]/g, '')}?text=${usedPrefix}menu`).join('\n')
 m.reply(`${b}`) 
  
}
handler.help = ['bots']
handler.tags = ['serbot']
handler.command = ['listbot', 'listbots', 'bots', 'bebots', 'botlist'] 

export default handler

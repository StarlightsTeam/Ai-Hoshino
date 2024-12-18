let handler = async (m, { conn}) => {
let user = global.db.data.users[m.sender]
let who = m.quoted ? m.quoted.sender : m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : m.fromMe ? conn.user.jid : m.sender
let taguser = '@' + m.sender.split("@s.whatsapp.net")[0]
let username = conn.getName(who)
let bv = `./anime/${pickRandom(["akaza", "akashi", "kanao", "killua", "medoria", "megomi", "melyodas", "miku", "sukuna", "yor"])}.jpg`
let av = `./src/mp3/${pickRandom([""])}.mp3`


conn.sendFile(m.chat, bv, 'picture.jpg', null, m, true, { type: 'pictureMessage', ptt: true })
conn.sendFile(m.chat, av, 'audio.mp3', null, m, true, { type: 'audioMessage', ptt: true })
}

handler.customPrefix = /^(انمي)$/i
handler.command = new RegExp

export default handler

function pickRandom(list) {
  return list[Math.floor(list.length * Math.random())]
}

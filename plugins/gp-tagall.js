let handler = async (m, { conn, text, participants, isAdmin, isOwner, groupMetadata }) => {
    let users = participants.map(u => u.id).filter(v => v !== conn.user.jid)
    m.reply(`*【 اجــتماع الـجــروب 】*\n\n❑ جروب : *${groupMetadata.subject}*\n❑ عدد الاعضاء : *${participants.length}*${text ? `\n❑ الرساله : ${text}\n` : ''}\n\n*〄━━┋ الـمنــشنـات ┋━━〄*\n\n` + users.map(v => '*↫❍┋* @' + v.replace(/@.+/, '')).join`\n` + '\n\n*【 بــــــ ناتسو ــــــوت 】*', null, {
        mentions: users
    })
}

handler.help = ['tagall']
handler.tags = ['group']
handler.command = ['منشن']
handler.admin = true
handler.group = true

export default handler

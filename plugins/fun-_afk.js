export async function before(m) {
    let user = global.db.data.users[m.sender]
    if (user.afk > 0) {
        await conn.reply(m.chat, `🚩 @${m.sender.split`@` [0]} dejaste de estar AFK despues de *${(new Date - user.afk).toTimeString()}*.`, m, adReply)
        user.afk = 0
        user.afkReason = ''
    }
    let jids = [...new Set([...(m.mentionedJid || []), ...(m.quoted ? [m.quoted.sender] : [])])]
    for (let jid of jids) {
        let user = global.db.data.users[jid]
        if (!user)
            continue
        let afkTime = user.afk
        if (!afkTime || afkTime < 0)
            continue
        let reason = user.afkReason || ''
        await conn.reply(m.chat, `🚩 El usuario que intentas etiquetar esta *AFK* por la razón *${reason ? reason : '...'}* durante *${(new Date - afkTime).toTimeString()}*.`, m, adReply)
    }
    return true
}
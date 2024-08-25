import fetch from 'node-fetch'

let handler = async (m, { conn, text, usedPrefix, command }) => {
    if (!text) return conn.reply(m.chat, '🚩 Ingrese el nombre de usuario de Twitter.\n\n`Ejemplo:`\n' + `> *${usedPrefix + command}* Fernanfloo`, m, rcanal)
    await m.react('🕓')

    try {
        let api = await fetch(`https://apis-starlights-team.koyeb.app/starlight/tweeter-stalk?text=${text}`)
        let json = await api.json()

        if (json.user) {
            let txt = '`乂  T W I T T E R  -  S T A L K`\n\n'
                txt += `  ✩   *Usuario* : ${json.names}\n`
                txt += `  ✩   *Bio* : ${json.bio}\n`
                txt += `  ✩   *Url* : ${json.link}\n\n`
                txt += `> 🚩 *${textbot}*`
                
            await conn.reply(m.chat, txt, m, rcanal)
            await m.react('✅')
        } else {
            await m.react('✖️')
        }
    } catch {
        await m.react('✖️')
    }
}
handler.help = ['tweestalk *<usuario>*']
handler.tags = ['tools']
handler.command = ['tweestalk', 'tweeter-stalk', 'twitter-stalk']
handler.register = true

export default handler
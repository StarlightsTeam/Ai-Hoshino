import fetch from 'node-fetch'

let handler = async (m, { conn, text, usedPrefix, command }) => {
    if (!text) return conn.reply(m.chat, `*🚩 Ingrese su petición*\n*🪼 Ejemplo de uso:* ${usedPrefix + command} como hacer estrella de papel`, m, rcanal)
    await m.react('💬')

    try {
        let api = await fetch(`https://apis-starlights-team.koyeb.app/starlight/chatgpt?text=${encodeURIComponent(text)}`)
        let json = await api.json()

        if (json.result) {
            await conn.reply(m.chat, json.result, m, rcanal)
        } else {
            await m.react('✖️')
        }
    } catch (error) {
        console.error(error)
        await m.react('✖️')
        await conn.reply(m.chat, '❌ Ocurrió un error al procesar tu solicitud.', m, rcanal)
    }
}

handler.help = ['ai *<petición>*']
handler.tags = ['tools']
handler.command = /^(miku|ai|ia|chatgpt|gpt)$/i
handler.register = true

export default handler
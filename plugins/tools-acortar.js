import fetch from 'node-fetch'
let handler = async (m, {conn, args, text}) => {
if (!text) return conn.reply(m.chat, `*🚩 Escribe la URL que deseas acortar.*`, m, adReply)
await m.react('🕓')
let shortUrl = await (await fetch(`https://tinyurl.com/api-create.php?url=${args[0]}`)).text()
if (!shortUrl) return conn.reply(m.chat,`*☓ Ocurrió un error inesperado*`, m, adReply).then(_ => m.react('✖️'))
let txt = `╭────═[ *T I N Y U R L* ]═─────⋆\n`
    txt += `│╭───────────────···\n`
    txt += `┴│✯ *Url Anterior*\n`
    txt += `✩│✯ *- ${text}*\n`
    txt += `✩│✯ *Url Acortado*\n`
    txt += `┬│✯ *- ${shortUrl}*\n`
    txt += `│╰────────────────···\n`
    txt += `╰───────────═┅═──────────`
await conn.reply(m.chat, txt, m, adReply)
await m.react('✅')
}
handler.help = ['acortar'].map((v) => v + ' <url>')
handler.tags = ['tools']
handler.command = /^(tinyurl|short|acortar|corto)$/i
handler.register = true 
export default handler
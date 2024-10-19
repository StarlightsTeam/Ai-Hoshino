import Starlights from '@StarlightsTeam/Scraper'

let handler = async (m, { conn, command, args, text, usedPrefix }) => {
  if (!text) return conn.reply(m.chat, '[ ✰ ] Ingresa el nombre de la aplicación que deseas buscar en *Aptoide* junto al comando.\n\n`» Ejemplo :`\n' + `> *${usedPrefix + command}* WhatsApp`, m, rcanal)
  await m.react('🕓')
  try {
    let res = await Starlights.aptoideSearch(text)
    let img = `https://telegra.ph/file/e7eae20d14bf755fc4ebb.jpg`
    let txt = `*乂  A P T O I D E  -  S E A R C H*`
    
    for (let i = 0; i < res.length; i++) {
      txt += `\n\n`
      txt += `  *» Nro* : ${res[i].nro}\n`
      txt += `  *» Nombre* : ${res[i].name}\n`
      txt += `  *» ID* : ${res[i].id}`
    }
    
    await conn.sendFile(m.chat, img, 'thumbnail.jpg', txt, m, null, rcanal)
    await m.react('✅')
  } catch {
    await m.react('✖️')
  }
}

handler.help = ['aptoidesearch *<búsqueda>*']
handler.tags = ['search']
handler.command = ['aptoidesearch']
handler.register = true

export default handler
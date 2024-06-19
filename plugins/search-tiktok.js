import Starlights from '@StarlightsTeam/Scraper'

let handler = async (m, { conn, usedPrefix, command, text }) => {
  if (!text) return conn.reply(m.chat, '🚩 Ingresa el nombre del video que deseas buscar en TikTok.\n\n`Ejemplo:`\n' + `> *${usedPrefix + command}* Ai Hoshino Edit`, m, rcanal)
  await m.react('🕓')
  try {
    let data = await Starlights.tiktokSearch(text)
    let img = await (await axios.get('https://i.ibb.co/kyTcqt9/file.jpg', { responseType: 'arraybuffer' })).data

    if (data.status === 200) {
      let videos = data.results;
      let txt = `*乂  T I K T O K  -  S E A R C H*`
      for (let i = 0; i < (50 <= videos.length ? 50 : videos.length); i++) {
        let video = videos[i]
        txt += `\n\n`
        txt += `  *» Nro* : ${i + 1}\n`
        txt += `  *» Título* : ${video.title}\n`
        txt += `  *» Autor* : ${video.author}\n`
        txt += `  *» Url* : ${video.url}`
      }
      await conn.sendFile(m.chat, img, 'thumbnail.jpg', txt, m, null, rcanal)
      await m.react('✅')
    } else {
      await m.react('✖️')
    }
  } catch {
    await m.react('✖️')
  }
}
handler.tags = ['search']
handler.help = ['tiktoksearch *<búsqueda>*']
handler.command = ['tiktoksearch', 'tiktoks']
handler.register = true

export default handler
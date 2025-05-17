import fetch from 'node-fetch'

let handler = async (m, { conn, command, usedPrefix, args, text }) => {
  if (!text) return conn.reply(m.chat, '[ ✰ ] Ingrese el nombre de la canción de *Soundcloud.*\n\n' + '`Ejemplo:`\n' + `> *${usedPrefix + command}* Die With A Smile`, m, rcanal)
  
  await m.react('🕒')
  try {
    let api = await fetch(`https://apis-starlights-team.koyeb.app/starlight/soundcloud-search?text=${text}`)
    let json = await api.json()
    let { url } = json[0]

    let api2 = await fetch(`https://api.starlights.uk/api/downloader/soundcloud?url=${url}`)
    let json2 = await api2.json()
    let data = json2.result
    
    let txt = `*- S O U N C L O U D - M U S I C -*\n\n`
    txt += `\t*ੈ✰‧₊˚ Título* :: ${data.title}\n`
    txt += `\t*ੈ❁‧₊˚ Calidad* :: ${data.quality}\n`
    txt += `\t*ੈ❀‧₊˚ Duración* :: ${data.duration}\n`
    txt += `\t*ੈ☘︎‧₊˚ Tamaño* :: ${data.size}\n\n`
    txt += `> *- ↻ El audio se está enviando, espera un momento...*`

    await conn.sendFile(m.chat, data.thumbnail, 'thumbnail.jpg', txt, m, null, rcanal)
    await conn.sendMessage(m.chat, { audio: { url: data.dl_url }, fileName: `${data.title}.mp3`, mimetype: 'audio/mpeg' }, { quoted: m })

    await m.react('✅')
  } catch {
    await m.react('✖️')
  }
}

handler.help = ['soundcloud *<búsqueda>*']
handler.tags = ['downloader']
handler.command = ['soundcloud', 'sound']
handler.register = true
export default handler
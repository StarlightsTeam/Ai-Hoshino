import fetch from 'node-fetch'

let handler = async (m, { conn, text, usedPrefix, command }) => {
    if (!text) { return conn.reply(m.chat, '[ ✰ ] Ingresa el enlace de algún Track de Spotify.\n\n' + '`Ejemplo:`\n' + `> *${usedPrefix + command}* https://open.spotify.com/track/5hnOJqBnVXRlc7JS49IChB`, m, rcanal)}

  let isSpotifyTrack = text.match(/^https:\/\/open\.spotify\.com\/track\/[a-zA-Z0-9]+/i)
  if (!isSpotifyTrack) return conn.reply(m.chat, '[ ✰ ] Solo se permiten enlaces de *Tracks* de Spotify.', m, rcanal)

  await m.react('🕓')
  try {
    let res = await fetch(`https://api.starlights.uk/api/downloader/spotify?url=${text}`)
    let json = await res.json()

    let { title, artist, album, thumbnail, download } = json.result

    let txt = '*`˚₊· ͟͟͞͞➳❥ SPOTIFY ¸.☆.¸⁭ DL`*\n\n'
        txt += `\t*ੈ✰‧₊˚ Titulo* :: ${title}\n`
        txt += `\t*ੈ☘︎‧₊˚ Artista* :: ${artist}\n`
        txt += `\t*ੈ✿︎‧₊˚ Album* :: ${album || 'Desconocido'}\n\n`
        txt += `> *- ↻ El audio se está enviando, espera un momento...*`

    await conn.sendFile(m.chat, thumbnail, 'thumbnail.jpg', txt, m, null, rcanal)
    await conn.sendMessage(m.chat, { audio: { url: download }, fileName: `${title}.mp3`, mimetype: 'audio/mp4' }, { quoted: m })

    await m.react('✅')
  } catch {
    await m.react('✖️')
  }
}

handler.help = ['spotifydl']
handler.tags = ['downloader']
handler.command = ['spotifydl']
handler.register = true

export default handler
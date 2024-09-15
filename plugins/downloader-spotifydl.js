import Starlights from '@StarlightsTeam/Scraper'
import fetch from 'node-fetch'

let handler = async (m, { conn, text }) => {
 if (!text) throw `🚩 Ingresa el enlace de algún Track, PlayList o Álbum de Spotify.`; 
 let isSpotifyUrl = text.match(/^(https:\/\/open\.spotify\.com\/(album|track|playlist)\/[a-zA-Z0-9]+)/i);
 if (!isSpotifyUrl && !text) throw `🚩 Ingresa el enlace de algún Track, Playlist o Álbum de Spotify.`
 await m.react('🕓')
try {
let { title, artist, album, thumbnail, dl_url} = await Starlights.spotifydl(text)
let img = await (await fetch(`${thumbnail}`)).buffer()
let txt = `*乂  S P O T I F Y  -  D O W N L O A D*\n\n`
    txt += `	✩  *Titulo* : ${title}\n`
    txt += `	✩  *Album* : ${album}\n`
    txt += `	✩  *Artista* :${artist}\n\n`
    txt += `*- ↻ Los audios se estan enviando espera un momento, soy lenta. . .*`
await conn.sendFile(m.chat, img, 'thumbnail.jpg', txt, m)
await conn.sendMessage(m.chat, { audio: { url: dl_url }, fileName: title + '.mp3', mimetype: 'audio/mp4' }, { quoted: m })
await m.react('✅')
} catch {
await m.react('✖️')
}}
handler.help = ['spotifydl']
handler.tags = ['downloader']
handler.command = ['spotifydl']
//handler.limit = 1
handler.register = true
export default handler

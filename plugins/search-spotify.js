import axios from 'axios' 
import fetch from 'node-fetch'

let handler = async (m, { conn, text, usedPrefix, command }) => {
  if (!text) return conn.reply(m.chat, `*🚩 Ingresa nombre de un Artista o Canción que deseas buscar.*\n\n*Ejemplo:*\n*${usedPrefix + command}* Alan Walker - Sing Me To Sleep`, m)
  await m.react('🕓') 
  try {
    let response = await axios.get(`https://vihangayt.me/search/spotify?q=${text}`) 
    let res = response.data.data 
    let img = await (await fetch(`https://tinyurl.com/ymneuceu`)).buffer()

    let txt = `*乂  S P O T I F Y  -  S E A R C H*` 
    for (let i = 0; i < (50 <= res.length ? 50 : res.length); i++) {
      txt += `\n\n` 
      txt += `	✩   *Nro* : ${1 + i}\n` 
      txt += `	✩   *Titulo* : ${res[i].title}\n` 
      txt += `	✩   *Artista* : ${res[i].artist}\n` 
      txt += `	✩   *Duración* :${millisecondsToMinutes(res[i].duration)}\n` 
      txt += `	✩   *Popularidad* : ${res[i].popularity}\n` 
      txt += `	✩   *Url* : ${res[i].url}` 
    }
    
await conn.sendFile(m.chat, img, "out.png", txt, m)
await m.react('✅') 
} catch {
await conn.reply(m.chat, `*☓ Ocurrió un error inesperado*`, m, adReply).then(_ => m.react('✖️'))
}} 
handler.help = ['spotifysearch <texto>'] 
handler.tags = ['search'] 
handler.command = ['spotifysearch'] 
handler.limit = 1 
handler.register = true 

export default handler 

function millisecondsToMinutes(durationInMilliseconds) {
  let minutes = Math.floor(durationInMilliseconds / 60000) 
  let seconds = ((durationInMilliseconds % 60000) / 1000).toFixed(0) 
  return `${minutes}:${(seconds < 10 ? '0' : '')}${seconds} minutos` 
}
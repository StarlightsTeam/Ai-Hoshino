//Instalar la dependencia Node-id3 🙃
//Use math por problemas de que algunos audios no se envian
//La segunda url si descarga los datos de la cancion para eso tienes que ingresar a Souncloud la musica que quieres descargar ingresas y copias el link y lo pegas en la segunda url :) 
//el buscador aun no tiene permisos para ir directamente a la cancion y obtener el link directamente a la cancion por eso es que algunos audios no son enviados
import axios from 'axios'
import fs from 'fs'
import nodeID3 from 'node-id3'

let handler = async (m, { conn, text, usedPrefix, command }) => {
if (!text) return conn.reply(m.chat, `*🚩 Ingrese el nombre de la cancion de Soundcloud*`, m)
try {
let { data: results } = await axios.get(`https://apis-starlights-team.koyeb.app/starlight/soundcloud-search?text=${text}`, { headers: { 'Content-Type': 'application/json' } })
let randoms = results[Math.floor(Math.random() * results.length)]
let { data: sm } = await axios.get(`https://apis-starlights-team.koyeb.app/starlight/soundcloud?url=${randoms.url}`, { headers: { 'Content-Type': 'application/json' }})
let mpeg = await axios.get(sm.audio, { responseType: 'arraybuffer' })
let img = await axios.get(randoms.image, { responseType: 'arraybuffer' })
let mp3 = `${sm.title}.mp3`
fs.writeFileSync(mp3, Buffer.from(mpeg.data))
let tags = {
title: sm.title,
artist: sm.creator, 
image: Buffer.from(img.data) 
}
nodeID3.write(tags, mp3)
let txt = `*\`- S O U N C L O U D - M U S I C -\`*\n\n`
txt += `🍘• *Nombre:* ${randoms.title}\n`
txt += `🍘• *Artista:* ${randoms.artist}\n`
txt += `🍘• *Duracion:* ${randoms.duration}\n`
txt += `🍘• *Reproducciones:* ${randoms.repro}\n`
txt += `🍘• *Link:* ${randoms.url}\n\n`
txt += `🚩 Powered By Starlights Team`
await conn.sendFile(m.chat, randoms.image, 'thumb.jpg', txt, m)
await conn.sendMessage(m.chat, { audio: fs.readFileSync(mp3), fileName: `${sm.title}.mp3`, mimetype: 'audio/mpeg' }, { quoted: m })
fs.unlinkSync(mp3)
} catch (error) {
}}
handler.help = ['soundcloud *<búsqueda>*']
handler.tags = ['downloader']
handler.command = ['soundcloud', 'sound']
handler.register = true
handler.limit = 3
export default handler

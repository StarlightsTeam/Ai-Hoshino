import Scraper from "@SumiFX/Scraper"

let handler = async (m, { conn, usedPrefix, command, text }) => {
    if (!text) return conn.reply(m.chat, '🍭 Ingresa el título de un video o canción de YouTube.\n\n`Ejemplo:`\n' + `> *${usedPrefix + command}* Gemini Aaliyah - If Only`, m)
    let results = await Scraper.ytsearch(text)
    if (!results || !results.length) return conn.reply(m.chat, `No se encontraron resultados.`, m)
    let img = results[0].thumbnail
    let txt = `╭─⬣「 *YouTube Search* 」⬣\n`
    results.forEach((video, index) => {
        txt += ` │  ≡◦ *🐢 Nro ∙* ${index + 1}\n`
        txt += ` │  ≡◦ *🍭 Titulo ∙* ${video.title}\n`
        txt += ` │  ≡◦ *🕜 Duración ∙* ${video.duration}\n`
        txt += ` │  ≡◦ *🪴 Publicado ∙* ${video.published}\n`
        txt += ` │  ≡◦ *📚 Autor ∙* ${video.author}\n`
        txt += ` │  ≡◦ *⛓ Url ∙* ${video.url}\n`
        txt += ` ╰──────────⬣`
        txt += `\n`
    })
await conn.sendFile(m.chat, img, 'thumbnail.jpg', txt, m)
}
handler.help = ['ytsearch <búsqueda>']
handler.tags = ['search']
handler.command = ['ytsearch', 'yts']
handler.register = true 
export default handler
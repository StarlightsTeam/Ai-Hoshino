let handler  = async (m, { conn }) => {

let img = `https://i.pinimg.com/736x/6e/5b/9a/6e5b9a6cf03311b94229cb3736d70bdc.jpg`

let txt = `*Hola!, te invito a unirte a los grupos oficiales de del Bot para convivir con la comunidad :D*

1- 【 ✯ Starlights Team ✰ 】
*✰* ${global.group}

2- 【 ✯ Starlights Team ✰ 】- ll
*✰* ${global.group2}

3- 【 ✯ Starlights Team ✰ 】- lll
*✰* ${global.group3}

*─ׄ─ׅ─ׄ⭒─ׄ─ׅ─ׄ⭒─ׄ─ׅ─ׄ⭒─ׄ─ׅ─ׄ⭒─ׄ─ׅ─ׄ⭒─ׄ─ׅ─ׄ*

➠ Enlaces anulados? entre aquí! 

Canal :
*✰* ${global.canal}

> [ ✰ ] ${global.textbot}`
await conn.sendFile(m.chat, img, "Thumbnail.jpg", txt, m, null, rcanal)
}
handler.help = ['grupos']
handler.tags = ['main']
handler.command = /^(grupos)$/i

export default handler 

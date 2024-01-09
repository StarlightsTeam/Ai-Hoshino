import axios from 'axios'
import cheerio from 'cheerio'

let handler = async (m, { conn, args, command }) => {
	if (!args[0]) return conn.reply(m.chat, '*🚩 Escribe la URL de un video de Facebook que deseas descargar.*', m, adReply)
	try {
	await m.react('🕓')
	let config = {
        'id': args[0],
        'locale': 'id'
      }
    let { data, status } = await axios('https://getmyfb.com/process', {
        method: 'POST',
        data: new URLSearchParams(Object.entries(config)),
        headers: {
          "user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/105.0.0.0 Safari/537.36",
          "cookie": "PHPSESSID=914a5et39uur28e84t9env0378; popCookie=1; prefetchAd_4301805=true"
        }
      })
      let $ = cheerio.load(data)
      let HD = $('div.container > div.results-download > ul > li:nth-child(1) > a').attr('href')
      let SD = $('div.container > div.results-download > ul > li:nth-child(2) > a').attr('href')
	await conn.sendMessage(m.chat, { video: { url: HD || SD }, caption: null }, { quoted: estilo})
	await m.react('✅')
	} catch (e) {
		conn.reply(m.chat, '*☓ Ocurrió un error inesperado*', m, adReply).then(_ => m.react('✖️'))
	}
}
handler.help = ['facebook'].map(v => v + ' <url fb>')
handler.tags = ['downloader']
handler.command = /^((facebook|fb)(downloder|dl)?)$/i
handler.star = 2
handler.register = true 
export default handler
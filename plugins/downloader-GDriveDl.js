import fetch from 'node-fetch'
import { sizeFormatter } from 'human-readable'
let handler = async (m, { conn, args }) => {
let limit = 200
	if (!(args[0] || '').match(/([\w-]){33}|([\w-]){19}/)) return conn.reply(m.chat, `*🚩 Escribe la URL de un archivo de GoogleDrive que deseas descargar.*`, m, adReply)
	await m.react('🕓')
	try {
		let res = await GDriveDl(args[0])
        if (res.fileSize.split('MB')[0] >= limit) return conn.reply(m.chat, `El archivo pesa mas de ${limit} MB, se canceló la Descarga.`, m, adReply).then(_ => m.react('✖️'))
		let txt = `*📓 Nombre ∙* ${res.fileName}\n`
		txt += `*📁 Peso ∙* ${res.fileSize}\n`
		txt += `*📄 Tipo ∙* ${res.mimetype}\n\n`
		txt += `*↻ Espera soy lenta. . .*`
		await conn.reply(m.chat, txt, m, adReply)
		if (!res.downloadUrl) throw eror
		await conn.sendFile(m.chat, res.downloadUrl, res.fileName + res.mimetype, res.fileName + res.mimetype, m)
		await m.react('✅')
	} catch (e) {
		console.log(e)
		return conn.reply(m.chat, `*☓ Ocurrió un error inesperado*`, m, adReply).then(_ => m.react('✖️'))
	}
}
handler.help = ['gdrive <url>']
handler.tags = ['downloader']
handler.command = /^(g?(oogle)?drive)$/i

//handler.premium = true 
handler.star = 20

export default handler

const someincludes = ( data, id ) => {
	let res = data.find(el => id.includes(el) )
	return res ? true : false;
}
const formatSize = sizeFormatter({
	std: 'JEDEC', decimalPlaces: 2, keepTrailingZeroes: false, render: (literal, symbol) => `${literal} ${symbol}B`
})
async function GDriveDl(url) {
	let id, res = { "error": true }
	if (!(url && url.match(/drive\.google/i))) return res
	try {
		id = (url.match(/\/?id=(.+)/i) || url.match(/\/d\/(.*?)\//))[1]
		if (!id) throw 'ID Not Found'
		res = await fetch(`https://drive.google.com/uc?id=${id}&authuser=0&export=download`, {
			method: 'post',
			headers: {
				'accept-encoding': 'gzip, deflate, br',
				'content-length': 0,
				'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
				'origin': 'https://drive.google.com',
				'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/65.0.3325.181 Safari/537.36',
				'x-client-data': 'CKG1yQEIkbbJAQiitskBCMS2yQEIqZ3KAQioo8oBGLeYygE=',
				'x-drive-first-party': 'DriveWebUi',
				'x-json-requested': 'true' 
			}
		})
		let { fileName, sizeBytes, downloadUrl } =  JSON.parse((await res.text()).slice(4))
		if (!downloadUrl) throw 'Link Download Limit!'
		let data = await fetch(downloadUrl)
		if (data.status !== 200) return data.statusText
		return { downloadUrl, fileName, fileSize: formatSize(sizeBytes), mimetype: data.headers.get('content-type') }
	} catch (e) {
		console.log(e)
		return res
	}
}
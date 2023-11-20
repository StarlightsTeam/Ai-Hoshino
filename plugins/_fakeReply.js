export async function before(m, { conn }) {
		// Respuesta de anuncio 
 global.adReply = {
			contextInfo: {
			mentionedJid: [m.sender],
				forwardingScore: 9999,
				externalAdReply: {
				showAdAttribution: true,
					title: namebot,
					body: desc,
					mediaUrl: null,
					description: null,
					previewType: "PHOTO",
					thumbnail: miniurl,
					sourceUrl: null
				}
			}
		}
		
		// Respuesta de descargas de YouTube
 global.adYT = {
			contextInfo: {
			mentionedJid: [m.sender],
				forwardingScore: 9999,
				externalAdReply: {
				showAdAttribution: true,
					title: adyoutube,
					body: namebot,
					mediaUrl: null,
					description: null,
					previewType: "PHOTO",
					thumbnail: miniurl,
					sourceUrl: null
				}
			}
		}
		
		  // Respuesta de Stickers 
 global.adSticker = {
			contextInfo: {
			mentionedJid: [m.sender],
				forwardingScore: 9999,
				externalAdReply: {
				showAdAttribution: true,
					title: adsticker,
					body: namebot,
					mediaUrl: null,
					description: null,
					previewType: "PHOTO",
					thumbnail: miniurl,
					sourceUrl: null
				}
			}
		}
		//Respuesta de busquedas 
 global.adSearch = {
			contextInfo: {
			mentionedJid: [m.sender],
				forwardingScore: 9999,
				externalAdReply: {
				showAdAttribution: true,
					title: adsearch,
					body: namebot,
					mediaUrl: null,
					description: null,
					previewType: "PHOTO",
					thumbnail: miniurl,
					sourceUrl: null
				}
			}
		}
		//Respuesta de Nsfw 
 global.adNsfw = {
			contextInfo: {
			mentionedJid: [m.sender],
				forwardingScore: 9999,
				externalAdReply: {
				showAdAttribution: true,
					title: adnsfw,
					body: namebot,
					mediaUrl: null,
					description: null,
					previewType: "PHOTO",
					thumbnail: miniurl,
					sourceUrl: null
				}
			}
		}
}
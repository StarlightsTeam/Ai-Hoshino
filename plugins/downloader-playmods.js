import cheerio from 'cheerio';
import fetch from 'node-fetch';

let handler = async (m, { conn, args, usedPrefix, text, command }) => {
    let lister = [
        "search",
        "dl"
    ]

    let [feature, inputs, inputs_, inputs__, inputs___] = text.split(" ")
    if (!lister.includes(feature)) return m.reply(`Formato incorrecto\n\nEste comando se usa de la siguiente manera :\n\nPara *Buscar* el enlace de la aplicación :\n*${usedPrefix + command} search* WhatsApp\n\nPara *Descargar* la aplicación :\n*${usedPrefix + command} dl* https://m.playmods.net/id/apps/whatsapp-messenger/com.whatsapp`)
    
    if (lister.includes(feature)) {
        if (feature == "search") {
            if (!inputs) return m.reply(`Formato incorrecto\n\nEjemplo : *${usedPrefix + command} search* WhatsApp`)
            await m.react('🕓')
            try {
                let res = await searchApp(inputs)
                let teks = res.map((item, index) => {
                    return `*Resultado* : ${index + 1}
*Nombre* : ${item.title}
*Info* : ${item.detail.replace(/\n/g, ' ')} 
*Link*: ${item.link}
`
                }).filter(v => v).join("\n\n")
                await m.reply(teks)
                await m.react('✅')
            } catch (e) {
                await m.reply(eror)
            }
        }

        if (feature == "dl") {
            if (!inputs) return m.reply(`Formato incorrecto\n\nEjemplo : *${usedPrefix + command} dl* https://m.playmods.net/id/apps/whatsapp-messenger/com.whatsapp`)
            await m.react('🕓')
            try {
                let item = await getApp(inputs)
                let cap = `*Nombre* : ${item.title}
*Puntuación* : ${item.score}
*Actualizado* : ${item.size}
*Detalles* : ${item.detail}
*Link* : ${item.link}
`
                await conn.sendFile(m.chat, item.screenshots[0], "", cap, m)
                await conn.sendFile(m.chat, item.link, item.title, null, m, true, {
                    quoted: m,
                    mimetype: "application/vnd.android.package-archive"
                })
                await m.react('✅')
            } catch (e) {
                await conn.reply(m.chat, '*☓ Ocurrió un error inesperado*', m, adReply).then(_ => m.react('✖️'))
            }
        }
    }
}
handler.command = ['playmods']
handler.tags = ['downloader']
handler.help = ['playmods search <nombre>', 'playmods dl <link>']
handler.register = true 
handler.star = 5
export default handler

async function searchApp(q) {
  try {
    const url = 'https://m.playmods.net/id/search/' + q; 

    const response = await fetch(url);
    const html = await response.text();

    const $ = cheerio.load(html);

    const dataArray = [];

    $('a.beautify.ajax-a-1').each((index, element) => {
      const $element = $(element);

      const data = {
        link: 'https://m.playmods.net' + $element.attr('href'),
        title: $element.find('.common-exhibition-list-detail-name').text().trim(),
        menu: $element.find('.common-exhibition-list-detail-menu').text().trim(),
        detail: $element.find('.common-exhibition-list-detail-txt').text().trim(),
        image: $element.find('.common-exhibition-list-icon img').attr('data-src'),
        downloadText: $element.find('.common-exhibition-line-download').text().trim(),
      };

      dataArray.push(data);
    });
    return dataArray;
  } catch (error) {
    console.log(error);
  }
}

async function getApp(url) {
  try {
    const response = await fetch(url);
    const html = await response.text();

    const $ = cheerio.load(html);

    const data = {
      title: $('h1.name').text().trim(),
      image: $('.icon').attr('src'),
      name: $('.app-name span').text().trim(),
      score: $('.score').text().trim(),
      edisi: $('.edition').text().trim(),
      size: $('.size .operate-cstTime').text().trim(),
      create: $('.size span').text().trim(),
      link: $('a.a_download').attr('href'),
      detail: $('.game-describe-gs').text().trim(),
      screenshots: $('.swiper-slide img').map((index, element) => $(element).attr('data-src')).get(),
      describe: $('.datail-describe-pre div').text().trim(),
    };

    return data;
  } catch (error) {
    console.log(error);
  }
}

function generateList(array) {
  const list = array.map((item, index) => `${index + 1}. ${item}`).join('\n');
  return list;
}

function addNewline(text) {
  const newText = text.replace(/•/g, '\n•');
  return newText;
} 
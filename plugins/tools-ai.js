import axios from 'axios'
let handler = async (m, {conn, text, usedPrefix, command}) => {
if (!text) return conn.reply(m.chat, `*🚩 Ingrese su petición.*\n*🪼 Ejemplo de uso:* ${usedPrefix + command} como hacer estrella de papel`, m, adReply)
  await conn.reply(m.chat, `*↻ Espera @${m.sender.split`@`[0]}, soy lenta. . .*`, estilo, adReply)
   try {
     let openAIResponse = await await fetchChatData('chat', text)
     let result = openAIResponse;
     let str = ""
     let anu = result.split('data: ').slice(1).map(x => (str += x.replace(/\n/g, '')))
     if (result) {
     await conn.reply(m.chat, str.replace(/\\n/g, '\n'), m, adReply)
     }
   } catch {
   try {
     let api = await fetch(`https://vihangayt.me/tools/chatgpt?q=${text}`)
     let res = await api.json()
     if (res.data == 'error' || res.data == '' || !res.data) return error
     await conn.reply(m.chat, `${res.data}`.trim(), m, adReply)
   } catch {
   try {
     let api2 = await fetch(`https://vihangayt.me/tools/chatgpt2?q=${text}`)
     let res2 = await api2.json()
     if (res2.data == 'error' || res2.data == '' || !res2.data) return error
     await conn.reply(m.chat, `${res2.data}`.trim(), m, adReply)
   } catch {
   try {
     let api3 = await fetch(`https://vihangayt.me/tools/chatgpt3?q=${text}`)
     let res3 = await api3.json()
     if (res3.data == 'error' || res3.data == '' || !res3.data) return error
     await conn.reply(m.chat, `${res3.data}`.trim(), m, adReply)
   } catch {
   return conn.reply(m.chat, `*☓ Ocurrió un error inesperado*`, m, adReply)
}}}}}
handler.help = ['ai <petición>']
handler.tags = ['tools']
handler.command = /^(ai|ia|chatgpt)$/i
handler.register = true
export default handler

function generateRandomUserAgent() {
    let androidVersions = ['4.0.3', '4.1.1', '4.2.2', '4.3', '4.4', '5.0.2', '5.1', '6.0', '7.0', '8.0', '9.0', '10.0', '11.0']
    let deviceModels = ['M2004J19C', 'S2020X3', 'Xiaomi4S', 'RedmiNote9', 'SamsungS21', 'GooglePixel5']
    let buildVersions = ['RP1A.200720.011', 'RP1A.210505.003', 'RP1A.210812.016', 'QKQ1.200114.002', 'RQ2A.210505.003']

    let selectedModel = deviceModels[Math.floor(Math.random() * deviceModels.length)]
    let selectedBuild = buildVersions[Math.floor(Math.random() * buildVersions.length)]
    let chromeVersion = 'Chrome/' + (Math.floor(Math.random() * 80) + 1) + '.' + (Math.floor(Math.random() * 999) + 1) + '.' + (Math.floor(Math.random() * 9999) + 1)

    let userAgent = `Mozilla/5.0 (Linux; Android ${androidVersions[Math.floor(Math.random() * androidVersions.length)]}; ${selectedModel} Build/${selectedBuild}) AppleWebKit/537.36 (KHTML, like Gecko) ${chromeVersion} Mobile Safari/537.36 WhatsApp/1.${Math.floor(Math.random() * 9) + 1}.${Math.floor(Math.random() * 9) + 1}`

    return userAgent
}

function generateRandomIP() {
    let octet = () => Math.floor(Math.random() * 256)
    return `${octet()}.${octet()}.${octet()}.${octet()}`
}

async function fetchChatData(type, message) {
    try {
        let headers = {
            'User-Agent': generateRandomUserAgent(),
            'Referer': 'https://talkai.info/id/chat/',
            'X-Forwarded-For': generateRandomIP(),
        }

        let data = {
            temperature: 1,
            frequency_penalty: 0,
            type: type,
            messagesHistory: [{
                    from: 'chatGPT',
                    content: 'You are a helpful assistant.'
                },
                {
                    from: 'you',
                    content: message
                },
            ],
            message: message,
        }

        let response = await axios.post('https://talkai.info/id/chat/send2/', data, {
            headers
        })

        return response.data
    } catch (error) {
        console.error('Hay un error:', error)
    }
}
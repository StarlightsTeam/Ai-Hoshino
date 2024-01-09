import {WAMessageStubType} from '@whiskeysockets/baileys';
import fetch from 'node-fetch';

export async function before(m, {conn, participants, groupMetadata}) {
  if (!m.messageStubType || !m.isGroup) return !0;
  let pp = await conn.profilePictureUrl(m.messageStubParameters[0], 'image').catch(_ => 'https://tinyurl.com/yt2a7wdk')
  let d = new Date(new Date + 3600000)
    let locale = 'es'
    let date = d.toLocaleDateString(locale, {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    })
    let img = `https://api.popcat.xyz/welcomecard?background=https://tinyurl.com/ywrcvffd&text1=Ai%20Hoshino%20-%20MD&text2=Bienvenido+Al+Grupo&text3=${date}&avatar=${pp}`
    
  let chat = global.db.data.chats[m.chat]
  
  if (chat.welcome && m.messageStubType == 27) {
    let welcome = `┌─★ *Ai Hoshino - MD* \n│「 Bienvenido 」\n└┬★ 「 @${m.messageStubParameters[0].split`@`[0]} 」\n   │✑  Bienvenido a\n   │✑  ${groupMetadata.subject}\n   └───────────────┈ ⳹`
    
    await conn.sendMessage(
    m.chat,
    {
      image: {
        url: img,
      },
      caption: welcome,
      contextInfo: {
      mentionedJid: [m.messageStubParameters[0]],
      forwardingScore: 9999, 
       isForwarded: true, 
        externalAdReply: {
          title: namebot,
          sourceUrl: group,
          mediaType: 1,
          renderLargerThumbnail: true, 
          thumbnail: thumbnail,
        },
      },
    },
    {
      quoted: estilo,
    }
  )
  }
  
if (chat.welcome && m.messageStubType == 28) {
    let bye = `┌─★ *Ai Hoshino - MD* \n│「 ADIOS 👋 」\n└┬★ 「 @${m.messageStubParameters[0].split`@`[0]} 」\n   │✑  Se fue\n   │✑ Jamás te quisimos aquí\n   └───────────────┈ ⳹`

    await conn.sendMessage(
    m.chat,
    {
      image: {
        url: img,
      },
      caption: bye,
      contextInfo: {
      mentionedJid: [m.messageStubParameters[0]],
      forwardingScore: 9999, 
       isForwarded: true, 
        externalAdReply: {
          title: namebot,
          sourceUrl: group,
          mediaType: 1,
          renderLargerThumbnail: true, 
          thumbnail: thumbnail,
        },
      },
    },
    {
      quoted: estilo,
    }
  )
  }
  
  if (chat.welcome && m.messageStubType == 32) {
    let kick = `┌─★ *Ai Hoshino - MD* \n│「 ADIOS 👋 」\n└┬★ 「 @${m.messageStubParameters[0].split`@`[0]} 」\n   │✑  Se fue\n   │✑ Jamás te quisimos aquí\n   └───────────────┈ ⳹`

    await conn.sendMessage(
    m.chat,
    {
      image: {
        url: img,
      },
      caption: kick,
      contextInfo: {
      mentionedJid: [m.messageStubParameters[0]],
      forwardingScore: 9999, 
       isForwarded: true, 
        externalAdReply: {
          title: namebot,
          sourceUrl: group,
          mediaType: 1,
          renderLargerThumbnail: true, 
          thumbnail: thumbnail,
        },
      },
    },
    {
      quoted: estilo,
    }
  )

}}
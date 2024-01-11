import {WAMessageStubType} from '@whiskeysockets/baileys';
import fetch from 'node-fetch';

export async function before(m, {conn, participants, groupMetadata}) {
  if (!m.messageStubType || !m.isGroup) return !0;
  let pp = await conn.profilePictureUrl(m.messageStubParameters[0], 'image').catch(_ => './src/avatar_contact.png')
  let chat = global.db.data.chats[m.chat]

  if (chat.welcome && m.messageStubType == 27) {
    let welcome = `┌─★ *Ai Hoshino - MD* \n│「 Bienvenido 」\n└┬★ 「 @${m.messageStubParameters[0].split`@`[0]} 」\n   │✑  Bienvenido a\n   │✑  ${groupMetadata.subject}\n   └───────────────┈ ⳹`
    
    await conn.sendMessage(
    m.chat,
    {
      image: {
        url: pp,
      },
      caption: welcome,
      contextInfo: {
      mentionedJid: [m.messageStubParameters[0]],
      forwardingScore: 9999, 
       isForwarded: true, 
        externalAdReply: {
          title: gcname,
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
        url: pp,
      },
      caption: bye,
      contextInfo: {
      mentionedJid: [m.messageStubParameters[0]],
      forwardingScore: 9999, 
       isForwarded: true, 
        externalAdReply: {
          title: gcname,
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
        url: pp,
      },
      caption: kick,
      contextInfo: {
      mentionedJid: [m.messageStubParameters[0]],
      forwardingScore: 9999, 
       isForwarded: true, 
        externalAdReply: {
          title: gcname,
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
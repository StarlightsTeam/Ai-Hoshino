import {WAMessageStubType} from '@whiskeysockets/baileys';
import fetch from 'node-fetch';

export async function before(m, {conn, participants, groupMetadata}) {
  if (!m.messageStubType || !m.isGroup) return !0;
  let pp = await conn.profilePictureUrl(m.messageStubParameters[0], 'image').catch(_ => 'https://tinyurl.com/ylgu47w3')
  let img = await (await fetch(`${pp}`)).buffer()
  let chat = global.db.data.chats[m.chat]

  if (chat.bienvenida && m.messageStubType == 27) {
    let bienvenida = `┌─★ *${botname}* \n│「 Bienvenido 」\n└┬★ 「 @${m.messageStubParameters[0].split`@`[0]} 」\n   │✑  Bienvenido a\n   │✑  ${groupMetadata.subject}\n   └───────────────┈ ⳹`
    
await conn.sendMessage(m.chat, {
text: bienvenida,
contextInfo: { 
mentionedJid: [m.messageStubParameters[0]],
forwardingScore: 9999, 
isForwarded: true, 
externalAdReply: {
title: botname,
body: textbot,
thumbnailUrl: img,
thumbnail: img,
sourceUrl: canal,
mediaType: 1,
renderLargerThumbnail: true
}}}, { quoted: estilo})
  }
  
  if (chat.bienvenida && m.messageStubType == 28) {
    let bye = `┌─★ *${botname}* \n│「 ADIOS 👋 」\n└┬★ 「 @${m.messageStubParameters[0].split`@`[0]} 」\n   │✑  Se fue\n   │✑ Jamás te quisimos aquí\n   └───────────────┈ ⳹`

await conn.sendMessage(m.chat, {
text: bye,
contextInfo: { 
mentionedJid: [m.messageStubParameters[0]],
forwardingScore: 9999, 
isForwarded: true, 
externalAdReply: {
title: botname,
body: textbot,
thumbnailUrl: img,
thumbnail: img,
sourceUrl: canal,
mediaType: 1,
renderLargerThumbnail: true
}}}, { quoted: estilo})
  }
  
  if (chat.bienvenida && m.messageStubType == 32) {
    let kick = `┌─★ *${botname}* \n│「 ADIOS 👋 」\n└┬★ 「 @${m.messageStubParameters[0].split`@`[0]} 」\n   │✑  Se fue\n   │✑ Jamás te quisimos aquí\n   └───────────────┈ ⳹`

await conn.sendMessage(m.chat, {
text: kick,
contextInfo: { 
mentionedJid: [m.messageStubParameters[0]],
forwardingScore: 9999, 
isForwarded: true, 
externalAdReply: {
title: botname,
body: textbot,
thumbnailUrl: img,
thumbnail: img,
sourceUrl: canal,
mediaType: 1,
renderLargerThumbnail: true
}}}, { quoted: estilo})
}}
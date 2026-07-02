import path from "path";
import { toAudio } from "./converter.js";
import chalk from "chalk";
import fs from 'fs'
import fetch from "node-fetch";
import PhoneNumber from "awesome-phonenumber";
import { watchFile, unwatchFile } from "fs";
import util from "util";
import { fileTypeFromBuffer } from "file-type";
import { format } from "util";
import { fileURLToPath } from "url";
import store from "./store.js";
const __dirname = path.dirname(fileURLToPath(import.meta.url));

const TEMP_DIR = path.join(__dirname, '../tmp')
const MEDIA_TEMP_DIR = path.join(TEMP_DIR, 'media')

if (!fs.existsSync(TEMP_DIR)) {
	fs.mkdirSync(TEMP_DIR, { recursive: true })
}
if (!fs.existsSync(MEDIA_TEMP_DIR)) {
	fs.mkdirSync(MEDIA_TEMP_DIR, { recursive: true })
}

process.env.TMPDIR = TEMP_DIR
process.env.TEMP = TEMP_DIR
process.env.TMP = TEMP_DIR


function cleanTempDirectory() {
	try {
		const files = fs.readdirSync(TEMP_DIR, { withFileTypes: true })
		let cleaned = 0
		let freedSpace = 0
		
		for (const file of files) {
			if (file.name === 'media') continue 
			
			const filePath = path.join(TEMP_DIR, file.name)
			
			try {
				const stats = fs.statSync(filePath)
				const ageInMinutes = (Date.now() - stats.mtimeMs) / (1000 * 60)
				
				if (ageInMinutes > 5) {
					const size = stats.size
					fs.rmSync(filePath, { recursive: true, force: true })
					cleaned++
					freedSpace += size
				}
			} catch (e) {
				try {
					fs.rmSync(filePath, { recursive: true, force: true })
					cleaned++
				} catch {}
			}
		}
		
		if (fs.existsSync(MEDIA_TEMP_DIR)) {
			const mediaFiles = fs.readdirSync(MEDIA_TEMP_DIR)
			for (const file of mediaFiles) {
				const filePath = path.join(MEDIA_TEMP_DIR, file)
				try {
					const stats = fs.statSync(filePath)
					const ageInMinutes = (Date.now() - stats.mtimeMs) / (1000 * 60)
					
					if (ageInMinutes > 5) {
						const size = stats.size
						fs.unlinkSync(filePath)
						cleaned++
						freedSpace += size
					}
				} catch {}
			}
		}
		
		if (cleaned > 0) {
			const freedMB = (freedSpace / (1024 * 1024)).toFixed(2)
			console.log(chalk.green(`Temp limpiado: ${cleaned} archivos (${freedMB} MB liberados)`))
		}
	} catch (e) {
		console.error(chalk.red('Error limpiando temp:'), e.message)
	}
}

setInterval(cleanTempDirectory, 5 * 60 * 1000)

cleanTempDirectory()

import {
  makeWASocket as _makeWaSocket,
  proto,
  downloadContentFromMessage,
  jidDecode,
  areJidsSameUser,
  generateWAMessage,
  generateForwardMessageContent,
  generateWAMessageFromContent,
  WAMessageStubType,
  extractMessageContent,
  getAggregateVotesInPollMessage,
  prepareWAMessageMedia,
  WA_DEFAULT_EPHEMERAL
} from "@whiskeysockets/baileys";

export function makeWASocket(connectionOptions, options = {}) {
  const conn = _makeWaSocket(connectionOptions)
  const sock = conn

  sock.decodeJid = (jid) => {
    if (!jid) return jid;
    if (typeof jid !== "string") return jid;
    if (/:\d+@/gi.test(jid)) {
      const decode = jidDecode(jid) || {};
      return (decode.user && decode.server && decode.user + "@" + decode.server) || jid;
    }
    return jid.trim();
  };

  if (!sock.chats) sock.chats = { ...(options.chats || {}) };
  
  sock.logger = {
    info(...args) { console.log(chalk.bold.bgRgb(51, 204, 51)("INFO "), `[${new Date().toUTCString()}]:`, chalk.cyan(format(...args))); },
    error(...args) { console.log(chalk.bold.bgRgb(247, 38, 33)("ERROR "), `[${new Date().toUTCString()}]:`, chalk.rgb(255, 38, 0)(format(...args))); },
    warn(...args) { console.log(chalk.bold.bgRgb(255, 153, 0)("WARNING "), `[${new Date().toUTCString()}]:`, chalk.redBright(format(...args))); },
    trace(...args) { console.log(chalk.grey("TRACE "), `[${new Date().toUTCString()}]:`, chalk.white(format(...args))); },
    debug(...args) { console.log(chalk.bold.bgRgb(66, 167, 245)("DEBUG "), `[${new Date().toUTCString()}]:`, chalk.white(format(...args))); }
  };

  sock.resolveJid = (jid, chat) => {
    if (!jid || typeof jid !== 'string') return jid;
    if (jid.includes('@s.whatsapp.net') || jid.includes('@g.us')) return jid;
    if (jid.endsWith('@lid')) {
      const lid = jid.split('@')[0];
      const group = sock.chats[chat] || {};
      const metadata = group.metadata?.participants || [];
      const participant = metadata.find(p => p.id?.split('@')[0] === lid);
      return participant?.phoneNumber ? participant.phoneNumber : jid;
    }
    if (/^\d+$/.test(jid)) return jid
    return jid;
  };

  sock.getFile = async (PATH, saveToFile = false) => {
    let res;
    let filename;
    const data = Buffer.isBuffer(PATH) ? PATH : PATH instanceof ArrayBuffer ? Buffer.from(PATH) : /^.*?\/.*?;base64,/i.test(PATH) ? Buffer.from(PATH.split`,`[1], "base64") : /^https?:\/\//.test(PATH) ? Buffer.from(await (res = await fetch(PATH)).arrayBuffer()) : fs.existsSync(PATH) ? ((filename = PATH), fs.readFileSync(PATH)) : Buffer.alloc(0);
    if (!Buffer.isBuffer(data)) throw new TypeError("Result is not a buffer");
    const type = (await fileTypeFromBuffer(data)) || { mime: "application/octet-stream", ext: ".bin" };
    if (data && saveToFile && !filename) {
      filename = path.join(MEDIA_TEMP_DIR, Math.random().toString(36).substring(7) + '_' + new Date() * 1 + '.' + type.ext);
      await fs.promises.writeFile(filename, data);
    }
    return { res, filename, ...type, data, deleteFile() { return filename && fs.promises.unlink(filename); } };
  };

sock.sendFile = async (jid, path, filename = '', caption = '', quoted, ptt = false, options = {}) => {
  let type = await sock.getFile(path, true)
  let { res, data: file, filename: pathFile } = type

  if ((res && res.status !== 200) || file.length <= 65536) {
    try {
      throw { json: JSON.parse(file.toString()) }
    } catch (e) {
      if (e.json) throw e.json
    }
  }

  const fileSize = fs.statSync(pathFile).size / 1024 / 1024
  if (fileSize >= 100) throw new Error('File size is too big!')

  if (quoted?.key?.id) {
    options.contextInfo = {
      ...(options.contextInfo || {}),
      stanzaId: quoted.key.id,
      participant: quoted.key.participant || quoted.sender,
      quotedMessage: quoted.message
    }
  }

  let opt = quoted ? { quoted } : {}

  let mtype = ''
  let mimetype = options.mimetype || type.mime

  if (/webp/.test(type.mime) || (/image/.test(type.mime) && options.asSticker)) {
    mtype = 'sticker'
  } else if (/image/.test(type.mime) || (/webp/.test(type.mime) && options.asImage)) {
    mtype = 'image'
  } else if (/video/.test(type.mime)) {
    mtype = 'video'
  } else if (/audio/.test(type.mime)) {
    let convert = await toAudio(file, type.ext)
    file = convert.data
    pathFile = convert.filename
    mtype = 'audio'
    mimetype = options.mimetype || 'audio/mpeg'
  } else {
    mtype = 'document'
  }

  if (options.asDocument) mtype = 'document'

  let message = {
    ...options,
    caption,
    ptt,
    [mtype]: { url: pathFile },
    mimetype,
    fileName: filename || pathFile.split('/').pop()
  }

  let m

  try {
    m = await sock.sendMessage(
      jid,
      message,
      { ...opt, ...options }
    )
  } catch (e) {
    console.error(e)
    m = null
  } finally {
    if (!m) {
      m = await sock.sendMessage(
        jid,
        {
          ...message,
          [mtype]: file
        },
        { ...opt, ...options }
      )
    }

    if (pathFile && pathFile.startsWith(MEDIA_TEMP_DIR)) {
      setTimeout(() => {
        try {
          fs.unlinkSync(pathFile)
        } catch {}
      }, 60000)
    }
  }

  return m
}

 sock.reply = (jid, text = "", quoted, options = {}) => {
  if (quoted?.key?.id) {
    options.contextInfo = {
      ...(options.contextInfo || {}),
      stanzaId: quoted.key.id,
      participant: quoted.key.participant || quoted.sender,
      quotedMessage: quoted.message
    }
  }

  return Buffer.isBuffer(text)
    ? sock.sendFile(jid, text, "file", "", quoted, false, options)
    : sock.sendMessage(
        jid,
        {
          text,
          ...options,
          contextInfo: options.contextInfo
        },
        {}
      )
 }
  
  sock.sendPoll = async (jid, name = "", optiPoll, options = {}) => {
    if (!Array.isArray(optiPoll[0]) && typeof optiPoll[0] === "string") optiPoll = [optiPoll];
    const pollMessage = { name, options: optiPoll.map((btn) => ({ optionName: btn[0] || "" })), selectableOptionsCount: 1 };
    return sock.relayMessage(jid, { pollCreationMessage: pollMessage }, { ...options });
  };

  sock.copyNForward = async (jid, message, forwardingScore = true, options = {}) => {
    let mtype = Object.keys(message.message)[0];
    let content = generateForwardMessageContent(message, !!forwardingScore);
    let ctype = Object.keys(content)[0];
    if (forwardingScore && typeof forwardingScore === "number" && forwardingScore > 1) content[ctype].contextInfo.forwardingScore += forwardingScore;
    content[ctype].contextInfo = { ...(message.message[mtype].contextInfo || {}), ...(content[ctype].contextInfo || {}) };
    let m = generateWAMessageFromContent(jid, content, { ...options, userJid: sock.user.jid });
    await sock.relayMessage(jid, m.message, { messageId: m.key.id, additionalAttributes: { ...options } });
    return m;
  };
  sock.fakeReply = (jid, text = '', fakeJid = sock.user.jid, fakeText = '', fakeGroupJid, options) => sock.reply(jid, text, { key: { fromMe: areJidsSameUser(fakeJid, sock.user.id), participant: fakeJid, ...(fakeGroupJid ? { remoteJid: fakeGroupJid } : {}) }, message: { conversation: fakeText }, ...options });

  sock.downloadM = async (m, type, saveToFile) => {
    if (!m || !(m.url || m.directPath)) return Buffer.alloc(0);
    const stream = await downloadContentFromMessage(m, type);
    let buffer = Buffer.from([]);
    for await (const chunk of stream) buffer = Buffer.concat([buffer, chunk]);
    let filename;
    if (saveToFile) ({ filename } = await sock.getFile(buffer, true));
    return saveToFile && fs.existsSync(filename) ? filename : buffer;
  };
  sock.parseMention = (text = "") => (text.match(/@(\d{5,20})/g) || []).map(m => m.replace('@', '') + '@s.whatsapp.net');
  
  sock.getName = (jid = "", withoutContact = false) => {
    if (!jid || typeof jid !== "string") return "";
    jid = sock.decodeJid(jid);
    if (jid.endsWith("@g.us")) return new Promise(async (res) => {
      let v = sock.chats[jid] || {};
      if (!(v.name || v.subject)) v = await sock.groupMetadata(jid).catch(() => ({}));
      res(v.name || v.subject || PhoneNumber("+" + jid.replace("@s.whatsapp.net", "")).getNumber("international"));
    });
    let v = jid === "0@s.whatsapp.net" ? { jid, vname: "WhatsApp" } : areJidsSameUser(jid, sock.user.id) ? sock.user : sock.chats[jid] || {};
    return (withoutContact ? "" : v.name) || v.subject || v.vname || v.notify || v.verifiedName || PhoneNumber("+" + jid.replace("@s.whatsapp.net", "")).getNumber("international");
  };

  sock.loadMessage = (id) => Object.entries(sock.chats).find(([_, { messages }]) => messages?.[id] || Object.values(messages || {}).find(v => v.key?.id === id))?.[1].messages?.[id];
  sock.processMessageStubType = async (m) => {
    if (!m.messageStubType) return;
    const chat = sock.decodeJid(m.key.remoteJid || m.message?.senderKeyDistributionMessage?.groupId || "");
    if (!chat || chat === "status@broadcast") return;
    const emitUpdate = (up) => sock.ev.emit("groups.update", [{ id: chat, ...up }]);
    if (m.messageStubType === WAMessageStubType.REVOKE) emitUpdate({ revoke: m.messageStubParameters[0] });
    if (m.messageStubType === WAMessageStubType.GROUP_CHANGE_ICON) emitUpdate({ icon: m.messageStubParameters[0] });
    const isGroup = chat.endsWith("@g.us");
    if (!isGroup) return;
    let chats = sock.chats[chat] || (sock.chats[chat] = { id: chat });
    chats.isChats = true;
    const meta = await sock.groupMetadata(chat).catch(() => null);
    if (meta) { chats.subject = meta.subject; chats.metadata = meta; }
  };

  sock.insertAllGroup = async () => {
    const groups = await sock.groupFetchAllParticipating().catch(() => ({}));
    for (const g in groups) sock.chats[g] = { id: g, subject: groups[g].subject, isChats: true, metadata: groups[g] };
    return sock.chats;
  };
  sock.pushMessage = async (m) => {
    if (!m) return;
    if (!Array.isArray(m)) m = [m];
    for (const msg of m) {
      try {
        if (!msg) continue;
        if (msg.messageStubType && msg.messageStubType != WAMessageStubType.CIPHERTEXT) sock.processMessageStubType(msg).catch(console.error);
        const chat = sock.decodeJid(msg.key.remoteJid || msg.message?.senderKeyDistributionMessage?.groupId || "");
        if (!chat || chat === "status@broadcast") continue;
        let chats = sock.chats[chat] || (sock.chats[chat] = { id: chat, isChats: true, messages: {} });
        if (!chats.messages) chats.messages = {};
        chats.messages[msg.key.id] = JSON.parse(JSON.stringify(msg));
      } catch (e) { console.error(e); }
    }
  };
  sock.serializeM = (m) => smsg(sock, m);

  if (typeof sock.chatRead !== "function") sock.chatRead = (jid, part = sock.user.jid, id) => sock.sendReadReceipt(jid, part, [id]);
  if (typeof sock.setStatus !== "function") sock.setStatus = (s) => sock.query({ tag: "iq", attrs: { to: "s.whatsapp.net", type: "set", xmlns: "status" }, content: [{ tag: "status", attrs: {}, content: Buffer.from(s, "utf-8") }] });

  if (sock.user?.id) sock.user.jid = sock.decodeJid(sock.user.id);
  store.bind(sock);
  return sock;
}

export function smsg(conn, m, hasParent) {
  if (!m) return m;
  const M = proto.WebMessageInfo;
  try {
    m = M.create(m);
    m.conn = conn;
    let protocolMessageKey;
    if (m.message) {
      if (m.mtype == "protocolMessage" && m.msg?.key) {
        protocolMessageKey = m.msg.key;
        if (protocolMessageKey.remoteJid === "status@broadcast") {
          protocolMessageKey.remoteJid = m.chat || "";
        }
        if (
          !protocolMessageKey.participant ||
          protocolMessageKey.participant === "status_me"
        ) {
          protocolMessageKey.participant =
            typeof m.sender === "string" ? m.sender : "";
        }
        const decodedParticipant =
          conn?.decodeJid?.(protocolMessageKey.participant) || "";
        protocolMessageKey.fromMe =
          decodedParticipant === (conn?.user?.jid || "");
        if (
          !protocolMessageKey.fromMe &&
          protocolMessageKey.remoteJid === (conn?.user?.jid || "")
        ) {
          protocolMessageKey.remoteJid =
            typeof m.sender === "string" ? m.sender : "";
        }
      }
      if (m.quoted && !m.quoted.mediaMessage) {
        delete m.quoted.download;
      }
    }
    if (!m.mediaMessage) {
      delete m.download;
    }
    if (protocolMessageKey && m.mtype == "protocolMessage") {
      try {
        conn.ev.emit("message.delete", protocolMessageKey);
      } catch (e) {
        console.error("Error al emitir message.delete:", e);
      }
    }
    return m;
  } catch (e) {
    console.error("Error en smsg:", e);
    return m;
  }
}

export function serialize() {
  const MediaType = ["imageMessage", "videoMessage", "audioMessage", "stickerMessage", "documentMessage"];
  const safeEndsWith = (str, suffix) =>
    typeof str === "string" && str.endsWith(suffix);
  const safeDecodeJid = (jid, conn) => {
    try {
      if (!jid || typeof jid !== "string") return "";
      return conn?.decodeJid?.(jid) || jid;
    } catch (e) {
      console.error("Error en safeDecodeJid:", e);
      return "";
    }
  };
  const safeSplit = (str, separator) =>
    typeof str === "string" ? str.split(separator) : [];
  return Object.defineProperties(proto.WebMessageInfo.prototype, {
    conn: {
      value: undefined,
      enumerable: false,
      writable: true,
    },
    id: {
     get() {
      try {
        return this.key?.id || "";
       } catch (e) {
        console.error("Error en id getter:", e);
        return "";
       }
     },
     enumerable: true,
    },
    isBaileys: {
      get() {
       try {
        const id = this.id || "";
        return (this.fromMe &&  (id.startsWith("BAE5") || id.startsWith("3EB0") || (id.length <= 22 && id.length >= 20)));
       } catch (e) {
        console.error("Error en isBaileys getter:", e);
        return false;
       }
      },
     enumerable: true,
    },
    chat: {
    get() {
     try {
      let senderKeyDistributionMessage =
            this.message?.senderKeyDistributionMessage?.groupId;        
      let rawJid = this.key?.remoteJid || (senderKeyDistributionMessage && senderKeyDistributionMessage !== "status@broadcast") || "";  
      let remoteJidAlt = this.key?.remoteJidAlt;
    if (!rawJid.endsWith('@g.us') && rawJid !== "status@broadcast") {
    if (remoteJidAlt && remoteJidAlt.endsWith('@s.whatsapp.net')) {
     rawJid = remoteJidAlt;
    } else if (rawJid.endsWith('@lid') && remoteJidAlt) {
     rawJid = remoteJidAlt;
    } else if (rawJid.endsWith('@lid') && remoteJidAlt && remoteJidAlt.endsWith('@lid')) {
     rawJid = remoteJidAlt;
      }
     }
     return safeDecodeJid(rawJid, this.conn);
     } catch (e) {
      console.error("Error en chat getter:", e);
      return "";
      }
     },
     enumerable: true,
    },
    isGroup: {
      get() {
        try {
          return safeEndsWith(this.chat, "@g.us");
        } catch (e) {
          console.error("Error en isGroup getter:", e);
          return false;
        }
      },
      enumerable: true,
    },
    sender: {
    get() {
     try {
      if (!this.isGroup && this.key?.fromMe && this.conn?.user?.jid) { return this.conn.user.jid }
      if (this.isGroup && this.key?.fromMe && this.conn?.user?.lid) { return this.conn.user.jid }
      if (this.isGroup) {
      if (this.key?.participantAlt) { return this.key.participantAlt }
      } else {
        const remoteJidAlt = this.key?.remoteJidAlt;
       if (remoteJidAlt && (remoteJidAlt.endsWith('@s.whatsapp.net') || remoteJidAlt.endsWith('@newsletter'))) { return remoteJidAlt } 
       return remoteJidAlt;
       }
      } catch (e) {
      console.error("Error en sender getter:", e);
      return this.chat || ""; 
       }
      },
     enumerable: true,
    },
    fromMe: {
      get() {
        try {
          const userId = this.conn?.user?.jid || "";
          const sender = this.sender || "";
          return areJidsSameUser(userId, sender) || false;
        } catch (e) {
          console.error("Error en fromMe getter:", e);
          return false;
        }
      },
      enumerable: true,
    },
    mtype: {
      get() {
        try {
          if (!this.message) return "";
          const type = Object.keys(this.message);
          if (
            !["senderKeyDistributionMessage", "messageContextInfo"].includes(
              type[0],
            )
          ) {
            return type[0];
          }
          if (type.length >= 3 && type[1] !== "messageContextInfo") {
            return type[1];
          }
          return type[type.length - 1];
        } catch (e) {
          console.error("Error en mtype getter:", e);
          return "";
        }
      },
      enumerable: true,
    },
    msg: {
      get() {
        try {
          if (!this.message) return null;
          return this.message[this.mtype] || null;
        } catch (e) {
          console.error("Error en msg getter:", e);
          return null;
        }
      },
      enumerable: true,
    },
    mediaMessage: {
      get() {
        try {
          if (!this.message) return null;
          const Message =
            (this.msg?.url || this.msg?.directPath
              ? { ...this.message }
              : extractMessageContent(this.message)) || null;
          if (!Message) return null;
          const mtype = Object.keys(Message)[0];
          return MediaType.includes(mtype) ? Message : null;
        } catch (e) {
          console.error("Error en mediaMessage getter:", e);
          return null;
        }
      },
      enumerable: true,
    },
    mediaType: {
      get() {
        try {
          const message = this.mediaMessage;
          if (!message) return null;
          return Object.keys(message)[0];
        } catch (e) {
          console.error("Error en mediaType getter:", e);
          return null;
        }
      },
      enumerable: true,
    },
    quoted: {
      get() {
        try {
          const self = this;
          const msg = self.msg;
          const contextInfo = msg?.contextInfo;
          const quoted = contextInfo?.quotedMessage;
          if (!msg || !contextInfo || !quoted) return null;
          const type = Object.keys(quoted)[0];
          const q = quoted[type];
          const text = typeof q === "string" ? q : q?.text || "";
          return Object.defineProperties(
            JSON.parse(
              JSON.stringify(typeof q === "string" ? { text: q } : q || {}),
            ),
            {
              mtype: {
                get() {
                  return type;
                },
                enumerable: true,
              },
              mediaMessage: {
                get() {
                  const Message =
                    (q?.url || q?.directPath
                      ? { ...quoted }
                      : extractMessageContent(quoted)) || null;
                  if (!Message) return null;
                  const mtype = Object.keys(Message)[0];
                  return MediaType.includes(mtype) ? Message : null;
                },
                enumerable: true,
              },
              mediaType: {
                get() {
                  const message = this.mediaMessage;
                  if (!message) return null;
                  return Object.keys(message)[0];
                },
                enumerable: true,
              },
              id: {
                get() {
                  return contextInfo.stanzaId || "";
                },
                enumerable: true,
              },
              chat: {
    get() {
        const contextInfo = self.message.extendedTextMessage?.contextInfo || self.message.imageMessage?.contextInfo || 
                            self.message.videoMessage?.contextInfo || self.message.documentMessage?.contextInfo || 
                            self.message.contactMessage?.contextInfo || self.message.locationMessage?.contextInfo || 
                            self.message.liveLocationMessage?.contextInfo || self.message.viewOnceMessage?.contextInfo || 
                            self.message.reactionMessage?.contextInfo || {};
        
        const remoteJid = contextInfo.remoteJid;
        const remoteJidAlt = contextInfo.remoteJidAlt;
        
        if (remoteJid && remoteJid.endsWith('@s.whatsapp.net')) return remoteJid;
        if (remoteJidAlt && remoteJidAlt.endsWith('@s.whatsapp.net')) return remoteJidAlt;
        if (remoteJidAlt) return remoteJidAlt;
        return remoteJid || self.chat || "";
    },
    enumerable: true,
},
              isBaileys: {
                get() {
                  const userId = self.conn?.user?.jid || "";
                  const sender = this.sender || "";
                  return (
                    ((this?.fromMe || areJidsSameUser(userId, sender)) &&
                      contextInfo?.stanzaId?.startsWith?.("3EB0") &&
                      [20, 22, 12].includes(contextInfo?.stanzaId?.length)) || false
                  );
                },
                enumerable: true,
              },
              sender: {
               get() {
              try {
               if (contextInfo.participantAlt) {
                return safeDecodeJid(contextInfo.participantAlt, self.conn);
               }
               if (contextInfo.participant) {
                   const participantsList = self.conn.chats?.[self.chat]?.metadata?.participants;
                    
                   if (participantsList) {
                       const found = participantsList.find(p => p.id === contextInfo.participant || p.phoneNumber === contextInfo.participant);
                        
                       if (found && (found.phoneNumber || found.id)) {
                          return safeDecodeJid(found.phoneNumber || found.id, self.conn);
                       }
                   }
                   return safeDecodeJid(self.chat, self.conn); 
               }               
               return self.fromMe ? safeDecodeJid(self.conn?.user?.jid, self.conn) : safeDecodeJid(self.chat, self.conn);
                } catch (e) {
                 console.error("Error en quoted sender getter:", e);
                 return self.sender;
                }
               },
               enumerable: true,
              },
              fromMe: {
                get() {
                  const sender = this.sender || "";
                  const userJid = self.conn?.user?.jid || "";
                  return areJidsSameUser(sender, userJid);
                },
                enumerable: true,
              },
              text: {
                get() {
                  return (
                    text ||
                    this.caption ||
                    this.contentText ||
                    this.selectedDisplayText ||
                    ""
                  );
                },
                enumerable: true,
              },
              mentionedJid: {
  get() {
    const mentioned =
      q?.contextInfo?.mentionedJid ||
      self.getQuotedObj()?.mentionedJid ||
      [];

    return mentioned
      .map(user => {
        if (user && typeof user === 'object') {
          user = user.phoneNumber || user.id || user.lid || '';
        }

        if (typeof user !== 'string') return null;

        if (user.endsWith('@lid')) {
          return self.conn?.resolveJid?.(user, self.chat) || null;
        }

        if (/^\d+$/.test(user)) {
          return user + '@s.whatsapp.net';
        }

        return self.conn?.decodeJid?.(user) || user;
      })
      .filter(jid => jid && jid.endsWith('@s.whatsapp.net'));
  },
  enumerable: true,
},

              name: {
                get() {
                  const sender = this.sender;
                  return sender ? self.conn?.getName?.(sender) : null;
                },
                enumerable: true,
              },
              vM: {
                get() {
                  return proto.WebMessageInfo.create({
                    key: {
                      fromMe: this.fromMe,
                      remoteJid: this.chat,
                      id: this.id,
                    },
                    message: quoted,
                    ...(self.isGroup ? { participant: this.sender } : {}),
                  });
                },
                enumerable: true,
              },
              fakeObj: {
                get() {
                  return this.vM;
                },
                enumerable: true,
              },
              download: {
                value(saveToFile = false) {
                  const mtype = this.mediaType;
                  return self.conn?.downloadM?.(
                    this.mediaMessage?.[mtype],
                    mtype?.replace(/message/i, ""),
                    saveToFile,
                  );
                },
                enumerable: true,
                configurable: true,
              },
              reply: {
                value(text, chatId, options) {
                  return self.conn?.reply?.(
                    chatId ? chatId : this.chat,
                    text,
                    this.vM,
                    options,
                  );
                },
                enumerable: true,
              },
              copy: {
                value() {
                  const M = proto.WebMessageInfo;
                  return smsg(self.conn, M.create(M.toObject(this.vM)));
                },
                enumerable: true,
              },
              forward: {
                value(jid, force = false, options) {
                  return self.conn?.sendMessage?.(
                    jid,
                    {
                      forward: this.vM,
                      force,
                      ...options,
                    },
                    { ...options },
                  );
                },
                enumerable: true,
              },
              copyNForward: {
                value(jid, forceForward = false, options) {
                  return self.conn?.copyNForward?.(
                    jid,
                    this.vM,
                    forceForward,
                  );
                },
                enumerable: true,
              },
              cMod: {
                value(jid, text = "", sender = this.sender, options = {}) {
                  return self.conn?.cMod?.(jid, this.vM, text, sender, options);
                },
                enumerable: true,
              },
              delete: {
                value() {
                  return self.conn?.sendMessage?.(this.chat, {
                    delete: this.vM.key,
                  });
                },
                enumerable: true,
              },
            },
          );
        } catch (e) {
          console.error("Error en quoted getter:", e);
          return null;
        }
      },
      enumerable: true,
    },
    _text: {
      value: null,
      writable: true,
      enumerable: true,
    },
    text: {
      get() {
        try {
          const msg = this.msg;
          const text =
            (typeof msg === "string" ? msg : msg?.text) ||
            msg?.caption ||
            msg?.contentText ||
            "";
          return typeof this._text === "string"
            ? this._text
            : "" ||
                (typeof text === "string"
                  ? text
                  : text?.selectedDisplayText ||
                    text?.hydratedTemplate?.hydratedContentText ||
                    text) ||
                "";
        } catch (e) {
          console.error("Error en text getter:", e);
          return "";
        }
      },
      set(str) {
        this._text = str;
      },
      enumerable: true,
    },
    mentionedJid: {
  get() {
    try {
      let mentioned = this.msg?.contextInfo?.mentionedJid;
      if (!Array.isArray(mentioned)) mentioned = [];

      return mentioned
        .map(user => {
          if (user && typeof user === 'object') {
            user = user.phoneNumber || user.id || user.lid || '';
          }

          if (typeof user !== 'string') return null;

          if (user.endsWith('@lid')) {
            return this.conn?.resolveJid?.(user, this.chat) || null;
          }

          if (/^\d+$/.test(user)) {
            return user + '@s.whatsapp.net';
          }

          return this.conn?.decodeJid?.(user) || user;
        })
        .filter(jid => jid && jid.endsWith('@s.whatsapp.net'));
    } catch (e) {
      console.error('Error en mentionedJid getter:', e);
      return [];
    }
  },
  enumerable: true,
},

    name: {
      get() {
        try {
          if (!nullish(this.pushName) && this.pushName) return this.pushName;
          const sender = this.sender;
          return sender ? this.conn?.getName?.(sender) : "";
        } catch (e) {
          console.error("Error en name getter:", e);
          return "";
        }
      },
      enumerable: true,
    },
    download: {
      value(saveToFile = false) {
        try {
          const mtype = this.mediaType;
          return this.conn?.downloadM?.(
            this.mediaMessage?.[mtype],
            mtype?.replace(/message/i, ""),
            saveToFile,
          );
        } catch (e) {
          console.error("Error en download:", e);
          return Promise.reject(e);
        }
      },
      enumerable: true,
      configurable: true,
    },
    reply: {
      value(text, chatId, options) {
        try {
          return this.conn?.reply?.(
            chatId ? chatId : this.chat,
            text,
            this,
            options,
          );
        } catch (e) {
          console.error("Error en reply:", e);
          return Promise.reject(e);
        }
      },
      enumerable: true,
    },
    copy: {
      value() {
        try {
          const M = proto.WebMessageInfo;
          return smsg(this.conn, M.fromObject(M.toObject(this)));
        } catch (e) {
          console.error("Error en copy:", e);
          return null;
        }
      },
      enumerable: true,
    },
    forward: {
      value(jid, force = false, options = {}) {
        try {
          return this.conn?.sendMessage?.(
            jid,
            {
              forward: this,
              force,
              ...options,
            },
            { ...options },
          );
        } catch (e) {
          console.error("Error en forward:", e);
          return Promise.reject(e);
        }
      },
      enumerable: true,
    },
    copyNForward: {
      value(jid, forceForward = false, options = {}) {
        try {
          return this.conn?.copyNForward?.(jid, this, forceForward, options);
        } catch (e) {
          console.error("Error en copyNForward:", e);
          return Promise.reject(e);
        }
      },
      enumerable: true,
    },
    cMod: {
      value(jid, text = "", sender = this.sender, options = {}) {
        try {
          return this.conn?.cMod?.(jid, this, text, sender, options);
        } catch (e) {
          console.error("Error en cMod:", e);
          return Promise.reject(e);
        }
      },
      enumerable: true,
    },
    getQuotedObj: {
      value() {
        try {
          if (!this.quoted?.id) return null;
          const q = proto.WebMessageInfo.fromObject(
            this.conn?.loadMessage?.(this.quoted.id) || this.quoted.vM || {},
          );
          return smsg(this.conn, q);
        } catch (e) {
          console.error("Error en getQuotedObj:", e);
          return null;
        }
      },
      enumerable: true,
    },
    getQuotedMessage: {
      get() {
        return this.getQuotedObj;
      },
      enumerable: true,
    },
    delete: {
      value() {
        try {
          return this?.sendMessage?.(this.chat, { delete: this.key });
        } catch (e) {
          console.error("Error en delete:", e);
          return Promise.reject(e);
        }
      },
      enumerable: true,
    },
    react: {
     value(text) {
      return this.conn?.sendMessage(this.chat, { react: { text, key: this.key }})
        },
        enumerable: true
      }
  });
}
            
export function logic(check, inp, out) {
  if (inp.length !== out.length)
    throw new Error("Input and Output must have same length");
  for (const i in inp) if (util.isDeepStrictEqual(check, inp[i])) return out[i];
  return null;
}

export function protoType() {
  Buffer.prototype.toArrayBuffer = function toArrayBufferV2() {
    const ab = new ArrayBuffer(this.length);
    const view = new Uint8Array(ab);
    for (let i = 0; i < this.length; ++i) {
      view[i] = this[i];
    }
    return ab;
  };
  Buffer.prototype.toArrayBufferV2 = function toArrayBuffer() {
    return this.buffer.slice(
      this.byteOffset,
      this.byteOffset + this.byteLength,
    );
  };
  ArrayBuffer.prototype.toBuffer = function toBuffer() {
    return Buffer.from(new Uint8Array(this));
  };
  Uint8Array.prototype.getFileType =
    ArrayBuffer.prototype.getFileType =
    Buffer.prototype.getFileType =
      async function getFileType() {
        return await fileTypeFromBuffer(this);
      };
  String.prototype.isNumber = Number.prototype.isNumber = isNumber;
  String.prototype.capitalize = function capitalize() {
    return this.charAt(0).toUpperCase() + this.slice(1, this.length);
  };
  String.prototype.capitalizeV2 = function capitalizeV2() {
    const str = this.split(" ");
    return str.map((v) => v.capitalize()).join(" ");
  };
  String.prototype.decodeJid = function decodeJid() {
    if (/:\d+@/gi.test(this)) {
      const decode = jidDecode(this) || {};
      return (
        (decode.user && decode.server && decode.user + "@" + decode.server) ||
        this
      ).trim();
    } else return this.trim();
  };
  Number.prototype.toTimeString = function toTimeString() {
    const seconds = Math.floor((this / 1000) % 60);
    const minutes = Math.floor((this / (60 * 1000)) % 60);
    const hours = Math.floor((this / (60 * 60 * 1000)) % 24);
    const days = Math.floor(this / (24 * 60 * 60 * 1000));
    return (
      (days ? `${days} day(s) ` : "") +
      (hours ? `${hours} hour(s) ` : "") +
      (minutes ? `${minutes} minute(s) ` : "") +
      (seconds ? `${seconds} second(s)` : "")
    ).trim();
  };
  Number.prototype.getRandom =
    String.prototype.getRandom =
    Array.prototype.getRandom =
      getRandom;
}

function isNumber() {
  const int = parseInt(this);
  return typeof int === "number" && !isNaN(int);
}

function getRandom() {
  if (Array.isArray(this) || this instanceof String)
    return this[Math.floor(Math.random() * this.length)];
  return Math.floor(Math.random() * this);
}

function nullish(args) {
  return !(args !== null && args !== undefined);
}

const file = fileURLToPath(import.meta.url);
watchFile(file, () => {
  unwatchFile(file);
  console.log(chalk.redBright('Update \'simple.js\''));
  import(`${file}?update=${Date.now()}`);
});
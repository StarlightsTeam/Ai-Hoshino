import { useMultiFileAuthState, DisconnectReason, fetchLatestBaileysVersion } from '@whiskeysockets/baileys'
import qrcode from 'qrcode'
import fs from 'fs'
import P from 'pino'
import 'ws'
import '@hapi/boom'
import { makeWASocket } from '../lib/simple.js'

if (global.conns instanceof Array) {
  console.log()
} else {
  global.conns = []
}

let handler = async (m, { conn, args, usedPrefix, command, isOwner }) => {
let parentw = args[0] && args[0] == "plz" ? conn : await global.conn
if (!(args[0] && args[0] == 'plz' || (await global.conn).user.jid == conn.user.jid)) {
throw "Este comando solo puede ser usado en el bot principal! wa.me/" + global.conn.user.jid.split`@`[0x0] + "?text=" + usedPrefix + "serbot"
}

async function jddt() {
function randomString(length) {
var chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz'.split('')

if (!length) {
length = Math.floor(Math.random() * chars.length)
}

var str = ''
 for (var i = 0; i < length; i++) {
str += chars[Math.floor(Math.random() * chars.length)]
}
return str
}

let uniqid = randomString(10)
let dir = `./serbot/${uniqid}`
if (!fs.existsSync(dir)) {
fs.mkdirSync(dir, { recursive: true })
}
if (args[0]) {
fs.writeFileSync(`${dir}/creds.json`, Buffer.from(args[0], 'base64').toString('utf-8'))
}
const { state, saveState, saveCreds } = await useMultiFileAuthState("./serbot/" + uniqid)
let { version, isLatest } = await fetchLatestBaileysVersion()  
const connectionOptions = {
version,
printQRInTerminal: true,
auth: state,
browser: ["Ai Hoshino - MD", 'Safari', "1.0.0"],
patchMessageBeforeSending: message => {
const requiresPatch = !!(message.buttonsMessage || message.templateMessage || message.listMessage)
if (requiresPatch) {
message = {
viewOnceMessage: {
message: {
messageContextInfo: {
deviceListMetadataVersion: 2,
deviceListMetadata: {}
},
...message
}}
}
}
return message
},
logger: P({
level: "silent"
})
}
    
let conn = makeWASocket(connectionOptions)
conn.isInit = false
let isInit = true

async function connectionUpdate(update) {
const { connection, lastDisconnect, isNewLogin, qr } = update
if (isNewLogin) {
conn.isInit = true
}
if (qr) {
let sendQR = await parentw.sendFile(m.chat, await qrcode.toDataURL(qr, { scale: 8 }), "qrcode.png", '*Escanea este codigo QR para convertirte en un Sub Bot*\n\n*Pasos para escanear:*\n1.- Haga click en los 3 puntos ubicados en la esquina superior derecha\n2.- Toque dispositivos vinculados\n3.- Escanea este QR\n\n*Nota:* Este código QR expira en 30 segundos', m) 
setTimeout(() => {
parentw.sendMessage(m.chat, { delete: sendQR.key })
}, 30000)
}
const code = lastDisconnect?.error?.output?.statusCode || lastDisconnect?.error?.output?.payload?.statusCode
if (code && code !== DisconnectReason.loggedOut && conn?.['ws']["socket"] == null) {
let i = global.conns.indexOf(conn)
if (i < 0) {
return console.log(await creloadHandler(true)['catch'](console.error))
}
        delete global.conns[i]
        global.conns.splice(i, 1)
        if (code !== DisconnectReason.connectionClosed) {
          parentw.sendMessage(conn.user.jid, { text: "Conexión perdida.. envie el mensaje que se envio al numero donde escaneo el codigo qr" }, { quoted: m })
        } else {
        }
      }
      if (global.db.data == null) {
        loadDatabase()
      }
      if (connection == "open") {
        conn.isInit = true
        global.conns.push(conn)
        await parentw.sendMessage(m.chat, {text : args[0] ? 'Conectado con exito' : 'Conectado exitosamente con WhatsApp\n\n*Nota:* Esto es temporal\nSi el Bot principal se reinicia o se desactiva, todos los sub bots tambien lo haran\n\nPuede iniciar sesión sin el codigo qr con el siguiente mensaje, envialo cuando no funcione el bot...\n\nEl número del bot puede cambiar, guarda este enlace:\nhttps://instabio.cc/MikuTeam' }, { quoted: m })
        await sleep(5000)
        if (args[0]) {
          return
        }
        await parentw.sendMessage(conn.user.jid, { text: "La siguiente vez que se conecte envía el siguiente mensaje para iniciar sesión sin escanear otro código *QR*" }, { quoted: m })
        parentw.sendMessage(conn.user.jid, { text: usedPrefix + command + " " + Buffer.from(fs.readFileSync("./serbot/" + uniqid + '/creds.json'), 'utf-8').toString('base64')
        }, { quoted: m })
      }
    }
    setInterval(async () => {
      if (!conn.user) {
        try {
          conn.ws.close()
        } catch {}
        conn.ev.removeAllListeners()
        let i = global.conns.indexOf(conn)
        if (i < 0) {
          return
        }
        delete global.conns[i]
        global.conns.splice(i, 1)
      }
    }, 60000)

    let handler = await import("../handler.js")
    
    let creloadHandler = async function (restatConn) {
      try {
       const Handler = await import(`../handler.js?update=${Date.now()}`).catch(console.error)
        if (Object.keys(Handler || {}).length) {
          handler = Handler
        }
      } catch (e) {
        console.error(e)
      }
      if (restatConn) {
        try {
          conn.ws.close()
        } catch {}
        conn.ev.removeAllListeners()
        conn = makeWASocket(connectionOptions)
        isInit = true
      }
      if (!isInit) {
        conn.ev.off("messages.upsert", conn.handler)
        conn.ev.off("group-participants.update", conn.participantsUpdate)
        conn.ev.off("groups.update", conn.groupsUpdate)
        conn.ev.off('message.delete', conn.onDelete)
        conn.ev.off("call", conn.onCall)
        conn.ev.off("connection.update", conn.connectionUpdate)
        conn.ev.off('creds.update', conn.credsUpdate)
      }
      conn.welcome = global.conn.welcome + ''
      conn.bye = global.conn.bye + ''
      conn.spromote = global.conn.spromote + ''
      conn.sdemote = global.conn.sdemote + ''
      conn.handler = handler.handler.bind(conn)
      conn.participantsUpdate = handler.participantsUpdate.bind(conn)
      conn.groupsUpdate = handler.groupsUpdate.bind(conn)
      conn.onDelete = handler.deleteUpdate.bind(conn)
      conn.connectionUpdate = connectionUpdate.bind(conn)
      conn.credsUpdate = saveCreds.bind(conn, true)
      conn.ev.on("messages.upsert", conn.handler)
      conn.ev.on("group-participants.update", conn.participantsUpdate)
      conn.ev.on('groups.update', conn.groupsUpdate)
      conn.ev.on("message.delete", conn.onDelete)
      conn.ev.on("connection.update", conn.connectionUpdate)
      conn.ev.on("creds.update", conn.credsUpdate)
      isInit = false
      return true
    }
    creloadHandler(false)
  }
  jddt()
}

handler.help = ["serbot"]
handler.tags = ["serbot"]
handler.command = ['serbot', 'jadibot']

export default handler

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms))
}
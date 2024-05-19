import { DisconnectReason, useMultiFileAuthState, fetchLatestBaileysVersion, makeCacheableSignalKeyStore, jidNormalizedUser } from '@whiskeysockets/baileys'
import qrcode from 'qrcode'
import fs from 'fs'
import pino from 'pino'
import crypto from 'crypto'
import NodeCache from 'node-cache'
import { makeWASocket } from '../lib/simple.js'

if (!Array.isArray(global.conns)) {
  global.conns = []
}

let handler = async (m, { conn: sumi, args, usedPrefix, command }) => {

  async function serbot() {
    let serbotFolder = crypto.randomBytes(10).toString('hex').slice(0, 8)
    let folderSub = `./serbot/${serbotFolder}`
    if (!fs.existsSync(folderSub)) {
      fs.mkdirSync(folderSub, { recursive: true })
    }
    if (args[0]) {
      fs.writeFileSync(`${folderSub}/creds.json`, Buffer.from(args[0], 'base64').toString('utf-8'))
    }

    const { state, saveCreds } = await useMultiFileAuthState(folderSub)
    const msgRetryCounterCache = new NodeCache()
    const { version } = await fetchLatestBaileysVersion()

    const connectionOptions = {
      logger: pino({ level: 'silent' }),
      printQRInTerminal: true,
      browser: ['Sumi Sakurasawa', 'Safari', '2.0.0'],
      auth: {
        creds: state.creds,
        keys: makeCacheableSignalKeyStore(state.keys, pino({ level: "fatal" }).child({ level: "fatal" })),
      },
      markOnlineOnConnect: true,
      generateHighQualityLinkPreview: true,
      getMessage: async (clave) => {
        let jid = jidNormalizedUser(clave.remoteJid)
        let msg = await store.loadMessage(jid, clave.id)
        return msg?.message || ""
      },
      msgRetryCounterCache,
      version
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
        let txt = '`–  S E R B O T  -  S U B B O T`\n\n'
            txt += `┌  ✩  *Escanea este QR para ser en un Sub Bot*\n`
            txt += `│  ✩  Pasos para escanear\n`
            txt += `│  ✩  *1* : Haga click en los 3 puntos\n`
            txt += `│  ✩  *2* : Toque dispositivos vinculados\n`
            txt += `└  ✩  *3* : Escanea este QR`
        await sumi.sendFile(m.chat, await qrcode.toDataURL(qr, { scale: 8 }), "qrcode.png", txt, m)
      }
      const code = lastDisconnect?.error?.output?.statusCode || lastDisconnect?.error?.output?.payload?.statusCode
      if (code && code !== DisconnectReason.loggedOut && conn?.ws.socket == null) {
        let i = global.conns.indexOf(conn)
        if (i < 0) {
          return console.log(await creloadHandler(true).catch(console.error))
        }
        delete global.conns[i]
        global.conns.splice(i, 1)
        if (code !== DisconnectReason.connectionClosed) {
          await sumi.reply(conn.user.jid, "Conexión perdida.. envie el mensaje que se envio al numero donde escaneo el codigo qr", m)
        }
      }
      if (global.db.data == null) {
        loadDatabase()
      }
      if (connection == "open") {
        conn.isInit = true
        global.conns.push(conn)
        await sumi.reply(m.chat, args[0] ? 'Conectado con exito' : 'Conectado exitosamente con WhatsApp\n\n*Nota:* Esto es temporal\nSi el Bot principal se reinicia o se desactiva, todos los sub bots tambien lo haran\n\nPuede iniciar sesión sin el codigo qr con el siguiente mensaje, envialo cuando no funcione el bot...\n\nEl número del bot puede cambiar, guarda este enlace:\nhttps://whatsapp.com/channel/0029VaBfsIwGk1FyaqFcK91S', m)
        await sleep(5000)
        if (args[0]) {
          return
        }
        await sumi.reply(conn.user.jid, "La siguiente vez que se conecte envía el siguiente mensaje para iniciar sesión sin escanear otro código *QR*", m)
        await sumi.reply(conn.user.jid, usedPrefix + command + " " + Buffer.from(fs.readFileSync(`${folderSub}/creds.json`), 'utf-8').toString('base64'), m)
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
        conn.ev.off("connection.update", conn.connectionUpdate)
        conn.ev.off('creds.update', conn.credsUpdate)
      }
      conn.handler = handler.handler.bind(conn)
      conn.connectionUpdate = connectionUpdate.bind(conn)
      conn.credsUpdate = saveCreds.bind(conn, true)

      conn.ev.on("messages.upsert", conn.handler)
      conn.ev.on("connection.update", conn.connectionUpdate)
      conn.ev.on("creds.update", conn.credsUpdate)
      isInit = false
      return true
    }
    creloadHandler(false)
  }
  serbot()
}

handler.help = ["serbot"]
handler.tags = ["serbot"]
handler.command = ['serbot', 'qr', 'jadibot']

export default handler

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms))
}
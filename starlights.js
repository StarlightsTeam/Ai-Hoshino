process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = '1'
import './settings.js'
import {createRequire} from 'module'
import path, {join} from 'path'
import {fileURLToPath, pathToFileURL} from 'url'
import {platform} from 'process'
import * as ws from 'ws'
import {readdirSync, statSync, unlinkSync, existsSync, readFileSync, rmSync, watch, copyFileSync, mkdirSync, renameSync} from 'fs'
import fs from 'fs'
import yargs from 'yargs';
import {spawn} from 'child_process'
import lodash from 'lodash'
import chalk from 'chalk'
import syntaxerror from 'syntax-error'
import {tmpdir} from 'os'
import {format} from 'util'
import P from 'pino'
import pino from 'pino'
import Pino from 'pino'
import {Boom} from '@hapi/boom'
import {makeWASocket, protoType, serialize} from './lib/simple.js'
import {Low, JSONFile} from 'lowdb'
import store from './lib/store.js'
const {proto} = (await import('@whiskeysockets/baileys')).default
const {DisconnectReason, useMultiFileAuthState, MessageRetryMap, fetchLatestBaileysVersion, makeCacheableSignalKeyStore, jidNormalizedUser, PHONENUMBER_MCC} = await import('@whiskeysockets/baileys')
import readline from 'readline'
import NodeCache from 'node-cache'
const {CONNECTING} = ws
const {chain} = lodash
const PORT = process.env.PORT || process.env.SERVER_PORT || 3000

protoType()
serialize()

global.__filename = function filename(pathURL = import.meta.url, rmPrefix = platform !== 'win32') {
  return rmPrefix ? /file:\/\/\//.test(pathURL) ? fileURLToPath(pathURL) : pathURL : pathToFileURL(pathURL).toString();
}; global.__dirname = function dirname(pathURL) {
  return path.dirname(global.__filename(pathURL, true))
}; global.__require = function require(dir = import.meta.url) {
  return createRequire(dir)
}

global.API = (name, path = '/', query = {}, apikeyqueryname) => (name in global.APIs ? global.APIs[name] : name) + path + (query || apikeyqueryname ? '?' + new URLSearchParams(Object.entries({...query, ...(apikeyqueryname ? {[apikeyqueryname]: global.APIKeys[name in global.APIs ? global.APIs[name] : name]} : {})})) : '');

global.timestamp = {start: new Date}

const __dirname = global.__dirname(import.meta.url)

global.opts = new Object(yargs(process.argv.slice(2)).exitProcess(false).parse())
global.prefix = new RegExp('^[' + (opts['prefix'] || '‎z/#$%.\\-').replace(/[|\\{}()[\]^$+*?.\-\^]/g, '\\$&') + ']')

global.db = new Low(new JSONFile(`storage/databases/database.json`))

global.DATABASE = global.db 
global.loadDatabase = async function loadDatabase() {
  if (global.db.READ) return
  
  global.db.READ = true
  await global.db.read().catch(console.error)
  global.db.READ = false

  global.db.data = {
    users: {},
    chats: {},
    stats: {},
    msgs: {},
    sticker: {},
    settings: {},
    ...(global.db.data || {})
  }
  
  global.db.chain = chain(global.db.data)
}

await global.loadDatabase()

setInterval(async () => {
    if (global.db.data) await global.db.write()
}, 30 * 1000)

const {state, saveState, saveCreds } = await useMultiFileAuthState('./sessions')

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
})

const question = (texto) => new Promise((resolver) => rl.question(texto, resolver))

const msgRetryCounterCache = new NodeCache()
const { version } = await fetchLatestBaileysVersion()

console.info = () => {}

const connectionOptions = {
  version,
  logger: pino({ level: 'silent' }),
  printQRInTerminal: false,
  browser: ['Mac OS', 'chrome', '121.0.6167.159'],
  auth: {
    creds: state.creds,
    keys: makeCacheableSignalKeyStore(
      state.keys,
      pino({ level: 'silent' })
    )
  },
  msgRetryCounterCache,
  generateHighQualityLinkPreview: true,
  getMessage: async () => null,
  markOnlineOnConnect: true,
  syncFullHistory: false,
  connectTimeoutMs: 60000,
  defaultQueryTimeoutMs: 60000,
  keepAliveIntervalMs: 30000,
  retryRequestDelayMs: 250
}

global.conn = makeWASocket(connectionOptions)

conn.ev.on('creds.update', saveCreds)

if (!conn.authState.creds.registered) {
  let phoneNumber = await question(
    chalk.blue('Ingresa el número de WhatsApp en el cual estará la Bot\n')
  )

  phoneNumber = phoneNumber.replace(/\D/g, '')

  if (phoneNumber.startsWith('52') && phoneNumber.length === 12) {
    phoneNumber = `521${phoneNumber.slice(2)}`
  } else if (phoneNumber.startsWith('52')) {
    phoneNumber = `521${phoneNumber.slice(2)}`
  } else if (phoneNumber.startsWith('0')) {
    phoneNumber = phoneNumber.replace(/^0/, '')
  }

  if (conn.requestPairingCode) {
    let code = await conn.requestPairingCode(phoneNumber, 'STARTEAM')
    code = code?.match(/.{1,4}/g)?.join("-") || code
    console.log(chalk.cyan('Su código es:', code))
  }
}

conn.isInit = false
conn.well = false

async function connectionUpdate(update) {
  const {connection, lastDisconnect, isNewLogin} = update

  global.stopped = connection

  if (isNewLogin) conn.isInit = true

  const reason = new Boom(lastDisconnect?.error)?.output?.statusCode

  if (connection === 'close') {
    console.log(chalk.red('Conexión cerrada:'), reason)

    if (reason === DisconnectReason.loggedOut) {
      console.log(chalk.red('Sesión cerrada, elimina la carpeta sessions y vuelve a vincular.'))
    } else {
      console.log(chalk.yellow('Reconectando...'))

      try {
        await global.reloadHandler(true)
      } catch (e) {
        console.error(e)
      }
    }
  }

  if (global.db.data == null) loadDatabase()

  if (connection === 'open') {
    console.log(chalk.yellow('Conectado correctamente.'))

    try {
      await conn.groupAcceptInvite(`IbavA5kMSr4GJljeeSyZnJ`)
    } catch {}
  }
}

setInterval(() => {
  try {
    if (global.conn?.ws?.readyState === 1) {
      global.conn.sendPresenceUpdate('available')
    }
  } catch {}
}, 30000)

process.on('uncaughtException', console.error)

let isInit = true
let handler = await import('./handler.js')

global.reloadHandler = async function(restatConn) {
  try {
    const Handler = await import(`./handler.js?update=${Date.now()}`).catch(console.error)

    if (Object.keys(Handler || {}).length) handler = Handler
  } catch (e) {
    console.error(e)
  }

  if (restatConn) {
    const oldChats = global.conn.chats || {}

    try {
      global.conn.ws.close()
    } catch {}

    try {
      conn.ev.removeAllListeners()
    } catch {}

    global.conn = makeWASocket({
      ...connectionOptions,
      chats: oldChats
    })

    conn.ev.on('creds.update', saveCreds)

    isInit = true
  }

  if (!isInit) {
    conn.ev.off('messages.upsert', conn.handler)
    //conn.ev.off('group-participants.update', conn.participantsUpdate)
    conn.ev.off('connection.update', conn.connectionUpdate)
  }

  conn.handler = handler.handler.bind(global.conn)
  //conn.participantsUpdate = handler.participantsUpdate.bind(global.conn)
  conn.connectionUpdate = connectionUpdate.bind(global.conn)

  const currentDateTime = new Date()
  const messageDateTime = new Date(conn.ev)

  if (currentDateTime >= messageDateTime) {
    const chats = Object.entries(conn.chats)
      .filter(([jid, chat]) => !jid.endsWith('@g.us') && chat.isChats)
      .map((v) => v[0])
  } else {
    const chats = Object.entries(conn.chats)
      .filter(([jid, chat]) => !jid.endsWith('@g.us') && chat.isChats)
      .map((v) => v[0])
  }

  conn.ev.on('messages.upsert', conn.handler)
  //conn.ev.on('group-participants.update', conn.participantsUpdate)
  conn.ev.on('connection.update', conn.connectionUpdate)

  isInit = false

  return true
}

const pluginFolder = global.__dirname(join(__dirname, './plugins/index'))
const pluginFilter = (filename) => /\.js$/.test(filename)

global.plugins = {}

async function filesInit() {
  for (const filename of readdirSync(pluginFolder).filter(pluginFilter)) {
    try {
      const file = global.__filename(join(pluginFolder, filename))
      const module = await import(file)
      global.plugins[filename] = module.default || module
    } catch (e) {
      conn.logger.error(e)
      delete global.plugins[filename]
    }
  }
}

filesInit()
  .then((_) => Object.keys(global.plugins))
  .catch(console.error)

global.reload = async (_ev, filename) => {
  if (pluginFilter(filename)) {
    const dir = global.__filename(join(pluginFolder, filename), true)

    if (filename in global.plugins) {
      if (existsSync(dir)) conn.logger.info(` updated plugin - '${filename}'`)
      else {
        conn.logger.warn(`deleted plugin - '${filename}'`)
        return delete global.plugins[filename]
      }
    } else conn.logger.info(`new plugin - '${filename}'`)

    const err = syntaxerror(readFileSync(dir), filename, {
      sourceType: 'module',
      allowAwaitOutsideFunction: true,
    })

    if (err) {
      conn.logger.error(`syntax error while loading '${filename}'\n${format(err)}`)
    } else {
      try {
        const module = (
          await import(`${global.__filename(dir)}?update=${Date.now()}`)
        )

        global.plugins[filename] = module.default || module
      } catch (e) {
        conn.logger.error(`error require plugin '${filename}\n${format(e)}'`)
      } finally {
        global.plugins = Object.fromEntries(
          Object.entries(global.plugins)
            .sort(([a], [b]) => a.localeCompare(b))
        )
      }
    }
  }
}

Object.freeze(global.reload)

watch(pluginFolder, global.reload)

await global.reloadHandler()
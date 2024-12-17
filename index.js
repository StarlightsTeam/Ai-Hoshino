process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = '1'
import './settings.js'
import {createRequire} from 'module'
import path, {join, dirname} from 'path'
import { setupMaster, fork } from 'cluster'
import {fileURLToPath, pathToFileURL} from 'url'
import {platform} from 'process'
import * as ws from 'ws'
import {readdirSync, statSync, unlinkSync, existsSync, readFileSync, rmSync, watch, watchFile, unwatchFile, promises as fsPromises} from 'fs'
import yargs from 'yargs'
import cfonts from 'cfonts'
import {spawn} from 'child_process'
import lodash from 'lodash'
import chalk from 'chalk'
import syntaxerror from 'syntax-error'
import {tmpdir} from 'os'
import {format} from 'util'
import P from 'pino'
import pino from 'pino'
import {Boom} from '@hapi/boom'
import Pino from 'pino'
import {makeWASocket, protoType, serialize} from './lib/simple.js'
import {Low, JSONFile} from 'lowdb'
import store from './lib/store.js'
const { DisconnectReason, useMultiFileAuthState, MessageRetryMap, fetchLatestBaileysVersion, Browsers, makeCacheableSignalKeyStore, jidNormalizedUser, PHONENUMBER_MCC } = await import('@whiskeysockets/baileys')
import readline, { createInterface } from 'readline'
import NodeCache from 'node-cache'

let __dirname = dirname(fileURLToPath(import.meta.url))
let require = createRequire(__dirname)
let { say } = cfonts

say('Ai\nHoshino', {
  font: 'chrome',
  align: 'center',
  gradient: ['red', 'magenta']
})

say('Simple WhatsApp Bot\nMulti Device', {
  font: 'console',
  align: 'center',
  gradient: ['red', 'magenta']
})

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

global.opts = new Object(yargs(process.argv.slice(2)).exitProcess(false).parse())
global.prefix = new RegExp('^[' + (opts['prefix'] || '‎z/#$%.\\-').replace(/[|\\{}()[\]^$+*?.\-\^]/g, '\\$&') + ']')

global.db = new Low(new JSONFile(`storage/databases/database.json`))

global.DATABASE = global.db 
global.loadDatabase = async function loadDatabase() {
  if (global.db.READ) return new Promise((resolve) => setInterval(async function () {
    if (!global.db.READ) {
      clearInterval(this)
      resolve(global.db.data == null ? global.loadDatabase() : global.db.data)
    }
  }, 1 * 1000))
  if (global.db.data !== null) return
  global.db.READ = true
  await global.db.read().catch(console.error)
  global.db.READ = null
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
loadDatabase()

global.authFile = `sessions`
const { state, saveCreds } = await useMultiFileAuthState(global.authFile)

const { version } = await fetchLatestBaileysVersion()

const rl = readline.createInterface({ input: process.stdin, output: process.stdout })
const question = (texto) => new Promise((resolver) => rl.question(texto, resolver))

const filterStrings = [
"Q2xvc2luZyBzdGFsZSBvcGVu",
"Q2xvc2luZyBvcGVuIHNlc3Npb24=",
"RmFpbGVkIHRvIGRlY3J5cHQ=",
"U2Vzc2lvbiBlcnJvcg==",
"RXJyb3I6IEJhZCBNQUM=",
"RGVjcnlwdGVkIG1lc3NhZ2U="
]

console.info = () => {} 
console.debug = () => {} 
['log', 'warn', 'error'].forEach(methodName => redefineConsoleMethod(methodName, filterStrings))

const logger = pino({
  timestamp: () => `,"time":"${new Date().toJSON()}"`,
}).child({ class: "client" })
logger.level = "fatal"

  const connectionOptions = {
    version: [2, 3000, 1015901307],
    logger,
    printQRInTerminal: false,
    auth: {
      creds: state.creds,
      keys: makeCacheableSignalKeyStore(state.keys, logger),
    },
    browser: Browsers.ubuntu("Chrome"),
    markOnlineOnclientect: false,
    generateHighQualityLinkPreview: true,
    syncFullHistory: true,
    retryRequestDelayMs: 10,
    transactionOpts: { maxCommitRetries: 10, delayBetweenTriesMs: 10 },
    defaultQueryTimeoutMs: undefined,
    maxMsgRetryCount: 15,
    appStateMacVerification: {
      patch: false,
      snapshot: false,
    },
    getMessage: async (key) => {
      const jid = jidNormalizedUser(key.remoteJid)
      const msg = await store.loadMessage(jid, key.id)

      return msg?.message || ""
    },
  }

global.conn = makeWASocket(connectionOptions)

if (!conn.authState.creds.registered) {
  const phoneNumber = await question(chalk.blue('Ingresa el número de WhatsApp en el cual estará la Bot\n'))
  
  if (conn.requestPairingCode) {
    let code = await conn.requestPairingCode(phoneNumber)
    code = code?.match(/.{1,4}/g)?.join("-") || code;
    console.log(chalk.cyan(`Su código es:`, code))
  } else {
  }
}

conn.isInit = false
conn.well = false

if (!opts['test']) {
  if (global.db) {
    setInterval(async () => {
      if (global.db.data) await global.db.write();
      if (opts['autocleartmp'] && (global.support || {}).find) (tmp = [os.tmpdir(), 'tmp', 'serbot'], tmp.forEach((filename) => cp.spawn('find', [filename, '-amin', '3', '-type', 'f', '-delete'])))
    }, 30 * 1000)
  }
}

async function clearTmp() {
  const tmp = [tmpdir(), join(__dirname, './tmp')]
  const filename = []
  tmp.forEach(dirname => readdirSync(dirname).forEach(file => filename.push(join(dirname, file))))


  return filename.map(file => {
    const stats = statSync(file)
    if (stats.isFile() && (Date.now() - stats.mtimeMs >= 1000 * 60 * 1)) return unlinkSync(file)
    return false
  })
}

setInterval(async () => {
	await clearTmp()
	console.log(chalk.cyan(`Se limpio la carpeta tmp`))
}, 60000)


function purgeSession() {
let prekey = []
let directorio = readdirSync("./sessions")
let filesFolderPreKeys = directorio.filter(file => {
return file.startsWith('pre-key-')
})
prekey = [...prekey, ...filesFolderPreKeys]
filesFolderPreKeys.forEach(files => {
unlinkSync(`./sessions/${files}`)
})
}

function redefineConsoleMethod(methodName, filterStrings) {
const originalConsoleMethod = console[methodName]
console[methodName] = function() {
const message = arguments[0]
if (typeof message === 'string' && filterStrings.some(filterString => message.includes(atob(filterString)))) {
arguments[0] = ""
}
originalConsoleMethod.apply(console, arguments)
}}

function purgeSessionSB() {
try {
let listaDirectorios = readdirSync('./serbot/');
let SBprekey = []
listaDirectorios.forEach(directorio => {
if (statSync(`./serbot/${directorio}`).isDirectory()) {
let DSBPreKeys = readdirSync(`./serbot/${directorio}`).filter(fileInDir => {
return fileInDir.startsWith('pre-key-')
})
SBprekey = [...SBprekey, ...DSBPreKeys]
DSBPreKeys.forEach(fileInDir => {
unlinkSync(`./serbot/${directorio}/${fileInDir}`)
})
}
})
if (SBprekey.length === 0) return null
} catch (err) {
}}

function purgeOldFiles() {
const directories = ['./sessions/', './serbot/']
const oneHourAgo = Date.now() - (60 * 60 * 1000)
directories.forEach(dir => {
readdirSync(dir, (err, files) => {
if (err) throw err
files.forEach(file => {
const filePath = path.join(dir, file)
stat(filePath, (err, stats) => {
if (err) throw err;
if (stats.isFile() && stats.mtimeMs < oneHourAgo && file !== 'creds.json') { 
unlinkSync(filePath, err => {  
if (err) throw err
})
} else {  
} }) }) }) })
}

async function connectionUpdate(update) {
  const {connection, lastDisconnect, isNewLogin} = update;
  global.stopped = connection;
  if (isNewLogin) conn.isInit = true;
  const code = lastDisconnect?.error?.output?.statusCode || lastDisconnect?.error?.output?.payload?.statusCode;
  if (code && code !== DisconnectReason.loggedOut && conn?.ws.socket == null) {
    await global.reloadHandler(true).catch(console.error);
    global.timestamp.connect = new Date;
  }
  if (global.db.data == null) loadDatabase()
  if (connection == 'open') {
    console.log(chalk.yellow('Conectado correctamente.'))
  }
let reason = new Boom(lastDisconnect?.error)?.output?.statusCode;
if (reason == 405) {
await fs.unlinkSync("./sessions/" + "creds.json")
console.log(chalk.bold.redBright(`Conexión replazada, Por favor espere un momento me voy a reiniciar...\nSi aparecen error vuelve a iniciar con : npm start`)) 
process.send('reset')}
if (connection === 'close') {
    if (reason === DisconnectReason.badSession) {
        conn.logger.error(`Sesión incorrecta, por favor elimina la carpeta ${global.authFile} y escanea nuevamente.`)
    } else if (reason === DisconnectReason.connectionClosed) {
        conn.logger.warn(`Conexión cerrada, reconectando...`)
        await global.reloadHandler(true).catch(console.error)
    } else if (reason === DisconnectReason.connectionLost) {
        conn.logger.warn(`Conexión perdida con el servidor, reconectando...`)
        await global.reloadHandler(true).catch(console.error)
    } else if (reason === DisconnectReason.connectionReplaced) {
        conn.logger.error(`Conexión reemplazada, se ha abierto otra nueva sesión. Por favor, cierra la sesión actual primero.`)
    } else if (reason === DisconnectReason.loggedOut) {
        conn.logger.error(`Conexion cerrada, por favor elimina la carpeta ${global.authFile} y escanea nuevamente.`)
    } else if (reason === DisconnectReason.restartRequired) {
        conn.logger.info(`Reinicio necesario, reinicie el servidor si presenta algún problema.`)
        await global.reloadHandler(true).catch(console.error)
    } else if (reason === DisconnectReason.timedOut) {
        conn.logger.warn(`Tiempo de conexión agotado, reconectando...`)
        await global.reloadHandler(true).catch(console.error)
    } else {
        conn.logger.warn(`Razón de desconexión desconocida. ${reason || ''}: ${connection || ''}`)
        await global.reloadHandler(true).catch(console.error)
    }
}
}

process.on('uncaughtException', console.error)

let isInit = true;
let handler = await import('./system/handler.js')
global.reloadHandler = async function(restatConn) {
  try {
    const Handler = await import(`./system/handler.js?update=${Date.now()}`).catch(console.error);
    if (Object.keys(Handler || {}).length) handler = Handler
  } catch (e) {
    console.error(e);
  }
  if (restatConn) {
    const oldChats = global.conn.chats
    try {
      global.conn.ws.close()
    } catch { }
    conn.ev.removeAllListeners()
    global.conn = makeWASocket(connectionOptions, {chats: oldChats})
    isInit = true
  }
  if (!isInit) {
    conn.ev.off('messages.upsert', conn.handler)
    conn.ev.off('connection.update', conn.connectionUpdate)
    conn.ev.off('creds.update', conn.credsUpdate)
  }

  conn.handler = handler.handler.bind(global.conn)
  conn.connectionUpdate = connectionUpdate.bind(global.conn)
  conn.credsUpdate = saveCreds.bind(global.conn, true)

  const currentDateTime = new Date()
  const messageDateTime = new Date(conn.ev)
  if (currentDateTime >= messageDateTime) {
    const chats = Object.entries(conn.chats).filter(([jid, chat]) => !jid.endsWith('@g.us') && chat.isChats).map((v) => v[0])
  } else {
    const chats = Object.entries(conn.chats).filter(([jid, chat]) => !jid.endsWith('@g.us') && chat.isChats).map((v) => v[0])
  }

  conn.ev.on('messages.upsert', conn.handler)
  conn.ev.on('connection.update', conn.connectionUpdate)
  conn.ev.on('creds.update', conn.credsUpdate)
  isInit = false
  return true
};

const pluginFolder = global.__dirname(join(__dirname, './plugins/index'))
const pluginFilter = filename => /\.js$/.test(filename)
global.plugins = {}
async function filesInit() {
  for (let filename of readdirSync(pluginFolder).filter(pluginFilter)) {
    try {
      let file = global.__filename(join(pluginFolder, filename))
      const module = await import(file)
      global.plugins[filename] = module.default || module
    } catch (e) {
      conn.logger.error(e)
      delete global.plugins[filename]
    }
  }
}
filesInit().then(_ => console.log(Object.keys(global.plugins))).catch(console.error)

global.reload = async (_ev, filename) => {
  if (pluginFilter(filename)) {
    const dir = global.__filename(join(pluginFolder, filename), true);
    if (filename in global.plugins) {
      if (existsSync(dir)) conn.logger.info(` updated plugin - '${filename}'`)
      else {
        conn.logger.warn(`deleted plugin - '${filename}'`)
        return delete global.plugins[filename]
      }
    } else conn.logger.info(`new plugin - '${filename}'`);
    const err = syntaxerror(readFileSync(dir), filename, {
      sourceType: 'module',
      allowAwaitOutsideFunction: true,
    });
    if (err) conn.logger.error(`syntax error while loading '${filename}'\n${format(err)}`)
    else {
      try {
        const module = (await import(`${global.__filename(dir)}?update=${Date.now()}`));
        global.plugins[filename] = module.default || module;
      } catch (e) {
        conn.logger.error(`error require plugin '${filename}\n${format(e)}'`)
      } finally {
        global.plugins = Object.fromEntries(Object.entries(global.plugins).sort(([a], [b]) => a.localeCompare(b)))
      }
    }
  }
}
Object.freeze(global.reload)
watch(pluginFolder, global.reload)
await global.reloadHandler()
async function _quickTest() {
  const test = await Promise.all([
    spawn('ffmpeg'),
    spawn('ffprobe'),
    spawn('ffmpeg', ['-hide_banner', '-loglevel', 'error', '-filter_complex', 'color', '-frames:v', '1', '-f', 'webp', '-']),
    spawn('convert'),
    spawn('magick'),
    spawn('gm'),
    spawn('find', ['--version']),
  ].map((p) => {
    return Promise.race([
      new Promise((resolve) => {
        p.on('close', (code) => {
          resolve(code !== 127);
        });
      }),
      new Promise((resolve) => {
        p.on('error', (_) => resolve(false));
      })]);
  }));
  const [ffmpeg, ffprobe, ffmpegWebp, convert, magick, gm, find] = test;
  const s = global.support = {ffmpeg, ffprobe, ffmpegWebp, convert, magick, gm, find};
  Object.freeze(global.support);
}
setInterval(async () => {
  if (stopped === 'close' || !conn || !conn.user) return
  const a = await clearTmp()
}, 180000)
setInterval(async () => {
  if (stopped === 'close' || !conn || !conn.user) return
  await purgeSession()
}, 1000 * 60 * 60);
setInterval(async () => {
  if (stopped === 'close' || !conn || !conn.user) return
  await purgeSessionSB()
}, 1000 * 60 * 60);
setInterval(async () => {
  if (stopped === 'close' || !conn || !conn.user) return
  await purgeOldFiles()
}, 1000 * 60 * 60);
_quickTest().catch(console.error)

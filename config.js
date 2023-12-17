import { watchFile, unwatchFile } from "fs"
import chalk from "chalk"
import { fileURLToPath } from "url"
import fs from "fs"
import cheerio from "cheerio"
import fetch from "node-fetch"
import axios from "axios"
import moment from "moment-timezone"
 
//⊱ ━━━━.⋅ Añada los numeros a ser Propietario/a ⋅.━━━ ⊰  

global.owner = [
  ['5218132588591', 'おDanịel.xyz⁩', true],
  ['5218139760662'],
  ['5218261009198'],
  ['50662333781']
] //Numeros de owner 

//━━━━━━━━━━━ ฅ^•ﻌ•^ฅ ━━━━━━━━━━━

global.mods = []
global.prems = []

//━━━━━━━━━━━ ฅ^•ﻌ•^ฅ ━━━━━━━━━━━

global.packname = ''
global.author = '{\n "bot": {\n   "name": "Ai Hoshino",\n     "author": "おDaniel",\n   "status_bot": "active"\n }\n}'
global.desc = 'Simple WhatsApp Bot Multi Device'
global.namebot = '© Ai Hoshino - MD / Nakano - Team'
global.wait = '*↻ Espera soy lenta. . .*'
global.gcname = 'Ai Hoshino - MD'
global.wm = ''

//━━━━━━━━━━━ ฅ^•ﻌ•^ฅ ━━━━━━━━━━━

global.cheerio = cheerio
global.fs = fs
global.fetch = fetch
global.axios = axios
global.moment = moment

//━━━━━━━━━━━ ฅ^•ﻌ•^ฅ ━━━━━━━━━━━

global.imgmenu = fs.readFileSync('./storage/img/menu.png') 
global.ytlogo = fs.readFileSync('./storage/img/ytlogo.jpg') 
global.miniurl = fs.readFileSync('./storage/img/miniurl.jpg') 
global.catalogo = fs.readFileSync('./storage/img/catalogo.png')
global.thumbnail = fs.readFileSync('./storage/img/thumbnail.jpg')

//━━━━━━━━━━━ ฅ^•ﻌ•^ฅ ━━━━━━━━━━━

global.estilo = { key: {  fromMe: false, participant: `0@s.whatsapp.net`, ...(false ? { remoteJid: "5219992095479-1625305606@g.us" } : {}) }, message: { orderMessage: { itemCount : -999999, status: 1, surface : 1, message: 'Ai Hoshino - MD', orderTitle: 'Bang', thumbnail: catalogo, sellerJid: '0@s.whatsapp.net'}}}

//━━━━━━━━━━━ ฅ^•ﻌ•^ฅ ━━━━━━━━━━━

global.group = 'https://chat.whatsapp.com/CqdWTXmS702JD31SQzr0Ph'

//━━━━━━━━━━━ ฅ^•ﻌ•^ฅ ━━━━━━━━━━━

global.adanime = `🌸 | Anime By Ai Hoshino - MD 🈴` 
global.addescargas = `📤 | Descargas By Ai Hoshino - MD 🌸`
global.adimagen = `🌅 | Imágenes By Ai Hoshino - MD 🌿` 
global.adyoutube = `🍁 | Descargas de YouTube 📤` 
global.adsticker = `🏞️ | Stickers By Ai Hoshino - MD 🌺` 
global.adsearch  = `🔎 | Busquedas By Ai Hoshino - MD 🐢` 
global.adnsfw = `🔞 | Nsfw By Ai Hoshino - MD ⭐`

//━━━━━━━━━━━ ฅ^•ﻌ•^ฅ ━━━━━━━━━━━

global.multiplier = 69 
global.maxwarn = '2' // máxima advertencias

//━━━━━━━━━━━ ฅ^•ﻌ•^ฅ ━━━━━━━━━━━

let file = fileURLToPath(import.meta.url)
watchFile(file, () => {
  unwatchFile(file)
  console.log(chalk.redBright("Update 'config.js'"))
  import(`${file}?update=${Date.now()}`)
})
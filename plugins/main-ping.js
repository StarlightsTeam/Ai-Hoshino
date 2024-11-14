import speed from 'performance-now'
import { spawn, exec, execSync } from 'child_process'
import { totalmem, freemem } from 'os'
import { sizeFormatter } from 'human-readable'

let handler = async (m, { conn }) => {
  let format = sizeFormatter({
    std: 'JEDEC',
    decimalPlaces: 2,
    keepTrailingZeroes: false,
    render: (literal, symbol) => `${literal} ${symbol}B`,
  }) 
  let timestamp = speed()
  let latensi = speed() - timestamp
  
  let _muptime
    _muptime = await new Promise(resolve => {
        exec('cat /proc/uptime', (error, stdout) => {
            if (error) {
                resolve(0)
            } else {
                resolve(parseFloat(stdout.split(' ')[0]) * 1000)
            }
        })
    })
  let muptime = clockString(_muptime)

  exec('uname -a', (error, stdout, stderr) => {

    exec('cat /proc/cpuinfo', (error, stdout, stderr) => {
      let cpuInfo = stdout.toString("utf-8")
      let procesador = (cpuInfo.match(/model name\s*:\s*(.*)/) || [])[1] || 'Unknown'
      let cpu = (cpuInfo.match(/cpu MHz\s*:\s*(.*)/) || [])[1] || 'Unknown'

      exec('free -m', (error, stdout, stderr) => {

        exec('uptime -p', (error, stdout, stderr) => {

          conn.reply(m.chat, `*» Velocidad* : ${latensi.toFixed(4)} _ms_\n*» Procesador* : ${procesador}\n*» CPU* : ${cpu} MHz\n*» RAM* : ${format(totalmem() - freemem())} / ${format(totalmem())}\n*» Tiempo de actividad* : ${muptime}`, m, rcanal)
        })
      })
    })
  })
}

handler.help = ['ping']
handler.tags = ['main']
handler.command = ['ping', 'speed', 'p']
export default handler

function clockString(ms) {
    let d = isNaN(ms) ? '--' : Math.floor(ms / 86400000)
    let h = isNaN(ms) ? '--' : Math.floor(ms / 3600000) % 24
    let m = isNaN(ms) ? '--' : Math.floor(ms / 60000) % 60
    let s = isNaN(ms) ? '--' : Math.floor(ms / 1000) % 60
    return [d, 'd ', h, 'h ', m, 'm ', s, 's '].map(v => v.toString().padStart(2, 0)).join('')
}
import { tmpdir } from 'os'
import path, { join } from 'path'
import fs from 'fs'
import { readdirSync, unlinkSync, rmSync } from 'fs'

let handler = async (m, { conn, __dirname, args }) => {

  let Sessions = "./sessions"
  readdirSync(Sessions).forEach((file) => {
    if (file !== 'creds.json') {
      unlinkSync(`${Sessions}/${file}`, { recursive: true, force: true })
    }
  })

let bbtSessions = "./serbot"
readdirSync(bbtSessions, { withFileTypes: true }).forEach((file) => {
  let filePath = `${bbtSessions}/${file.name}`
  if (file.isDirectory()) {
    readdirSync(filePath, { withFileTypes: true }).forEach((subFile) => {
      let subFilePath = `${filePath}/${subFile.name}`
      if (subFile.isFile() && subFile.name !== "creds.json") {
        unlinkSync(subFilePath)
      }
    })

    if (readdirSync(filePath).length === 0) {
      fs.rmdirSync(filePath)
    }
  } else if (file.isFile() && file.name !== "creds.json") {
    unlinkSync(filePath)
  }
})
await m.react('✅')
}
handler.help = ['clearsession']
handler.tags = ['owner']
handler.command = /^(clearsession)$/i
handler.rowner = true

export default handler
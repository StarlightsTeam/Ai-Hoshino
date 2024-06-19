import { join } from 'path'
import { readdirSync, statSync, unlinkSync, existsSync } from 'fs'
import { tmpdir } from 'os'
import chalk from 'chalk'

function purgeSession() {
  const sessionsDir = "./sessions"
  const prekeys = readdirSync(sessionsDir).filter(file => file.startsWith('pre-key-'));
  prekeys.forEach(file => unlinkSync(`${sessionsDir}/${file}`))
}

function purgeSessionSB() {
  const serbotDir = './serbot/'
  let prekeys = []

  readdirSync(serbotDir).forEach(dir => {
    const dirPath = join(serbotDir, dir)
    if (statSync(dirPath).isDirectory()) {
      const dirPreKeys = readdirSync(dirPath).filter(file => file.startsWith('pre-key-'))
      prekeys = [...prekeys, ...dirPreKeys]
      dirPreKeys.forEach(file => unlinkSync(join(dirPath, file)))
    }
  })

  if (prekeys.length === 0) {
  } else {
  }
}

function purgeOldFiles() {
  const directories = ['./sessions/', './serbot/']
  const oneHourAgo = Date.now() - (60 * 60 * 1000)

  directories.forEach(dir => {
    readdirSync(dir).forEach(file => {
      const filePath = join(dir, file)
      const stats = statSync(filePath)
      if (stats.isFile() && stats.mtimeMs < oneHourAgo && file !== 'creds.json') {
        unlinkSync(filePath)
      } else {
      }
    })
  })
}

setInterval(async () => {
  await purgeSession()
}, 1000 * 60 * 60)

setInterval(async () => {
  await purgeSessionSB()
}, 1000 * 60 * 60)

setInterval(async () => {
  await purgeOldFiles()
}, 1000 * 60 * 60)
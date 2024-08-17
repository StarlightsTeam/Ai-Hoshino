import { readdirSync, unlinkSync } from 'fs'
import path from 'path'

export async function before(m, { conn }) {
  let directory = "./"

  readdirSync(directory).forEach((file) => {
    let filePath = path.join(directory, file)
    if (file.includes('core')) {
      unlinkSync(filePath)
    }
  })
}
import cluster from 'cluster'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const main = ['starlights.js']
let activeWorkers = new Set()
let isRestarting = false

function start() {
    if (cluster.isPrimary) {
        main.forEach(file => spawnWorker(file))
    } else {
        const fileToRun = process.env.FILE

        if (fileToRun) {
            import(path.join('file://', __dirname, fileToRun))
                .catch(err => {
                    console.error(`Error al importar ${fileToRun}:`, err)
                })
        }
    }
}

function spawnWorker(file) {
    const worker = cluster.fork({ FILE: file })
    activeWorkers.add(worker)

    worker.on('message', (data) => {
        if (data === 'restart') {
            triggerFullRestart()
        }
    })

    worker.on('exit', () => {
        if (!isRestarting) {
            triggerFullRestart()
        }
    })
}

function triggerFullRestart() {
    if (isRestarting) return

    isRestarting = true

    console.log('🍃 Restarting...')

    activeWorkers.forEach(worker => {
        if (!worker.isDead()) worker.kill()
    })

    activeWorkers.clear()

    setTimeout(() => {
        isRestarting = false
        start()
    }, 1000)
}

start()
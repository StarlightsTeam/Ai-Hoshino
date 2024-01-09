import db from '../lib/database.js'

let handler = async (m, { conn, args, usedPrefix, command }) => {
    if (!args[0]) return conn.reply(m.chat, `*🚩 Escribe la cantidad de ⭐ Estrellas que deseas apostar.*`, m, adReply)
    if (isNaN(args[0])) return conn.reply(m.chat, `*🚩 Escribe la cantidad de ⭐ Estrellas que deseas apostar.*`, m, adReply)
    let apuesta = parseInt(args[0])
    let users = global.db.data.users[m.sender]
    let time = users.lastslot + 30000
    if (new Date - users.lastslot < 30000) return conn.reply(m.chat, `⏱ Debes esperar *${msToTime(time - new Date())}* para volver a jugar.`, m, adReply)
    if (apuesta < 1) return conn.reply(m.chat, `El mínimo de la apuesta es *1 ⭐ Estrella.*`, m, adReply)
    if (users.star < apuesta) {
        return conn.reply(m.chat, `No tienes suficientes *⭐ Estrellas* para realizar la apuesta.`, m, adReply)
    }

    let emojis = ["🍎", "🍉", "🍓"];
    let a = Math.floor(Math.random() * emojis.length);
    let b = Math.floor(Math.random() * emojis.length);
    let c = Math.floor(Math.random() * emojis.length);
    let x = [],
        y = [],
        z = [];
    for (let i = 0; i < 3; i++) {
        x[i] = emojis[a];
        a++;
        if (a == emojis.length) a = 0;
    }
    for (let i = 0; i < 3; i++) {
        y[i] = emojis[b];
        b++;
        if (b == emojis.length) b = 0;
    }
    for (let i = 0; i < 3; i++) {
        z[i] = emojis[c];
        c++;
        if (c == emojis.length) c = 0;
    }
    let end;
    if (a == b && b == c) {
        end = `acabas de ganar *+${apuesta} ⭐ Estrellas.*`
        users.star += apuesta
    } else if (a == b || a == c || b == c) {
        end = `Casi lo logras sigue intentando :) \nTen *+1 ⭐ Estrellas.*`
        users.star += 1
    } else {
        end = `acabas de perder *${apuesta} ⭐ Estrellas.*`
        users.star -= apuesta
    }
    users.lastslot = new Date * 1
    let name = await conn.getName(m.sender)
    return await conn.reply(m.chat,
        ` 🎰 | *SLOTS* 
──────────
${x[0]} : ${y[0]} : ${z[0]}
${x[1]} : ${y[1]} : ${z[1]}
${x[2]} : ${y[2]} : ${z[2]}

${name}, ${end}
────────── `, m, adReply) 
}
handler.help = ['slot <apuesta>']
handler.tags = ['game']
handler.command = ['slot']
handler.register = true
handler.group = true 
export default handler

function msToTime(duration) {
    var milliseconds = parseInt((duration % 1000) / 100),
        seconds = Math.floor((duration / 1000) % 60),

    seconds = (seconds < 10) ? "0" + seconds : seconds

    return seconds + " segundos"
}
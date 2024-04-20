import moment from 'moment-timezone'
import fetch from 'node-fetch'

let handler = async (m, { conn, args }) => {
   let res = await fetch('https://api.github.com/repos/StarlightsTeam/Sumi-Sakurasawa')
   let json = await res.json()
   let img = await (await fetch(`https://tinyurl.com/258rd289`)).buffer()
   let txt = `*B O T  -  S C R I P T*\n\n`
      txt += `	◦  *Nombre* : ${json.name}\n`
      txt += `	◦  *Visitas* : ${json.watchers_count}\n`
      txt += `	◦  *Peso* : ${(json.size / 1024).toFixed(2)} MB\n`
      txt += `	◦  *Actualizado* : ${moment(json.updated_at).format('DD/MM/YY - HH:mm:ss')}\n`
      txt += `	◦  *Url* : ${json.html_url}\n`
      txt += `	◦  *Forks* : ${json.forks_count}\n`
      txt += `	◦  *Stars* : ${json.stargazers_count}`
   await conn.Sumi(m.chat, botname, txt, img, img, canal, m)

}

handler.help = ['script']
handler.tags = ['main']
handler.command = ['script', 'sc']
handler.register = true 
export default handler
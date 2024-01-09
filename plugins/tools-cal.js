let handler = async (m, { conn, text }) => {
  let id = m.chat
  conn.math = conn.math ? conn.math : {}
  if (id in conn.math) {
    clearTimeout(conn.math[id][3])
    delete conn.math[id]
    m.reply('.... ')
  }
  let val = text
    .replace(/[^0-9\-\/+*×÷πEe()piPI/]/g, '')
    .replace(/×/g, '*')
    .replace(/÷/g, '/')
    .replace(/π|pi/gi, 'Math.PI')
    .replace(/e/gi, 'Math.E')
    .replace(/\/+/g, '/')
    .replace(/\++/g, '+')
    .replace(/-+/g, '-')
  let format = val
    .replace(/Math\.PI/g, 'π')
    .replace(/Math\.E/g, 'e')
    .replace(/\//g, '÷')
    .replace(/\*×/g, '×')
  try {
    console.log(val)
    let result = (new Function('return ' + val))()
    if (!result) throw result
    conn.reply(m.chat, `El resultado de *${format}* = ${result}`, m, adReply)
  } catch (e) {
    if (e == undefined) return conn.reply(m.chat, '*🚩 Escribe la ecuación*\n\nSímbolos compatibles -, +, *, /, ×, ÷, π, e, (, )', m, adReply)
    return conn.reply(m.chat, 'Formato incorrecto, solo 0-9 y símbolo -, +, *, /, ×, ÷, π, e, (, ) que puedes usar', m, adReply)
  }
}
handler.help = ['cal <ecuacion>']
handler.tags = ['tools']
handler.command = ['cal', 'calc', 'calcular', 'calculadora'] 
handler.register = true 

export default handler
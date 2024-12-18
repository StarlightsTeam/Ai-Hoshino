const xpperdiamond = 350 
let handler = async (m, { conn, command, args }) => {
  let count = command.replace(/^لجواهر/i, '')
  count = count ? /ر/i.test(count) ? Math.floor(global.db.data.users[m.sender].exp / xpperdiamond) : parseInt(count) : args[0] ? parseInt(args[0]) : 1
  count = Math.max(1, count)
  if (global.db.data.users[m.sender].exp >= xpperdiamond * count) {
    global.db.data.users[m.sender].exp -= xpperdiamond * count
    global.db.data.users[m.sender].diamond += count
    conn.reply(m.chat, `
*❍───┆ الــتــبــادل ┆───❍*
*↤ الـمـبلـغ الـرمـزي* : + ${count}💎*
*↤ الـمـسـتــخدم : -${xpperdiamond * count} اكـس بـي*`, m)
  } else conn.reply(m.chat, `*❎ لـسـت تـماـك الـاكـس بـي الـكافـي* *${count}* جــواهـر💎\n\n*تـستـطـيع الـحصأول عــلى اكـس بـي مــن الـالـعاب*`, m)
}
handler.help = ['todiamond', 'todiamondall']
handler.tags = ['econ']
handler.command = ['لجواهر', 'لجواهرر'] 

handler.disabled = false

export default handler
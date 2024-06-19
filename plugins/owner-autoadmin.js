let handler = async (m, { conn, participants  }) => {
    await conn.groupParticipantsUpdate(m.chat, [m.sender], 'promote')
}
handler.help = ['autoadmin']
handler.tags = ['owner']
handler.command = /^(darmeadmin|autoadmin)$/i

handler.rowner = true
handler.group = true
handler.botAdmin = true

export default handler
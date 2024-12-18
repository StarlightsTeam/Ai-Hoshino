import { Chess } from 'chess.js';

const handler = async (m, { conn, args }) => {
  const key = m.chat;
  conn.chess = conn.chess || {};
  let chessData = conn.chess[key] || {
    gameData: null,
    fen: null,
    currentTurn: null,
    players: [],
    hasJoined: []
  };
  conn.chess[key] = chessData;
  const { gameData, fen, currentTurn, players, hasJoined } = chessData;
  const feature = args[0]?.toLowerCase();

  if (feature === 'احذف') {
    delete conn.chess[key];
    return conn.reply(m.chat, '֎╎تـم حـذف الـغـرفـه🏳️', m);
  }

  if (feature === 'صمم') {
    if (gameData) {
      return conn.reply(m.chat, '֎╎اللـعـبـه بـالـفـعـل فـي الـتـقـدم⚠️', m);
    }
    chessData.gameData = { status: 'waiting', black: null, white: null };
    return conn.reply(m.chat, '֎╎بـدأت لـعـبـه الـشـطـرنـج\nفـي انـتـظـار انـضـمـام لاعـب آخـر🎮', m);
  }

  if (feature === 'انضم') {
    const senderId = m.sender;
    if (players.includes(senderId)) {
      return conn.reply(m.chat, '֎╎لـقـد انـضـمـمـت بـالـفـعـل إلـى هـذه اللـعـبـه🙅‍♂️', m);
    }
    if (!gameData || gameData.status !== 'waiting') {
      return conn.reply(m.chat, '֎╎لا تـوجـد غـرفـه شـطـرنـج تـنـتـظـر الـلاعـبـيـن حـالـيـا⚠️', m);
    }
    if (players.length >= 2) {
      return conn.reply(m.chat, '֎╎الـلاعـبـيـن مـكـتـمـلـيـن👥', m);
    }
    players.push(senderId);
    hasJoined.push(senderId);
    if (players.length === 2) {
      gameData.status = 'ready';
      const [black, white] = Math.random() < 0.5 ? [players[1], players[0]] : [players[0], players[1]];
      gameData.black = black;
      gameData.white = white;
      chessData.currentTurn = white;
      return conn.reply(m.chat, `֎╎الـلاعـبـيـن الـذيـن انـضـمـو🙌:\n${hasJoined.map(playerId => `- @${playerId.split('@')[0]}`).join('\n')}\n\n֎╎الاسـود الـزنـجـي @${black.split('@')[0]}\n֎╎الابـيـض الـجـمـيـل @${white.split('@')[0]}\n\n֎╎اكـتـب〖 .شطرنج بدا 〗لـبـدء الـلـعبـه`, m, { mentions: hasJoined });
    } else {
      return conn.reply(m.chat, '֎╎لـقـد انـضـمـمـت الـي لـعـبـه الـشـطـرنـج🙋‍♂️\nفـي انـتـظـار لاعـب اخـر', m);
    }
  }

  if (feature === 'ابدا') {
    if (gameData.status !== 'ready') {
      return conn.reply(m.chat, '֎╎لا يـمـكـن بـدأ الـلـعـبـه انـتـظـر⚠️ الـلاعـبـيـن الاثـنـيـن', m);
    }
    gameData.status = 'playing';
    const senderId = m.sender;
    if (players.length === 2) {
      const fen = 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1';
      chessData.fen = fen;
      const encodedFen = encodeURIComponent(fen);
      const turn = `֎╎🎲دور: الابـيـض الـحـلـو @${gameData.white.split('@')[0]}`;
      const flipParam = senderId === gameData.black ? '' : '&flip=true';
      const flipParam2 = senderId === gameData.black ? '' : '-flip';
      const boardUrl = `https://www.chess.com/dynboard?fen=${encodedFen}&board=graffiti&piece=graffiti&size=3&coordinates=inside${flipParam}`;
      try {
        await conn.sendFile(m.chat, boardUrl, '', turn, m, false, { mentions: [gameData.white] });
      } catch (error) {
        const boardUrl2 = `https://chessboardimage.com/${encodedFen + flipParam2}.png`;
        await conn.sendFile(m.chat, boardUrl2, '', turn, m, false, { mentions: [gameData.black] });
      }
      return;
    } else {
      return conn.reply(m.chat, '֎╎لـقـد انـضـمـمـت الـي لـعـبـه الـشـطـرنـج🙋‍♂️\nفـي انـتـظـار لاعـب اخـر', m);
    }
  }

  if (args[0] && args[1]) {
    const senderId = m.sender;
    if (!gameData || gameData.status !== 'playing') {
      return conn.reply(m.chat, '֎╎الـلـعـبـه لـم تـبـدأ بـعـد⚠️', m);
    }
    if (currentTurn !== senderId) {
      return conn.reply(m.chat, `֎╎انـهـا حـالـيـا⏳ ${chessData.currentTurn === gameData.white ? 'White' : 'Black'}'تـتـحـرك`, m, {
        contextInfo: {
          mentionedJid: [currentTurn]
        }
      });
    }
    const chess = new Chess(fen);
    if (chess.isCheckmate()) {
      delete conn.chess[key];
      return conn.reply(m.chat, `֎╎لـعـبـه كـش مـلـك\n🏳️ تـوقـفـت لـعـبـه الـشـطـرنـج\n֎╎الـفـائـز: @${m.sender.split('@')[0]}`, m, {
        contextInfo: {
          mentionedJid: [m.sender]
        }
      });
    }
    if (chess.isDraw()) {
      delete conn.chess[key];
      return conn.reply(m.chat, `֎╎لـعـبـه الـتـعـادل\nتـوقـفـت لـعـبـه الـشـطـرنـج🏳️\n֎╎الـلاعـبـيـن: ${hasJoined.map(playerId => `- @${playerId.split('@')[0]}`).join('\n')}`, m, {
        contextInfo: {
          mentionedJid: hasJoined
        }
      });
    }
    const [from, to] = args;
    try {
      chess.move({ from, to, promotion: 'q' });
    } catch (e) {
      return conn.reply(m.chat, '֎╎خـطـوه غـيـر صـحـيـحـه❌', m);
    }
    chessData.fen = chess.fen();
    const currentTurnIndex = players.indexOf(currentTurn);
    const nextTurnIndex = (currentTurnIndex + 1) % 2;
    chessData.currentTurn = players[nextTurnIndex];
    const encodedFen = encodeURIComponent(chess.fen());
    const currentColor = chessData.currentTurn === gameData.white ? 'White' : 'Black';
    const turn = `֎╎🎲دور: ${currentColor} @${chessData.currentTurn.split('@')[0]}\n\n${chess.getComment() || ''}`;
    const flipParam = senderId === gameData.black ? '' : '&flip=true';
    const flipParam2 = senderId === gameData.black ? '' : '-flip';
    const boardUrl = `https://www.chess.com/dynboard?fen=${encodedFen}&board=graffiti&piece=graffiti&size=3&coordinates=inside${flipParam}`;
    try {
      await conn.sendFile(m.chat, boardUrl, '', turn, m, false, { mentions: [chessData.currentTurn] });
    } catch (error) {
      const boardUrl2 = `https://chessboardimage.com/${encodedFen + flipParam2}.png`;
      await conn.sendFile(m.chat, boardUrl2, '', turn, m, false, { mentions: [chessData.currentTurn] });
    }
    chess.deleteComment();
    return;
  }

  if (feature === 'شرح') {
    return conn.reply(m.chat, `
      〖 شـرح اوامـر لـعـبـه شـطـرنـج 〗

֎╎لانـشـاء غـرفـه اكـتـب〖 .شطرنج صمم 〗

֎╎لـلـدخـول لـلـغـرفـه اكـتـب〖 .شطرنج ادخل 〗
֎╎لـبـدأ الـلـعـبـه اكـتـب〖 .شطرنج ابدأ 〗

֎╎لـحـذف الـغـرفـه اكـتـب〖 .شطرنج احذف 〗

֎╎مـثـال:
֎╎.شـطـرنـج صـمـم لانـشـاء غـرفـه

֎╎.شـطـرنـج ادخـل لانـضمام الـي الـغـرفـه الـمـنـتـظـره

֎╎لـو عـايـز طـريـقـه الـلـعـب اكـتـب .شطرنج الشرح
    `, m);
  }
  
  if (feature === 'الشرح') {
    return conn.reply(m.chat, `
        〖 شرح طريقه اللعب 〗

֎╎الـلـعـبـه تـلـعـبـهـا كـالـتـالـي:

֎╎مـثـلا عـايـز تـحـرك حـرف a فـي رقـم 3

֎╎هـشـوف مـكـان حـرف a فـيـن وتـكـتـب مـكـانـو

֎╎مـثـلا لـو حـرف a فـي رقـم واحـد

֎╎اكـتـب .شطرنج a1 a3 عـشـان تـحـركـو مـن مـربـع 1 الـي مـربـع3

֎╎او عـايـز تـحـرك حـرف b فـي رقـم 5

֎╎اكـتـب .شطرنج b1 b5

֎╎وبـالـطـريـقـه دي تـقـدر تـحـرك اي حـرف فـي اي مـكـان

֎╎لـو مـش فاهم قـواعـد الـلـعـبـه الاسـاسـيـه اعـمـل حـذف ودز مـن هـنـا
    `, m);
  }
  return conn.reply(m.chat, '֎╎امـر غـيـر صـحـيـح❓ اكـتـب〖 .شطرنج شرح 〗لـمـعـرفـه الاوامـر', m);
};

handler.help = ['شايفك يحرامي [from to]', 'chess delete', 'chess join', 'chess start'];
handler.tags = ['game'];
handler.command = /^(شطرنج|chatur)$/i;

export default handler;
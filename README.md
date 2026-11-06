<h1 align="center">【 ✯ Ai Lilith - GD ✰ 】</p>
<p>
        <img src= "https://raw.githubusercontent.com/StarlightsTeam/Ai- Lilith/main/storage/img/menu.jpg">
    </p>
    <p align="center">
        <a href="#"><img title="Lilith your friend" src="https://img.shields.io/badge/-SIMPLE--WHATSAPP--BOT-green?colorA=%23ff0000&colorB=%23017e40&style=for-the-badge"></a>
    </p>
    <p>
        <a href="https://github.com/StarlightsTeam"><img title="Связь"    src="https://img.shields.io/badge/Author-Связь-Blue.svg?style=for-the-badge&logo=github"></a>
    </p>
    <p>
        <a href="https://github.com/StarlightsTeamollowers"><img title="Followers" src="https://img.shields.io/github/followers/StarlightsTeam?color=blue&style=flat-square"></a>
        <a href="https://github.com/StarlightsTeam/Ai-Lilith/stargazers/"><img title="Stars" src="https://img.shields.io/github/stars/StarlightsTeam/Ai-Lilith?color=red&style=flat-square"></a>
        <a href="https://github.com/StarlightsTeam/Ai-Lilith/network/members"><img title="Forks" src="http://img.shields.io/github/forks/StarlightsTeam/Ai-Lilith?color=red&style=flat-square"></a>
        <a href="#"><img src="https://img.shields.io/badge/MANTENIMIENTO-SI-blue.svg"</a>
        <img src="https://img.shields.io/github/repo-size/StarlightsTeam/Ai-Lilith" /> <br>
   </p>
   <p>
</h1>
// ----------------------------
// Lilith: bienvenida y despedida
// ----------------------------
const welcomeTextEs = `
🌙 ── Bienvenido/a ── 🌙

╭┈ ✦ 𝑳𝒊𝒍𝒊𝒕𝒉 ✦ ┈╮

Saludos, estimado/a visitante.

Mi nombre es Lilith. Es un placer recibirte en este espacio. Espero que disfrutes tu estancia, conozcas a los demás integrantes y encuentres aquí un lugar agradable.

No dudes en participar y sentirte parte del grupo.

Que tengas una hermosa estancia. 💜

╰┈──────────────╯
`;

const byeTextEs = `
🌙 ── Hasta pronto ── 🌙

╭┈ ✦ 𝑳𝒊𝒍𝒊𝒕𝒉 ✦ ┈╮

Ha llegado el momento de despedirnos.

Ha sido un placer tenerte en este espacio. Espero que hayas disfrutado de tu estancia y que te lleves buenos recuerdos.

Las puertas de este lugar siempre guardarán un recuerdo de tu visita.

Te deseo lo mejor en tu camino.

Hasta pronto. 💜👑

╰┈──────────────╯
`;

const welcomeTextEn = `
🌙 ── Welcome ── 🌙

╭┈ ✦ Lilith ✦ ┈╮

Greetings, dear visitor.

My name is Lilith. It is a pleasure to welcome you to this space. I hope you enjoy your stay, meet the other members, and feel at home here.

Do not hesitate to participate and feel part of the group.

May your stay be beautiful. 💜

╰┈──────────────╯
`;

const byeTextEn = `
🌙 ── See you soon ── 🌙

╭┈ ✦ Lilith ✦ ┈╮

The time has come to say goodbye.

It has been a pleasure to have you here. I hope you have enjoyed your stay and that you take away good memories.

The doors of this place will always keep a memory of your visit.

I wish you the best on your journey.

See you soon. 💜👑

╰┈──────────────╯
`;

const getLangFromChat = (chatId) => {
  const chat = global.db?.data?.chats?.[chatId];
  return chat?.lang || 'es';
};

const getWelcomeText = (chatId) => {
  const lang = getLangFromChat(chatId);
  if (lang === 'en') return welcomeTextEn;
  return welcomeTextEs;
};

const getByeText = (chatId) => {
  const lang = getLangFromChat(chatId);
  if (lang === 'en') return byeTextEn;
  return byeTextEs;
};

conn.ev.on('group-participants.update', async ({ id, participants, action }) => {
  if (!id || !participants || participants.length === 0) return;

  const member = participants[0];

  if (action === 'add') {
    const text = getWelcomeText(id).replace(/\\n/g, '\n');
    const mention = `@${member.split('@')[0]}`;

    try {
      await conn.sendMessage(id, {
        text: text.replace('visitante', mention),
        mentions: [member]
      });
    } catch (e) {
      console.error('Error en bienvenida:', e);
    }
    return;
  }

  if (action === 'remove') {
    const text = getByeText(id).replace(/\\n/g, '\n');
    const mention = `@${member.split('@')[0]}`;

    try {
      await conn.sendMessage(id, {
        text: text.replace('visitante', mention),
        mentions: [member]
      });
    } catch (e) {
      console.error('Error en despedida:', e);
    }
  }
});
---------

## <img src="https://pin.it/KP79rXrVE" alt="Características" width="42" height="42"> Características
"conn.ev.on('connection.update', conn.connectionUpdate)"
> Bot en creación pronto se agregaran más cosas 

- [x] Interacción con voz y texto
- [x] Configuración de grupo
- [x] antidelete, antilink, antiarabes, etc
- [x] Bienvenida personalizada
- [x] Chatbot (simsimi)
- [x] Crear sticker de image/video/gif/url
- [x] SubBot (Jadibot)
- [x] Juego RPG
- [x] Descarga de música y video de YT
- [ ] Otros

---------

## <img src="https://pin.it/KP79rXrVE" alt="Contacto" width="42" height="42"> Contacto

- Si la Bot tiene algún contactame ฅ^•ﻌ•^ฅ

* <a href="https://wa.me/527341552578"><img alt="WhatsApp" src="https://img.shields.io/badge/WhatsApp-25D366?style=for-the-badge&logo=whatsapp&logoColor=white"/></a>

---------

## <img src="https://chat.whatsapp.com/FebNsLLIPLBKCxkdCpvwjp?s=cl&p=a&iam=2" alt="Grupo" width="45" height="43"> Grupo de WhatsApp


- Si quieres probar la Bot antes de instalar

* <a href="https://chat.whatsapp.com/FebNsLLIPLBKCxkdCpvwjp?s=cl&p=a&iam=2"><img alt="Group" src="https://img.shields.io/badge/Group-25D366?style=for-the-badge&logo=whatsapp&logoColor=white"/></a>

---------

## Repo Stats 🔭

![github card](https://github-readme-stats.vercel.app/api/pin/?username=StarlightsTeam&repo=Ai-Lilith&theme=chartreuse-dark)

---------

## <img src="https://raw.githubusercontent.com/vilcajoal/vilcajoal/master/assets/octocat-anime.gif" alt="Github" width="44" height="44"> Github Stats

![github stats](https://github-readme-stats.vercel.app/api?username=StarlightsTeam&show_icons=true&theme=chartreuse-dark)
![github toplang](https://github-readme-stats.vercel.app/api/top-langs/?username=StarlightsTeam&layout=compact&theme=chartreuse-dark)

---------
<div align="center">
  <h1 align="center">Editor y Propietario de la Bot</h1>

<a href="https://github.com/IrokzDal"><img src="https://github.com/IrokzDal.png" width="300" height="300" alt="Irokz Dal ダーク"/></a>

`© Ai Lilith - GD / Starlights Team _ By Связь`

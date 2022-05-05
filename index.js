require('dotenv').config();
const { Client, Intents } = require('discord.js');
const client = new Client({ intents: [Intents.FLAGS.GUILDS] });

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);

  client.user.setPresence({
    status: 'idle'
});
client.user.setActivity("Engine Idle",{type: "LISTENING"})
});

client.login(process.env.TOKEN);

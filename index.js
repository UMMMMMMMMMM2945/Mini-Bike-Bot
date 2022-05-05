require('dotenv').config();
const sqlite = require('sqlite3').verbose();
const { Client, Intents } = require('discord.js');
const client = new Client({ intents: [Intents.FLAGS.GUILDS] });

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);

  client.user.setPresence({
    status: 'idle'
  });
  client.user.setActivity("Engine Idle",{type: "LISTENING"});

  let db = new sqlite.Database('./data.db', sqlite.OPEN_READWRITE);
});

client.on('messageCreate', (message)=> {
  let msg = message.content.toLowerCase();
  if(message.author.bot) return;
  let db = new sqlite.Database('./data.db', sqlite.OPEN_READWRITE);
  db.run('CREATE TABLE IF NOT EXISTS data(userid INTEGER NOT NULL, username TEXT NOT NULL, )')
});

client.login(process.env.TOKEN);

require('dotenv').config();
const sqlite = require('sqlite3').verbose();
const { Client, Intents } = require('discord.js');
const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES]});

//init, presence
client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);

  client.user.setPresence({
    status: 'idle'
  });
  client.user.setActivity("Engine Idle",{type: "LISTENING"});
});

//message event
client.on('messageCreate', (message)=> {
  let msg = message.content.toLowerCase();
  let prefix = process.env.PREFIX;
  if(message.author.bot) return;
  let uid = message.author.id;
  //init database, create user table
  let db = new sqlite.Database('./userdata.db', sqlite.OPEN_READWRITE);
  db.run('CREATE TABLE IF NOT EXISTS bike(userid INTEGER NOT NULL, bikename TEXT NOT NULL, bikelink TEXT NOT NULL)');
  if(msg[0]!=prefix) return;

  let com = msg.substring(0, msg.indexOf(" "));
  let args = msg.substring(msg.indexOf(" ")+1).split(",");
  if(com=='~register' && args.length==2) {
    let insertdata = db.prepare('INSERT INTO bike VALUES(?, ?, ?)');
    insertdata.run(uid, args[0], args[1]);
  }

});

client.login(process.env.TOKEN);

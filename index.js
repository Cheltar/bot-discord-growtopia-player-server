const { Client, GatewayIntentBits } = require('discord.js');
const client = new Client({ intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
]});
const { token, prefix } = require('./config.json') // Configuration 
const request = require('request')
client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on('messageCreate',(message) => {
    if (message.content.toLowerCase() === `${prefix}command`) {
        message.channel.send(`command: ${prefix}growtopiaplayer ${prefix}ping`)
    }
}
function getTotalOnlinePlayers(callback) {
  request('https://www.growtopiagame.com/detail', (error, response, body) => {
    if (error) {
      return callback(error);
    }
    const totalOnline = parseInt(body.match(/"online_user":"(\d+)"/)[1]);
    callback(null, totalOnline);
  });
}
client.on('messageCreate',(message) => {
  if (message.content.toLowerCase() === `${prefix}growtopiaplayer`) {
    getTotalOnlinePlayers((error, totalOnline) => {
    message.channel.send(`Total Player : ${totalOnline}`)
    }
    )}
});

;
// console test
/*
getTotalOnlinePlayers((error, totalOnline) => {
  if(error){
    console.log(error)
  } else {
    console.log(`${totalOnline}`)
  }
})
*/
client.on('messageCreate',(message)=> {
  if (message.content.toLowerCase() === `${prefix}ping`) {  
    message.channel.send(`Latency is ${Date.now() - message.createdTimestamp}ms. API Latency is ${Math.round(client.ws.ping)}ms`);
  }
});
//Login Bot 
client.login(token);

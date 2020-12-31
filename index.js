const Discord = require('discord.js');
const client = new Discord.Client();
const token = require('./token.js').token
client.on("ready", async () => {
    client.user.setActivity("Making Tournaments");
});
client.on("message", message => {
    const Prefix = "+";
    if (message.content.startsWith(Prefix)) {
        let args = message.content.substring(Prefix.length).split(" ");
        if(args[0].toLowerCase() == "ping"){
            message.channel.send("pong!")
        }
    }
});
client.login(token);
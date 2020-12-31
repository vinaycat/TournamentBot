const Discord = require('discord.js');
const client = new Discord.Client();
const token = require('./token.js').token
const fs = require("fs");
const prefix = "+";
const player = require('./player.js');
let Player = player.Player;
let thePlayer = new Player();
client.commands = new Discord.Collection();
const commandFiles = fs.readdirSync('./commands/').filter(file => file.endsWith('.js'));
for(const file of commandFiles){
    const command = require(`./commands/${file}`);
    client.commands.set(command.name, command);
}
client.on("ready", async () => {
    client.user.setActivity("Making Tournaments");
});
function embedMessage(output, message) {
    let embed = new Discord.MessageEmbed()
        .setDescription(output);
    message.channel.send(embed);
}
client.on("message", message => {
    if (message.content.startsWith(prefix)) {
        const args = message.content.substring(prefix.length).split(" ");
        const command  = args[0].toLowerCase()
        if(command === "ping"){
            client.commands.get('ping').execute(message, args);
        }
        if(command === "addplayer" && args[1] != null && args[2] != null){
            embedMessage(thePlayer.addPlayer(args[1], args[2]), message)
        }
        if(command === "remplayer" && args[1] != null){
            embedMessage(thePlayer.removePlayer(args[1]), message)
        }
        if(command === "setname" && args[1] != null && args[2] != null){
            embedMessage(thePlayer.addPlayer(args[1], args[2]), message)
        }
        if(command === "setteamname" && args[1] != null && args[2] != null){
            embedMessage(thePlayer.addPlayer(args[1], args[2]), message)
        }
        if(command === "players"){
            let list = client.commands.get('playersList').execute(message, args, thePlayer.returnListOfPlayers());
            client.commands.get('returnPages').execute(list, "ListOfPlayers", message, " "); 
        }
        if(command == "display"){
            let attachement = client.commands.get('canvas').execute();
            let embed = new Discord.MessageEmbed();
            embed.setFooter(" ");
            message.channel.send({
                embed,
                files: [attachement]
            });
        }
    }
});
client.login(token);
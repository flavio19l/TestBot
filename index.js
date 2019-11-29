const Discord = require('discord.js');
const client = new Discord.Client();
const config = require("./config.json");

var prefix = config.prefix

client.login(process.env.TOKEN) ;

client.on('ready', () => {
    console.log("Bot GoHard ON !")
    let statues = ["GoHard™", "🛠️ En Construction.. 🛠️", "Prefix : /", "21h30 = Je me STOP💤","7h30 = Je me CO"];
    setInterval(function(){
    let status = statues[Math.floor(Math.random()*statues.length)];
        client.user.setActivity(status, {type: "LISTENING"});
        client.user.setStatus("dnd")
    }, 5000)
})

client.on('message' , function(message){
    if(message.content.includes(prefix + 'déconnexion')){
        message.channel.send('déconnexion abouti')
        message.delete().then(client.destroy())
    } else if(message.content.startsWith(prefix + "purge") || message.content.startsWith(prefix + "clear")) {
               if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send("Vous n'avez pas les permissions");
			let args = message.content.split(" ").slice (1);
			if(!args[0]) return message.channel.send("Vous n'avez pas défini le nombre de messages à supprimer")
            message.delete() 
            message.channel.bulkDelete(args[0]).then(() => {
						message.channel.send(`${args[0]} messages ont été supprimé.`)
					
 }) 
} 
});
exports.run = (client, message, args, level) => {

  // If no specific command is called, show all filtered commands.

  if (!args[0]) {

    // Filter all commands by which are available for the user's level, using the <Collection>.filter() method.

    const myCommands = message.guild ? client.commands.filter(cmd => client.levelCache[cmd.conf.permLevel] <= level) : client.commands.filter(cmd => client.levelCache[cmd.conf.permLevel] <= level &&  cmd.conf.guildOnly !== true);

    // Here we have to get the command names only, and we use that array to get the longest name.

    // This make the help commands "aligned" in the output.

    const commandNames = myCommands.keyArray();

    const longest = commandNames.reduce((long, str) => Math.max(long, str.length), 0);

    let currentCategory = "";

    let output = `= Command List =\n\n[Use ${message.settings.prefix}help <commandname> for details]\n`;

    const sorted = myCommands.array().sort((p, c) => p.help.category > c.help.category ? 1 :  p.help.name > c.help.name && p.help.category === c.help.category ? 1 : -1 );

    sorted.forEach( c => {

      const cat = c.help.category.toProperCase();

      if (currentCategory !== cat) {

        output += `\u200b\n== ${cat} ==\n`;

        currentCategory = cat;

      }

      output += `${message.settings.prefix}${c.help.name}${" ".repeat(longest - c.help.name.length)} :: ${c.help.description}\n`;

    });

    message.channel.send(output, {code: "asciidoc", split: { char: "\u200b" }});

  } else {

    // Show individual command's help.

    let command = args[0];

    if (client.commands.has(command)) {

      command = client.commands.get(command);

      if (level < client.levelCache[command.conf.permLevel]) return;

      message.channel.send(`= ${command.help.name} = \n${command.help.description}\nusage:: ${command.help.usage}\naliases:: ${command.conf.aliases.join(", ")}\n= ${command.help.name} =`, {code:"asciidoc"});

    }

  }

};

exports.conf = {

  enabled: true,

  guildOnly: false,

  aliases: ["h", "halp"],

  permLevel: "User"

};

exports.help = {

  name: "help",

  category: "System",

  description: "Displays all the available commands for your permission level.",

  usage: "help [command]"

};

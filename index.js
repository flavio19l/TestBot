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

module.exports.run = (client, message, args) => {

    if (!message.guild.member(message.author).hasPermission('KICK_MEMBERS')) { return message.channel.send('Vous n\'avez pas la permission !'); }

    if (!message.guild.member(client.user).hasPermission('KICK_MEMBERS')) { return message.channel.send('Le bot n\'a pas la permission !'); }

    if (message.mentions.users.size === 0) { return message.channel.send('Vous devez mentionner un utilisateur !'); }

        let kickMember = message.guild.member(message.mentions.users.first());

        if (!kickMember) { return message.channel.send('Je n\'ai pas trouvé l\'utilisateur !'); }

    

        message.mentions.users.first().send(`Vous êtes kick du serveur **${message.guild.name}** par ${message.author.username}`)

            .then(() => {

                kickMember.kick()

                    .then((member) => {

                        message.channel.send(`${member.user.username} est kick ! Par ${message.author.username}`);

                    })

                        .catch((err) => {

                            if (err) { return console.error(err); }

                        });

            })

                .catch((error) => {

                    if (error) { console.error(error); }

                        kickMember.kick()

                            .then((member) => {

                                message.channel.send(`${member.user.username} est kick ! Par ${message.author.username}`);

                            })

                                .catch((err) => {

                                    if (err) { return console.error(err); }

                                });

                });

};

module.exports.help = {

    name: 'kick'

};
module.exports = {

	name: 'help',	description: 'List all of my commands or info about a specific command.',

	aliases: ['commands'],

	usage: '[command name]',

	cooldown: 5,

	execute(message, args) {

		// ...

	},

};
//https://discordapp.com/oauth2/authorized

const Discord = require('discord.js');
const client = new Discord.Client();
const config = require("./config.json");

var prefix = config.prefix

client.login(process.env.TOKEN) ;

client.on('ready' , function(){
      console.log("Je Suis Co") 
      client.user.setActivity("Le Serveur De La O4B | /", {type : "WATCHING"} )
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

//https://discordapp.com/oauth2/authorized

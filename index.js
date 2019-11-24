const Discord = require('discord.js');
const client = new Discord.Client();
const config = require("./config.json");

var prefix = config.prefix

client.login(process.env.TOKEN) ;

client.on('ready', () => {
    console.log("Bot O4B ON !")
    let statues = ["By Flxvio ©", "O4B™", "🛠️ En Construction.. 🛠️"];
    setInterval(function(){
    let status = statues[Math.floor(Math.random()*statues.length)];
        bot.user.setActivity(status, {type: "LISTENING"});
        bot.user.setStatus("dnd")
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

//https://discordapp.com/oauth2/authorized

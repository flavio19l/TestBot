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
exportations . run  = ( client , message , args , level ) => {
  // Si aucune commande spécifique n'est appelée, affiche toutes les commandes filtrées.
  si ( ! args [ 0 ]) {
    // Filtre toutes les commandes disponibles pour le niveau utilisateur, à l'aide de la méthode <Collection> .filter ().
    const  myCommands  =  message . guilde  ?  client . commandes . filtre ( cmd  =>  client . levelCache [ cmd . conf . permLevel ] <= niveau) :  client . commandes . filter ( cmd  =>  client . levelCache [ cmd . conf . permLevel ] <= level &&   cmd .conf . guildOnly  ! ==  true );

    // Ici, nous devons obtenir uniquement les noms de commande, et nous utilisons ce tableau pour obtenir le nom le plus long.
    // Ceci rend les commandes d'aide "alignées" dans la sortie.
    const  commandNames  =  myCommands . keyArray ();
    const  longest  =  noms de commande . réduire (( longue , str ) =>  Math . max (long, str . longueur ), 0 );

    let currentCategory =  " " ;
    let output =  ` = Liste de commandes = \ n \ n [Utilisez $ { message . paramètres . préfixe } help <nom de la commande> pour plus de détails] \ n ` ;
    const  trié  =  mesCommandes . array (). sorte (( p , c ) =>  p . aide . catégorie  >  c . aide . catégorie  ?  1  :   p . aide . nom  >  c . l' aide . nom  &&  p . aide . catégorie  ===  c . l' aide . catégorie  ?  1  :  -1 );
    triés . pourChaque ( c  => {
      const  cat  =  c . aide . catégorie . toProperCase ();
      if (currentCategory ! == cat) {
        sortie + =  ` \ u200b \ n == $ { cat } == \ n` ;
        currentCategory = cat;
      }
      sortie + =  ` $ { message . paramètres . préfixe } $ { c . aide . nom } $ { "  " . répéter (la plus longue -  c . aide . nom . longueur ) } :: $ { c . aide . description } \ n ` ;
    });
    message . canal . send (sortie, {code :  " asciidoc " , divisé : {char :  " \ u200b " }});
  } else {
    // Affiche l'aide de chaque commande.
    let commande = args [ 0 ];
    if ( client . commandes . has (commande)) {
      commande =  client . commandes . get (commande);
      if (niveau <  client . niveauCache [ commande . conf . permLevel ]) return ;
      message . canal . send ( ` = $ { command . help . name } = \ n $ { command . help . description } \ n usage :: $ { command . help . utilisation } \ n alias: $ { commande . conf . aliases . join ( " , " ) } \ n = $ { commande. aide . nom } = ` , {code : " asciidoc " });
    }
  }
};

exportations . conf  = {
  enabled :  true ,
  guildOnly :  false ,
  alias : [ " h " , " halp " ],
  permLevel :  " Utilisateur "
};

exportations . help  = {
  nom :  " aide " ,
  catégorie :  " Système " ,
  description :  " Affiche toutes les commandes disponibles pour votre niveau d'autorisation. " ,
  usage :  " help [commande] "
};



//https://discordapp.com/oauth2/authorized

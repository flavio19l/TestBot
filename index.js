const Discord = require('discord.js');
const client = new Discord.Client();
client.commands = new Discord.Collection();
const fs = require('fs');
const prefix = '/';

module.exports = (client, message) => {
    if (message.author.bot || message.channel.type === 'dm') { return; }
    if (!message.channel.permissionsFor(client.user).has('SEND_MESSAGES')) { return; }
    if (!message.content.startsWith(prefix)) { return; }

        let args = message.content.slice(prefix.length).trim().split(/ +/g);
        let commande = args.shift();
        let cmd = client.commands.get(commande);

        if (!cmd) { return; }
            cmd.run(client, message, args);
};

module.exports = (client) => {
    client.user.setPresence({
        game: {
            name: "⚡En Construction.."
        }
    });
};

module.exports.run = (client, message, args) => {
    if (!args.join(' ')) { return message.channel.send('Vous n\'avez pas la spécifié un nom de role !'); }
    if (!message.guild.member(message.author.id).hasPermission('MANAGE_ROLES')) { return message.channel.send('Vous n\'avez pas la permission `gérer les roles` !'); }
    if (!message.guild.member(client.user.id).hasPermission('MANAGE_ROLES')) { return message.channel.send('Je n\'ai pas la permission `gérer les roles` !'); }
    
    let member = message.guild.member(message.author.id);
    let role = message.guild.roles.find((r) => r.name.toLowerCase() === args.join(' ').toLowerCase() || r.id === args.join(' '));

    if (!role) { return message.channel.send('Ce role n\'existe pas !'); }
    if (member.roles.has(role.id)) { return message.channel.send('Vous avez déjà ce role !'); }
    
        member.addRole(role.id)
            .then(() => message.channel.send('Vous avez désormais le role ' + role.toString()))
            .catch(console.error);
};

module.exports.run = (client, message, args) => {
    if (!message.guild.member(message.author).hasPermission('BAN_MEMBERS')) { return message.channel.send('Vous n\'avez pas la permission !'); }
    if (!message.guild.member(client.user).hasPermission('BAN_MEMBERS')) { return message.channel.send('Le bot n\'a pas la permission !'); }
    if (message.mentions.users.size === 0) { return message.channel.send('Vous devez mentionner un utilisateur !'); }

        let banMember = message.guild.member(message.mentions.users.first());
        if (!banMember) { return message.channel.send('Je n\'ai pas trouvé l\'utilisateur !'); }
    
        message.mentions.users.first().send(`Vous êtes banni du serveur **${message.guild.name}** par ${message.author.username}`)
            .then(() => {
                banMember.ban()
                    .then((member) => {
                        message.channel.send(`${member.user.username} est ban ! Par ${message.author.username}`);
                    })
                        .catch((err) => {
                            if (err) { return console.error(err); }
                        });
            })
                .catch((error) => {
                    if (error) { console.error(error); }
                        banMember.ban()
                            .then((member) => {
                                message.channel.send(`${member.user.username} est ban ! Par ${message.author.username}`);
                            })
                                .catch((err) => {
                                    if (err) { return console.error(err); }
                                });
                });
};

module.exports.help = {
    name: 'ban'
};

module.exports.run = (client, message, args) => {
    if (!message.guild.member(message.author).hasPermission('MANAGE_MESSAGES')) { return message.channel.send('Vous n\'avez pas les permissions !'); }
    if (!args[0]) { return message.channel.send('Vous devez spécifier un nombre de messages à supprimer !'); }
    else if (isNaN(args[0])) { return message.channel.send('Veuillez spécifier un nombre !'); }
                                                                              
        message.channel.bulkDelete(args[0])
            .then((messages) => {
                message.channel.send(`**${messages.size}** messages ont été supprimés !`);
            });
};

module.exports.help = {
    name: 'clear'
};

module.exports.run = (client, message, args) => {
    if (!args.join(' ')) { return message.channel.send('Vous n\'avez pas la spécifié un nom de role !'); }
    if (!message.guild.member(message.author.id).hasPermission('MANAGE_ROLES')) { return message.channel.send('Vous n\'avez pas la permission `gérer les roles` !'); }
    if (!message.guild.member(client.user.id).hasPermission('MANAGE_ROLES')) { return message.channel.send('Je n\'ai pas la permission `gérer les roles` !'); }

    let member = message.guild.member(message.author.id);
    let role = message.guild.roles.find((r) => r.name.toLowerCase() === args.join(' ').toLowerCase() || r.id === args.join(' '));

    if (!role) { return message.channel.send('Ce role n\'existe pas !'); }
    if (!member.roles.has(role.id)) { return message.channel.send('Vous n\'avez pas ce role !'); }
    
        member.removeRole(role.id)
            .then(() => message.channel.send('Vous n\'avez désormais plus le role ' + role.toString()))
            .catch(console.error);
};

module.exports.help = {
    name: 'delrole'
};

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

module.exports.run = (client, message, args) => {
    let début = Date.now();
    message.channel.send('Ping')
        .then((m) => m.edit(`Pong : **${Date.now() - début}**ms`));
};

module.exports.help = {
    name: 'ping'
};

module.exports.help = {
    name: 'addrole'
};



client.login('NjQ3OTYwMzk3OTIzNzQ1Nzk1.XdpZcg.L0c3_lXsZsci-GTbQsjqhy3J_ig');
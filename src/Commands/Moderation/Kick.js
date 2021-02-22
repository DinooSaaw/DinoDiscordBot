const { MessageEmbed } = require('discord.js');
const Command = require('../../Structures/Command');
 
module.exports = class extends Command {

    constructor(...args) {
		super(...args, {
            aliases: ['remove'],
			description: 'Kick a user',
			category: 'Moderation',
			usage: '<User> <Reason>',
      userPerms: ['KICK_MEMBERS'],
      botPerms: ['KICK_MEMBERS', 'MANAGE_MESSAGES'],
      guildOnly: true,
      args: true
		});
    }
   
run(message) {

    const kicker = message.author.tag;
    const kicked = message.mentions.members.first();
    const args = message.content.trim().split(/ +/g);
    const reason = args.slice(1).join(" ");
    const channel = message.guild.channels.cache.find(ch => ch.name == 'log');

    if (!reason) return message.channel.send('Sorry, this command requires arguments to function. Usage: `!kick <User> <Reason>`')
    if (kicked.hasPermission(['KICK_MEMBERS', 'BAN_MEMBERS'])) return message.channel.send('This member cant be kicked.');
    
    message.delete()    
    message.channel.send(`*${kicked.user.username}* was successfully kicked.`)
    kicked.kick(reason);
    kicked.send(`Hello, you have been kicked in **${message.guild.name}** by: **${message.author.tag}** for: *${reason}*`).catch(err => console.log(err))

    const embed = new MessageEmbed()
                .setColor('RED')
                .setTitle(`Member Kicked`)
                .setDescription([
                  `**❯ Kicked Member** ${kicked}`,
                  `**❯ Kicker Member** ${kicker}`,
                  `**❯ Server** ${message.guild.name}`,
                  `**❯ Reason** ${reason}`
                ])
                .setTimestamp()

                if (channel) channel.send(embed);
}
}
const { MessageEmbed } = require('discord.js');
const Command = require('../../Structures/Command');
 
module.exports = class extends Command {

    constructor(...args) {
		super(...args, {
            aliases: ['remove'],
			description: 'Ban a user',
			category: 'Moderation',
      usage: '<User> <Reason>',
      userPerms: ['BAN_MEMBERS'],
      botPerms: ['BAN_MEMBERS'],
      guildOnly: true,
      args: true
    });
    }
   
run(message) {

    const banner = message.author.tag;
    const banned = message.mentions.members.first();
    let reason = args[1]
    
    const channel = message.guild.channels.cache.find(ch => ch.name == 'log');

    if (!reason) return message.channel.send('Sorry, this command requires arguments to function. Usage: `!ban <User> <Reason>`')
    if (banned.hasPermission(['BAN_MEMBERS'])) return message.channel.send('This member cant be banned.');
    
    message.delete()    
    message.channel.send(`*${banned.user.username}* Has been hit ban the **BAN** hammer.`)
    message.guild.members.ban(banned);
    banned.send(`Hello, you have been BANNED in **${message.guild.name}** by: **${message.author.tag}** for: *${reason}*`).catch(err => console.log(err))

    const embed = new MessageEmbed()
                .setColor('RED')
                .setTitle(`Member banned`)
                .setDescription([
                  `**❯ Banned Member** ${banned}`,
                  `**❯ Banned Member's Id** ${banned.id}`,
                  `**❯ Banner Member** ${banner}`,
                  `**❯ Server** ${message.guild.name}`,
                  `**❯ Reason** ${reason}`
                ])
                .setTimestamp()

                if (channel) channel.send(embed);
}
}
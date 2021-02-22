const { MessageEmbed } = require('discord.js');
const Command = require('../../Structures/Command');
 
module.exports = class extends Command {

    constructor(...args) {
		super(...args, {
            aliases: ['unremove'],
			description: 'Unan a user',
			category: 'Moderation',
			usage: "<User's ID> <Reason>",
      userPerms: ['BAN_MEMBERS'],
      botPerms: ['BAN_MEMBERS'],
      guildOnly: true,
      args: true
		});
    }
   
run(message) {

    const unbaner = message.author.tag;
    const unbanned = args[0]
    
    const channel = message.guild.channels.cache.find(ch => ch.name == 'log');

    message.delete()    
    message.channel.send(`<@!${unbanned}> Has been unbanned. The **BAN** hammer has spoken.`)
    message.guild.members.unban(unbanned);

    const embed = new MessageEmbed()
                .setColor('RED')
                .setTitle(`Member unbanned`)
                .setDescription([
                  `**❯ Unbanned Member** <@!${unbanned}>`,
                  `**❯ Unbaner Member** ${unbaner}`,
                  `**❯ Server** ${message.guild.name}`,
                  `**❯ Reason** ${reason} || No Reason`
                ])
                .setTimestamp()

                if (channel) channel.send(embed);
}
}
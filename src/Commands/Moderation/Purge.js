const { MessageEmbed } = require('discord.js');
const Command = require('../../Structures/Command');
 
module.exports = class extends Command {

    constructor(...args) {
		super(...args, {
            aliases: ['clear'],
			description: 'Clear Number Of Message',
			category: 'Moderation',
			usage: '<0-100>',
      userPerms: ['MANAGE_MESSAGES'],
      botPerms: ['MANAGE_MESSAGES'],
      guildOnly: true,
      args: true
		});
    }

    run(message) {

        const args = message.content.trim().split(/ +/g);
        const channel = message.guild.channels.cache.find(ch => ch.name == 'log');
        const replys = [
            'Why Try That?!',
            'Error Try Agin ',
            '遅くならないで',  
            'あなたの悪い',
            'Bot Mad!'
        ]

        message.channel.bulkDelete(args[1])

        const embed = new MessageEmbed()
                .setColor('RED')
                .setTitle(`Purge`)
                .setDescription([
                  `**❯ Moderator** ${message.author}`,
                  `**❯ Number Of Message Clear** ${args[1]}`,
                  `**❯ Server** ${message.guild.name}`
                ])
                .setTimestamp()

                if (channel) channel.send(embed);
    }
}
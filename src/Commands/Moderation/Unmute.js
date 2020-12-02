const { MessageEmbed } = require('discord.js');
const Command = require('../../Structures/Command');

module.exports = class extends Command {

    constructor(...args) {
		super(...args, {
			description: 'Unmute a user',
			category: 'Moderation',
			usage: '<User>',
      userPerms: ['MANAGE_ROLES'],
      botPerms: ['MANAGE_ROLES'],
      guildOnly: true,
      args: true
		});
    }

run(message) {

    const muter = message.author.tag;
    const muted = message.mentions.members.first();
    const channel = message.guild.channels.cache.find(ch => ch.name == 'log');
    const role = message.guild.roles.cache.find(role => role.name === 'Muted');

    if (muted.hasPermission(['KICK_MEMBERS', 'BAN_MEMBERS'])) return message.reply('  :warning: This member cant be unmuted.');

    message.delete()
    muted.roles.remove(role)
    message.channel.send(`*${muted.user.username}* was successfully unmuted.`)
    muted.send(`Hello, you have been unmuted in **${message.guild.name}** by: **${message.author.tag}**`).catch(err => console.log(err))
    muted.voice.setMute(false)

    const embed = new MessageEmbed()
                .setColor('RED')
                .setTitle(`Member Unmuted`)
                .setDescription([
                  `**❯ Unmuted Member** ${muted}`,
                  `**❯ Unmuter Member** ${muter}`,
                  `**❯ Server** ${message.guild.name}`
                ])
                .setTimestamp()

                if (channel) channel.send(embed);
}
}
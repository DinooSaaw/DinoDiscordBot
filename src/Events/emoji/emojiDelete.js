const Event = require('../../Structures/Event');
const { MessageEmbed } = require('discord.js');
const chalk = require('chalk');

module.exports = class extends Event {

	constructor(...args) {
		super(...args, {
			once: true
		});
	}

	run(GuildEmoji) {
        const channel = GuildEmoji.guild.channels.cache.find(ch => ch.name == 'log');
        console.log(chalk.hex('#d5d389')('[EMOJI] ')+ chalk.magentaBright(`[${GuildEmoji.guild.name}] `)+ chalk.green(`[<:${GuildEmoji.name}:${GuildEmoji.id}>] `)+ chalk.whiteBright(`Deleted`));

        const embed = new MessageEmbed()
        .setColor('RED')
        .setTitle(`Emoji Delted`)
        .setDescription([
          `**❯ Emoji Code:** ${GuildEmoji.name}:${GuildEmoji.id}`,
          `**❯ Emoji: **    <:${GuildEmoji.name}:${GuildEmoji.id}>`,
        ])
        .setTimestamp()

        if (channel) channel.send(embed);

    }
}
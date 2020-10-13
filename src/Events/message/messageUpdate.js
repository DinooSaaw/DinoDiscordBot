const Event = require('../../Structures/Event');
const DinoEmbed = require('../../Structures/DinoEmbed');
const { Util: { escapeMarkdown } } = require('discord.js');
const { diffWordsWithSpace } = require('diff');
const chalk = require('chalk')

module.exports = class extends Event {

	async run(old, message) {
		if (!message.guild || old.content === message.content || message.author.bot) return;

		const embed = new DinoEmbed()
			.setColor('BLUE')
			.setAuthor(old.author.tag, this.client.user.displayAvatarURL({ dynamic: true }))
			.setTitle('Message Updated')
			.setDescription([
				`**❯ Message ID:** ${old.id}`,
				`**❯ Channel:** ${old.channel}`,
				`**❯ Author:** ${old.author.tag} (${old.author.id})`
			])
			.setURL(old.url)
			.splitFields(diffWordsWithSpace(escapeMarkdown(old.content), escapeMarkdown(message.content))
				.map(result => result.added ? `**${result.value}**` : result.removed ? `~~${result.value}~~` : result.value)
				.join(' '));

        const channel = message.guild.channels.cache.find(ch => ch.name === 'log');
        console.log(chalk.yellow(`[CHAT] `) + chalk.bold.magentaBright(`[${message.guild.name}] `) + chalk.bold.green(`[${message.channel.name}] `) + chalk.bold.white(`User: ${message.author.username} Updated: `) + chalk.red(`${old.content}.`) + chalk.bold.white(` To ${message.content}`));
		if (channel) channel.send(embed);
	}

};
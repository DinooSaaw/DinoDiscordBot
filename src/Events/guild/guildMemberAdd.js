const Event = require('../../Structures/Event');
const chalk = require('chalk');
const { MessageEmbed } = require('discord.js');
const moment = require('moment');

module.exports = class extends Event {

	async run(member) {
		console.log(member)
        const welcome = member.guild.channels.cache.find(ch => ch.name === 'general' || ch.name === 'welcome' || ch.name == 'log');
		const log = member.guild.channels.cache.find(ch => ch.name == 'log' || ch.name == 'logs');
		
        welcome.send(`Welcome to the server ${member}`);
		console.log(chalk.blueBright(`[GUILD] `) + chalk.bold.magenta(`[${member.guild.name}] `) + chalk.white(`User "${member.user.username}" has joined`));
		
        const embed = new MessageEmbed()
			.setThumbnail(member.user.displayAvatarURL({ dynamic: true, size: 512 }))
			.setColor(member.displayHexColor || 'GREEN')
			.addField('User Joined', [
				`**❯ Username:** ${member.user.username}`,
				`**❯ Discriminator:** ${member.user.discriminator}`,
				`**❯ ID:** ${member.id}`,
				`**❯ Avatar:** [Link to avatar](${member.user.displayAvatarURL({ dynamic: true })})`,
				`**❯ Time Created:** ${moment(member.user.createdTimestamp).format('LT')} ${moment(member.user.createdTimestamp).format('LL')} ${moment(member.user.createdTimestamp).fromNow()}`,
				`**❯ Status:** ${member.user.presence.status}`,
				`**❯ Game:** ${member.user.presence.game || 'Not playing a game.'}`,
				`\u200b`
			]).addField('Member', [
				`**❯ Server Join Date:** ${moment(member.joinedAt).format('LL LTS')}`,
				`\u200b`
			]);
			if (!log) {

			}else {
				log.send(embed);
		}
	}
}
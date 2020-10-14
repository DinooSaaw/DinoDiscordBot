const Event = require('../../Structures/Event');
const chalk = require('chalk');
const { MessageEmbed } = require('discord.js');
const moment = require('moment');

module.exports = class extends Event {

	async run(member) {
        const welcome = member.guild.channels.cache.find(ch => ch.name === 'general' || ch.name === 'welcome' || ch.name == 'log');
        const log = member.guild.channels.cache.find(ch => ch.name == 'log');
        if(!welcome) return;
        if(!log) return;

        welcome.send(`${member} Has left the the server `);
        console.log(chalk.blueBright(`[GUILD] `) + chalk.bold.green(`[${member.guild.name}] `) + chalk.white(`User "${member.user.username}" has left`));
        const embed = new MessageEmbed()
			.setThumbnail(member.user.displayAvatarURL({ dynamic: true, size: 512 }))
			.setColor(member.displayHexColor || 'GREEN')
			.addField('User Left', [
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
		log.send(embed);
    }
}
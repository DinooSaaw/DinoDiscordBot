const Event = require('../../Structures/Event');
const { MessageEmbed } = require('discord.js');
const chalk = require('chalk');
const ms = require('ms');

module.exports = class extends Event {

	run(invite) {
		const channel = invite.guild.channels.cache.find(ch => ch.name == 'log');

		console.log(chalk.hex('#509dba')(`[INVITE] `)+ chalk.magentaBright(`[] `) + chalk.green(`[${invite.code}] `)+ chalk.whiteBright(`Deleted`));   
	
		const embed = new MessageEmbed()
		.setColor('RED')
		.setTitle(`Invite Deleted`)
		.setDescription([
		  `**❯ Invite Code** https://discord.gg/${invite.code}`,
		  `**❯ Inviter** ${invite.inviter.username}`,
		  `**❯ Invite Age** ${ms(invite.maxAge, { long: true })}`,
		  `**❯ Invite Max Usage ** ${invite.maxUses}`
		])
		.setTimestamp()

		if (channel) channel.send(embed);


	}

};
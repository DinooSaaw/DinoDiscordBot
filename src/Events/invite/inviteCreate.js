const Event = require('../../Structures/Event');
const { MessageEmbed } = require('discord.js');
const chalk = require('chalk');
const ms = require('ms');

module.exports = class extends Event {

	constructor(...args) {
		super(...args, {
			once: true
		});
	}

	run(invite) {
		const channel = invite.guild.channels.cache.find(ch => ch.name == 'log');

		console.log(chalk.hex('#509dba')(`[INVITE] `)+ chalk.magentaBright(`[${invite.guild.name}] `) + chalk.green(`[${invite.code}] `)+ chalk.whiteBright(`Created`));   

		const embed = new MessageEmbed()
                .setColor('BLUE')
                .setTitle(`Invite Created`)
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
const { MessageEmbed } = require('discord.js');
const Command = require('../../Structures/Command');
const DBUser = require("../../Mongoose/Schema/user");

module.exports = class extends Command {

	constructor(...args) {
		super(...args, {
			aliases: ['bal'],
			description: 'Look at your bal',
			category: 'Economy',
			usage: '',
			guildOnly: true
			// args: true
		});
	}

	async run(message) {
		const member = message.mentions.members.last() || message.member;
        let user = await DBUser.findOne({ id: member.user.id, Username: member.user.username });
		if (!user) return
		const embed = new MessageEmbed()
        .setColor('RANDOM')
        .setTitle(`${member.user.username}'s Money`)
        .setFooter(``)
        .addField(`Money`, [
			`**❯ Money:** $${user.money}`,
			`**❯ Bank Account:** $${user.bank}`
		])
        
		message.channel.send(embed);
	}

};
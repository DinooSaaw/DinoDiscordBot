const { MessageEmbed } = require('discord.js');
const Command = require('../../Structures/Command');
const DBUser = require("../../Mongoose/Schema/user");

module.exports = class extends Command {

	constructor(...args) {
		super(...args, {
			description: 'Look at your bal',
			category: 'Economy',
			usage: '',
			guildOnly: true
			// args: true
		});
	}

	async run(message) {
        let user = await DBUser.findOne({ id: message.author.id, Username: message.author.username });
		if (!user) return
		const embed = new MessageEmbed()
        .setColor('RANDOM')
        .setTitle(`${message.author.username}'s Money`)
        .setFooter(``)
        .addField(`Money`, [
			`**❯ Money:** $${user.money}`,
			`**❯ Bank Account:** $${user.bank}`
		])
        
		message.channel.send(embed);
	}

};
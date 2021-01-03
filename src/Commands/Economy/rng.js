const { MessageEmbed } = require('discord.js');
const Command = require('../../Structures/Command');
const DBUser = require("../../Mongoose/Schema/user");

module.exports = class extends Command {

	constructor(...args) {
		super(...args, {
			description: '',
			category: 'Economy',
			usage: '<number> [x2, x3, x4, x5, All]',
			guildOnly: true
			// args: true
		});
	}

	async run(message) {
		let user = await DBUser.findOne({ id: message.author.id, Username: message.author.username });
		if (!user) return
		const args = message.content.trim().split(/ +/g);
		const Option = args[1]
		const Boost = args[2]
		if (isNaN(Option)) {
			return message.channel.send(`Please Pick A Number Between 1 - 6`)
		}
		if (user.money <= -150) return message.channel.send(`You Have **$${user.money}**`)
		if (user.money < 150) return message.channel.send(`You Have Less Then *$150*, You Have **$${user.money}**`)
		let getRandomNumber = Math.random() * (0, 6);
		let Random = Math.round(getRandomNumber)
		// console.log(Random)
		if (Option > 6) return message.channel.send(`Please Pick A Number **Lower** then 6`)
		if (Option < 1) return message.channel.send(`Please Pick A Number **Higher** then 0`)
		
		if (!Boost){Roll(150)}
		if (Boost == 'x2'){Roll(150*2)}
		if (Boost == 'x3'){Roll(150*3)}
		if (Boost == 'x4'){Roll(150*4)}
		if (Boost == 'x5'){Roll(150*5)}
		if (Boost == 'All'){Roll(user.money)}
		
		function Roll(bet){
		if (Option !=Random) {
			if (user.money < bet) return message.channel.send(`**$${bet}** is need too do this bet`)
			user.money -= bet
			user.save()
			let embed = new MessageEmbed()
			.setTitle('Wrong')
			.setDescription(`The number was ${Random}\n You said ${Option}`)
			.setColor('RED')
			.addField('Transaction', [
				`Your bet was $${bet}!`,
				`**$${bet}** has been removed from your account!`,
				`You new **balance** is **$${user.money}**`,
				`\u200b`
			])
			message.channel.send(embed)
		} else {
			user.money += bet
			user.save()
			let embed = new MessageEmbed()
			.setTitle('Right')
			.setDescription(`The number was indeed ${Random}`)
			.setColor('GREEN')
			.addField('Transaction', [
				`Your bet was $${bet}!`,
				`**$${bet}** has been added from your account!`,
				`You new **balance** is **$${user.money}**`,
				`\u200b`
			])
			message.channel.send(embed)
		}
	}
	}
};
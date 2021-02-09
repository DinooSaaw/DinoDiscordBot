const { MessageEmbed, MessageCollector } = require('discord.js');
const Command = require('../../Structures/Command');
const DBUser = require("../../Mongoose/Schema/user");
const chalk = require('chalk')
module.exports = class extends Command {

	constructor(...args) {
		super(...args, {
			description: 'Displays bots store',
			category: 'Economy',
			usage: '',
			guildOnly: true
		});
	}

	async run(message) {
		let user = await DBUser.findOne({ id: message.author.id, Username: message.author.username });
		if (!user) return message.channel.send(`**${message.author.username}** isnt in the system`)
		if (user.money <= 0) return message.reply(`No Poor People Allowed Here`)
		const embed = new MessageEmbed()
			.setColor('RANDOM')
			.setAuthor(`${message.guild.name} Store`, message.guild.iconURL({ dynamic: true }))
			.setThumbnail(this.client.user.displayAvatarURL())
			.setFooter(`Requested by ${message.author.username}`, message.author.displayAvatarURL({ dynamic: true }))
			.addField('Commands', [
				`**❯ $500,000:** Custom Commands (Id:1)`,
				`**❯ $250,000:** Access **a** Commands (Id:2)`
			])
			.addField('Code', [
				`**❯ $100,000:** Custom Coding Lesson (Id:3)`,
			])
			.addField('Battle Set', [
				`**❯ $50,000:** ~~Diamond Set~~ (Id:4)`,
				`**❯ $90,000:** ~~Gun Set~~ (Id:5)`,
				`**❯ $500,000:** ~~Anime Set~~ (Id:6)`,
			])
			.setFooter(`Requested by ${message.author.username}`, message.author.displayAvatarURL({ dynamic: true }))
			.setTimestamp();
			message.channel.send(embed)
			Buy()

			function Buy(){
				message.channel.send(`**Please Buy With !buy <id>**`)
				const collector = new MessageCollector(message.channel, m => m.author.id === message.author.id, { time: 10000 });
				// console.log(collector)
				collector.on('collect', message => {
					if (message.content == "!buy 1") {
						if (user.Tags.includes('Store:Id1')) return message.reply(`You can only have one **ID1**`)
						if (user.money < 500000) return message.reply(`You dont have enough money`)
						message.reply("You Want To Buy (ID1)!");
						ID1()
					} else if (message.content == "!buy 2") {
						if (user.Tags.includes('Store:Id2')) return message.reply(`You can only have one **ID2**`)
						if (user.money < 250000) return message.reply(`You dont have enough money`)
						message.reply("You Want To Buy (ID2)!");
						ID2()
					} else if (message.content == "!buy 3") {
						if (user.Tags.includes('Store:Id3')) return message.reply(`You can only have one **ID3**`)
						if (user.money < 100000) return message.reply(`You dont have enough money`)
						message.reply("You Want To Buy (ID3)!");
						ID3()
					}
			})
		}
			function ID1() {
				message.channel.send("Are You Sure /n `Yes` or `No`")
				const collector = new MessageCollector(message.channel, m => m.author.id === message.author.id, { time: 10000 });
				// console.log(collector)
				collector.on('collect', message => {
					if (message.content == "Yes") {
						console.log(chalk.hex('70bb65')('[Transaction] ') + chalk.magenta(`[${message.author.username}] `) + chalk.bold.white(`Money: $${user.money} Bank: $${user.bank}`))
						user.money -= 500000
						user.Tags.push('Store:Id1')
						user.save()
						message.channel.bulkDelete(7)
						message.channel.send(`${message.author.username} bought ID1`)
					} else return
			})
		}
			function ID2() {
				message.channel.send("Are You Sure /n `Yes` or `No`")
				const collector = new MessageCollector(message.channel, m => m.author.id === message.author.id, { time: 10000,  });
				// console.log(collector)
				collector.on('collect', message => {
					if (message.content == "Yes") {						
						console.log(chalk.hex('70bb65')('[Transaction] ') + chalk.magenta(`[${message.author.username}] `) + chalk.bold.white(`Money: $${user.money} Bank: $${user.bank}`))
						user.money -=  250000
						user.Tags.push('Store:Id2')
						user.save()
						message.channel.bulkDelete(7)
						message.channel.send(`${message.author.username} bought ID2`)
					} else return	
			})
		}
			function ID3(){
				message.channel.send("Are You Sure /n `Yes` or `No`")
				const collector = new MessageCollector(message.channel, m => m.author.id === message.author.id, { time: 10000 });
				// console.log(collector)
				collector.on('collect', message => {
					if (message.content == "Yes") {
						console.log(chalk.hex('70bb65')('[Transaction] ') + chalk.magenta(`[${message.author.username}] `) + chalk.bold.white(`Money: $${user.money} Bank: $${user.bank}`))
						user.money -=  100000
						user.Tags.push('Store:Id3')
						user.save()
						message.channel.bulkDelete(7)
						message.channel.send(`${message.author.username} bought ID3`)
					} else return	
				})
			}
		}
}
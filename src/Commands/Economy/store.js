const { MessageEmbed, MessageCollector } = require('discord.js');
const Command = require('../../Structures/Command');
const DBUser = require("../../Mongoose/Schema/user");
const DBStore = require("../../Mongoose/Schema/Store");
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
				`**❯ $250,000:** Access **one** Commands (Id:2)`
			])
			.addField('Code', [
				`**❯ $100,000:** Custom Coding Lesson (Id:3)`,
			])
			.addField('Battle Set', [
				`**❯ $50,000:** Diamond Set (Id:4)`,
				`**❯ $90,000:** Riot  Set (Id:5)`,
				`**❯ $500,000:** ~~Anime Set~~ (Id:6)`,
			])
			.setFooter(`Requested by ${message.author.username}`, message.author.displayAvatarURL({ dynamic: true }))
			.setTimestamp();

			message.channel.send(embed)
		
		const Info = new MessageEmbed()
			.setColor('RANDOM')
			.setAuthor(`${message.guild.name} Store`, message.guild.iconURL({ dynamic: true }))
			.setThumbnail(this.client.user.displayAvatarURL())
			.setFooter(`Requested by ${message.author.username}`, message.author.displayAvatarURL({ dynamic: true }))
		
			Buy()

			function Buy(){
				message.channel.send(`**Please Buy With !buy <id>**`)
				message.channel.send(`**You can check more with !info <id>**`)
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
					} else if (message.content == "!buy 4") {
						if (user.Tags.includes('Store:Id4')) return message.reply(`You can only have one **ID4**`)
						if (user.money < 50000) return message.reply(`You dont have enough money`)
						message.reply("You Want To Buy (ID4)!");
						ID4()
					} else if (message.content == "!buy 5") {
						if (user.Tags.includes('Store:Id5')) return message.reply(`You can only have one **ID5**`)
						if (user.money < 90000) return message.reply(`You dont have enough money`)
						message.reply("You Want To Buy (ID5)!");
						ID5()
					} else if (message.content == "!buy 6") {
						if (user.Tags.includes('Store:Id6')) return message.reply(`You can only have one **ID6**`)
						if (user.money < 100000) return message.reply(`You dont have enough money`)
						message.reply("You Want To Buy (ID6)!");
						ID6()
					} else if (message.content == "!info 1") {
						InfoID1()
					} else if (message.content == "!info 2") {
						InfoID2()
					} else if (message.content == "!info 3") {
						InfoID3()
					} else if (message.content == "!info 4") {
						InfoID4()
					} else if (message.content == "!info 5") {
						InfoID5()
					} else if (message.content == "!info 6") {
						InfoID6()
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
			function ID4(){
				message.channel.send("Are You Sure /n `Yes` or `No`")
				const collector = new MessageCollector(message.channel, m => m.author.id === message.author.id, { time: 10000 });
				// console.log(collector)
				collector.on('collect', message => {
					if (message.content == "Yes") {
						console.log(chalk.hex('70bb65')('[Transaction] ') + chalk.magenta(`[${message.author.username}] `) + chalk.bold.white(`Money: $${user.money} Bank: $${user.bank}`))
						user.money -=  50000
						user.Tags.push('Store:Id4')
						if (user.Inventory.includes('Iron_Sword')) {
							user.Inventory.pull('Iron_Sword')
						}
						if (user.Inventory.includes('Glock-19')) {
							user.Inventory.pull('Glock-19')
						}
						user.Inventory.push('Diamond_Sword')
						user.save()
						message.channel.bulkDelete(7)
						message.channel.send(`${message.author.username} bought ID4`)
					} else return	
				})
		}
			function ID5(){
				message.channel.send("Are You Sure /n `Yes` or `No`")
				const collector = new MessageCollector(message.channel, m => m.author.id === message.author.id, { time: 10000 });
				// console.log(collector)
				collector.on('collect', message => {
					if (message.content == "Yes") {
						console.log(chalk.hex('70bb65')('[Transaction] ') + chalk.magenta(`[${message.author.username}] `) + chalk.bold.white(`Money: $${user.money} Bank: $${user.bank}`))
						user.money -=  90000
						user.Tags.push('Store:Id5')
						if (user.Inventory.includes('Iron_Sword')) {
							user.Inventory.pull('Iron_Sword')
						}
						if (user.Inventory.includes('Diamond_Sword')) {
							user.Inventory.pull('Diamond_Sword')
						}
						user.Inventory.push('Glock-19')
						if (user.Inventory.includes('Wooden_Shield')) {
							user.Inventory.pull('Wooden_Shield')
						}
						user.Inventory.push('Riot_Shield')
						user.save()
						message.channel.bulkDelete(7)
						message.channel.send(`${message.author.username} bought ID5`)
					} else return	
				})
		}
			function InfoID1 () {
				Info.addField('Custom Command', [
					`**❯ Cost:** $500,000`,
					`**❯ ID:** 1`,
					`**❯ Name:** Custom Command`
				])
				
				message.channel.bulkDelete(7)
				message.channel.send(Info)
		}	
			function InfoID2 () {
				Info.addField('Custom Command', [
					`**❯ Cost:** $500,000`,
					`**❯ ID:** 1`,
					`**❯ Name:** Custom Command`
				])

				message.channel.bulkDelete(7)
				message.channel.send(Info)
		}
			function InfoID3 () {
				Info.addField('Custom Coding Lesson', [
					`**❯ Cost:** $100,000`,
					`**❯ ID:** 3`,
					`**❯ Name:** Custom Coding Lesson`
				])

				
				message.channel.bulkDelete(7)
				message.channel.send(Info)
		}
			function InfoID4 () {
				Info.addField('Diamond Set', [
					`**❯ Cost:** $50,000`,
					`**❯ ID:** 4`,
					`**❯ Name:** Diamond Set`
				])
				
				message.channel.bulkDelete(7)
				Info.addField('Unlocks', [
					`**❯ Sword:** *Diamond Sword*`,
					`**❯ Shield:** *Null*`,

				])
				message.channel.send(Info)
		}
			function InfoID5 () {
				Info.addField('Riot Set', [
					`**❯ Cost:** $90,000`,
					`**❯ ID:** 5`,
					`**❯ Name:** Riot Set`
				])
				
				message.channel.bulkDelete(7)
				Info.addField('Unlocks', [
					`**❯ Sword:** *Glock-19*`,
					`**❯ Shield:** *Riot_Shield*`,
				])
				message.channel.bulkDelete(7)
				// message.channel.send(Info)
		}
			function InfoID6 () {
				Info.addField('Custom Command', [
					`**❯ Cost:** $500,000`,
					`**❯ ID:** 1`,
					`**❯ Name:** Custom Command`
				])

				message.channel.bulkDelete(7)
				// message.channel.send(Info)
		}
	}
}
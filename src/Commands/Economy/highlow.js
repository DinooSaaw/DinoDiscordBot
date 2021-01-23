const { MessageEmbed, MessageCollector } = require('discord.js');
const Command = require('../../Structures/Command.js');
const DBUser = require("../../Mongoose/Schema/user");

module.exports = class extends Command {

	constructor(...args) {
		super(...args, {
			aliases: ['lowerhigher'],
			description: 'This is a Higher Lower Game',
			category: 'Economy',
			usage: '!highlow',
			guildOnly: true,
			// bugtesting: true
		});
	}

	// eslint-disable-next-line no-unused-vars
	async run(message) {
        let user = await DBUser.findOne({ id: message.author.id, Username: message.author.username });
		if (!user) return
		if (user.money <= 0) return message.reply(`No Poor People Allowed Here`)
        let networth = user.money + user.bank
        if (networth >= 1500000) return message.reply(`Your Have Hit The Max Net Worth`)
        
        let number = Math.floor(Math.random() * (100 - 1) + 1)
        let hint = Math.floor(Math.random() * (100 - 1) + 1)
        let money = Number(Math.floor(Math.random() * (300 - 1) + 1))
        console.log(number)
        let embedA = new MessageEmbed()
        .setTitle(`${message.author.username}'s High-Low Game`)
        .setDescription(`A number secret between 1-100 has been chosen.\n Your hint is **${hint}**. \n Respond with "*high*", "*low*", or "*jackpot*".`)
        .setFooter(`Choose whether you think the hidden number is higher, lower, or the same number as the hint`)
        message.channel.send(embedA)
        const collector = new MessageCollector(message.channel, m => m.author.id === message.author.id, { time: 10000 });
        collector.on('collect', message => {
            if (message.content == "high") {
                if (hint < number){
                    embedA.setDescription(`**You won $${money}**`)
                    embedA.setColor('GREEN')
                    embedA.setFooter(`Your hint is ${hint} The number was ${number}`)
                    message.channel.bulkDelete(3)
                    message.channel.send(embedA)
                    user.money += money 
                    user.save()
                    collector.stop()
                } else {
                    embedA.setDescription(`**You Lose**`)
                    embedA.setColor('RED')
                    embedA.setFooter(`Your hint is ${hint} The number was ${number}`)
                    message.channel.bulkDelete(3)
                    message.channel.send(embedA)
                    collector.stop()
                }
            }
            if (message.content == "low") {
                if (hint > number){
                    embedA.setDescription(`**You won $${money}**`)
                    embedA.setColor('GREEN')
                    embedA.setFooter(`Your hint is ${hint} The number was ${number}`)
                    message.channel.bulkDelete(3)
                    message.channel.send(embedA)
                    user.money += money
                    user.save()
                    collector.stop()
                } else {
                    embedA.setDescription(`**You Lose**`)
                    embedA.setColor('RED')
                    embedA.setFooter(`Your hint is ${hint} The number was ${number}`)
                    message.channel.bulkDelete(3)
                    message.channel.send(embedA)
                    collector.stop()
                }
            }
            if (message.content == "jackpot") {
                if (hint === number){
                    embedA.setDescription(`**You won $${money}**`)
                    embedA.setColor('GREEN')
                    embedA.setFooter(`Your hint is ${hint} The number was ${number}`)
                    message.channel.bulkDelete(3)
                    user.money += money
                    user.save()
                    message.channel.send(embedA)
                    collector.stop()
                } else {
                    embedA.setDescription(`**You Lose**`)
                    embedA.setColor('RED')
                    embedA.setFooter(`Your hint is ${hint} The number was ${number}`)
                    message.channel.bulkDelete(3)
                    message.channel.send(embedA)
                    collector.stop()
                }
            }	
})
}
}
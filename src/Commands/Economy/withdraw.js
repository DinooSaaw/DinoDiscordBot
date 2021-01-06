const { MessageEmbed } = require('discord.js');
const Command = require('../../Structures/Command');
const DBUser = require("../../Mongoose/Schema/user");
const chalk = require('chalk')

module.exports = class extends Command {

	constructor(...args) {
		super(...args, {
			description: '',
			category: 'Economy',
			usage: '<Money>',
			guildOnly: true
			// args: true
		});
	}

	async run(message) {
		let user = await DBUser.findOne({ id: message.author.id, Username: message.author.username });
        if (!user) return
        const args = message.content.trim().split(/ +/g);
        const Money = args[1]
        if (!Money) return
        // console.log(Money)
        
        if (user.bank < 0) return
        if (Money === "All") { 
            let AllHand = user.bank
            Withdraw(AllHand)
        } else if (Money === "all"){
            let AllHand = user.bank
            Withdraw(AllHand)
        } else {
            if (isNaN(Money)) return
            if (Money <= 0) return
            Withdraw(Money)
        }
        function Withdraw(cash){
        if (user.bank < Money) return message.channel.send(`You don't have enough money in the bank`)
        let CASH = new Number(cash)
        console.log(chalk.hex('70bb65')('[Transaction] ') + chalk.magenta(`[${message.author.username}] `) + chalk.bold.white(`Money: $${user.money} Bank: $${user.bank}`))
        user.money += CASH
        user.bank -= CASH
        user.save()
        const embem = new MessageEmbed() 
        .setTitle('Bank')
        .setColor('RANDOM')
        .addField('Transaction', [
            `$${CASH} Has Been Removed From ${message.author.username}`,
            `$${CASH} Has Been Add To ${message.author.username}'s Money`
            ])
        message.channel.send(embem)
        }
        }
        
};

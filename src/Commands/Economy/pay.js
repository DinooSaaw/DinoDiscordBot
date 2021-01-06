const { MessageEmbed } = require('discord.js');
const Command = require('../../Structures/Command');
const DBUser = require("../../Mongoose/Schema/user");
const chalk = require('chalk')
module.exports = class extends Command {

	constructor(...args) {
		super(...args, {
			description: '',
			category: 'Economy',
			usage: '<user> <money>',
			guildOnly: true
			// args: true
		});
	}

	async run(message) {
		let user = await DBUser.findOne({ id: message.author.id, Username: message.author.username });
        if (!user) return
        if (user.money <= 0) return
        const member = message.mentions.members.last() || message.member;
        if (!member) return
        let user1 = await DBUser.findOne({ id: member.id, Username: member.user.username });
        if (!user1) return
        const args = message.content.trim().split(/ +/g);
		const MOENY = args[2]
        if (isNaN(MOENY)) return
        if (MOENY <= 0) return
        if (user.money <= 0) return
        if (user == user1) return
        if (message.author.username == member.user.username) return
        let UserMone = Number(MOENY)
        let UserMon = Math.round(UserMone)
        Pay(UserMone)
        
        
        function Pay(Payoney){
            console.log(chalk.hex('70bb65')('[Transaction] ') + chalk.magenta(`[${message.author.username}] `) + chalk.bold.white(`Money: $${user.money} Bank: $${user.bank}`))
            console.log(chalk.hex('70bb65')('[Transaction] ') + chalk.magenta(`[${member.user.username}] `) + chalk.bold.white(`Money: $${user1.money} Bank: $${user1.bank}`))
            user.money -= Payoney
            user1.money += Payoney
            user.save()
            user1.save()
            let embem = new MessageEmbed() 
            .setTitle('Pay')
            .setColor(member.displayHexColor || 'RANDOM')
            .addField('Transaction', [
            `$${UserMon} Has Been Removed From ${message.author.username}`,
            `$${UserMon} Has Been Add To ${member.user.username}`
        ])
        message.channel.send(embem)
        }
        
	}
};
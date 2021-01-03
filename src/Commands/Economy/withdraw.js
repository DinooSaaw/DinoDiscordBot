const { MessageEmbed } = require('discord.js');
const Command = require('../../Structures/Command');
const DBUser = require("../../Mongoose/Schema/user");

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
		const MOENY = args[1]
        if (isNaN(MOENY)) return
        if (user.bank < 0) return
        if (user.bank < MOENY) return
        const embem = new MessageEmbed() 
        .setTitle('Bank')
        .setColor('RANDOM')
        .addField('Transaction', [
            `$${MOENY} Has Been Removed From ${message.author.username}`,
            `$${MOENY} Has Been Add To ${message.author.username}'s Money`
        ])
        Bank(MOENY)
        function Bank(Payoney){
            user.bank -= Payoney
            user.money += Payoney
            user.save()
            message.channel.send(embem)
        }
        
	}
};

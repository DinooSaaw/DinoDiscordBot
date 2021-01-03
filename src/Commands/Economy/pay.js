const { MessageEmbed } = require('discord.js');
const Command = require('../../Structures/Command');
const DBUser = require("../../Mongoose/Schema/user");

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
        const member = message.mentions.members.last() || message.member;
        if (!member) return
        let user1 = await DBUser.findOne({ id: member.id, Username: member.user.username });
        if (!user1) return
        const args = message.content.trim().split(/ +/g);
		const MOENY = args[2]
        if (user == user1) return
        if (message.author.username == member.user.username) return
        if (isNaN(MOENY)) return
        const embem = new MessageEmbed() 
        .setTitle('Pay')
        .setColor(member.displayHexColor || 'RANDOM')
        .addField('Transaction', [
            `$${MOENY} Has Been Removed From ${message.author.username}`,
            `$${MOENY} Has Been Add To ${member.user.username}`
        ])
        Pay(MOENY)

        function Pay(Payoney){
            user.money -= Payoney
            user1.money += Payoney
            user.save()
            user1.save()
            message.channel.send(embem)
        }

	}
};
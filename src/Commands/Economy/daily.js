const { MessageEmbed } = require('discord.js');
const Command = require('../../Structures/Command');
const DBUser = require("../../Mongoose/Schema/user");

module.exports = class extends Command {

	constructor(...args) {
		super(...args, {
			aliases: [''],
			description: 'prestige',
			category: 'Economy',
			usage: '',
			guildOnly: true
			// args: true
		});
	}

	async run(message) {
        
        let user = await DBUser.findOne({ id: message.author.id, Username: message.author.username });
		if (!user) return
        const checkOrCross = (bool) => bool ? '✅' : '❎';
        const day = Date.now()
        const b = (Date.now)
        const a = (Date.now - day) > 0
		message.channel.send(checkOrCross(a))
		message.channel.send(checkOrCross(b))
        
    }
}
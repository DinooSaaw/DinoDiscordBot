const { MessageEmbed } = require("discord.js");
const Command = require('../../Structures/Command');

module.exports = class extends Command {

    
    constructor(...args) {
		super(...args, {
			description: 'Get A Invite To Add The Bot To Your Own Server',
			category: 'Utilities',
			usage: '!Invite'
		});
    }
    
    async run(message) {
		let embed = new MessageEmbed()
			.setTitle("Here's the link!")
			.setColor('Blue')
			.setDescription(`[Invite ${message.client.user.username} to your server](https://discordapp.com/oauth2/authorize?client_id=${message.client.user.id}&scope=bot&permissions=8)`);

		message.channel.send(embed);
    }
}
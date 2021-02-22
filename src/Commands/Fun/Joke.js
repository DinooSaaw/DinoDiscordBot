const Discord = require('discord.js')
const Command = require('../../Structures/Command');
const { MessageEmbed, version: djsversion } = require('discord.js');
const joke = require('one-liner-joke').getRandomJoke

module.exports = class extends Command {

    constructor(...args) {
		super(...args, {
			description: 'Give a random joke',
			category: 'Fun',
			usage: '',
			guildOnly: true
		});
	}

	// eslint-disable-next-line no-unused-vars
	async run(message) {
        const embed = new MessageEmbed()
        .setColor('#82F282')
        .setDescription(joke().body)
        .setFooter('')
    message.channel.send(embed)
  }
}   
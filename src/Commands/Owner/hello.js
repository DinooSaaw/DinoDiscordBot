const Command = require('../../Structures/Command.js');

module.exports = class extends Command {

	constructor(...args) {
		super(...args, {
			aliases: ['hallo'],
			description: 'This is a default command',
			//category: 'Owner',
			usage: '!hello',
			guildOnly: true,
			//ownerOnly: true,
			bugtesting: true
		});
	}

	// eslint-disable-next-line no-unused-vars
	async run(message, args) {
		const choices = require("../../Assets/Text/HelloChoices.json")
		const response = choices[Math.floor(Math.random() * choices.length)];
		message.reply(` ${response}`)
	}

};
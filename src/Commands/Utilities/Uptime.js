const Command = require('../../Structures/Command');
const ms = require('ms');

module.exports = class extends Command {

	constructor(...args) {
		super(...args, {
			aliases: ['utime'],
			description: 'This provides the current uptime of the bot.',
			category: 'Utilities',
			usage: '!uptime'
		});
	}

	async run(message) {
		message.channel.send(`My uptime is \`${ms(this.client.uptime, { long: true })}\``);
	}

};
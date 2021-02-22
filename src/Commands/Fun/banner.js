const Command = require('../../Structures/Command');
const figlet = require('util').promisify(require('figlet'));

module.exports = class extends Command {
    constructor(...args) {
		super(...args, {
			description: 'makes your text look cool',
			category: 'Fun',
			usage: '<text>',
			guildOnly: true,
			args: true
		});
	}

    async run(msg, ...banner) {
         return msg.channel.send(await figlet(banner), { code: true});
    }
};
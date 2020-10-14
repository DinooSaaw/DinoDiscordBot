const Event = require('../Structures/Event');
const chalk = require('chalk');

module.exports = class extends Event {

	constructor(...args) {
		super(...args, {
			once: true
		});
	}

	run() {
		console.log([
			chalk.hex('82F282')(`[SYSTEM] `) + chalk.bold.white`Logged in as ${this.client.user.tag}`,
			chalk.hex('82F282')(`[SYSTEM] `) + chalk.bold.white`Loaded ${this.client.commands.size} commands!`,
			chalk.hex('82F282')(`[SYSTEM] `) + chalk.bold.white`Loaded ${this.client.events.size} events!`,
			chalk.hex('82F282')(`[SYSTEM] `) + chalk.bold.white`In ${this.client.guilds.cache.size} Servers!`,
			chalk.hex('82F282')(`[SYSTEM] `) + chalk.bold.white`In ${this.client.channels.cache.size} Channels!`,
			chalk.hex('82F282')(`[SYSTEM] `) + chalk.bold.white`With ${this.client.guilds.cache.reduce((a, b) => a + b.memberCount, 0)} Users!`

		].join('\n'));

		this.client.user.setActivity(`${this.client.prefix}help | Boop Beep`)
        console.log(chalk.hex('82F282')(`[SYSTEM] `) + chalk.bold.white(`Client Activity Set To ${this.client.user.presence.status}`))
            
    
    }

};
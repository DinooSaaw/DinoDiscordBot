const Event = require('../Structures/Event');
const chalk = require('chalk');
const config = require('../../config.json');
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
			chalk.hex('82F282')(`[SYSTEM] `) + chalk.bold.white`With ${this.client.guilds.cache.reduce((a, b) => a + b.memberCount, 0)} Users!`,
		].join('\n'));

		const activities = [
			`Helping In ${this.client.guilds.cache.size} Servers!`,
			`Helping in ${this.client.channels.cache.size} Channels!`,
			`Beep Boop!`,
			`Use ${this.client.prefix}invite to invite me!`,
			`Need help for any command? Use ${this.client.prefix}help <command>!`,
			`Helping ${this.client.guilds.cache.reduce((a, b) => a + b.memberCount, 0)} Users!`
		];

		const type = [
			'PLAYING',
			'STREAMING',
			'LISTENING',
			'WATCHING',
			// 'CUSTOM_STATUS',
			// 'COMPETING'
		]

		let i = 0;
		setInterval(() => this.client.user.setActivity(`${this.client.prefix}help || ${activities[i++ % activities.length]}`, { type: `${type[i++ % type.length]}` }), 30000);
		//setInterval(() => console.log(chalk.hex('82F282')(`[SYSTEM] `) + chalk.bold.white`${this.client.activity.details}`), 60000);
            
    }

};
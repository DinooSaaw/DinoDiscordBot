const Event = require('../../Structures/Event');
const chalk = require('chalk');

module.exports = class extends Event {

	async run(Guild) {
    console.log(chalk.blueBright(`[GUILD] `) + chalk.bold.green(`[${Guild.name}] `) + chalk.white(`${this.client.user.tag} has joined`))
    chalk.hex('82F282')(`[SYSTEM] `) + chalk.bold.white`Now In ${this.client.guilds.cache.size} Servers!`,
		chalk.hex('82F282')(`[SYSTEM] `) + chalk.bold.white`Now In ${this.client.channels.cache.size} Channels!`,
		chalk.hex('82F282')(`[SYSTEM] `) + chalk.bold.white`Now With ${this.client.guilds.cache.reduce((a, b) => a + b.memberCount, 0)} Users!`
    }
}
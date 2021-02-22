const Event = require('../../Structures/Event');
const chalk = require('chalk');

module.exports = class extends Event {

	async run(Guild, User) {
        console.log(chalk.blueBright(`[GUILD] `) + chalk.bold.magentaBright(`[${Guild.name}] `) + chalk.white(`User "${User.username}" has Been Banned.`));
    }
}
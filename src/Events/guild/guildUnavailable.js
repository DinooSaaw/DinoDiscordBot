const Event = require('../../Structures/Event');
const chalk = require('chalk');

module.exports = class extends Event {

	async run(Guild) {
    console.log(chalk.blueBright(`[GUILD] `) + chalk.bold.green(`[${Guild.name}] `) + chalk.white(`Has Became Unavaliable`))
    }
}
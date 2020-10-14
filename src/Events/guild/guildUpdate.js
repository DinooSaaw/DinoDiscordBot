const Event = require('../../Structures/Event');
const chalk = require('chalk');

module.exports = class extends Event {

	async run(oldGuild, newGuild) {
    console.log(chalk.blueBright(`[GUILD] `) + chalk.yellow(`${oldGuild.name} `) +chalk.white(`is now `)+ chalk.yellow(`${newGuild.name}`))
    }
}
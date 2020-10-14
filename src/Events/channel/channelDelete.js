const Event = require('../../Structures/Event');
const chalk = require('chalk');

module.exports = class extends Event {

	async run(GuildChannel, DMChannel) {
        if (DMChannel) return console.log(DMChannel)
        if (GuildChannel.type == 'dm') return; 
        console.log(chalk.blueBright(`[GUILD] `) + chalk.bold.magentaBright(`[${GuildChannel.guild.name}] `) + chalk.bold.green(`${GuildChannel.name} `) + chalk.bold.white(`The ${GuildChannel.type} Channel Was Deleted `))
        }
}
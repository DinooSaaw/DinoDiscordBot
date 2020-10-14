const Event = require('../Structures/Event');
const chalk = require('chalk')

module.exports = class extends Event {

	run(channel, user) {
        console.log(chalk.blueBright(`[GUILD] `) +chalk.bold.green(`[${channel.guild.name}] `) + chalk.yellowBright(`${user.username} `)+chalk.white(`Started Typing In `)+ chalk.yellowBright(`${channel.name}`))
    }
}
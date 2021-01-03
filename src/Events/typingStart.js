const Event = require('../Structures/Event');
const chalk = require('chalk')

module.exports = class extends Event {

	run(channel, user) {
        if (!channel.guild) return
        
        console.log(chalk.blueBright(`[GUILD] `) +chalk.bold.magentaBright(`[${channel.guild.name}] `) +chalk.bold.green(`[${channel.name}] `) + chalk.yellowBright(`${user.username} `)+chalk.white(`Started Typing `))
        //console.log(user)
    }
}
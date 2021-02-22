const Event = require('../../Structures/Event');
const chalk = require('chalk');

module.exports = class extends Event {

	async run(oldChannel, newChannel) {
        if (oldChannel.type == 'dm') return; 
        if (newChannel.type == 'dm') return; 
        // console.log(oldChannel)
        // console.log(newChannel)
        // console.log(chalk.blueBright(`[GUILD] `) + chalk.bold.magentaBright(`[${oldChannel.guild.name}] `) + chalk.bold.green(`${oldChannel.name} `) + chalk.bold.white(`The ${oldChannel.type} Channel Was Updated. Topic: `)+ chalk.green(`${oldChannel.topic}`))
        console.log(chalk.blueBright(`[GUILD] `) + chalk.bold.magentaBright(`[${newChannel.guild.name}] `) + chalk.bold.green(`${newChannel.name} `) + chalk.bold.white(`The ${newChannel.type} Channel Was Updated Topic: `)+ chalk.green(`${newChannel.topic}`))
    
    }
}
const Event = require('../../Structures/Event');
const { MessageEmbed } = require('discord.js');
const chalk = require('chalk');

module.exports = class extends Event {

	run(Role) {
        const channel = Role.guild.channels.cache.find(ch => ch.name == 'log');
        console.log(chalk.hex('f69aeb')('[ROLE] ')+ chalk.magentaBright(`[${Role.guild.name}] `)+ chalk.green(`[${Role.name}] `)+ chalk.whiteBright(`Deleted`));

        const embed = new MessageEmbed()
        .setColor(Role.color || 'RED')
        .setTitle(`Role Deleted`)
        .setDescription([
          `**❯ Role Name:**  ${Role.name}`
        ])
        .setTimestamp()

        if (channel) channel.send(embed);

    }
}
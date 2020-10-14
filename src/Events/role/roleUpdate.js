const Event = require('../../Structures/Event');
const DinoEmbed = require('../../Structures/DinoEmbed');
const { Util: { escapeMarkdown } } = require('discord.js');
const { diffWordsWithSpace } = require('diff');
const chalk = require('chalk')

module.exports = class extends Event {

	run(oldRole, newRole) {
        const channel = newRole.guild.channels.cache.find(ch => ch.name == 'log');
        console.log(chalk.hex('f69aeb')('[ROLE] ')+ chalk.magentaBright(`[${oldRole.guild.name}] `)+ chalk.green(`[${oldRole.name}] `) + chalk.blue(`[${oldRole.color}] `)+ chalk.whiteBright(`OldRole Update`));
        console.log(chalk.hex('f69aeb')('[ROLE] ')+ chalk.magentaBright(`[${newRole.guild.name}] `)+ chalk.green(`[${newRole.name}] `) + chalk.blue(`[${newRole.color}] `)+ chalk.whiteBright(`newRole Update`));

        const embed = new DinoEmbed()
        .setColor(newRole.color || 'YELLOW')
        .setTitle(`Role Update`)
        .setDescription([
          `**❯ Old Role Name:**  ${oldRole.name}`,
          `**❯ New Role Name:**  ${newRole.name}`,
          `**❯ Old Role Color Id:**  ${oldRole.color}`,
          `**❯ New Role Color Id:**  ${newRole.color}`
        ])

        if (channel) channel.send(embed);

    }
}
const Event = require('../Structures/Event');
const DinoEmbed = require('../Structures/DinoEmbed');
const { Util: { escapeMarkdown } } = require('discord.js');
const { diffWordsWithSpace } = require('diff');
const chalk = require('chalk')

module.exports = class extends Event {

	run(channel, user) {
        console.log(chalk.hex('82F282')(`[SYSTEM] `) + chalk.white(`${user.username} Started Typing In ${channel.guild.name} In ${channel.name}`))
    }
}
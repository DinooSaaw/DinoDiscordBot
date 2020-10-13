const Event = require('../../Structures/Event');
const DinoEmbed = require('../../Structures/DinoEmbed');
const chalk = require('chalk')

module.exports = class extends Event {

    async run(message){
        
        if (!message.guild || message.author.bot) return;
        const attachments = message.attachments.size ? message.attachments.map(attachment => attachment.proxyURL) : null;
        const embed = new DinoEmbed()
            .setColor('RED')
            .setAuthor(message.author.tag, this.client.user.displayAvatarURL({ dynamic: true }))
            .setTitle('Message Deleted')
            .setDescription([
                `**❯ Message ID:** ${message.id}`,
                `**❯ Channel:** ${message.channel}`,
                `**❯ Author:** ${message.member.displayName}`,
                `**❯ Date:** ${message.createdAt.toLocaleString()}`
            ])
        if (message.content.length) {
            embed.spliceFields(`**❯ Number Of Deleted Message:** ${message.size}`)
        }

        const channel = message.guild.channels.cache.find(ch => ch.name == 'log');
        if (channel) channel.send(embed);
        console.log(chalk.yellow(`[CHAT] `) + chalk.bold.magentaBright(`[${message.guild.name}] `) + chalk.bold.green(`[${message.channel.name}] `) + chalk.bold.red(`User: ${message.author.username} Said: ${message.content} In: ${message.channel.name}`))
    }
}
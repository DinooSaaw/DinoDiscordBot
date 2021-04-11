const { MessageEmbed } = require('discord.js');
const DBUser = require("../../Mongoose/Schema/user");
const DBGuild = require("../../Mongoose/Schema/Guild");

module.exports = {
    name: "store",
    description:
      "View The Store",
    usage: "store",
	aliases: ['shop'],
    category: "Economy",
    run: async (client, message, args) => {
        let user = await DBUser.findOne({ id: message.author.id, Username: message.author.username });
        if (!user) return message.channel.send(`**${message.author.username}** isnt in the system`)
        let guild = await DBGuild.findOne({ GuildId: message.guild.id})
		if (!guild) return message.channel.send(`Something when wrong!`)                
        let store = new MessageEmbed()
        .setColor(guild.embedColor)
        .setTitle(`${message.client.user.username}'s Store`)
        .addFields(
            { name: '**1.** Custom Guild Command', value: '$__500,000__', inline: true },
            { name: '**2.** Custom Global Command', value: '$__750,000__', inline: true },
            { name: '\u200B', value: '\u200B' },
        )
        .setFooter(`Buy with !buy <id>`)
        message.channel.send(store)
    }

};
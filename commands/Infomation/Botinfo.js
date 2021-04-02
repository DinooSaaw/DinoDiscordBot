const { MessageEmbed, version: djsversion } = require('discord.js');
const { utc } = require('moment');
const { version } = require('../../package.json');
const DBGuild = require("../../Mongoose/Schema/Guild");


module.exports = {
    name: "botinfo",
    description:
      "Shows the infomation of the bot",
    usage: "botinfo",
    category: "Infomation",
    run: async (client, message) => {
        let guild = await DBGuild.findOne({ GuildId: message.guild.id})
		if (!guild) return message.channel.send(`Something when wrong!`)                
		const embed = new MessageEmbed()
			.setThumbnail(client.user.displayAvatarURL())
			.setColor(message.guild.me.displayHexColor || guild.embedColor)
			.addField('General', [
				`**❯ Client:** ${client.user.tag} (${client.user.id})`,
				`**❯ Commands:** ${client.commands.size}`,
				`**❯ Servers:** ${client.guilds.cache.size.toLocaleString()} `,
				`**❯ Users:** ${client.guilds.cache.reduce((a, b) => a + b.memberCount, 0).toLocaleString()}`,
				`**❯ Channels:** ${client.channels.cache.size.toLocaleString()}`,
				`**❯ Creation Date:** ${utc(client.user.createdTimestamp).format('Do MMMM YYYY HH:mm:ss')}`,
				`**❯ Discord Server:** [Link](https://discord.gg/5SmasyAn8b)`,
				'**❯ GitHub:** [Github Page](https://github.com/DinooSaaw/DinoDiscordBot/tree/Heroku)',
				`**❯ Version:** v${version}`,
				`**❯ Discord.js:** v${djsversion}`,
				'\u200b'
			])
			.setTimestamp();

		message.channel.send(embed);
	}

};
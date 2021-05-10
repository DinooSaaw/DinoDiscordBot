const { MessageEmbed } = require('discord.js');
const DBUser = require("../../Mongoose/Schema/user");
const DBGuild = require("../../Mongoose/Schema/Guild");

module.exports = {
    name: "gta",
    description:
      "Work out the money your getting",
    usage: "gta",
	aliases: ['moneycal'],
    category: "Economy",
    run: async (client, message, args) => {
        let user = await DBUser.findOne({ id: message.author.id, Username: message.author.username });
        if (!user) return message.channel.send(`**${message.author.username}** isnt in the system`)
        let guild = await DBGuild.findOne({ GuildId: message.guild.id})
		if (!guild) return message.channel.send(`Something when wrong!`)                

        if (!args[0]) return message.channel.send('Please specify your cut.');
        if (!args[1]) return message.channel.send('Please specify a total money pool.');
        if (args[2]) return message.channel.send('Too many arguments.');
        if (args[0] == '0') return message.channel.send(`Your cut cant be 0%. || ${replys[Math.floor(Math.random() * replys.length)]}`)
        if (args[1] == '0') return message.channel.send(`Your total money cant be $0. ||${replys[Math.floor(Math.random() * replys.length)]}`)
        var percentage = args[1]/100
        var money = percentage * args[2]

        const member = message.member
        const embed = new MessageEmbed()
        .setThumbnail(member.user.displayAvatarURL({ dynamic: true, size: 512 }))
			.setColor(guild.Colorembed)
			.addField('Money', [
				`**❯ ${message.author}'s Cut:** ${args[0]}%`,
				`**❯ Total Player Money Pool:** $${args[1]}`,
				`**❯ ${message.author}'s Money:** $${money} `
			])
			.setTimestamp();

		message.channel.send(embed);
    }
}
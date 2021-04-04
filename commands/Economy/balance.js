const { MessageEmbed } = require('discord.js');
const DBUser = require("../../Mongoose/Schema/user");
const DBGuild = require("../../Mongoose/Schema/Guild");

module.exports = {
    name: "balance",
    description:
      "Get your balance",
    usage: "balance <user>",
	aliases: ['bal'],
    category: "Economy",
    run: async (client, message, args) => {
		const member = message.mentions.members.last() || message.member;
		let user = await DBUser.findOne({ id: member.user.id, Username: member.user.username });
		if (!user) return message.channel.send(`**${member.user.username}** isnt in the system`)
		let guild = await DBGuild.findOne({ GuildId: message.guild.id})
		if (!guild) return message.channel.send(`Something when wrong!`)
		// console.log(member)
		let networth = user.money + user.bank
		const embed = new MessageEmbed()
        .setColor(guild.embedColor)
        .setTitle(`${member.user.username}'s Money`)
        .setFooter(``)
        .addField(`Money`, [
			`**❯ Money:** $${user.money}`,
			`**❯ Bank Account:** $${user.bank}`,
			`**❯ Net Worth:** $${networth}!`
		])
        
		message.channel.send(embed);
	}

};
const { MessageEmbed, WebhookClient } = require("discord.js");
const moment = require('moment')
const DBGuild = require("../Mongoose/Schema/Guild");

module.exports.run = async (client, member) => {
	let guild = await DBGuild.findOne({ GuildId: member.guild.id});
	if (!guild) return

	let welcomeChannnel = message.guild.channels.find(c => c.id === guild.welcomeChannel)
	let logChannnel = message.guild.channels.find(c => c.id === guild.logChannel)

	console.log(member)
    const embed = new MessageEmbed()
		.setThumbnail(member.user.displayAvatarURL({ dynamic: true, size: 512 }))
		.setColor(member.displayHexColor || guild.embedColor)
		.addField('User Joined', [
			`**❯ Username:** ${member.user.username}`,
			`**❯ Discriminator:** ${member.user.discriminator}`,
			`**❯ ID:** ${member.id}`,
			`**❯ Avatar:** [Link to avatar](${member.user.displayAvatarURL({ dynamic: true })})`,
			`**❯ Time Created:** ${moment(member.user.createdTimestamp).format('LT')} ${moment(member.user.createdTimestamp).format('LL')} ${moment(member.user.createdTimestamp).fromNow()}`,
			`**❯ Status:** ${member.user.presence.status}`,
			`**❯ Game:** ${member.user.presence.game || 'Not playing a game.'}`,
			`\u200b`
		]).addField('Member', [
			`**❯ Server Join Date:** ${moment(member.joinedAt).format('LL LTS')}`,
			`\u200b`
		]);
	
	if (!welcomeChannnel) return
	if (!logChannnel) return

	welcomeChannnel.send(`**${member.user.username}** just left ***${member.guild.name}*** welp`)
	logChannnel.send(embed)
}
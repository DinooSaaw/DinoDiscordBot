const { MessageEmbed, WebhookClient } = require("discord.js");
const DBGuild = require("../Mongoose/Schema/Guild");


module.exports.run = async (client, guild) => {

	if (!process.env.webhookID) throw new Error(`webhookID is needed`)
	if (!process.env.webhookToken) throw new Error(`webhookID is needed`)
	let dataguild = await DBGuild.findOne({ GuildId: message.guild.id});
	if (!dataguild) {
		const Guild = new DBGuild({
			_id: `Guild:${message.guild.name}`,
			GuildName: message.guild.name,
			Region: message.guild.region,
			MemberCount: message.guild.memberCount,
			GuildId: message.guild.id,
			OwnerId: message.guild.OwnerId,
			Owner: message.guild.Owner,
			partnered: message.guild.partnered,
			PremiumTier: message.guild.PremiumTier,
			PremiumSubscriptionCount: message.guild.PremiumSubscriptionCount,
			verified: message.guild.verified
		  });
		  Guild.save();
		  console.log(
			(`[DataBase] `) +
			  `New Guild Created`
		  );
		  return
	}else {
		dataguild.currentlyIn == false
		dataguild.save()
	}
	const webhookClient = new WebhookClient(process.env.webhookID, process.env.webhookToken);

        const Webhook = new MessageEmbed()
		.setTitle(`${client.user.tag}`)
		.setThumbnail(client.user.displayAvatarURL())
		.setDescription(`Has been removed from \n **${guild}**!`)
		.setColor('RED')
		
		webhookClient.send(Webhook)
		console.log((`[SYSTEM] `) + `Guild Removed Message Sent`)
	};
const { MessageEmbed, WebhookClient } = require("discord.js");
const DBGuild = require("../Mongoose/Schema/Guild");


module.exports.run = async (client, guild) => {

	if (!process.env.webhookID) throw new Error(`webhookID is needed`)
	if (!process.env.webhookToken) throw new Error(`webhookID is needed`)
	let dataguild = await DBGuild.findOne({ GuildId: guild.id});
	if (!dataguild) {
		const Guild = new DBGuild({
			_id: `Guild:${guild.name}`,
			currentlyIn: false,
			GuildName: guild.name,
			Region: guild.region,
			MemberCount: guild.memberCount,
			GuildId: guild.id,
			OwnerId: guild.OwnerId,
			Owner: guild.Owner,
			partnered: guild.partnered,
			PremiumTier: guild.PremiumTier,
			PremiumSubscriptionCount: guild.PremiumSubscriptionCount,
			verified: guild.verified
		  });
		  Guild.save();
		  console.log(
			(`[DataBase] `) +
			  `New Guild Created`
		  );
		  return
	}else {
		dataguild.currentlyIn = false
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
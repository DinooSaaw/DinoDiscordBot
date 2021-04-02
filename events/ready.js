const { MessageEmbed, WebhookClient} = require("discord.js");

module.exports.run = (client) => {
  if (!process.env.webhookID) throw new Error(`webhookID is needed`)
	if (!process.env.webhookToken) throw new Error(`webhookID is needed`)
	const webhookClient = new WebhookClient(process.env.webhookID, process.env.webhookToken);
	const webhookClient2 = new WebhookClient("825699588576903189", "mb7dPrgJxbpCdjLkIknj9KBc6TVGNQhZbwcPzEz3bFMBOiSbAZlu9XX2uWZJAYicwTvR");
  console.log([
    (`[SYSTEM] `) + `Logged in as ${client.user.tag}`,
    (`[SYSTEM] `) + `In ${client.guilds.cache.size} Servers!`,
    (`[SYSTEM] `) + `In ${client.channels.cache.size} Channels!`,
    (`[SYSTEM] `) + `${client.guilds.cache.reduce((a, b) => a + b.memberCount, 0)} Users!`,
    (`[SYSTEM] `) + `${client.user.lastMessage}`,
  ].join('\n'));

  client.user.setPresence({ activity: { type: 'STREAMING', url: 'https://twitch.tv/dinoosaaw', name: 'My code' }, status: 'dnd' })
  // .then(console.log)
  .catch(console.error);

    const Webhook = new MessageEmbed()
		.setTitle(`${client.user.tag}`)
		.setThumbnail(client.user.displayAvatarURL())
		.addField('Online!', [
			`In **${client.guilds.cache.size}** Servers!`,
			`In **${client.channels.cache.size}** Channels!`,
			`Helping **${client.guilds.cache.reduce((a, b) => a + b.memberCount, 0)}** Users!`,
			`Commands: ${client.commands.size}`,
			`Events: ${client.events.size}`,
			`Verified: ${client.user.verified}`,
			`MFA: ${client.user.mfaEnabled}`,
		])
		.setTimestamp()
		.setColor('GREEN')
		
		setTimeout(() => {
			webhookClient.send(Webhook)
			console.log((`[SYSTEM] `) + `Online Message Sent`)
		}, 60000);
  }
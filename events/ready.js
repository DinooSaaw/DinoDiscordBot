const { MessageEmbed, WebhookClient, Activity } = require("discord.js");

module.exports.run = (client) => {
  if (!process.env.webhookID) throw new Error(`webhookID is needed`)
	if (!process.env.webhookToken) throw new Error(`webhookID is needed`)
	const webhookClient = new WebhookClient(process.env.webhookID, process.env.webhookToken);

  console.log([
    (`[SYSTEM] `) + `Logged in as ${client.user.tag}`,
    (`[SYSTEM] `) + `In ${client.guilds.cache.size} Servers!`,
    (`[SYSTEM] `) + `In ${client.channels.cache.size} Channels!`,
    (`[SYSTEM] `) + `${client.guilds.cache.reduce((a, b) => a + b.memberCount, 0)} Users!`,
    (`[SYSTEM] `) + `${client.user.lastMessage}`,
  ].join('\n'));

  activities = [
    `My Code To The Cloud Server!`,
    `My help command use ${env.process.prefix}help`,
    `Life is beautiful… from Friday to Monday`,
    `Some people just need a High-Five on the face`,
    `I’m not sad about being single. Rather I’m thinking about my better half, who is single because of me`,
    `I don’t care what others say or think about me, at least I am attractive to mosquitoes`,
    `Parachute for sale, used once, never opened!`,
    `Never make the same mistake twice; there are so many new ones to make`,
    `My Pro Bot Game Play`,
  ]

  let i = 0;

  setInterval(
    () =>
    client.user.setPresence({
      game: { 
          name: activities[i++ % activities.length],
          type: 'STREAMING',
    url: 'https://twitch.tv/dinoosaaw'
      },
      status: 'online'
      
  }),
    120000
  );
    const Webhook = new MessageEmbed()
		.setTitle(`${client.user.tag}`)
		.setThumbnail(client.user.displayAvatarURL())
		.addField('Online!', [
			`In **${client.guilds.cache.size}** Servers!`,
			`In **${client.channels.cache.size}** Channels!`,
			`Helping **${client.guilds.cache.reduce((a, b) => a + b.memberCount, 0)}** Users!`,
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
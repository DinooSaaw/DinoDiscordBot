const Event = require('../../Structures/Event');
const DinoEmbed = require('../../Structures/DinoEmbed');
const chalk = require('chalk')

module.exports = class extends Event {

	async run(message) {
		if (!message.guild || message.author.bot) return;
		const attachments = message.attachments.size ? message.attachments.map(attachment => attachment.proxyURL) : null;
		const embed = new DinoEmbed()
			.setColor('BLUE')
			.setAuthor(message.author.tag, this.client.user.displayAvatarURL({ dynamic: true }))
			.setTitle('Message Deleted')
			.setDescription([
				`**❯ Message ID:** ${message.id}`,
				`**❯ Channel:** ${message.channel}`,
				`**❯ Author:** ${message.member.displayName}`,
				`${attachments ? `**❯ Attachments:** ${attachments.join('\n')}` : ''}`
			]);
		if (message.content.length) {
			embed.splitFields(`**❯ Deleted Message:** ${message.content}`);
		}

        if (!message.guild) {
			let messageContext = chalk.yellow(`[CHAT] `);
			const userFlags = message.author.flags.toArray();
			var color = "#FFFFFF";
			messageContext += chalk.bold.magentaBright(`[${message.author.tag}] `);
			messageContext +=
			  chalk.bold.white("User: ") +
			  chalk.bold.hex(color)(`${message.author.username} `);
			//messageContext += chalk.bold.green(`[${userFlags.length ? userFlags.map(flag => flags[flag]).join(', ') : ''}] `)
			messageContext += chalk.bold.magenta(`|| `);
			messageContext += chalk.bold.white(`${message.content}`);
			console.log(messageContext);
		  } else {
			let messageContext = chalk.yellow(`[CHAT] `);
			const userFlags = message.author.flags.toArray();
			let member = message.member;
			let color = member.displayHexColor;
			if (color == "#000000") {
			  color = "#FFFFFF";
			}
			messageContext += chalk.bold.magentaBright(`[${message.guild.name}] `);
			messageContext += chalk.bold.green(`[${message.channel.name}] `);
			messageContext +=
			  chalk.bold.white("User: ") +
			  chalk.bold.hex(color)(`${message.author.username} `);
			//messageContext += chalk.bold.green(`[${userFlags.length ? userFlags.map(flag => flags[flag]).join(', ') : ''}] `)
			messageContext += chalk.bold.magenta(`|| `);
			messageContext += chalk.bold.red(`${message.content}`);
			console.log(messageContext);
		  }
		  const channel = message.guild.channels.cache.find(ch => ch.name === 'log');
		//if (channel) channel.send(embed);
	}

};
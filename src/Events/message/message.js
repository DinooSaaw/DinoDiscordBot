const Event = require('../../Structures/Event');
const chalk = require('chalk')

module.exports = class extends Event {

	async run(message) {
		const mentionRegex = RegExp(`^<@!?${this.client.user.id}>$`);
		const mentionRegexPrefix = RegExp(`^<@!?${this.client.user.id}> `);
		const flags = {
			DISCORD_EMPLOYEE: 'Discord Employee',
			DISCORD_PARTNER: 'Discord Partner',
			BUGHUNTER_LEVEL_1: 'Bug Hunter (Level 1)',
			BUGHUNTER_LEVEL_2: 'Bug Hunter (Level 2)',
			HYPESQUAD_EVENTS: 'HypeSquad Events',
			HOUSE_BRAVERY: 'House of Bravery',
			HOUSE_BRILLIANCE: 'House of Brilliance',
			HOUSE_BALANCE: 'House of Balance',
			EARLY_SUPPORTER: 'Early Supporter',
			TEAM_USER: 'Team User',
			SYSTEM: 'System',
			VERIFIED_BOT: 'Verified Bot',
			VERIFIED_DEVELOPER: 'Verified Bot Developer'
		};


		if (message.author.bot) return;

		if (!message.guild) return console.log(chalk.yellow(`[CHAT] `) + chalk.bold.magentaBright(`[DM] `) + chalk.bold.green(`[${message.author.username}] `) + chalk.bold.white(`Said: ${message.content}`));
		console.log(chalk.yellow(`[CHAT] `) + chalk.bold.magentaBright(`[${message.guild.name}] `) + chalk.bold.green(`[${message.channel.name}] `) + chalk.bold.white(`User: ${message.author.username} Said: ${message.content}`));
		
		let messageContext = chalk.yellow(`[CHAT] `)
		const userFlags = message.author.flags.toArray();
		messageContext += chalk.bold.magentaBright(`[${message.guild.name}] `)
		messageContext += chalk.bold.green(`[${message.channel.name}] `)
		messageContext += chalk.bold.white(`User: ${message.author.username} `)
		messageContext += chalk.bold.green(`[${userFlags.length ? userFlags.map(flag => flags[flag]).join(', ') : 'None'}] `)
		messageContext += chalk.bold.magenta(`||`)
		messageContext += chalk.bold.white(`${message.content}`)
		//console.log(messageContext)
		
		if (message.content.match(mentionRegex)) message.channel.send(`My prefix for ${message.guild.name} is \`${this.client.prefix}\`.`);

		const prefix = message.content.match(mentionRegexPrefix) ?
			message.content.match(mentionRegexPrefix)[0] : this.client.prefix;
		
		if (!message.content.startsWith(prefix)) return;

		const [cmd, ...args] = message.content.slice(prefix.length).trim().split(/ +/g);

		const command = this.client.commands.get(cmd.toLowerCase()) || this.client.commands.get(this.client.aliases.get(cmd.toLowerCase()));
		if (command) {

			if (command.ownerOnly && !this.client.utils.checkOwner(message.author.id)) {
				return message.channel.send('Sorry, this command can only be used by the bot owners.');
			}

			if (command.guildOnly && !message.guild) {
				return message.channel.send('Sorry, this command can only be used in a discord server.');
			}

			if (command.nsfw && !message.channel.nsfw) {
				return message.channel.send('Sorry, this command can only be ran in a NSFW marked channel.');
			}

			if (command.args && !args.length) {
				return message.channel.send(`Sorry, this command requires arguments to function. Usage: ${command.usage}`);
			}
			
			if (message.guild) {
				const userPermCheck = command.userPerms ? this.client.defaultPerms.add(command.userPerms) : this.client.defaultPerms;
				if (userPermCheck) {
					const missing = message.channel.permissionsFor(message.member).missing(userPermCheck);
					if (missing.length) {
						return message.channel.send(`You are missing ${this.client.utils.formatArray(missing.map(this.client.utils.formatPerms))} permissions, you need them to use this command!`);
					}
				}

				const botPermCheck = command.botPerms ? this.client.defaultPerms.add(command.botPerms) : this.client.defaultPerms;
				if (botPermCheck) {
					// console.log(botPermCheck)
					const missing = message.channel.permissionsFor(this.client.user).missing(botPermCheck);
					if (missing.length) {
						return message.channel.send(`I am missing ${this.client.utils.formatArray(missing.map(this.client.utils.formatPerms))} permissions, I need them to run this command!`);
					}
				}
			}
			
			command.run(message, ...args);
		}
	}

};
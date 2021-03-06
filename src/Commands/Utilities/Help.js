const { MessageEmbed } = require('discord.js');
const Command = require('../../Structures/Command');
const DBGuild = require("../../Mongoose/Schema/Guild");


module.exports = class extends Command {

	constructor(...args) {
		super(...args, {
			aliases: ['sendhelp', 'h'],
			description: 'Displays all the commands in the bot',
			category: 'Utilities',
			usage: '[command]',
			guildOnly: true
		});
	}

	async run(message, command) {
		let guild = await DBGuild.findOne({ GuildId: message.guild.id, GuildName: message.guild.name });
		if (!guild) return
		const embed = new MessageEmbed()
			.setColor('BLUE')
			.setAuthor(`${message.guild.name} Help Menu`, message.guild.iconURL({ dynamic: true }))
			.setThumbnail(this.client.user.displayAvatarURL())
			.setFooter(`Requested by ${message.author.username}`, message.author.displayAvatarURL({ dynamic: true }))
			.setTimestamp();

		if (command) {
			const cmd = this.client.commands.get(command) || this.client.commands.get(this.client.aliases.get(command));

			if (!cmd) return message.channel.send(`Invalid Command named. \`${command}\``);
			let cooldown = cmd.cooldown
			if (cmd.cooldown === -1){
				cooldown = 'None'
			}
			embed.setAuthor(`${this.client.utils.capitalise(cmd.name)} Command Help`, this.client.user.displayAvatarURL());
			embed.setDescription([
				`**❯ Aliases:** ${cmd.aliases.length ? cmd.aliases.map(alias => `\`${alias}\``).join(' ') : 'No Aliases'}`,
				`**❯ Description:** ${cmd.description}`,
				`**❯ Category:** ${cmd.category}`,
				`**❯ Usage:** ${cmd.usage}`,
				`**❯ Cooldown:** ${cooldown}`
			]);

			return message.channel.send(embed);
		} else {
			embed.setDescription([
				`These are the available commands for ${message.guild.name}`,
				`The bot's prefix is: **${guild.prefix}**`,
				`Command Parameters: \`<>\` is strict & \`[]\` is optional`
			]);
			let categories;
			console.log(!message.channel.nsfw)
			
			if (!message.guild.member(message.author).hasPermission('MANAGE_MESSAGES')) {
				categories = this.client.utils.removeDuplicates(this.client.commands.filter(cmd => cmd.category !== 'Moderation').map(cmd => cmd.category));	
			} else if (!message.channel.nsfw) {
				categories = this.client.utils.removeDuplicates(this.client.commands.filter(cmd => cmd.category !== 'NSFW').map(cmd => cmd.category));
			} else {
				categories = this.client.utils.removeDuplicates(this.client.commands.map(cmd => cmd.category));
			} 
	
			for (const category of categories) {
				embed.addField(`**${this.client.utils.capitalise(category)}**`, this.client.commands.filter(cmd =>
					cmd.category === category).map(cmd => `\`${cmd.name}\``).join(' '));
			}

			return message.channel.send(embed);
		}
	}

};
const { MessageEmbed } = require('discord.js');
const Command = require('../../Structures/Command');

const replys = [
	'Did you really think that would work ?!?',
	'Why Try That?!',
	'Error Try Agin',
	'Can I Take 99%?',
	'あなたの悪い',
	'Bot Mad!'
]

module.exports = class extends Command {

	constructor(...args) {
		super(...args, {
			description: 'Works out a cut for gta heist',
			category: 'Information',
			usage: '<Your Cut> <Your Total Money>',
			guildOnly: true,
			args: true
		});
	}

	run(message) {

        const args = message.content.trim().split(/ +/g);

        if (!args[1]) return message.channel.send('Please specify your cut.');
        if (!args[2]) return message.channel.send('Please specify a total money pool.');
        if (args[3]) return message.channel.send('Too many arguments.');
        if (args[1] == '0') return message.channel.send(`Your cut cant be 0%. || ${replys[Math.floor(Math.random() * replys.length)]}`)
        if (args[2] == '0') return message.channel.send(`Your total money cant be $0. ||${replys[Math.floor(Math.random() * replys.length)]}`)
        var percentage = args[1]/100
        var money = percentage * args[2]

        const member = message.member
        const embed = new MessageEmbed()
        .setThumbnail(member.user.displayAvatarURL({ dynamic: true, size: 512 }))
			.setColor(member.displayHexColor || '#82F282')
			.addField('Money', [
				`**❯ ${message.author}'s Cut:** ${args[1]}%`,
				`**❯ Total Player Money Pool:** $${args[2]}`,
				`**❯ ${message.author}'s Money:** $${money} `
			])
			.setTimestamp();

		message.channel.send(embed);
	}

};
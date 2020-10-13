const Command = require('../../Structures/Command');
const chalk = require('chalk')

module.exports = class extends Command {

    constructor(...args) {
		super(...args, {
			description: 'Tell The Bot What Voice Chat To Join',
			category: 'Voice',
			usage: '',
      userPerms: ['CONNECT'],
      botPerms: ['CONNECT'],
      guildOnly: true
		});
    }

    async run(message) {
        
        if (!message.member.voice.channel) return message.channel.send('You Must Be In Voice Channel')
        const connection = await message.member.voice.channel.join();
        message.delete()
        console.log(chalk.hex('#FF4C94')(`[VOICE] `) + chalk.bold.magentaBright(`[${message.guild.name}] `) + chalk.bold.green(`[${message.member.voice.channel.name}] ` + chalk.whiteBright('Joined')));
    }

}
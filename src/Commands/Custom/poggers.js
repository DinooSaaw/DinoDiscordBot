const { MessageEmbed, MessageCollector } = require('discord.js');
const Command = require('../../Structures/Command');
const DBUser = require("../../Mongoose/Schema/user");
const chalk = require('chalk')

module.exports = class extends Command {

	constructor(...args) {
		super(...args, {
            aliases: ['pog'],
			description: 'POG',
			category: 'Custom',
			usage: '',
			guildOnly: true
			// args: true
        });
    }     
async run(message) {
	let POG = [
		'https://pbs.twimg.com/media/ErKegFSVcAAS0i4?format=png&name=120x120',
		'https://pbs.twimg.com/media/ErKeen9VQAM2amD?format=png&name=120x120',
		'https://external-content.duckduckgo.com/iu/?u=https://makeameme.org/media/templates/250/poggers.jpg&f=1&nofb=1'
	]
	let POGImg = POG[Math.floor(Math.random() * POG.length)]
	message.delete()
	let user = await DBUser.findOne({ id: message.author.id, Username: message.author.username });
	if (!user) return
	if (!user.Tags.includes('POG')) return message.reply('You Need The 	Tag `POG` ')
    let embed = new MessageEmbed()
	.setImage(POGImg)
	.setColor('RANDOM')
    message.reply(embed)    
}

}
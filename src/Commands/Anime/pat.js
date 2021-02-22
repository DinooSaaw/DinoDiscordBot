const { MessageEmbed } = require("discord.js");
const client = require("nekos.life");
const { sfw } = new client();
const Command = require('../../Structures/Command');

module.exports = class extends Command {

    constructor(...args) {
		super(...args, {
			description: 'Pat someone',
			category: 'Anime',
			usage: '<@user>',
      guildOnly: true,
      args: true
		});
	}
    
	async run(message) {
        
        let slap = await sfw.pat();
        let member = message.mentions.members.first()
        const args = message.content.trim().split(/ +/g);
        if (!args[1]) return message.reply("mention someone!")

        if (member) {
            let embed = new MessageEmbed()
            .setTitle(`Pat!`)
            .setColor("#82F282")
            .setImage(slap.url);
            message.channel.send(embed);
        } else console.log('error')

  }
}
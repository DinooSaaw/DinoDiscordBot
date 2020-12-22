const { MessageEmbed } = require("discord.js");
const client = require("nekos.life");
const { sfw } = new client();
const Command = require('../../Structures/Command');

module.exports = class extends Command {

    constructor(...args) {
		super(...args, {
			description: 'BAKA!',
			category: 'Anime',
			usage: '<@user>',
      guildOnly: true,
      args: false
		});
	}
    
	async run(message) {
        
        let slap = await sfw.baka();
        let member = message.mentions.members.first()
        const args = message.content.trim().split(/ +/g);
        //if (!args[1]) return message.reply("mention someone!")

        if (member) {
            let embed = new MessageEmbed()
            .setTitle(`BAKA!`)
            .setColor("#82F282")
            .setImage(slap.url);
            message.channel.send(embed);
        } else console.log('error')

  }
}
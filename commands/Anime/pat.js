const client = require("nekos.life");
const { sfw } = new client();
const { MessageEmbed } = require('discord.js');
const DBUser = require("../../Mongoose/Schema/user");
const DBGuild = require("../../Mongoose/Schema/Guild");


module.exports = {
  name: "pat",
  description:
  "Who's a good person!",
  usage: "pat <user>",
	aliases: ['headpat'],
    category: "Anime",
    run: async (client, message) => {
		let user = await DBUser.findOne({ id: member.user.id, Username: member.user.username });
		if (!user) return message.channel.send(`**${member.user.username}** isnt in the system`)
		let guild = await DBGuild.findOne({ GuildId: message.guild.id})
		if (!guild) return message.channel.send(`Something when wrong!`)
        
        let slap = await sfw.pat();
        let member = message.mentions.members.first()
        const args = message.content.trim().split(/ +/g);
        if (!args[1]) return message.reply("mention someone!")

        if (member) {
            let embed = new MessageEmbed()
            .setTitle(`Pat!`)
            .setColor(guild.embedColor)
            .setImage(slap.url);
            message.channel.send(embed);
        } else console.log('error')

  }
}
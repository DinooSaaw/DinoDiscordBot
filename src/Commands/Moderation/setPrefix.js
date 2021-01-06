const { MessageEmbed } = require("discord.js");
const Command = require("../../Structures/Command");
const DBGuild = require("../../Mongoose/Schema/Guild");

module.exports = class extends (
  Command
) {
  constructor(...args) {
    super(...args, {
      description: "Change The Prefix For The Guild",
      category: "Moderation",
      usage: "<User> <Reason>",
      userPerms: ['ADMINISTRATOR'],
      // botPerms: ['MANAGE_ROLES'],
      guildOnly: true,
    });
  }
  
  async run(message) {
    console.log(`setprefix`)
    let guild = await DBGuild.findOne({
      GuildId: message.guild.id,
      GuildName: message.guild.name,
    });
    if (!guild) return 
    const args = message.content.trim().split(/ +/g);   
    let newPrefix = args[1];
    console.log(newPrefix)
    guild.prefix = newPrefix
    guild.save();
    let embed = new MessageEmbed()
      .setTitle(`New Prefix`)
      .setColor("RANDOM")
      .setThumbnail(message.guild.iconURL({ dynamic: true }))
      .setDescription(
        `**${guild.GuildName}**'s new prefix is **${guild.prefix}**`
      );
      console.log(newPrefix)
    message.channel.send(embed);
  }
};

const { MessageEmbed } = require("discord.js")
const DBGuild = require("../../Mongoose/Schema/Guild");


module.exports = {
    name: "mute",
    description:
      "Mute user from guild",
    usage: "mute <user> <reason>",
    category: "Moderation",
    run: async (client, message, args) => {
    let embed2 = new MessageEmbed();
    let amount = args[1]
    let result = await DBGuild.findOne({ GuildId: message.guild.id});
    let user = message.mentions.users.first() || message.guild.members.cache.get(args[1]);
    let member = message.guild.members.cache.get(user.id);
    if(!message.member.hasPermission(["MANAGE_MESSAGES"])) return message.channel.send("You dont have ` MANAGE_MESSAGES ` permission to perform this command!")
    if(!client.guild.me.hasPermission(["MANAGE_MESSAGES"])) return message.channel.send("I dont have ` MANAGE_MESSAGES ` permission to perform this command!")
    const logchannel = message.guild.channels.cache.find(ch => ch.id == result.logChannel);
    
    if (isNaN(amount) || amount < 2 || amount > 100) {
        message.channel.send(`You must enter a number higher than 0 and less than 100.`);
    }
  
    message.channel.bulkDelete(amount, true).catch(async (err) => {
        console.error(err);
    });

    embed2.setTitle('Channel Cleared');
    embed2.setTimestamp();
    embed2.setColor(result.embedColor);
    embed2.setDescription(`**User:** ${message.author}\n**User Tag:** ${message.author.tag}\n**User ID:** ${message.author.id}\n**Location:** ${mesage.channel.name}`);
    if (logchannel) logchannel.send(embed2);
}
};
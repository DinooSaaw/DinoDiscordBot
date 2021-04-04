const { MessageEmbed } = require("discord.js")
const DBGuild = require("../../Mongoose/Schema/Guild");


module.exports = {
    name: "clear",
    description:
      "Clear Messages",
    usage: "clear <number>",
    category: "Moderation",
    run: async (client, message, args) => {
    let embed2 = new MessageEmbed();
    let amount = args[0]
    let result = await DBGuild.findOne({ GuildId: message.guild.id});
    if(!message.member.hasPermission(["MANAGE_MESSAGES"])) return message.channel.send("You dont have ` MANAGE_MESSAGES ` permission to perform this command!")
    // if(!message.client.user.hasPermission(["MANAGE_MESSAGES"])) return message.channel.send("I dont have ` MANAGE_MESSAGES ` permission to perform this command!")
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
    embed2.setDescription(`**User:** ${message.author}\n**User Tag:** ${message.author.tag}\n**User ID:** ${message.author.id}\n**Location:** ${message.channel.name}`);
    if (logchannel) logchannel.send(embed2);
}
};
const { MessageEmbed } = require("discord.js");
const DBGuild = require("../../Mongoose/Schema/Guild");

module.exports = {
  name: "ban",
  description:
    "Ban user from guild",
  usage: "ban <user> <reason>",
  category: "Utilties",
  run: async (client, message, args) => {
    let dataguild = await DBGuild.findOne({ GuildId: message.guild.id});
    if (!dataguild) return
  
  if(!message.member.hasPermission(["BAN_MEMBERS"])) return message.channel.send("You dont have ` BAN_MEMBERS ` permission to perform this command!")
  if(!client.guild.me.hasPermission(["BAN_MEMBERS"])) return message.channel.send("I dont have ` BAN_MEMBERS ` permission to perform this command!")

 let banMember = message.mentions.members.first() || message.guild.members.get(args[0]) 
 if(!banMember) return message.channel.send("Please provide a user to ban!")

 let reason = args.slice(1).join(" ");
 if(!reason) reason = "No reason given!"

 if(!message.guild.me.hasPermission(["BAN_MEMBERS", "ADMINISTRATOR"])) return message.channel.send("I dont have permission to perform this command")

 banMember.send(`Hello, you have been banned from ${message.guild.name} for: ${reason}`).then(() =>
 message.guild.ban(banMember, { days: dataguild.banmessageremove, reason: reason})).catch(err => console.log(err))

 message.channel.send(`**${banMember.user.tag}** has been banned`).then(m => m.delete(5000))

  let embed = new MessageEmbed()
  .setColor(dataguild.embedColor)
  .setAuthor(`${message.guild.name} Modlogs`, message.guild.iconURL)
  .addField("Moderation:", "ban")
  .addField("Mutee:", banMember.user.username)
  .addField("Moderator:", message.author.username)
  .addField("Reason:", reason)
  .addField("Date:", message.createdAt.toLocaleString())
  
      let sChannel = message.guild.channels.find(c => c.name === "logs")
      sChannel.send(embed)
  }
}
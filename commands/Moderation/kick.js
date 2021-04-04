const { MessageEmbed } = require("discord.js")
const DBGuild = require("../../Mongoose/Schema/Guild");

module.exports = {
  name: "kick",
  description:
    "kick user from guild",
  usage: "kick <user> <reason>",
  category: "Moderation",
  run: async (client, message, args) => {
    let dataguild = await DBGuild.findOne({ GuildId: message.guild.id});
        
  if(!message.member.hasPermission(["KICK_MEMBERS"])) return message.channel.send("You dont have ` KICK_MEMBERS ` permission to perform this command!")
  // if(!message.client.hasPermission(["KICK_MEMBERS"])) return message.channel.send("I dont have ` KICK_MEMBERS `permission to perform this command!")

  let kickMember = message.mentions.members.first() || message.guild.members.get(args[0]) 
  if(!kickMember) return message.channel.send("Please provide a user to kick!")

  let reason = args.slice(1).join(" ")
  if(!reason) reason = "No reason given!"

  if(!message.guild.me.hasPermission(["KICK_MEMBERS", "ADMINISTRATOR"])) return message.channel.send("I dont have permission to do this!")

  kickMember.send(`Hello, you have been kicked from ${message.guild.name} for: ${reason}`).then(() => 
  kickMember.kick(reason)).catch(err => console.log(err))

  message.channel.send(`**${kickMember.user.tag}** has been kicked`).then(m => m.delete(5000))

  let embed = new MessageEmbed()
  .setColor(dataguild.embedColor)
  .setAuthor(`${message.guild.name} Modlogs`, message.guild.iconURL)
  .addField("Moderation:", "kick")
  .addField("Mutee:", kickMember.user.username)
  .addField("Moderator:", message.author.username)
  .addField("Reason:", reason)
  .addField("Date:", message.createdAt.toLocaleString())
  
      let sChannel = message.guild.channels.find(c => c.name === "logs")
      sChannel.send(embed)

  }
}
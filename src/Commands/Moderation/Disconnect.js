const Command = require('../../Structures/Command');
const { MessageEmbed } = require('discord.js');

module.exports = class extends Command {

    constructor(...args) {
		super(...args, {
			description: 'Disconnect  a user from a vc',
			category: 'Moderation',
			usage: '!disconnect <@user> <reason>',
      //userPerms: ['MOVE_MEMBERS'],
      botPerms: ['MOVE_MEMBERS'],
      guildOnly: true,
      args: true
		});
    }
    
    run(message) {

      let mMember = message.mentions.members.first()        
      const args = message.content.trim().split(/ +/g);
      const reason = args[2]

      if (!reason) return message.channel.send('Sorry, this command requires arguments to function. Usage: `!disconnect <User> <Reason>`')
      if (mMember.hasPermission("MOVE_MEMBERS")) return message.channel.send("That was a bad idea that can be taken as disrespect just saying....") 
      if (!message.member.voice.channel) return message.channel.send(`You must be in a Voice Channel!`)
      if (!mMember.voice.channel) return message.channel.send(`${mMember.displayName} isn't in a Voice Channel!`)
      
      message.delete()
      mMember.voice.kick(reason)
      message.channel.send(`*${mMember}*   has been disconnect`)
      mMember.send(`You Got Disconnected For ${reason}`)
      const channel = message.guild.channels.cache.find(ch => ch.name == 'log');

      const embed = new MessageEmbed()
              .setColor('RED')
              .setTitle(`Member Disconnected`)
              .setDescription([
                `**❯ Disconnected Member** ${mMember}`,
                `**❯ Disconnector Member** ${message.author}`,
                `**❯ Server** ${message.guild.name}`,
                `**❯ Reason** ${reason}`
              ])
              .setTimestamp()
              if (channel) channel.send(embed);   
    }
}

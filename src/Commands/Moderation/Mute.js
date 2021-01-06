const { MessageEmbed } = require('discord.js');
const Command = require('../../Structures/Command');

module.exports = class extends Command {

    constructor(...args) {
		super(...args, {
			description: 'Mute a user',
			category: 'Moderation',
      usage: '<User> <Reason>',
      userPerms: ['MANAGE_ROLES'],
      botPerms: ['MANAGE_ROLES'],
      guildOnly: true,
      args: true
    });
    }
    
    async run(message) {

    const muter = message.author.tag;
    const muted = message.mentions.members.first();
    const args = message.content.trim().split(/ +/g);
    const reason = args[2]
    const channel = message.guild.channels.cache.find(ch => ch.name == 'log');
    const role = message.guild.roles.cache.find(role => role.name === 'Muted');

    if (muted.roles.cache.some(role => role.name === 'Muted')) return  message.channel.send('You cant mute someone who is muted.')
    if (muted.hasPermission(['KICK_MEMBERS', 'BAN_MEMBERS'])) return message.channel.send('This member cant be muted.');
    if(!role) {
      try{
        muterole = await message.guild.createRole({
            name: "Muted",
            color: "#514f48",
            permissions: []
        })
        message.guild.channels.forEach(async (channel, id) => {
            await channel.overwritePermissions(muterole, {
                SEND_MESSAGES: false,
                ADD_REACTIONS: false,
                SEND_TTS_MESSAGES: false,
                ATTACH_FILES: false,
                SPEAK: false
            })
        })
    } catch(e) {
        console.log(e.stack);
    }
    }
    
    if (muted.voice.channel){
      muted.voice.setMute(true)
      return
  }
    

    if (!reason) return message.channel.send('Sorry, this command requires arguments to function. Usage: `!mute <User> <Reason>`')


    message.delete()
    muted.roles.add(role)
    message.channel.send(`*${muted.user.username}* was successfully muted.`)
    muted.send(`Hello, you have been muted in **${message.guild.name}** by: **${message.author.tag}** for: *${reason}*`).catch(err => console.log(err))
    

    const embed = new MessageEmbed()
                .setColor('RED')
                .setTitle(`Member Muted`)
                .setDescription([
                  `**❯ Muted Member** ${muted}`,
                  `**❯ Muter Member** ${muter}`,
                  `**❯ Server** ${message.guild.name}`,
                  `**❯ Reason** ${args[2]}`
                ])
                .setTimestamp()
                if (channel) channel.send(embed);
}
}
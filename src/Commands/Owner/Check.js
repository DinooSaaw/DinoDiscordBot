const Command = require('../../Structures/Command');
const { MessageEmbed } = require('discord.js');

module.exports = class extends Command {

    constructor(...args) {
		super(...args, {
			description: 'Check if user is muted but not deafen',
			category: 'Moderation',
            usage: "!check <@user> [message]",
            userPerms: ['DEAFEN_MEMBERS', 'MUTE_MEMBERS'],
            botPerms: ['DEAFEN_MEMBERS', 'MUTE_MEMBERS'],
            guildOnly: true,
            args: true
		});
    }
    
    run(message, args) {
        let mMember = message.mentions.members.first()
         
        message.delete()
        if (mMember.hasPermission("MUTE_MEMBERS")) return message.channel.send("That was a bad idea that can be taken as disrespect just saying....")
        if (!mMember.voice.channel) return message.channel.send(`${mMember.displayName} isn't in a Voice Channel!`)
        if (!message.member.voice.channel) return message.channel.send(`You must be in a Voice Channel!`)
        if (!mMember.voice.deaf) {
            if (mMember.voice.mute) {
                message.channel.send(`Sorry ${mMember.displayName} that seems creepy just sitting there just listening .`)
                mMember.voice.setDeaf(true)
            }
        }
        
    }
}
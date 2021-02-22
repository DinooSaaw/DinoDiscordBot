const Command = require('../../Structures/Command');
const { MessageEmbed, version: djsversion } = require('discord.js');

module.exports = class extends Command {

    constructor(...args) {
		super(...args, {
			description: 'Disconnect  a user from a vc',
			category: 'Moderation',
			usage: '<@user> <reason>',
      guildOnly: true
		});
    }
    
    run(message,) {
    message.guild.members.fetch().then(fetchedMembers => {
	const totalOnline = fetchedMembers.filter(member => member.presence.status === 'online');
	const totalDnd = fetchedMembers.filter(member => member.presence.status === 'dnd');
	const totalIdle = fetchedMembers.filter(member => member.presence.status === 'idle');
	// We now have a collection with all online member objects in the totalOnline variable
    const embed = new MessageEmbed()
    .setColor('#82F282')
    .setTitle(`Server Status`)
    .setDescription([
      `**❯ Online** ${totalOnline.size}`,
      `**❯ DnD** ${totalDnd.size}`,
      `**❯ Idle** ${totalIdle.size}`
    ])
    .setTimestamp()
    message.channel.send(embed);
});
}
}
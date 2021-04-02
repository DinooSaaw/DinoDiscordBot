const { MessageEmbed, version: djsversion } = require('discord.js');
const DBGuild = require("../../Mongoose/Schema/Guild");


module.exports = {
    name: "status",
    description:
    "Shows the status of the members",
    usage: "status",
    category: "Infomation",
    run: async (client, message) => {
        let guild = await DBGuild.findOne({ GuildId: message.guild.id})
		if (!guild) return message.channel.send(`Something when wrong!`)                

    message.guild.members.fetch().then(fetchedMembers => {
	const totalOnline = fetchedMembers.filter(member => member.presence.status === 'online');
	const totalDnd = fetchedMembers.filter(member => member.presence.status === 'dnd');
	const totalIdle = fetchedMembers.filter(member => member.presence.status === 'idle');
	// We now have a collection with all online member objects in the totalOnline variable
    const embed = new MessageEmbed()
    .setColor(guild.embedColor)
    .setTitle(`Server Status`)
    .setDescription([
      `**❯ Online** __${totalOnline.size}__`,
      `**❯ DnD** __${totalDnd.size}__`,
      `**❯ Idle** ${totalIdle.size}__`
    ])
    .setTimestamp()
    message.channel.send(embed);
});
}
}
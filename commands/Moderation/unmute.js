const { MessageEmbed } = require("discord.js")
const DBGuild = require("../../Mongoose/Schema/Guild");


module.exports = {
    name: "unmute",
    description:
      "unmute user from guild",
    usage: "unmute <user> <reason>",
    category: "Moderation",
    run: async (client, message, args) => {
    let embed1 = new MessageEmbed();
    let embed2 = new MessageEmbed();
    let result = await DBGuild.findOne({ GuildId: message.guild.id});
    let user = message.mentions.users.first() || message.guild.members.cache.get(args[1]);
    let reason = args.slice(1).join(' ');
    let member = message.guild.members.cache.get(user.id);
    const logchannel = message.guild.channels.cache.find(ch => ch.id == result.logChannel);
    let MutedRole = message.guild.roles.cache.find(role => role.id === result.mutedRole)
    if (!member.roles.cache.find(r => r.id === result.mutedRole)) return message.channel.send(`<@!${user.id}> isnt already muted`);
    if (user.bot) return message.channel.send('You cannot unmute bots');
    if (!result.mutedRole) return message.channel.send('You must setup a muted role in your server to use this command');
    if (!user) return message.channel.send('Please specify a user to unmute');
    if (!user.tag) user = user.user;
    if (user.id === message.author.id)return message.channel.send('You cannot unmute yourself');
    if (!reason) reason = 'No reason was provided';
    if (!member) return message.channel.send('I could not find the member you provided');
    if (user.id === message.guild.owner.id) return message.channel.send('You cannot mute the guild owner');
    if (!MutedRole) return message.channel.send('You must setup a muted role in your server to use this command');
    member.roles.remove(MutedRole).then(() => message.channel.send('Successfully muted <@!' + user.id + '>')).catch(error => {
        if (error.toString().includes('permissions')) return message.channel.send('I cannot mute <@!' + user.id + '>. Please make sure my highest role is above <@!' + user.id + '>\'s highest role.');
    });
    embed1.setTimestamp()
    embed1.setColor(result.embedColor)
    embed1.setTitle('You have been Unmuted');
    embed1.addField(`Responsible Moderator:`, message.author.tag);
    embed1.addField(`Reason:`, reason);
    embed1.addField(`Guild:`, message.guild.name);
    try {
        await user.send(embed1)
    } catch {
        message.channel.send('The user has not been notfied as they do not have their DM\'s turned on')
    }
    embed2.setTitle('Unuser Muted');
    embed2.setTimestamp();
    embed2.setColor(result.embedColor);
    embed2.setDescription(`**User:** ${user}\n**User Tag:** ${user.tag}\n**User ID:** ${user.id}\n**Reason:** ${reason}\n\n**Moderator:** ${message.author}\n**Moderator Tag:** ${message.author.tag}\n**Moderator ID:** ${message.author.id}`);
    if (logchannel) logchannel.send(embed2);
}
};
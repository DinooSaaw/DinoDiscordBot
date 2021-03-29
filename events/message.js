const cooldowns = new Set();
const DBGuild = require("../Mongoose/Schema/Guild");
const DBUser = require("../Mongoose/Schema/user");
const moment = require("moment")

module.exports.run = async (client, message) => {
  // client.emit("guildCreate", message.guild)
  let user = await DBUser.findOne({ id: message.author.id});
  let guild = await DBGuild.findOne({ GuildId: message.guild.id});

  if (!guild) {
    const Guild = new DBGuild({
      _id: `Guild:${message.guild.name}`,
      GuildName: message.guild.name,
      Region: message.guild.region,
      MemberCount: message.guild.memberCount,
      GuildId: message.guild.id,
      OwnerId: message.guild.OwnerId,
      Owner: message.guild.Owner,
      partnered: message.guild.partnered,
      PremiumTier: message.guild.PremiumTier,
      PremiumSubscriptionCount: message.guild.PremiumSubscriptionCount,
      verified: message.guild.verified
    });
    Guild.save();
    console.log(
    (`[DataBase] `) + `New Guild Created`);
    return
    }
  
    if (!user){
      if (message.author.bot) return
      const member = message.mentions.members.last() || message.member;
        const User = new DBUser({
          _id: `User:${message.author.tag}`,
          Username: message.author.username,
          Discriminator: message.author.discriminator,
          id: message.author.id,
          Created: `${moment(member.user.createdTimestamp).format('LT')} ${moment(member.user.createdTimestamp).format('LL')} ${moment(member.user.createdTimestamp).fromNow()}`
        });
        User.save();
        console.log((`[DataBase] `) +`New User Created: ${message.author.tag}`);
    }
  function cooldown(user, time) {
    cooldowns.add(user);
    setTimeout(() => cooldowns.delete(user), time * 1000);
    //message.channel.send(`Chill out for **${time}**s`).then(msg => { msg.delete({ timeout: time * 1000});})
  }

  if (message.author.bot) return;

  if (message.guild){
    let pre = (`[CHAT] `)
    pre += (`[${message.guild.name}] `)
    pre += (`[${message.channel.name}] `)
    pre += (`[${message.author.id}] `)
    pre += (`User: ${message.author.username} `)
    pre += (`|| `)
    pre += (`${message.content}`)
    console.log(pre)
  }

  if (!message.content.startsWith(guild.prefix)) return;

  if (!message.member) message.member = await message.guild.members.fetch(message);

  const args = message.content
    .slice(guild.prefix.length)
    .trim()
    .split(/ +/g);
  const cmd = args.shift().toLowerCase();

  if (cmd.length === 0) return;

  let command = client.commands.get(cmd);

  if (!command) command = client.commands.get(client.aliases.get(cmd));

  if (!command) return;
  let xcooldown = command.cooldown || 5
  if (cooldowns.has(message.author)) {
    message.channel.bulkDelete(1)
    message.channel.send(`Chill out for **${xcooldown}**s`).then(msg => { msg.delete({ timeout: xcooldown * 1000});})
    return
  }
  if (command) command.run(client, message, args);
  cooldown(message.author, xcooldown);
}

const Event = require("../../Structures/Event");
const chalk = require("chalk");
const moment = require('moment');
const DBGuild = require("../../Mongoose/Schema/Guild");
const DBUser = require("../../Mongoose/Schema/user");
const upXP = 1000
const { MessageAttachment, MessageEmbed } = require("discord.js");
module.exports = class extends (Event) {
  async run(message) {
    const mentionRegex = RegExp(`^<@!?${this.client.user.id}>$`);
    const mentionRegexPrefix = RegExp(`^<@!?${this.client.user.id}> `);
    let user = await DBUser.findOne({ id: message.author.id});
    let guild = await DBGuild.findOne({ GuildId: message.guild.id, GuildName: message.guild.name });
    const flags = {
      DISCORD_EMPLOYEE: "Discord Employee",
      DISCORD_PARTNER: "Discord Partner",
      BUGHUNTER_LEVEL_1: "Bug Hunter (Level 1)",
      BUGHUNTER_LEVEL_2: "Bug Hunter (Level 2)",
      HYPESQUAD_EVENTS: "HypeSquad Events",
      HOUSE_BRAVERY: "House of Bravery",
      HOUSE_BRILLIANCE: "House of Brilliance",
      HOUSE_BALANCE: "House of Balance",
      EARLY_SUPPORTER: "Early Supporter",
      TEAM_USER: "Team User",
      SYSTEM: "System",
      VERIFIED_BOT: "Verified Bot",
      VERIFIED_DEVELOPER: "Verified Bot Developer",
    };

    if (message.author.bot) return
    
    if (message.guild) {
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
          chalk.hex("3FA037")(`[DataBase] `) +
            chalk.bold.white`New Guild Created`
        );
        message.channel.send('New Guild Added To System')
        return
      }

    }
    if (!message.guild) {
      let messageContext = chalk.yellow(`[CHAT] `);
      const userFlags = message.author.flags.toArray();
      var color = "#FFFFFF";
      messageContext += chalk.bold.magentaBright(`[${message.author.tag}] `);
      messageContext +=
        chalk.bold.white("User: ") +
        chalk.bold.hex(color)(`${message.author.username} `);
      //messageContext += chalk.bold.green(`[${userFlags.length ? userFlags.map(flag => flags[flag]).join(', ') : ''}] `)
      messageContext += chalk.bold.magenta(`|| `);
      messageContext += chalk.bold.white(`${message.content}`);
      console.log(messageContext);
    } else {
      let messageContext = chalk.yellow(`[CHAT] `);
      const userFlags = message.author.flags.toArray();
      let member = message.member;
      let color = member.displayHexColor;
      let xp = Math.floor(Math.random() * 4)
      
      if (color == "#000000") {
        color = "#FFFFFF";
      }
      messageContext += chalk.bold.magentaBright(`[${message.guild.name}] `);
      messageContext += chalk.bold.green(`[${message.channel.name}] `);
      messageContext += chalk.bold.yellow(`[${xp}] `);
      messageContext +=
        chalk.bold.white("User: ") +
        chalk.bold.hex(color)(`${message.author.username} `);
      //messageContext += chalk.bold.green(`[${userFlags.length ? userFlags.map(flag => flags[flag]).join(', ') : ''}] `)
      messageContext += chalk.bold.magenta(`|| `);
      messageContext += chalk.bold.white(`${message.content}`);
      console.log(messageContext);
      if (!user) {
        NewUserDB(message)
      } else {
        OldUserDB(message) 
        // console.log(`sus`)
      }
      // console.log(message)
      function NewUserDB(message){
        const member = message.mentions.members.last() || message.member;
        const User = new DBUser({
          _id: `User:${message.author.tag}`,
          Username: message.author.username,
          Discriminator: message.author.discriminator,
          id: message.author.id,
          Tags: ['Active'],
          xp: DBUser.xp =+ xp,
          flags: `${userFlags.length ? userFlags.map(flag => flags[flag]).join(', ') : 'None'}`,
          Created: `${moment(member.user.createdTimestamp).format('LT')} ${moment(member.user.createdTimestamp).format('LL')} ${moment(member.user.createdTimestamp).fromNow()}`
        });
        User.save();
        console.log(chalk.hex("3FA037")(`[DataBase] `) +chalk.bold.white`New User Created: ${message.author.tag}`);
        message.channel.send('New User Added To System')
      }
      function OldUserDB(message){
        if (user.xp >= upXP){
          LvUp()          
        } else {
          user.xp += xp
          user.save();
        }
        // console.log(chalk.hex("3FA037")(`[DataBase] `) + chalk.bold.white`User Update`);
        // message.channel.send('New User Added To System')
      }
      function LvUp() {
        user.xp -= upXP;
        user.level+=1
        if (user.xp == 0){
          let embed = new MessageEmbed()
          .setColor('RANDOM')
          .setDescription(`**${message.author.username}** Has Leveled Up To **${user.level}**`)
          .addField('Transaction', [
            `**$1000** Has been add to your account`
          ])
          message.channel.send(embed)
          user.bank += 1000
          // user.Tags.push('Lv1')
          user.save()
          
        }
        if (user.xp === 1){
          let embed = new MessageEmbed()
          .setColor('RANDOM')
          .setDescription(`**${message.author.username}** Has Leveled Up To **${user.level}**`)
          .addField('Transaction', [
            `**$1000** Has been add to your account`
          ])
          message.channel.send(embed)
          user.bank += 1000
          // user.Tags.push('Lv2')
          user.save()
          
        }
        if (user.xp === 2){
          let embed = new MessageEmbed()
          .setColor('RANDOM')
          .setDescription(`**${message.author.username}** Has Leveled Up To **${user.level}**`)
          .addField('Transaction', [
            `**$1000** Has been add to your account`
          ])
          message.channel.send(embed)
          // user.bank += 1000
          user.Tags.push('Lv3')
          user.save()
          
        }
        if (user.xp === 3){
          let embed = new MessageEmbed()
          .setColor('RANDOM')
          .setDescription(`**${message.author.username}** Has Leveled Up To **${user.level}**`)
          .addField('Transaction', [
            `**$1000** Has been add to your account`
          ])
          message.channel.send(embed)
          user.bank += 1000
          // user.Tags.push('Lv4')
          user.save()
          
        }
      }
    }

    if (message.content.match(mentionRegex))
      message.channel.send(
        `My prefix for ${message.guild.name} is \`${guild.prefix}\`.`
        );

        const prefix = message.content.match(mentionRegexPrefix)
      ? message.content.match(mentionRegexPrefix)[0]
      : guild.prefix;

    if (!message.content.startsWith(prefix)) return;
    
    const [cmd, ...args] = message.content
    .slice(prefix.length)
    .trim()
    .split(/ +/g);

    const command =
      this.client.commands.get(cmd.toLowerCase()) ||
      this.client.commands.get(this.client.aliases.get(cmd.toLowerCase()));
    if (command) {
      if (
        command.ownerOnly &&
        !this.client.utils.checkOwner(message.author.id)
      ) {
        return message.channel.send(
          "Sorry, this command can only be used by the bot owners."
        );
      }

      if (command.guildOnly && !message.guild) {
        return message.channel.send(
          "Sorry, this command can only be used in a discord server."
        );
      }

      if (command.nsfw && !message.channel.nsfw) {
        const attachment = new MessageAttachment(
          "https://images-ext-2.discordapp.net/external/hiWbEzhiEXfFaza5khoxg3mR3OWeugZwWo8vGxK8LzA/https/i.imgur.com/oe4iK5i.gif"
        );
        return message.channel.send(
          "Sorry, this command can only be ran in a NSFW marked channel.",
          attachment
        );
      }

      if (command.args && !args.length) {
        return message.channel.send(
          `Sorry, this command requires arguments to function. Usage: ${command.usage}`
        );
      }

      if (command.broken  && message.guild) {
        let eembed = new MessageEmbed()
        .setTitle('Out Of Service')
        .setColor('RED')
        .setURL('https://discord.com/404')
        .setImage('https://external-content.duckduckgo.com/iu/?u=http%3A%2F%2F1.bp.blogspot.com%2F-JC1xP1AQA_M%2FVAQopqcG0PI%2FAAAAAAAAE1Q%2FQwtoBzDmffc%2Fs1600%2F404-error.jpg&f=1&nofb=1')
        return message.channel.send(eembed);
      }

      if (command.bugtesting && message.channel.name !== 'bot-testing-grounds' ){
        let emmbed = new MessageEmbed()
        .setTitle('This command is a WIP')
        .setColor('RED')
        .setDescription("Please Use Command In Guild `Dino's Community` And In The Channel <#803633180157673505>")
        return message.channel.send(emmbed)
      }

      if (command.cooldown && command.cooldown > 0){
        console.log(command.name)
        let cooldownString = command.name
        let recenlyRan = [] // guild id - user id - command
        if (recenlyRan.includes(cooldownString)){
          setTimeout(() => {
            console.log(`Before`, recenlyRan) 

            recenlyRan = recenlyRan.filter((string) => {
              string !== cooldownString
            })

            console.log(`After`, recenlyRan)
          }, 1000 * command.cooldown);
          message.channel.delete(1)
          message.reply(`Calm Down There You Need To Wait`)
          return
        } else {
          recenlyRan.push(cooldownString)
          return
        }
      }
      
      if (message.guild) {
        const userPermCheck = command.userPerms
          ? this.client.defaultPerms.add(command.userPerms)
          : this.client.defaultPerms;
          if (userPermCheck) {
          const missing = message.channel
            .permissionsFor(message.member)
            .missing(userPermCheck);
          if (missing.length) {
            return message.channel.send(
              `You are missing ${this.client.utils.formatArray(
                missing.map(this.client.utils.formatPerms)
                )} permissions, you need them to use this command!`
            );
          }
        }

        const botPermCheck = command.botPerms
          ? this.client.defaultPerms.add(command.botPerms)
          : this.client.defaultPerms;
        if (botPermCheck) {
          // console.log(botPermCheck)
          const missing = message.channel
            .permissionsFor(this.client.user)
            .missing(botPermCheck);
          if (missing.length) {
            return message.channel.send(
              `I am missing ${this.client.utils.formatArray(
                missing.map(this.client.utils.formatPerms)
              )} permissions, I need them to run this command!`
            );
          }
        }
      }

      command.run(message, ...args);
    }
  }
};
const { MessageEmbed, MessageCollector, WebhookClient } = require("discord.js");
const DBUser = require("../../Mongoose/Schema/user");
const DBGuild = require("../../Mongoose/Schema/Guild");

module.exports = {
  name: "buy",
  description: "Buy From The Store",
  usage: "buy <id>",
  aliases: ["buy"],
  category: "Economy",
  run: async (client, message, args) => {
    const webhookClient = new WebhookClient(
      process.env.webhookID,
      process.env.webhookToken
    );
    let user = await DBUser.findOne({
      id: message.author.id,
      Username: message.author.username,
    });
    if (!user)
      return message.channel.send(
        `**${message.author.username}** isnt in the system`
      );
    let guild = await DBGuild.findOne({ GuildId: message.guild.id });
    if (!guild) return message.channel.send(`Something when wrong!`);

    let store = new MessageEmbed()
      .setTitle(`${message.client.username}'s Store`)
      .addFields(
        {
          name: "**1.** Custom Guild Command",
          value: "$__500,000__",
          inline: true,
        },
        {
          name: "**2.** Custom Global Command",
          value: "$__750,00__",
          inline: true,
        },
        { name: "\u200B", value: "\u200B" }
      )
      .setFooter(`Buy with !buy`);

    if (!args) return message.channel.send(store);
    if (args[0] == "1" || args[0] == "one" || args[0] == "One") {
      one("Custom Guild Command", 500000);
    }
    if (args[0] == "2" || args[0] == "two" || args[0] == "Two") {
      two("Custom Global Command", 750000);
    }
    function one(item, cost) {
      message.channel.bulkDelete(2, true).catch(async (err) => {
        console.error(err);
      });
      if (user.money < cost) {
        failed = new MessageEmbed()
          .setTitle(`${message.author.username}'s **Purchase Failed**`)
          .setColor("RED")
          .setDescription(
            `This may because you don't have enough money or the money is in the bank`
          );
          return message.channel.send(failed)
      }
      let Buy = new MessageEmbed()
        .setColor(guild.embedColor)
        .setTitle(`${message.author.username} Has Bought ${item}`)
        .setDescription(
          `${message.author.username} Spent $${cost} \n Please Now State What The Command Does *include **Command Name, Description, Usage, aliases ***`
        );
        
      message.channel.send(Buy);
      const collector = new MessageCollector(
        message.channel,
        (m) => m.author.id === message.author.id,
        { max: 1, time: 180000 }
      );
      collector.on("collect", (m) => {
        const Webhook = new MessageEmbed()
          .setTitle(
            `${message.author.username}#${message.author.discriminator}(${message.author.id})'s ${item}`
          )
          .setFooter(`${message.channel.name} in ${message.guild.name}`)
          .setDescription(m.content)
          .setColor(guild.embedColor);
        webhookClient.send(`<@!247163579424309268>`);
        webhookClient.send(Webhook);
      });
      collector.on("end", (collected) => {
        message.channel.send(
          `Thank You. Please Have DM Open So Any Problem Can Be Fixed \n Have A Good Day`
        );
        user.money -= cost
        user.save()
      });
    }

    function two(item, cost) {
      message.channel.bulkDelete(2, true).catch(async (err) => {
        console.error(err);
      });
      if (user.money < cost) {
        failed = new MessageEmbed()
          .setTitle(`${message.author.username}'s **Purchase Failed**`)
          .setColor("RED")
          .setDescription(
            `This may because you don't have enough money or the money is in the bank`
          );
          return message.channel.send(failed)
      }
      let Buy = new MessageEmbed()
        .setColor(guild.embedColor)
        .setTitle(`${message.author.username} Has Bought ${item}`)
        .setDescription(
          `${message.author.username} Spent $${cost} \n Please Now State What The Command Does *include **Command Name, Description, Usage, aliases ***`
        );
      message.channel.send(Buy);
      const collector = new MessageCollector(
        message.channel,
        (m) => m.author.id === message.author.id,
        { max: 1, time: 180000 }
      );
      collector.on("collect", (m) => {
        const Webhook = new MessageEmbed()
          .setTitle(
            `${message.author.username}#${message.author.discriminator}(${message.author.id})'s ${item}`
          )
          .setFooter(`${message.channel.name} in ${message.guild.name}`)
          .setDescription(m.content)
          .setColor(guild.embedColor);
        webhookClient.send(`<@!247163579424309268>`);
        webhookClient.send(Webhook);
      });
      collector.on("end", (collected) => {
        message.channel.send(
          `Thank You. Please Have DM Open So Any Problem Can Be Fixed \n Have A Good Day`
        );
        user.money -= cost
        user.save()
      });
    }
  },
};

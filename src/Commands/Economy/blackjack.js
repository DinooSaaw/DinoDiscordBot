const { MessageEmbed, MessageCollector } = require("discord.js");
const Command = require("../../Structures/Command");
const DBUser = require("../../Mongoose/Schema/user");
const chalk = require("chalk");
const { patch } = require("superagent");
module.exports = class extends (
  Command
) {
  constructor(...args) {
    super(...args, {
      aliases: ["bj"],
      description: "This is a Blackjack Game",
      category: "Economy",
      usage: "",
      guildOnly: true,
      // bugtesting: true,
      // broken: true
    });
  }

  async run(message) {
    let InGame = false;
    let user = await DBUser.findOne({
      id: message.author.id,
      Username: message.author.username,
    });
    if (!user) return message.channel.send(`**${message.author.username}** isnt in the system`);
    if (user.money <= 0) return message.reply(`No Poor People Allowed Here`);
    let networth = user.money + user.bank;
    if (networth >= 1500000) return message.reply(`Your Have Hit The Max Net Worth`);
    const args = message.content.trim().split(/ +/g);
    const Bet = Number(args[1]);
    if (!Bet) return message.reply(`Please Give A Bet`);
    if (isNaN(Bet)) return message.reply(`Please Give A Bet`);
    if (Bet <= 0) return message.reply(`Please Give A Bet`);
    let bet = Bet

    let cards = [
      1,
      2,
      3,
      4,
      5,
      6,
      7,
      8,
      9,
      10
    ]

    let PlayerHand = 0
    let DealerHand = 0
    let NewCard = cards[Math.floor(Math.random() * cards.length)]
    let NewPlayer = PlayerHand + NewCard
    let NewDealer = DealerHand + NewCard
    
    NewPlayerCard(NewPlayer, NewDealer)
    function NewPlayerCard(ph, dh) {
      message.channel.bulkDelete(1)
      let NewCard = cards[Math.floor(Math.random() * cards.length)]
      let PlayersHand = ph + NewCard
      const startembed = new MessageEmbed()
      .setTitle(`${message.author.username}'s Blackjack Game`)
      .setColor(`RANDOM`)
      .setFooter(`Use 'hit' or 'stand'`)
      .addField("Cards", [
        `Player Cards: ${PlayersHand}`,
        `Dealer's Cards: ${dh}`,
      ]);
      message.channel.send(startembed);
        const game = new MessageCollector(
          message.channel,
          (m) => m.author.id === message.author.id,
          { time: 20000 }
        );
        game.on("collect", (message) => {
          if (message.content == "hit"){
            hit(PlayersHand, dh)
            game.stop()
          }
          if (message.content == "stand"){
            stand(PlayersHand, dh)
            game.stop()
          }
      })
    };

    function hit(ph, dh) {
      message.channel.bulkDelete(2)
      let NewCard = cards[Math.floor(Math.random() * cards.length)]
      let PlayersHand = ph + NewCard
      let e = PlayersHand >= 22
      console.log(e)
      if (PlayersHand >= 22){
        lost(PlayersHand, dh)
        return;
      }
      if (PlayersHand == 21){
        win(PlayersHand, dh)
        return;
      }
      const startembedOne = new MessageEmbed()
      .setTitle(`${message.author.username}'s Blackjack Game`)
      .setColor(`RANDOM`)
      .setFooter(`Use 'hit' or 'stand'`)
      .addField("Cards", [
          `Player Cards: ${PlayersHand}`,
          `Dealer's Cards: ${dh}`
        ]);
        message.channel.send(startembedOne);
        const game = new MessageCollector(
          message.channel,
          (m) => m.author.id === message.author.id,
          { time: 20000 }
        );
        game.on("collect", (message) => {
          if (message.content == "hit"){
            hit(PlayersHand, dh)
          }
          if (message.content == "stand"){
            stand(PlayersHand, dh)
          }
      })
    }

    function stand(ph, dh) {
      message.channel.bulkDelete(2)
      let NewCard = cards[Math.floor(Math.random() * cards.length)]
      let DealersHand = dh + NewCard
      
      if (ph >= 22){
        lost(ph, DealersHand)
        return
      }
      if (ph == 21){
        win(ph, DealersHand)
        return
      }
      if (DealersHand >= 22){
        win(ph, DealersHand)
        return
      }
      if (DealersHand >= 17){
        if (DealersHand >= ph){
          lost(ph, DealersHand)
        } else {
          win(ph, DealersHand)
        }
      } else {
        stand(ph, DealersHand)
      }
    }

    function win(ph, dh) {
      user.money += bet * user.multiplier
      const Win = new MessageEmbed()
      .setTitle(`${message.author.username}'s Blackjack Game Results`)
      .setColor(`GREEN`)
      .setFooter(`We Got A Winner!`)
      .addField("Money", [
        `Following Money has been added to your account $${bet* user.multiplier}`
      ])
      .addField("Cards", [
        `Player Cards: ${ph}`,
        `Dealer's Cards: ${dh}`,
      ]);
      user.save()
      message.channel.send(Win);
    }
    function lost(ph, dh) {
      const zero = 0
      if (bet < user.money){
        user.money == zero 
      }
      user.money -= bet
      const Lose = new MessageEmbed()
      .setTitle(`${message.author.username}'s Blackjack Game Results`)
      .setColor(`RED`)
      .setFooter(`Your Bad!`)
      .addField("Money", [
        `Following Money has been removed from your account $${bet}`
      ])
      .addField("Cards", [
        `Player Cards: ${ph}`,
        `Dealer's Cards: ${dh}`,
      ]);
      user.save()  
      message.channel.send(Lose);
    }
  }
}
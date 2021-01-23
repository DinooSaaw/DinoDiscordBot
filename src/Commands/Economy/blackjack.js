const { MessageEmbed, MessageCollector } = require("discord.js");
const Command = require("../../Structures/Command");
const DBUser = require("../../Mongoose/Schema/user");
const chalk = require("chalk");
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
      bugtesting: true,
    });
  }
  
  async run(message) {
    let InGame = false
    let user = await DBUser.findOne({
      id: message.author.id,
      Username: message.author.username,
    });
    if (!user) return;
    if (user.money <= 0) return message.reply(`No Poor People Allowed Here`);
    let networth = user.money + user.bank
    if (networth >= 1500000) return message.reply(`Your Have Hit The Max Net Worth`)
    const args = message.content.trim().split(/ +/g);
    const bet = Number(args[1]);
    if (!bet) return message.reply(`Please Give A Bet`)
    if (isNaN(bet)) return message.reply(`Please Give A Bet`)
    if (bet <= 0) return message.reply(`Please Give A Bet`)

    // Deck

    const deck = [
      { card: "2C", value: 2, deltOut: false },
      { card: "2D", value: 2, deltOut: false },
      { card: "2H", value: 2, deltOut: false },
      { card: "2S", value: 2, deltOut: false },

      { card: "3C", value: 3, deltOut: false },
      { card: "3D", value: 3, deltOut: false },
      { card: "3H", value: 3, deltOut: false },
      { card: "3S", value: 3, deltOut: false },

      { card: "4C", value: 4, deltOut: false },
      { card: "4D", value: 4, deltOut: false },
      { card: "4H", value: 4, deltOut: false },
      { card: "4S", value: 4, deltOut: false },

      { card: "5C", value: 5, deltOut: false },
      { card: "5D", value: 5, deltOut: false },
      { card: "5H", value: 5, deltOut: false },
      { card: "5S", value: 5, deltOut: false },

      { card: "6C", value: 6, deltOut: false },
      { card: "6D", value: 6, deltOut: false },
      { card: "6H", value: 6, deltOut: false },
      { card: "6S", value: 6, deltOut: false },

      { card: "7C", value: 7, deltOut: false },
      { card: "7D", value: 7, deltOut: false },
      { card: "7H", value: 7, deltOut: false },
      { card: "7S", value: 7, deltOut: false },

      { card: "8C", value: 8, deltOut: false },
      { card: "8D", value: 8, deltOut: false },
      { card: "8H", value: 8, deltOut: false },
      { card: "8S", value: 8, deltOut: false },

      { card: "9C", value: 9, deltOut: false },
      { card: "9D", value: 9, deltOut: false },
      { card: "9H", value: 9, deltOut: false },
      { card: "9S", value: 9, deltOut: false },

      { card: "10C", value: 10, deltOut: false },
      { card: "10D", value: 10, deltOut: false },
      { card: "10H", value: 10, deltOut: false },
      { card: "10S", value: 10, deltOut: false },

      { card: "JC", value: 10, deltOut: false },
      { card: "JD", value: 10, deltOut: false },
      { card: "JH", value: 10, deltOut: false },
      { card: "JS", value: 10, deltOut: false },

      { card: "QC", value: 10, deltOut: false },
      { card: "QD", value: 10, deltOut: false },
      { card: "QH", value: 10, deltOut: false },
      { card: "QS", value: 10, deltOut: false },

      { card: "KC", value: 10, deltOut: false },
      { card: "KD", value: 10, deltOut: false },
      { card: "KH", value: 10, deltOut: false },
      { card: "KS", value: 10, deltOut: false },
    ];
    const createRandomNumber = (maxNum) =>
      Math.floor(Math.random() * (maxNum - 1));
    const getScore = (array) => {
      const result = array;
      let score = 0;
      for (let i = 0; i < result.length; i++) {
        score += result[i].value;
      }
      return score;
    };
    Start();
    function Start() {
      InGame = true
      let liveDeck = [...deck];
      let playersHand = liveDeck.splice(createRandomNumber(liveDeck.length), 1);
      let dealersHand = liveDeck.splice(createRandomNumber(liveDeck.length), 1);
      let drawCard = liveDeck.splice(createRandomNumber(liveDeck.length), 1);
      playersHand.push(drawCard[0]);
      drawCard.pop();
      // console.log(getScore(playersHand));
      // console.log(playersHand);
      check(playersHand, dealersHand);
      let startembed = new MessageEmbed()
        .setTitle(`${message.author.username}'s Blackjack Game`)
        .setColor(`RANDOM`)
        .setFooter(`Use 'hit' or 'stand'`)
        .addField("Cards", [
          `Player Cards: ${getScore(playersHand)}`,
          `Dealer's Cards: ${getScore(dealersHand)}`
        ]);
      message.channel.send(startembed);
      const game = new MessageCollector(
        message.channel,
        (m) => m.author.id === message.author.id,
        { time: 20000 }
      );
      game.on("collect", (message) => {
        if (message.content == "hit" || message.content == "!hit" || message.content == "HIT" || message.content == "!HIT") {
          hit(playersHand, dealersHand);
        }
        if (message.content == "stand" || message.content == "!stand" || message.content == "STAND" || message.content == "!STAND") {
          stand(playersHand, dealersHand);
          
        } else {
          game.stop();
        }
      });

      function hit(PlayerHand, DelerHand) {
        let drawCard = liveDeck.splice(createRandomNumber(liveDeck.length), 1);
        
        playersHand.push(drawCard[0]);
        drawCard.pop();
        // console.log(getScore(PlayerHand));
        check(PlayerHand, DelerHand);
        let emmbed = new MessageEmbed()
          .setTitle(`${message.author.username}'s Blackjack Game`)
          .setColor(`RANDOM`)
          .setFooter(`Use 'HIT' or 'stand'`)
          .addField("Cards", [
            `Player's Cards: ${getScore(PlayerHand)}`,
            `Dealer's Cards: ${getScore(DelerHand)}`
          ]);
          if (getScore(PlayerHand) >= 21) return 
          // console.log(`bugtesting`)
          message.channel.send(emmbed);
        const game = new MessageCollector(
          message.channel,
          (m) => m.author.id === message.author.id,
          { time: 20000 }
        );
        game.on("collect", (message) => {
          if (message.content == "hit" || message.content == "!hit" || message.content == "HIT" || message.content == "!HIT") {
            hit(playersHand, dealersHand);
          }
          if (message.content == "stand" || message.content == "!stand" || message.content == "STAND" || message.content == "!STAND") {
            stand(playersHand, dealersHand);
          } else {
            game.stop();
          }
        });
      }
    }

    function stand(PlayerHand, DelearHand) {
      // console.log(`1  aADVLKJHGFD`)
      if (InGame === false) return
      let liveDeck = [...deck];
      let drawCard = liveDeck.splice(createRandomNumber(liveDeck.length), 1);
      DelearHand.push(drawCard[0]);
      drawCard.pop();
      // console.log(getScore(DelearHand));
      Delearcheck(PlayerHand, DelearHand);
      let standembed = new MessageEmbed()
        .setTitle(`${message.author.username}'s Blackjack Game`)
        .setColor(`RANDOM`)
        .setFooter(`Use 'hit' or 'stand'`)
        .addField("Cards", [
          `Player's Cards: ${getScore(PlayerHand)}`,
          `Dealer's Cards: ${getScore(DelearHand)}`
        ])
        .setFooter(`You Have Stand`);
      message.channel.send(standembed);
      Standcheck(PlayerHand, DelearHand);
    }

    function check(ph, dh) {
      if (getScore(ph) >= 22) {
        Lose(ph, dh);
        return
      }
      if (getScore(dh) >= 22) {
        Win(ph, dh);
        return
      }
      if (getScore(ph) >= 21) {
        Win(ph, dh);
        return
      }
      else {
      }
    }

    function Standcheck(ph, dh) {
      if (getScore(ph) >= 22) {
        Lose(ph, dh);
        return
      }
      if (getScore(dh) >= 22) {
        Win(ph, dh);
        return
      }
      if (getScore(ph) == 21) {
        Win(ph, dh);
        return
      }
      if (getScore(ph) <= getScore(dh)) {
        Lose(ph, dh);
        return
      } 
      if (getScore(ph) > getScore(dh)) {
          Win(ph, dh)
      }
      else {
        // console.log(chalk.green(`Check Pass! 2`));
        check(ph, dh)
      }
    }

    function Delearcheck(ph, dh) {
      if (getScore(dh) <= 17) {
        let liveDeck = [...deck];
        let drawCard = liveDeck.splice(createRandomNumber(liveDeck.length), 1);
        dh.push(drawCard[0]);
        drawCard.pop();
        check(ph, dh);
        // console.log(`DH ${getScore(dh)}!-`);
        if (getScore(dh) <= 17) {
          Delearcheck(ph, dh)
        }
        return dh;
      } else {
        // console.log(`DH! ${getScore(dh)}`);
      }
    }

    function Win(ph, dh){
      let winembed = new MessageEmbed()
      .setTitle(`${message.author.username}'s Blackjack Game`)
      .setColor(`GREEN`)
      .addField('Cards', [
        `Player's Card: ${getScore(ph)}`,
        `Dealer's Card: ${getScore(dh)}`
      ])
      .addField(`Transaction`, [
        `$${bet} has been add to your account`
      ])
      message.channel.send(winembed)
      user.money += bet
      user.save()
      console.log(chalk.hex('70bb65')('[Transaction] ') + chalk.magenta(`[${message.author.username}] `) + chalk.bold.white(`Money: $${user.money} Bank: $${user.bank}`))
    }
    function Lose(ph, dh){
      let loseembed = new MessageEmbed()
      .setTitle(`${message.author.username}'s Blackjack Game`)
      .setColor(`RED`)
      .addField('Cards', [
        `Player's Card: ${getScore(ph)}`,
        `Dealer's Card: ${getScore(dh)}`
      ])
      .addField(`Transaction`, [
        `$${bet} wasn't added to your account`
      ])
      message.channel.send(loseembed)
      user.money -= bet
      user.save()
      console.log(chalk.hex('70bb65')('[Transaction] ') + chalk.magenta(`[${message.author.username}] `) + chalk.bold.white(`Money: $${user.money} Bank: $${user.bank}`))
    }
  }
};

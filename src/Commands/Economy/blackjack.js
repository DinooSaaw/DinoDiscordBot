const { MessageEmbed, MessageCollector } = require('discord.js');
const Command = require('../../Structures/Command');
const DBUser = require("../../Mongoose/Schema/user");
const chalk = require('chalk')

module.exports = class extends Command {

	constructor(...args) {
		super(...args, {
            aliases: ['bj'],
			description: '',
			category: 'Economy',
			usage: '',
			guildOnly: true
			// args: true
		});
	}

	async run(message) {
//         message.channel.send("Out Of Money `because of simp`")
//     }
// }
        let PlayerHand = 0
        let DealerHand = 0
        let user = await DBUser.findOne({ id: message.author.id, Username: message.author.username });
        if (!user) return
        const args = message.content.trim().split(/ +/g);
        const pay = args[1]    
        if (!pay) return message.reply(`Please Give A Bet`)
        if (isNaN(pay)) return message.reply(`Please Give A Bet`)
        if (pay < 0) return message.reply(`Please Give A Bet`)
        let bet = Math.round(pay)
        if (!bet) return message.reply(`Please Give A Bet`)
        if (isNaN(bet)) return message.reply(`Please Give A Bet`)
        if (user.money <= 0) return message.reply(`You need money`)
        if (user.money < bet) return message.reply(`**$${bet}** is needed to do this bet`)
        if (bet < 100000) return PlayerLose(bet)
        
        function BasePlayerCard(){
            PlayerHand += Math.round(Math.floor(Math.random() * 10) + 1)
            // console.log(PlayerHand)
            return PlayerHand
        }
        function BaseDealerCard(){
            return DealerHand += Math.round(Math.floor(Math.random() * 10) + 1)
        }
        
        let PlayersCard = BasePlayerCard() + BasePlayerCard()
        if (PlayersCard >= 22) {
            WinOnBlackJack(bet)
            return
        } else if (PlayersCard === 21) {
            WinOnBlackJack(bet)
            return
        } else if (PlayersCard === 0) {
            WinOnBlackJack(bet)
            return
        } else {
            message.reply(`You Are On ${PlayersCard}`)
                message.reply("You Can `!hit` `!stand` `!doubledown` ")
                const collector = new MessageCollector(message.channel, m => m.author.id === message.author.id, { time: 100000 });
                collector.on('collect', message => {
                    if (message.content == "!hit") {
                        collector.stop()
                        hit(PlayersCard, bet)
                    } else if (message.content == "!stand") {
                        collector.stop()
                        stand(PlayersCard, bet)
                    } else if (message.content == "!doubledown") {
                        collector.stop()
                        doubledown(PlayersCard, bet)
                    } else { 
                        message.reply(`Wrong Input`)
                    }
                })
        }

            function Game(qard, bet){
                // console.log(qard)
                message.reply(`You Are On ${qard}`)
                message.reply("You Can `!hit` `!stand` `!doubledown` ")
                const collector = new MessageCollector(message.channel, m => m.author.id === message.author.id, { time: 100000 });
                collector.on('collect', message => {
                    if (message.content == "!hit") {
                        collector.stop()
                        hit(qard, bet)
                    } else if (message.content == "!stand") {
                        collector.stop()
                        stand(qard, bet)
                    } else if (message.content == "!doubledown") {
                        collector.stop()
                        doubledown(qard, bet)
                    } else { 
                        message.reply(`Wrong Input`)
                    }
                })
            }
            function PlayerWin(beet){
                if (user.bet < 500000) {
                    return
                } else {
                let Bet = Number(beet)
                console.log(chalk.hex('70bb65')('[Transaction] ') + chalk.magenta(`[${message.author.username}] `) + chalk.bold.white(`Money: $${user.money} Bank: $${user.bank}`))
                user.money += Bet
                user.save()
                let embed = new MessageEmbed()
                .setTitle('Win')
                .setColor('GREEN')
                .addField('Transaction', [
				`Your bet was $${Bet}!`,
				`**$${Bet}** has been added from your account!`,
				`You new balance is **$${user.money}**`,
				`\u200b`
			])
			message.reply(embed)
            }
        }
            function PlayerLose(beet){
                if (user.bet < 500000) {
                    return
                } else {
                if (beet > user.money){
                    user.money == 0
                } else {
                    console.log(chalk.hex('70bb65')('[Transaction] ') + chalk.magenta(`[${message.author.username}] `) + chalk.bold.white(`Money: $${user.money} Bank: $${user.bank}`))
                user.money -= bet
                let embed = new MessageEmbed()
                .setTitle(`Lost`)
                .setColor('RED')
                .addField('Transaction', [
                    `Your bet was $${beet}!`,
                    `**$${beet}** has been Removed from your account!`,
                    `Your new **balance** is **$${user.money}**`,
                    `\u200b`
                ])
                message.reply(embed)
                user.save()
            }
        }
    }
            function hit(Card, bet){
                let newCard = Math.round(Math.floor(Math.random() * 10) + 1)
                let PlayersCard1 = Card + newCard
                // console.log(newCard)
                // console.log(cardlol)
                if (PlayersCard1 >= 22) {
                    PlayerLose(bet)
                } else if (PlayersCard1 === 21) {
                    WinOnBlackJack(bet)
                } else {
                    // message.reply(`You Are On ${PlayersCard1}`)    
                    Game(PlayersCard1, bet)
            }
        }
            function ddhit(Card, bet){
                let PlayersCard1 = Card + Math.round(Math.floor(Math.random() * 10) + 1)
                // console.log(Card)
                // console.log(cardlol)
                if (PlayersCard1 >= 22) {
                    PlayerLose(bet)
                } else if (PlayersCard1 === 21) {
                    WinOnBlackJack(bet)
                } else {
                    message.reply(`You Are On ${PlayersCard1}`)    
                    stand(PlayersCard1, bet)
            }
        }
            function stand(ard, bet){
            let dc = BaseDealerCard() + BaseDealerCard()
            if (dc >= 22) {
                PlayerWin(bet)
            } else {
                if (dc >= ard){
                    PlayerLose(bet)
                } else {
                    if (dc > 16){
                        PlayerWin(bet)
                    } else if (dc > 16 && ard === '21') {
                        WinOnBlackJack(bet)
                    }
                    else {
                        DealerCardCard(dc, ard, bet)
                    }
                }
            }
        }
        function DCstand(dc, ard, bet){
            if (dc >= 22) {
                PlayerWin(bet)
            } else {
                if (dc >= ard){
                    PlayerLose(bet)
                } else {
                    if (dc > 16){
                        PlayerWin(bet)
                    } else {
                        DealerCardCard(dc, ard, bet)
                    }
                }
            }
        }
            function doubledown(ard, bat){
                let bet = bat * 2
                ddhit(ard, bet)
                // console.log(bet)
            }
            function DealerCardCard(card, ard, bet){
                let Carf = card + Math.round(Math.floor(Math.random() * (2, 10)))
                DCstand(Carf, ard, bet)
            }
            function WinOnBlackJack(bet){
                let beet = bet + 10
                let Bet = Number(beet)
                console.log(chalk.hex('70bb65')('[Transaction] ') + chalk.magenta(`[${message.author.username}] `) + chalk.bold.white(`Money: $${user.money} Bank: $${user.bank}`))
                user.money += Bet
                user.save()
                let embed = new MessageEmbed()
                .setTitle('Congratulations You Got Black Jack')
                .setColor('GREEN')
                .addField('Transaction', [
				// `Your bet was $${Bet}!`,
				`**$${Bet}** has been added from your account!`,
				`You new balance is **$${user.money}**`,
				`\u200b`
            ])
            message.reply(embed)
            }
                let beet = bet + 10
                let Bet = Number(beet)
                console.log(chalk.hex('70bb65')('[Transaction] ') + chalk.magenta(`[${message.author.username}] `) + chalk.bold.white(`Money: $${user.money} Bank: $${user.bank}`))
                user.money += Bet
                user.save()
                let embed = new MessageEmbed()
                .setTitle('Congratulations You Got Black Jack')
                .setColor('GREEN')
                .addField('Transaction', [
				// `Your bet was $${Bet}!`,
				`**$${Bet}** has been added from your account!`,
				`You new balance is **$${user.money}**`,
				`\u200b`
            ])
            message.reply(embed)
        }
}
const Command = require('../../Structures/Command');
const { MessageEmbed } = require('discord.js');
const DBUser = require("../../Mongoose/Schema/user.js");
const mongoose = require('mongoose');
const botconfig = require("../../Mongoose/config.json")
const chalk = require('chalk')
// let i = 0

mongoose.connect(botconfig.URL, {
    useNewUrlParser: true,
    useUnifiedTopolgy: true
})

module.exports = class extends Command {

	constructor(...args) {
		super(...args, {
			aliases: ['topmoney'],
			description: '',
			category: 'Economy',
			usage: '',
            guildOnly: true,
            broken: true
		});
	}

	async run(message) {
        const args = message.content.trim().split(/ +/g);
        let Steala = await DBUser.findOne({ id: message.author.id, Username: message.author.username });
        if (!Steala) return message.channel.send('error')
        
        let x = [
            'BANK',
            'BANK',
            'BANK',
            'BANK',
            // 'MONEY'
        ]
        let y = [
            "200",
            "300",
            "400",
            "500",
            "600",
            "100",
            "700",
            "800",
            "900",
            "20",
            "30",
            "40",
            "50",
            "60",
            "10",
            "70",
            "80",
            "90",
            "2",
            "3",
            "4",
            "5",
            "6",
            "1",
            "7",
            "8",
            "9",
            "1000", 
            "1500" 
        ]

        let BankVsMoney = x[Math.floor(Math.random() * x.length)]
        if (BankVsMoney === 'BANK'){
            BankRob()
            console.log('true')
        } else {
            MoneyRob()
            console.log('true')
        }

        function BankRob(){
            DBUser.find({
                Type: 'User'
            }).sort([
                ["bank", "descending"]
            ]).exec((err, res) => {
                if (err) console.log(err);

                let embed = new MessageEmbed()
                .setTitle(`Steal From Bank!`)
                .setThumbnail('https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fgrimotnane.files.wordpress.com%2F2015%2F10%2Fthief.png&f=1&nofb=1')
    
                let pg = args[9]
                if (pg != Math.floor(pg)) pg = 1;
                if (!pg) pg = 1;
                
                if (res.length === 0) {
                    embed.addField("Error", "No Page Found!")
                    embed.setColor('RED')
                    
                } else {
                    let ROBBEDUSER = res[Math.floor(Math.random() * res.length)]
                    if (ROBBEDUSER.Username === Steala.Username){
                        message.channel.send(`Error`)
                        return
                    } else {
                        let robedmoney = y[Math.floor(Math.random() * y.length)]
                        Banksteal(message.author, ROBBEDUSER, robedmoney)
                    }
                }
            })
        }
            function MoneyRob() {
                DBUser.find({
                    Type: 'User'
                }).sort([
                    ["money", "descending"]
                ]).exec((err, res) => {
                    if (err) console.log(err);
            
                    let embed = new MessageEmbed()
                    .setTitle(`Steal From Money!`)
                    .setThumbnail('https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fgrimotnane.files.wordpress.com%2F2015%2F10%2Fthief.png&f=1&nofb=1')
        
                    let pg = args[9]
                    if (pg != Math.floor(pg)) pg = 1;
                    if (!pg) pg = 1;

                    if (res.length === 0) {
                        embed.addField("Error", "No Page Found!")
                        embed.setColor('RED')
                        
                    } else {
                        let ROBBEDUSER = res[Math.floor(Math.random() * res.length)]
                        if (ROBBEDUSER.Username === Steala.Username){
                            console.log(`Error`)
                            return
                        } else {
                        let robedmoney = y[Math.floor(Math.random() * y.length)]
                        Cashsteal(message.author, ROBBEDUSER, robedmoney)
                        }
                    }
                    
            })
        }
        function CashFail(mugger, Robbed, cash ){
            let FAILLMESG = new MessageEmbed()
            .setTitle(`Fail`)
            .setThumbnail(`https://external-content.duckduckgo.com/iu/?u=https://grimotnane.files.wordpress.com/2015/10/thief.png&f=1&nofb=1`)
            .setColor('RED')
            .addField("Failed", [
                `${mugger} Failed To Rob ${Robbed.Username} For ${cash} This Has Came Out Of Money`, 
                // `You Tried To Steal $${y[Math.floor(Math.random() * y.length)]}`
            ])
            message.channel.send(FAILLMESG)
        }
        function BankFail(mugger, Robbed, cash ){
            let FAILLMESG = new MessageEmbed()
            .setTitle(`Fail`)
            .setThumbnail(`https://external-content.duckduckgo.com/iu/?u=https://grimotnane.files.wordpress.com/2015/10/thief.png&f=1&nofb=1`)
            .setColor('RED')
            .addField("Failed", [
                `${mugger} Failed To Rob ${Robbed.Username} For ${cash} This Has Came Out Of Bank`, 
                // `You Tried To Steal $${y[Math.floor(Math.random() * y.length)]}`
            ])
            message.channel.send(FAILLMESG)
        }
        function Cashsteal(mugger, Robbed, cash ){
            console.log(`Money${Robbed.money} < ${cash}`)
            if (Robbed.money > cash){
                let CASH = new Number(cash)
                console.log(chalk.hex('70bb65')('[Transaction] ') + chalk.magenta(`[${Robbed.Username}] `) + chalk.bold.white(`Money: $${Robbed.money} Bank: $${Robbed.bank}`))
                console.log(chalk.hex('70bb65')('[Transaction] ') + chalk.magenta(`[${Steala.Username}] `) + chalk.bold.white(`Money: $${Steala.money} Bank: $${Steala.bank}`))                
                Robbed.money -= CASH
                Steala.money += CASH
                Robbed.save()
                Steala.save()
            let RobbedMessage = new MessageEmbed()
            .setTitle('What A Deal!')
            .setThumbnail('https://external-content.duckduckgo.com/iu/?u=https://grimotnane.files.wordpress.com/2015/10/thief.png&f=1&nofb=1')
            .addField("Steal", [
                `${mugger.username} robbed ${Robbed.Username} For $${cash} This Has Came Out Of Money`
            ])
            message.channel.send(RobbedMessage)
            } else {
                CashFail(mugger, Robbed, cash)
            }
        }
        function Banksteal(mugger, Robbed, cash ){
            console.log(`Bank ${Robbed.bank} < ${cash}`)
            if (Robbed.bank > cash){
                Robbed.bank -= Robbed.bank
                Steala.money += Robbed.bank
                console.log(chalk.hex('70bb65')('[Transaction] ') + chalk.magenta(`[${Robbed.Username}] `) + chalk.bold.white(`Money: $${Robbed.money} Bank: $${Robbed.bank}`))
                console.log(chalk.hex('70bb65')('[Transaction] ') + chalk.magenta(`[${Steala.Username}] `) + chalk.bold.white(`Money: $${Steala.money} Bank: $${Steala.bank}`))
                Robbed.save()
                Steala.save()
            let RobbedMessage = new MessageEmbed()
            .setTitle('What A Deal!')
            .setThumbnail('https://external-content.duckduckgo.com/iu/?u=https://grimotnane.files.wordpress.com/2015/10/thief.png&f=1&nofb=1')
            .addField("Steal", [
                `${mugger.username} robbed ${Robbed.Username} For $${cash} This Has Came Out Of Bank`
            ])
            message.channel.send(RobbedMessage)
            } else {
                BankFail(mugger, Robbed, cash)
            }
        }
    }
}
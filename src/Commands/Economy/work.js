const { MessageEmbed } = require('discord.js');
const Command = require('../../Structures/Command');
const DBUser = require("../../Mongoose/Schema/user");
const DBJob = require("../../Mongoose/Schema/Job");
const chalk = require('chalk')
module.exports = class extends Command {

	constructor(...args) {
		super(...args, {
			description: '',
			category: 'Economy',
			usage: '',
			guildOnly: true,
            // args: true
            broken: true
		});
	}

    async run(message) {
        let user = await DBUser.findOne({ id: message.author.id, Username: message.author.username})
        if (!user) return message.channel.send(`**${message.author.username}** isnt in the system`)
        let Job = await DBJob.findOne({JobTitle: "KFC" });
        let Workquality = [
            "Good",
            "Good",
            "Good",
            "Bad",
            "Bad",
            "Okay",
            "Okay",
            "Okay"
        ]
        let WorkQuality = Workquality[Math.floor(Math.random() * Workquality.length)]
        let JobWork = Job.JobJob[Math.floor(Math.random() * Job.JobJob.length)]
        let max = Job.PayMax
        let min = Job.PayMin
        let Money = Math.round(Math.floor(Math.random() * (max - min) + min))
        if (WorkQuality === "Okay"){
            let money = Math.round(Money / 3)
            Work(money, JobWork)
        } else if (WorkQuality === "Bad"){
            let money = 0
            BadWork(money, JobWork)
        } else {
            let money = Money
            Work(money, JobWork)
        }
        
        function Work(Cash, Work){
            let cash = new Number(Cash)
            user.bank += cash
            console.log(chalk.hex('70bb65')('[Transaction] ') + chalk.magenta(`[${message.author.username}] `) + chalk.bold.white(`Money: $${user.money} Bank: $${user.bank}`))
            user.save()
            let Embed = new MessageEmbed()
            .setTitle('Work')
            .setColor('RANDOM')
            .addField('Work', [
                `${Work}`,
                `You Got Paid **$${cash}**`
            ])
            .addField('Transaction', [
                `**$${cash}** Has Been Add To Your Bank Account`
            ])
            message.reply(Embed)
            }

            function BadWork(Cash, Work){

                let Embed = new MessageEmbed()
                .setTitle('Work')
                .setColor('RED')
                .addField('Work', [
                    `${Work}`,
                    `You Didnt Get Paid`,
                    `Your Work Was So **BAD** your boss cant pay you day`
                ])
                .addField('Transaction', [
                    `You Would Be Paid **$${Cash}** `
                ])
                message.reply(Embed)
                }
    }
}
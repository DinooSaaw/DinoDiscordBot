const { MessageEmbed, MessageCollector } = require('discord.js');
const DBUser = require("../../Mongoose/Schema/user");
const DBGuild = require("../../Mongoose/Schema/Guild");


module.exports = {
    name: "highlow",
    description:
    "Play a fun game of highlow",
    usage: "highlow",
    category: "Economy",
    run: async (client, message) => {
        let user = await DBUser.findOne({ id: message.author.id, Username: message.author.username });
        if (!user) return message.channel.send(`**${message.author.username}** isnt in the system`)
        let guild = await DBGuild.findOne({ GuildId: message.guild.id})
		if (!guild) return message.channel.send(`Something when wrong!`)
        if (user.money <= 0) return message.reply(`No Poor People Allowed Here`)
        user.money -= 75
        let number = Math.floor(Math.random() * (100 - 1) + 1)
        let hint = Math.floor(Math.random() * (100 - 1) + 1)
        let Money = Number(Math.floor(Math.random() * (200 - 1) + 1))
        let money = Money
    
        let embedA = new MessageEmbed()
        .setTitle(`${message.author.username}'s High-Low Game`)
        .setDescription(`A number secret between 1-100 has been chosen.\n Your hint is **${hint}**. \n Respond with "*high*", "*low*", or "*jackpot*".`)
        .setFooter(`Choose whether you think the hidden number is higher, lower, or the same number as the hint`)
        message.channel.send(embedA)
        const collector = new MessageCollector(message.channel, m => m.author.id === message.author.id, { time: 10000 });
        collector.on('collect', message => {
            if (message.content == "high") {
                if (hint < number){
                    console.log(money)
                    embedA.setDescription(`**You won $${money}**`)
                    embedA.setColor(guild.embedColor)
                    embedA.setFooter(`Your hint is ${hint} The number was ${number}`)
                    message.channel.bulkDelete(3)
                    message.channel.send(embedA)
                    user.money += money 
                    user.save()
                    collector.stop()
                } else {
                    embedA.setDescription(`**You Lose**`)
                    embedA.setColor(guild.embedColor)
                    embedA.setFooter(`Your hint is ${hint} The number was ${number}`)
                    message.channel.bulkDelete(3)
                    message.channel.send(embedA)
                    collector.stop()
                }
            }
            if (message.content == "low") {
                if (hint > number){
                    console.log(money)
                    embedA.setDescription(`**You won $${money}**`)
                    embedA.setColor(guild.embedColor)
                    embedA.setFooter(`Your hint is ${hint} The number was ${number}`)
                    message.channel.bulkDelete(3)
                    message.channel.send(embedA)
                    user.money += money
                    user.save()
                    collector.stop()
                } else {
                    embedA.setDescription(`**You Lose**`)
                    embedA.setColor(guild.embedColor)
                    embedA.setFooter(`Your hint is ${hint} The number was ${number}`)
                    message.channel.bulkDelete(3)
                    message.channel.send(embedA)
                    collector.stop()
                }
            }
            if (message.content == "jackpot") {
                if (hint === number){
                    console.log(money)
                    embedA.setDescription(`**You won $${money}**`)
                    embedA.setColor(guild.embedColor)
                    embedA.setFooter(`Your hint is ${hint} The number was ${number}`)
                    message.channel.bulkDelete(3)
                    user.money += money + 350
                    user.save()
                    message.channel.send(embedA)
                    collector.stop()
                } else {
                    embedA.setDescription(`**You Lose**`)
                    embedA.setColor(guild.embedColor)
                    embedA.setFooter(`Your hint is ${hint} The number was ${number}`)
                    message.channel.bulkDelete(3)
                    message.channel.send(embedA)
                    collector.stop()
                }
            }	
})
}
}
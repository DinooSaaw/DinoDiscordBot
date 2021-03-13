const { MessageEmbed } = require('discord.js');
const DBUser = require("../../Mongoose/Schema/user");
const DBGuild = require("../../Mongoose/Schema/Guild");


module.exports = {
    name: "pay",
    description:
      "Pay a user",
    usage: "pay <user> <money>",
    category: "Economy",
    run: async (client, message) => {
        const member = message.mentions.members.last() || message.member;
        if (!member) return
        let user = await DBUser.findOne({ id: message.author.id, Username: message.author.username });
        if (!user) return message.channel.send(`**${message.author.username}** isnt in the system`)
        let user1 = await DBUser.findOne({ id: member.id, Username: member.username });
        if (!user1) return message.channel.send(`**${member.user.username}** isnt in the system`)
        let guild = await DBGuild.findOne({ GuildId: message.guild.id})
		if (!guild) return message.channel.send(`Something when wrong!`)                
        if (user.money <= 0) return
        const args = message.content.trim().split(/ +/g);
		const MOENY = args[2]
        if (isNaN(MOENY)) return
        if (MOENY <= 0) return
        if (user.money <= 0) return
        if (user == user1) return
        if (message.author.username == member.user.username) return
        let UserMone = Number(MOENY)
        let UserMon = Math.round(UserMone)
        let networth = user1.money + user1.bank
        if (networth >= 1500000) return message.reply(`Your Have Hit The Max Net Worth`)
        Pay(UserMone)
        
        
        function Pay(Payoney){
            console.log(chalk.hex('70bb65')('[Transaction] ') + chalk.magenta(`[${message.author.username}] `) + chalk.bold.white(`Money: $${user.money} Bank: $${user.bank}`))
            console.log(chalk.hex('70bb65')('[Transaction] ') + chalk.magenta(`[${member.user.username}] `) + chalk.bold.white(`Money: $${user1.money} Bank: $${user1.bank}`))
            user.money -= Payoney
            user1.money += Payoney
            user.save()
            user1.save()
            let embem = new MessageEmbed() 
            .setTitle('Pay')
            .setColor(guild.embedColor)
            .addField('Transaction', [
            `$${UserMon} Has Been Removed From ${message.author.username}`,
            `$${UserMon} Has Been Add To ${member.user.username}`
        ])
        message.channel.send(embem)
        }
        
	}
};
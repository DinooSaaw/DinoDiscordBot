const { MessageEmbed } = require('discord.js');
const DBUser = require("../../Mongoose/Schema/user");
const DBGuild = require("../../Mongoose/Schema/Guild");


module.exports = {
    name: "withdraw",
    description:
      "Withdraw money from your bank account",
    usage: "withdraw <user>",
    category: "Economy",
    run: async (client, message) => {
		let user = await DBUser.findOne({ id: message.author.id, Username: message.author.username });
        if (!user) return message.channel.send(`**${message.author.username}** isnt in the system`)
        let guild = await DBGuild.findOne({ GuildId: message.guild.id})
		if (!guild) return message.channel.send(`Something when wrong!`)
        const args = message.content.trim().split(/ +/g);
        const Money = args[1]
        if (!Money) return
        // console.log(Money)
        
        if (user.bank < 0) return
        if (Money === "All") { 
            let AllHand = user.bank
            Withdraw(AllHand)
        } else if (Money === "all"){
            let AllHand = user.bank
            Withdraw(AllHand)
        } else {
            if (isNaN(Money)) return
            if (Money <= 0) return
            Withdraw(Money)
        }
        function Withdraw(cash){
        if (user.bank < Money) return message.channel.send(`You don't have enough money in the bank`)
        let CASH = new Number(cash)
        user.money += CASH
        user.bank -= CASH
        user.save()
        const embem = new MessageEmbed() 
        .setTitle('Bank')
        .setColor(guild.embedColor)
        .addField('Transaction', [
            `$${CASH} Has Been Removed From ${message.author.username}`,
            `$${CASH} Has Been Add To ${message.author.username}'s Money`
            ])
        message.channel.send(embem)
        }
        }
        
};

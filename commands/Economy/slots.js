const { MessageEmbed } = require('discord.js');
const DBUser = require("../../Mongoose/Schema/user");
const DBGuild = require("../../Mongoose/Schema/Guild");


module.exports = {
    name: "slots",
    description:
      "Play a fun game of slots",
    usage: "slots",
    category: "Economy",
    run: async (client, message) => {
        const slots = [
            { slot: "💰 💎 💵", value: 0},
            { slot: "💎 💰 💵", value: 0},
            { slot: "💎 💵 💰", value: 0},
            { slot: "💰 💵 💎", value: 0},
            { slot: "💵 💰 💎", value: 0},
            { slot: "💵 💎 💰", value: 0},
            { slot: "💵 ⭐ 💰", value: 0},
            { slot: "⭐ 💵 💰", value: 0},
            { slot: "⭐ 💰 💵", value: 0},
            { slot: "💵 💰 ⭐", value: 0},
            { slot: "💰 💵 ⭐", value: 0},
            { slot: "💰 ⭐ 💵", value: 0},
            { slot: "💵 💰 ⭐", value: 0},
            { slot: "💵 👑 💰", value: 0},
            { slot: "👑 💵 💰", value: 0},
            { slot: "👑 💰 💵", value: 0},
            { slot: "💵 💰 👑", value: 0},
            { slot: "💰 💵 👑", value: 0},
            { slot: "💰 👑 💵", value: 0},
            { slot: "💵 💰 👑", value: 0},
            { slot: "💵 💵 💰", value: 100},
            { slot: "💵 💵 ⭐", value: 100},
            { slot: "💵 💵 👑", value: 100},
            { slot: "💵 💵 💎", value: 100},
            { slot: "💵 💎 💵", value: 100},
            { slot: "💵 👑 💵", value: 100},
            { slot: "💵 👑 💵", value: 100},
            { slot: "💵 ⭐ 💵", value: 100},
            { slot: "💵 💰 💵", value: 100},
            { slot: "⭐ 💵 💵", value: 100},
            { slot: "👑 💵 💵", value: 100},
            { slot: "💎 💵 💵", value: 100},
            { slot: "💰 💵 💵", value: 100},
            { slot: "💵 💵 💵", value: 200},
            { slot: "💵 💰 👑", value: 0},
            { slot: "⭐ ⭐ 💰", value: 130},
            { slot: "👑 👑 ⭐", value: 180},
            { slot: "💎 💎 👑", value: 250},
            { slot: "💰 💰 💎", value: 140},
            { slot: "💰 💎 💰", value: 140},
            { slot: "⭐ 👑 ⭐", value: 130},
            { slot: "👑 ⭐ 👑", value: 180},
            { slot: "💎 💰 💎", value: 250},
            { slot: "⭐ 💰 💰", value: 140},
            { slot: "💰 💰 💰", value: 280},
            { slot: "👑 💎 💎", value: 250},
            { slot: "💎 💎 💎", value: 400},
            { slot: "💎 👑 👑", value: 180},
            { slot: "👑 👑 👑", value: 360},
            { slot: "💰 ⭐ ⭐", value: 130},
            { slot: "⭐ ⭐ ⭐", value: 260},
            { slot: "J A C K P O T", value: 500},
            ]
    
        let user = await DBUser.findOne({ id: message.author.id, Username: message.author.username });
        if (!user) return message.channel.send(`**${message.author.username}** isnt in the system`)
        if (user.money <= 100) return message.reply(`No Poor People Allowed Here`);
        let guild = await DBGuild.findOne({ GuildId: message.guild.id})
		if (!guild) return message.channel.send(`Something when wrong!`)        
        let networth = user.money + user.bank;
        let option = slots[Math.floor(Math.random() * slots.length)]
        user.money -= 150
        let SlotsGame = new MessageEmbed()
        .setTitle(`${message.author.username}'s Slots Game`)
        .setColor(`RANDOM`)
        .addField('Game:', [
            `❌ ❌ ❌`,
        ])
        let msg = await message.channel.send(SlotsGame)
        setTimeout(() => {
            let EditGame = new MessageEmbed()
            .setTitle(`${message.author.username}'s Slots Game`)
            .setColor(guild.embedColor)
            .addField('Game', [
                `${option.slot}`
            ])
            if (option.value === 0) {
                EditGame.setFooter(`You lost`)
            } else {
                EditGame.setFooter(`You Won $${option.value}`)  
                Winner(option.value)
            }
            msg.edit(EditGame)
        }, 3000);

        function Winner(value){
            user.money += value
            user.save()
        }
    }
}
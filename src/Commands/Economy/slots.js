const { MessageEmbed } = require('discord.js');
const Command = require('../../Structures/Command');
const DBUser = require("../../Mongoose/Schema/user");
const chalk = require('chalk')
module.exports = class extends Command {

	constructor(...args) {
		super(...args, {
			description: 'Slots Game',
			category: 'Economy',
			usage: '',
			guildOnly: true
			// args: true
		});
	}

	async run(message) {
        const slots = [
            { slot: "💰 💎 💵 ", value: 0},
            { slot: "💎 💰 💵 ", value: 0},
            { slot: "💵 💎 💰 ", value: 0},
            { slot: "💵 💰 💎 ", value: 0},
            { slot: "💎 💵 💰 ", value: 0},
            { slot: "💵 💎 💰 ", value: 0},
            { slot: "💰 💰 💵 ", value: 25},
            { slot: "💰 💵 💰 ", value: 25},
            { slot: "💰 💰 💎 ", value: 120},
            { slot: "💵 💵 💰 ", value: 25},
            { slot: "💵 💰 💵 ", value: 25},
            { slot: "💵 💵 💎 ", value: 100},
            { slot: "💎 💎 💎 ", value: 500},
            { slot: "💎 💎 💰 ", value: 150},
            { slot: "💎 💎 💵 ", value: 125},
            { slot: "💵 💵 💵 ", value: 100},
            { slot: "💰 💰 💰 ", value: 150}
        ]
    
        let user = await DBUser.findOne({
            id: message.author.id,
            Username: message.author.username,
          });
          if (!user) return message.channel.send(`**${message.author.username}** isnt in the system`);
          if (user.money <= 100) return message.reply(`No Poor People Allowed Here`);
          let networth = user.money + user.bank;
          if (networth >= 1500000) return message.reply(`Your Have Hit The Max Net Worth`);
          
        let option = slots[Math.floor(Math.random() * slots.length)]
        user.money -= 100
        let SlotsGame = new MessageEmbed()
        .setTitle(`${message.author.username}'s Slots Game`)
        .setColor(`RANDOM`)
        .addField('Game:', [
            `:x: :x: :x:`,
        ])
        let msg = await message.channel.send(SlotsGame)
        setTimeout(() => {
            let EditGame = new MessageEmbed()
            .setTitle(`${message.author.username}'s Slots Game`)
            .setColor(`RANDOM`)
            .addField('Game', [
                `${option.slot}`
            ])
            .setFooter(`You Won $${option.value}`)  
            if (option.value === 0) {
                return;
            } else {
                Winner(option.value)
            }
            msg.edit(EditGame)
        }, 5000);

        function Winner(value){
            user.money += value
            user.save()
        }
    }
}
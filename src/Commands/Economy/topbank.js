const Command = require('../../Structures/Command');
const { MessageEmbed } = require('discord.js');
const DBUser = require("../../Mongoose/Schema/user.js");
const mongoose = require('mongoose');
const botconfig = require("../../Mongoose/config.json")
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
			guildOnly: true
		});
	}

	async run(message) {
        const args = message.content.trim().split(/ +/g);
        DBUser.find({
            Type: "User"
        }).sort([
            ["bank", "descending"]
        ]).exec((err, res) => {
            if (err) console.log(err);

            var Page = Math.ceil(res.length / 10);
            
            let embed = new MessageEmbed()
            .setTitle(`Top Bank Accounts!`)
            .setThumbnail('https://img.icons8.com/clouds/64/000000/leaderboard.png')

            let pg = parseInt(args[1]);
            if (pg != Math.floor(pg)) pg = 1;
            if (!pg) pg = 1;
            let end = pg * 10
            let start = (pg * 10) - 10

            if (res.length === 0) {
                embed.addField("Error", "No Paged Found!")
                embed.setColor('RED')
            } else if (res.length <= start) {
                embed.addField("Error", "Page Not Found!")
                embed.setColor('RED')
            } else if (res.length <= end) {
                embed.setFooter(`Page ${pg} Of ${Page}`)
                for (let i = start; i < res.length; i++) {
                    embed.addField(`${i + 1}. ${res[i].Username}`, `$${res[i].bank.toLocaleString()}`);
                    embed.setColor('RANDOM')
                }
                
            } else {
                embed.setFooter(`Page ${pg} Of ${Page}`)
                for (let i = start; i < end; i++) {
                    embed.addField(`${i + 1}. ${res[i].Username}`, `$${res[i].bank.toLocaleString()}`)
                }
            }

            message.channel.send(embed)
        })
    }
}
const { MessageEmbed } = require('discord.js');
const Command = require('../../Structures/Command');
const DBUser = require("../../Mongoose/Schema/user");

module.exports = class extends Command {

	constructor(...args) {
		super(...args, {
			aliases: [''],
			description: 'prestige',
			category: 'Economy',
			usage: '',
			guildOnly: true
			// args: true
		});
	}

	async run(message) {
        let user = await DBUser.findOne({ id: message.author.id, Username: message.author.username });
		if (!user) return
        const checkOrCross = (bool) => bool ? '✅' : '❎';
        let Embed = new MessageEmbed()
        .setTitle(`Prestige`)
        .setThumbnail(message.member.user.displayAvatarURL({ dynamic: true, size: 512 }))
        .setColor(message.member.displayHexColor || 'RANDOM')
        
        let networth = user.money + user.bank
        if (networth < 1499999 || user.level < 4 || user.kill < 29) {
            Embed.setColor('RED')
            Embed.setDescription("**One or more requirements haven't been *achieved***")
            Embed.addField('Requirements', [
               `**❯ Networth:** ${checkOrCross(networth >= 1499999)}`,
               `**❯ Level:** ${checkOrCross(user.level >= 5)}`,
               `**❯ Kills:** ${checkOrCross(user.kill >= 30)}`
            ])
            message.channel.send(Embed)
        } else {
            user.money = 0
            user.bank = 0
            user.level = 0
            user.exp = 0
            user.kill = 0
            user.prestige += 1
            user.multiplier += 1
            user.save()
            // Embed.setColor('RED')
            Embed.setDescription("**All requirements have been *achieved***")
            Embed.addField('Requirements', [
               `**❯ Networth:** ${checkOrCross(networth >= 1500000)}`,
               `**❯ Level:** ${checkOrCross(user.level >= 5)}`,
               `**❯ Kills:** ${checkOrCross(user.kill >= 30)}`
            ])
            Embed.addField('Info', [
                `**❯ Money:** ${user.money}`,
                `**❯ Bank:** ${user.bank}`,
                `**❯ Level:** ${user.level}`,
                `**❯ Kills:** ${user.kill}`,
                `**❯ Multiplier:** ${user.multiplier}`
             ])
             Embed.addField("What's New?", [
                 `Your **multiplier** has upgraded but what does that mean. \n It means you now earn ${user.multiplier} times money`
             ])
             message.channel.send(Embed)
        }
        
    }
}
const Command = require('../../Structures/Command');
const fs = require('fs');
const kills = require('../../Assets/Text/Killed.json');
const { MessageEmbed } = require('discord.js')

module.exports = class extends Command {

    constructor(...args) {
		super(...args, {
			description: 'Kill yourself or friends',
			category: 'Fun',
            guildOnly: true
		});
	}

	// eslint-disable-next-line no-unused-vars
	async run(message) {
        const target = message.mentions.users.first();

        if (!target)
          return message.channel.send(`${message.author} killed themselves. 💀`);
      
        const id = target.id;
        let deathCount = kills[id];
      
        // if (!deathCount) {
        //   kills[id] = 1;
      
        //   const emb = new MessageEmbed()
        //     .setColor('#0099ff')
        //     .addField(`${message.author} killed ${target.tag} 🔪`, `${target.tag} has been killed for the first time!`, true)
        //     .setImage('https://i.imgur.com/7MkzxTT.gif')
      
        //   message.channel.send(emb);
      
        // } else {
        //   deathCount = (kills[id] = kills[id] + 1);
      
        //   const emb = new MessageEmbed()
        //     .setColor('#0099ff')
        //     .addField(`${message.author} killed ${target.tag} 🔪`, `${target.tag} has been killed ${deathCount} times!`, true)
        //     .setImage('https://i.imgur.com/7MkzxTT.gif')
      
        //   message.channel.send(emb);
      
        // }
      
        // // Update kills file
        // fs.writeFileSync(
        //   "../../Assets/Text/Killed.json",
        //   JSON.stringify(kills),
        //   (err) => console.log(err)
        // );
      }
}
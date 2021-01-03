const { MessageEmbed, MessageAttachment } = require('discord.js')
const Command = require('../../Structures/Command');
const DBUser = require("../../Mongoose/Schema/user");


module.exports = class extends Command {

    constructor(...args) {
		super(...args, {
      aliases: ['cf'],
			description: 'Coinflip',
			category: 'Fun',
		});
	}

	// eslint-disable-next-line no-unused-vars
	async run(message) {
        let random = (Math.floor(Math.random() * Math.floor(2)));
        const heads = new MessageEmbed()
        .setImage('https://media1.tenor.com/images/26ceb9ab4b5b070f7b0257f8f4e0c80f/tenor.gif?itemid=13943298')
        .setTitle('Heads!')
        let Tails = new MessageEmbed()
        .setTitle('Tails!')
        .setImage('https://media1.tenor.com/images/6d7a3ee293c118b90205aa2fb3a7f740/tenor.gif?itemid=13943297')
        let user = await DBUser.findOne({ id: message.author.id, Username: message.author.username });
        if (!user) return
        const args = message.content.trim().split(/ +/g);

    if(random === 0) {
      message.delete()
      message.channel.send(heads);
      }else {
      message.delete()
      message.channel.send(Tails);
    }
  }
}
const { MessageEmbed } = require('discord.js');
const DBUser = require("../../Mongoose/Schema/user");
const DBGuild = require("../../Mongoose/Schema/Guild");


module.exports = {
    name: "coinflip",
    description:
      "Play coinflip",
    usage: "Coinflip",
    category: "Fun",
    run: async (client, message) => {
        let user = await DBUser.findOne({ id: message.author.id, Username: message.author.username });
        if (!user) return message.channel.send(`**${message.author.username}** isnt in the system`)
        let guild = await DBGuild.findOne({ GuildId: message.guild.id})
        if (!guild) return message.channel.send(`Something when wrong!`)                
        let random = (Math.floor(Math.random() * Math.floor(2)));
        const heads = new MessageEmbed()
        .setImage('https://media1.tenor.com/images/26ceb9ab4b5b070f7b0257f8f4e0c80f/tenor.gif?itemid=13943298')
        .setTitle('Heads!')
        let Tails = new MessageEmbed()
        .setTitle('Tails!')
        .setImage('https://media1.tenor.com/images/6d7a3ee293c118b90205aa2fb3a7f740/tenor.gif?itemid=13943297')
        
    if(random === 0) {
      message.delete()
      message.channel.send(heads);
      }else {
      message.delete()
      message.channel.send(Tails);
    }
  }
}
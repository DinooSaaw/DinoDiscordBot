const { MessageEmbed } = require('discord.js');
const fetch = require("node-fetch");
const DBUser = require("../../Mongoose/Schema/user");
const DBGuild = require("../../Mongoose/Schema/Guild");
const { set } = require('mongoose');

module.exports = {
    name: "vote",
    description:
      "Vote for the bots",
    usage: "vote",
    category: "Economy",
    run: async (client, message) => {
        const user = await DBUser.findOne({ id: message.author.id });
        if (!user) return;
        let guild = await DBGuild.findOne({ GuildId: message.guild.id})
		if (!guild) return message.channel.send(`Something when wrong!`)
        function notvoted() {
            let notvotedembed = new MessageEmbed()
            .setTitle(`Vote!`)
            .setDescription(`You can vote [here](https://top.gg/bot/679647972539105298/vote) \n To gain the following rewards`)
            .addField(`Rewards`, [
                `**❯ Money:** $5000`,
                `**❯ Bank Account:** $2500`
            ])
            message.channel.send(notvotedembed)
        }
    
        let url = `https://top.gg/api/bots/679647972539105298/check?userId=${message.author.id}`;
        let options = {
            method: "GET",
            headers: {
                Authorization: process.env.topggtoken,
            },
        };

        fetch(
            url,
            options
          ).then((res) => res.json()
          ).then((json) => {
              console.log(json)
              if (json.voted == 0){
                  notvoted()
              }
              else if (json.voted == 1){
                notvoted()
            }else{
                  notvoted()
              }
          })
          
    }
};
const fetch = require('node-fetch')
const DBGuild = require("../../Mongoose/Schema/Guild");


module.exports = {
    name: "documentation",
    description:
    "Shows the documentation",
    usage: "documentation",
    category: "Infomation",
    aliases: ['discordjs', 'djs', 'docs'],
    run: async (client, message, ...query) => {
        let guild = await DBGuild.findOne({ GuildId: message.guild.id})
		if (!guild) return message.channel.send(`Something when wrong!`)                
        const URL = `https://djsdocs.sorta.moe/v2/embed?src=stable&q=${encodeURIComponent(query)}`;

        const docFetch = await fetch(URL);
        const embed = await docFetch.json();

        if (!embed || embed.error) {
            return message.reply(`"${query}" couldn't be located within the discord.js documentation (<https://discord.js.org/>).`);
        }

        if (!message.guild) {
            return message.channel.send({ embed });
        }

        const msg = await message.channel.send({ embed });
        msg.react('🗑')
        
        let react; 
        try {
            react = await msg.awaitReactions(
                (reaction, user) => reaction.emoji.name === '🗑' && user.id === message.author.id,
                { max: 1, time: 10000, errors: ['time'] }
            );
        } catch (error) {
            msg.reactions.removeAll();
        }

        if (react && react.first()) msg.delete();

        return message;
    }
}
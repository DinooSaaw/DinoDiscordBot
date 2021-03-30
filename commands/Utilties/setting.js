const { MessageEmbed, MessageCollector } = require("discord.js")
const DBGuild = require("../../Mongoose/Schema/Guild");

module.exports = {
    name: "settings",
    description:
      "Get guild's settings",
    usage: "settings <settings> <settings options>",
    category: "Utilties",
    cooldown: 0,
    run: async (client, message, args) => {
        let dataguild = await DBGuild.findOne({ GuildId: message.guild.id});
        if (!dataguild){
            message.channel.send(`Error Loading Setting Try Again`)
        }
        let settingmenu = new MessageEmbed()
        .setTitle(`${message.guild.name}'s Settings`)
        .setThumbnail(message.guild.iconURL({ dynamic: true }))
		.setColor(dataguild.embedColor)
        .addField("General", [
            `**❯ Prefix:** ${dataguild.prefix}`,
            `**❯ Guild-Color:** ${dataguild.embedColor}`,
            `**❯ Opt-in:** ${dataguild.optin}`,
        ])
        .addField("Channels", [
            `**❯ Log-Channel:** <#${dataguild.logChannel}>`,
            `**❯ Welcome-Channel:** <#${dataguild.welcomeChannel}>`,
        ])
        .addField("Roles", [
            `**❯ Muted-Role:** <@&${dataguild.mutedRole}>`,
        ])
        .setFooter(`To change a setting use ${dataguild.prefix}settings Prefix r/`)
        
        if (!args){
            message.channel.send(settingmenu)
        } else if (args[0] == "prefix" || args[0] == "Prefix"){
            dataguild.prefix = args[1]
            message.channel.send(`**Prefix Updated**`)
            dataguild.save()
        } else if (args[0] == "Muted-Role" || args[0] == "muted-role"){
            let mutedrole = args[1].replace(/\D/g,'');
            if(isNaN(mutedrole)) return message.channel.send(`**Please @ the muted role**`)
            dataguild.mutedRole = mutedrole
            message.channel.send(`**Muted Role Updated**`)
            dataguild.save() 
        } else if (args[0] == "Log-Channel" || args[0] == "log-channel"){
            let logchannel = args[1].replace(/\D/g,'');
            if(isNaN(logchannel)) return message.channel.send(`**Please # the log channel**`)
            dataguild.logChannel = logchannel
            message.channel.send(`**Log Channel Updated**`)
            dataguild.save()
        }else if (args[0] == "Welcome-Channel" || args[0] == "welcome-channel"){
            let logchannel = args[1].replace(/\D/g,'');
            if(isNaN(logchannel)) return message.channel.send(`**Please # the log channel**`)
            dataguild.welcomeChannel = logchannel
            message.channel.send(`**Welcome Channel Updated**`)
            dataguild.save()
        } else if (args[0] == "Guild-Color" || args[0] == "guild-color"){
            dataguild.embedColor = args[1]
            message.channel.send(`**Guild Color Updated**`)
            dataguild.save()
        } else {
            message.channel.send(settingmenu)
        }

    }
}
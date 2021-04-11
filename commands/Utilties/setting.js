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
        function messagefix(oldmessage){
            let newmessage = oldmessage
            newmessage.replace("${member.user.username}", "<username>")
            newmessage.replace("${member.guild.name}", "<guild name>")
            return newmessage
        }
        function msg(){
            const collector = new MessageCollector(
                message.channel,
                (m) => m.author.id === message.author.id,
                { max: 1, time: 180000 }
              );
              collector.on("collect", (newmessage) => {
                  newmessage.replace("<username>", "${member.user.username}")
                  newmessage.replace("<guild name>", "${member.guild.name}")
                  return newmessage
            });
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
            `**❯ Welcome Message Opt-in:** ${dataguild.welcomeopt}`,
            `**❯ Welcome Message :** \n ${messagefix(dataguild.welcomemsg)}`,
            `**❯ Leave Message Opt-in:** ${dataguild.leaveopt}`,
            `**❯ Leave Message :** \n ${messagefix(dataguild.leavemsg)}`,
        ])
        .addField("Roles", [
            `**❯ Muted-Role:** <@&${dataguild.mutedRole}>`,
        ])
        .setFooter(`To change a setting use ${dataguild.prefix}settings Prefix r/`)
        
        if(!message.member.hasPermission(["MANAGE_GUILD"])) {
            settingmenu.setFooter(`To change a setting you must have the **Manage Server** Permission`)
            return message.channel.send(settingmenu)
        }
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
            dataguild.optin = args[1]
            message.channel.send(`**Guild Color Updated**`)
            dataguild.save()
        } else if (args[0] == "optin" || args[0] == "Optin" || args[0] == "OptIn"){
            if (!typeof args[1] === "boolean") return message.channel.send("Please Give `true` or `false`")
            dataguild.embedColor = args[1]
            message.channel.send(`**Opt-In Updated**`)
            dataguild.save()
        } else if (args[0] == "Welcome Message Opt-in" || args[0] == "welcome message opt-in" || args[0] == "Welcome Message Optin" || args[0] == "welcome message optin" ){
            if (!typeof args[1] === "boolean") return message.channel.send("Please Give `true` or `false`")
            dataguild.welcomeopt = args[1]
            message.channel.send(`**Welcome Message Opt-in Updated**`)
            dataguild.save()
        } else if (args[0] == "Leave Message Opt-in" || args[0] == "leave message opt-in" || args[0] == "Leave Message Optin" || args[0] == "leave message optin" ){
            if (!typeof args[1] === "boolean") return message.channel.send("Please Give `true` or `false`")
            dataguild.leaveopt = args[1]
            message.channel.send(`**Leave Message Opt-in Updated**`)
            dataguild.save()
        } else if (args[0] == "Leave Message" || args[0] == "leave message") {
            dataguild.leavemsg = msg()
            message.channel.send(`**Leave Message Opt-in Updated**`)
            dataguild.save()
        } else if (args[0] == "Welcome Message" || args[0] == "welcome message") {
            dataguild.welcomemsg = msg()
            message.channel.send(`**Leave Message Opt-in Updated**`)
            dataguild.save()
        } else {
            message.channel.send(settingmenu)
        }

    }
}
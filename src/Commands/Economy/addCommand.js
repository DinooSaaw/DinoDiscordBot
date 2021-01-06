const { MessageEmbed } = require('discord.js');
const Command = require('../../Structures/Command');
const chalk = require('chalk')
const DBCommand = require('../../Mongoose/Schema/Command')
const DBUser = require("../../Mongoose/Schema/user");
module.exports = class extends Command {
    
	constructor(...args) {
        super(...args, {
			description: '',
			category: 'Moderation',
			usage: '<CommandName> <CommandId> <CommandTag> <CommandDescrption> <CommandUsage>',
			guildOnly: true,
			args: true
		});
	}
    
    async run(message) {
        // let id = args[1]
        let user = await DBUser.findOne({ id: message.author.id, Username: message.author.username });
        if (!user) return
        const args = message.content.trim().split(/ +/g);
        let CommandName = args[1]
        let CommandId = args[2]
        let CommandTag = args[3]
        // let CommandDescription = args.slice(20).join(" ");
        let CommandUsage = args.slice().join(" ");
        

        // if (!id) return message.reply('<jobid> <jobtitle> <paymax> <paymin>')
        if (!CommandName) return message.reply('<CommandName> <CommandId> <CommandTag> <CommandDescrption> <CommandUsage>')
        if (!CommandId) return message.reply('<CommandName> <CommandId> <CommandTag> <CommandDescrption> <CommandUsage>')
        if (!CommandTag) return message.reply('<CommandName> <CommandId> <CommandTag> <CommandDescrption> <CommandUsage>')
        // if (!CommandDescription) return message.reply('<CommandName> <CommandId> <CommandTag> <CommandDescrption> <CommandUsage>')
        // if (!CommandUsage) message.reply('<CommandName> <CommandId> <CommandTag> <CommandDescrption> <CommandUsage>')
        if (!user.Tags.includes('Store:Id1')) return message.reply(`You can only have one **ID1**`)
        user.Tags.pull('Store:Id1')
        let Command = await DBCommand.findOne({ CommandId: CommandId, CommandName: CommandName });
        if (!Command){
        Command = new DBCommand({
            _id: `Command:${CommandName}:${CommandId}`,
            CommandName: `${CommandName}`,
            CommandId: `${CommandId}`,
            CommandTag: `${CommandTag}`,
            CommandDescription: `null`,
            CommandUsage: `${CommandUsage}`,
            CommandOwner: `${message.author.tag}`
        
        })
        Command.save()
        let embed = new MessageEmbed()
        .setTitle('New Command')
        .setColor('GREEN')
        .addField('Commad', [
            `New Command With Id of ${CommandId}`,
            `New Command With Name of ${CommandName}`,
            `New Command With Description ${CommandDescription}`
        ])
        message.channel.send(embed)
        } else {
            let embed = new MessageEmbed()
            .setTitle('ERROR')
            .setColor('RED')
            .addField('Bad Command Create', [
                `**Duplicate id/name/tag**`
            ])
            message.reply(embed)
        }
    }
}
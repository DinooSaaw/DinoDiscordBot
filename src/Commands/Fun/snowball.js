const Command = require('../../Structures/Command');
const { MessageAttachment } = require('discord.js');

module.exports = class extends Command {

    constructor(...args) {
		super(...args, {
            aliases: ['sball', 'snowb', 'sb'],
            description: 'Send a snowball flying',
            category: 'Fun',
            usage: '!snowball <@user>',
            guildOnly: true,
            args: true
        });
    }
    
    run(message) {
        let mMember = message.mentions.members.first()
        message.delete()
        const attachment = new MessageAttachment('https://media.giphy.com/media/SceEMK2IAePGU/giphy.gif');
        message.channel.send(`${mMember}`, attachment);
    }
}
const Command = require('../../Structures/Command');
const DBUser = require("../../Mongoose/Schema/user");
const { MessageEmbed, MessageCollector } = require('discord.js');

module.exports = class extends Command {
    constructor(...args) {
		super(...args, {
			description: 'Battle Friends',
			category: 'Fun',
			usage: '<User>',
			guildOnly: true,
            args: true
            //bugtesting: true,
            // broken: true
		});
	}

    async run(message) {
        const member = message.mentions.members.last() || message.member
        let user = await DBUser.findOne({ id: message.author.id, Username: message.author.username })
		if (!user) return message.channel.send(`**${member.user.username}** isnt in the system`)
		let user1 = await DBUser.findOne({ id: member.user.id, Username: member.user.username })
        if (!user1) return message.channel.send(`**${member.user.username}** isnt in the system`)
        if (user.money < 50) return message.channel.send(`**${message.author.username}** needs $50 to fight`)
        if (user1.money < 50) return message.channel.send(`**${member.user.username}** needs $50 to fight`)
        if (message.author.id === member.user.id) return message.channel.send("You can't battle your self")
        message.channel.send(`${member.user.tag} Has 10 sec to agree \n Use **agree**`)
        let Deathz = []
        let Attack = []       
        Start()

        function Start() {
            const collector = new MessageCollector(message.channel, m => m.author.id === member.user.id, { time: 10000 })
            collector.on('collect', message => {
                if (message.content == "agree") {
                    message.channel.bulkDelete(3)
                    collector.stop()
                    if(user.Inventory.includes("Iron_Sword")){
                        Deathz = [
                            `After a thrust to the eyes. A victor was decided`,
                            `After a fatal strike to the gut. A victor was decided`,
                            `After a overhead cut brought down firmly on the skull. A victor was decided`, 
                            `After a swift **"I like your cut g"**. A victor has been decided`
                        ]
                        if (user1.Inventory.includes("Wooden_Shield")){
                            Attack = [
                                `Kill`,
                                `Death`,
                                `Kill`,
                                `Death`
                                // `Kill`
                            ]
                        }
                    }
                    let option = Attack[Math.floor(Math.random() * Attack.length)]
                    if (option === "Kill"){
                        Kill()
                        // return
                    }
                    if (option === "Death"){
                        Death()
                        // return
                    }
                } else {
                    message.channel.bulkDelete(3)
                    collector.stop()
                    message.channel.send(`Battle Was **Denied**`)
                }	
            })      
        }
        function Kill(){
            let muder = Deathz[Math.floor(Math.random() * Deathz.length)]
            let embed = new MessageEmbed()
            .setTitle(`Its time to d-d-d-d-d-d duel`)
            .setColor("RANDOM")
            .setDescription(`In a long winded battle to the death \n *${muder}* \n **${user.Username}** Has Killed **${user1.Username}**`)
            message.channel.send(embed)
            user.kill += 1
            user.money += 50
            user1.money -= 50
            user1.save()         
            user.save()
        }
        function Death(){
            let muder = Deathz[Math.floor(Math.random() * Deathz.length)]
            let embed = new MessageEmbed()
            .setTitle(`Its time to d-d-d-d-d-d duel!`)
            .setColor("RANDOM")
            .setDescription(`In a long winded battle to the death \n *${muder}* \n **${user1.Username}** Has Killed **${user.Username}**`)
            message.channel.send(embed)   
            user1.kill += 1
            user.money -= 50
            user1.money += 50
            user1.save()         
            user.save()         
            // message.channel.send(`F`)            
        }
    }
}
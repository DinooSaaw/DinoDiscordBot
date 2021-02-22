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
        let short = [
            `In a long winded battle to the death`,
            `POG fight`,
            `Hey everyone, watch someone get fucking killed`,
            `**FAKQ FAKQ FAKQ**`

        ]      
        let intro = [
            `It's time to d-d-d-d-d-d-d-duel`,
            `Round One Fight!`,
            `Round Two Fight!`,
            `Round Three Fight!`,
            `Round Six-Nine (Hey! Nice) Fight!`,
            `Let It Rip!`,
            `I WANT A FAIR MATCH. My your odds be in your favor`
        ] 
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
                        if (user1.Inventory.includes("Riot_Shield")){
                            Attack = [
                                `Kill`,
                                `Death`,
                                `Death`,
                                `Death`
                                // `Kill`
                            ]
                        }
                        if (user1.Inventory.includes("Anime_Body_Pillow")){
                            Attack = [
                                // `Kill`,
                                `Death`,
                                `Death`,
                                `Death`,
                                `Death`,
                                `Death`,
                                `Death`,
                                `Death`
                                // `Kill`
                            ]
                        }
                    }
                    if(user.Inventory.includes("Diamond_Sword")){
                        Deathz = [
                            `After a thrust to the eyes. A victor was decided`,
                            `After a Seppuku. A victor was decided`,
                            `After a "Sword Goes StAb sTaB". A victor was decided`,
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
                                `Kill`
                            ]
                        }
                        if (user1.Inventory.includes("Riot_Shield")){
                            Attack = [
                                `Kill`,
                                `Death`,
                                `Death`,
                                `Death`,
                                `Death`
                                `Kill`
                                `Kill`
                            ]
                        }
                        if (user1.Inventory.includes("Anime_Body_Pillow")){
                            Attack = [
                                `Kill`,
                                `Death`,
                                `Death`
                                `Death`
                                `Death`
                                // `Kill`
                            ]
                        }
                    }
                    if(user.Inventory.includes("Glock-19")){
                        Deathz = [
                            `After a Shot to the head a body drops to the floor. A victor was decided`,
                            `After a 36 gun shots. A victor was decided`,
                            `After a pistol wip. A victor was decided`,
                            `After a fatal gun shot to the gut. A victor was decided`,
                            `After a some pee. A victor was decided`, 
                            `After a loud gun shot and a **"I like your cut g"**. A victor has been decided`
                        ]
                        if (user1.Inventory.includes("Wooden_Shield")){
                            Attack = [
                                `Kill`,
                                `Death`,
                                `Kill`,
                                `Death`
                                `Kill`
                            ]
                        }
                        if (user1.Inventory.includes("Riot_Shield")){
                            Attack = [
                                `Kill`,
                                `Death`,
                                `Death`,
                                `Death`,
                                `Death`
                                `Kill`
                                `Kill`
                            ]
                        }
                        if (user1.Inventory.includes("Anime_Body_Pillow")){
                            Attack = [
                                `Kill`,
                                `Death`,
                                `Death`,
                                `Death`,
                                `Kill`,
                                `Death`,
                                `Death`
                                // `Kill`
                            ]
                        }
                    }
                    if(user.Inventory.includes("Bakuzan")){
                        Deathz = [
                            `After a Quote "A lesson without pain is meaningless. For you cannot gain something without sacrificing something else in return. But once you have recovered it and made it your own... You will gain an irreplaceable Fullmetal heart." A victor was decided`,
                            `After a Quote "Fear is not evil. It tells you what weakness is. And once you know your weakness, you can become stronger as well as kinder." A victor was decided`,
                            `After a Quote "The country? The skies? You can have them. I’m busy just protecting what’s right in front of me. I don’t know what’ll happen to me in the future, but if something has fallen at my feet, then the least I can do is pick it up." A victor was decided`,
                            `After a Quote "When do you think people die? When they are shot through the heart by the bullet of a pistol? No. When they are ravaged by an incurable disease? No. When they drink a soup made from a poisonous mushroom!? No! It’s when they are forgotten." A victor was decided`,
                            `After a Quote "The world is cruel, but also very beautiful." A victor was decided`,
                            `After a Quote "Fear is freedom! Subjugation is liberation! Contradiction is truth! Those are the facts of this world! And you will all surrender to them, you pigs in human clothing!" A victor was decided`,
                            `After a Quote "I am the hope of the universe. I am the answer to all living things that cry out for peace. I am protector of the innocent. I am the light in the darkness. I am truth. Ally to good! Nightmare to you!" A victor was decided`,
                            `After a Quote "You can't judge how beautiful a girl really is by the way she looks.". A victor was decided`,
                            `After **私はあなたのカットが好きです**. A victor has been decided`
                        ]
                        if (user1.Inventory.includes("Wooden_Shield")){
                            Attack = [
                                `Kill`,
                                `Kill`
                            ]
                        }
                        if (user1.Inventory.includes("Riot_Shield")){
                            Attack = [
                                `Kill`,
                                `Death`,
                                `Death`,
                                `Death`,
                                `Death`
                                `Kill`
                                `Kill`
                            ]
                        }
                        if (user1.Inventory.includes("Anime_Body_Pillow")){
                            Attack = [
                                `Kill`,
                                `Death`,
                                `Death`,
                                `Death`,
                                `Kill`,
                                `Death`,
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
                    message.channel.send(`Battle Was **Canceled**`)
                }	
            })      
        }
        function Kill(){
            let muder = Deathz[Math.floor(Math.random() * Deathz.length)]
            let intro2 = intro[Math.floor(Math.random() * intro.length)]
            let intro3 = short[Math.floor(Math.random() * short.length)]
            let embed = new MessageEmbed()
            .setTitle(intro2)
            .setColor("RANDOM")
            .setDescription(`${intro3} \n *${muder}* \n **${user.Username}** Has Killed **${user1.Username}**`)
            message.channel.send(embed)
            user.kill += 1
            user.money += 50
            user1.money -= 50
            user1.save()         
            user.save()
        }
        function Death(){
            let muder = Deathz[Math.floor(Math.random() * Deathz.length)]
            let intro2 = intro[Math.floor(Math.random() * intro.length)]
            let intro3 = short[Math.floor(Math.random() * short.length)]
            let embed = new MessageEmbed()
            .setTitle(intro2)
            .setColor("RANDOM")
            .setDescription(`${intro3} \n *${muder}* \n **${user1.Username}** Has Killed **${user.Username}**`)
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
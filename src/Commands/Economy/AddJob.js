const { MessageEmbed } = require('discord.js');
const Command = require('../../Structures/Command');
const DBJob = require("../../Mongoose/Schema/Job");
const chalk = require('chalk')
module.exports = class extends Command {

	constructor(...args) {
		super(...args, {
			description: '',
			category: 'Moderation',
			usage: '<jobid> <jobtitle> <paymax> <paymin>',
			guildOnly: true,
			args: true
		});
	}

    async run(message) {
        // let id = args[1]
        const args = message.content.trim().split(/ +/g);
        let jobid = args[1]
        let jobtitle = args[2]
        let paymax = args[3]
        let paymin = args[4]
        let PayMax = Number(paymax)
        let PayMin = Number(paymin)
        // if (!id) return message.reply('<jobid> <jobtitle> <paymax> <paymin>')
        if (!jobid) return message.reply('<jobid> <jobtitle> <paymax> <paymin>')
        if (!jobtitle) return message.reply('<jobid> <jobtitle> <paymax> <paymin>')
        if (!PayMin) return message.reply('<jobid> <jobtitle> <paymax> <paymin>')
        if (!PayMax) return message.reply('<jobid> <jobtitle> <paymax> <paymin>')
        if (PayMin > PayMax) message.reply('<jobid> <jobtitle> <paymax> <paymin>')

        let Job = await DBJob.findOne({ id: jobid, JobTitle: jobtitle });
        if (!Job){
        Job = new DBJob({
            _id: `Job:${jobtitle}:${jobid}`,
            JobId: jobid,
            JobTitle: jobtitle,
            JobJob: ['Null'],
            PayMin: PayMin,
            PayMax: PayMax
        })
        Job.save()
        let embed = new MessageEmbed()
        .setTitle('New Job')
        .setColor('GREEN')
        .addField('Job', [
            `New Job With Id of ${jobid}`,
            `New Job With Title of ${jobtitle}`,
            `New Job With Min and Max of ${PayMin} ${PayMax}`
        ])
        message.channel.send(embed)
        } else {
            let embed = new MessageEmbed()
            .setTitle('ERROR')
            .setColor('RED')
            .addField('Bad Job Create', [
                `Duplicate id/jobid/jobtitle`
            ])
            message.reply(embed)
        }
    }
}
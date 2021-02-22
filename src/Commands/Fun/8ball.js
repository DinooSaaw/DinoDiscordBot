const Command = require('../../Structures/Command');

const answers = [
    'Maybe',
    'certainly not.',
    'I hope so.',
    'Not in your wildest dreams.',
    'There is a good chance.',
    'Quite likely.',
    'I think so.',
    'I hope so.',
    'I hope not.',
    'Never.',
    'Fuck Off.',
    'Ahaha! Really?!? ',
    'Pfft.',
    'Hell yeah.',
    'Hell no.',
    'I see your future is bleak.',
    'I see your future is uncertain.',
    'Can i not say?',
    'Who really care?',
    'Possibly.',
    'Never, ever, ever.',
    'small chance.',
    'Yea.',
    'Yea Na Yea.',
    'Yea Na Yea Na.',
    'I will kill someone for this answer.'
]


module.exports = class extends Command {
    constructor(...args) {
		super(...args, {
			description: 'Gives you a random 8ball answer',
			category: 'Fun',
			usage: '<question>',
            guildOnly: true,
            args: true
		});
	}

    async run(msg, ...question){
        return msg.reply(question.join(' ').endsWith('?') ?
            `🎱 ${answers[Math.floor(Math.random() * answers.length)]}` :
            `🎱 That doesn\'t seem to be a question, please try again!`)
    }
}
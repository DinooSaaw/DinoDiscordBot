const Event = require('../../Structures/Event');
const chalk = require('chalk');
const DBGuild = require('../../Mongoose/Schema/Guild')

module.exports = class extends Event {

	async run(Guild) {
    // console.log(Guild)
    let guild = await DBGuild.findOne({ GuildId: NewGuild.id, GuildName: NewGuild.name });
    guild =  DBGuild({
      currentlyIn: "False"
    })
    guild.save();
    console.log(chalk.hex("3FA037")(`[DataBase] `) + chalk.bold.white`Upated Guild`);
  }
}
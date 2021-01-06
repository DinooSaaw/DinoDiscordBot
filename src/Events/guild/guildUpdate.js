const Event = require('../../Structures/Event');
const chalk = require('chalk');
const DBGuild = require('../../Mongoose/Schema/Guild')

module.exports = class extends Event {

	async run(oldGuild, NewGuild) {
    // console.log(NewGuild)
        let guild = await DBGuild.findOne({ GuildId: oldGuild.id, GuildName: oldGuild.name });
        guild =  DBGuild({
            _id: `Guild:${NewGuild.name}`,
            GuildName: NewGuild.name,
            Region: NewGuild.region,
            MemberCount: NewGuild.memberCount,
            GuildId: NewGuild.id,
            OwnerId: NewGuild.OwnerId,
            Owner: NewGuild.Owner,
            partnered: NewGuild.partnered,
            PremiumTier: NewGuild.PremiumTier,
            PremiumSubscriptionCount: NewGuild.PremiumSubscriptionCount,
            verified: NewGuild.verified
          });
          guild.save();
          console.log(chalk.hex("3FA037")(`[DataBase] `) + chalk.bold.white`Upated Guild`);
        }
}
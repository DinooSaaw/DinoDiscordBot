const Event = require('../Structures/Event');
const chalk = require('chalk');
const DBUser = require("../Mongoose/Schema/user");

const flags = {
    DISCORD_EMPLOYEE: "Discord Employee",
    DISCORD_PARTNER: "Discord Partner",
    BUGHUNTER_LEVEL_1: "Bug Hunter (Level 1)",
    BUGHUNTER_LEVEL_2: "Bug Hunter (Level 2)",
    HYPESQUAD_EVENTS: "HypeSquad Events",
    HOUSE_BRAVERY: "House of Bravery",
    HOUSE_BRILLIANCE: "House of Brilliance",
    HOUSE_BALANCE: "House of Balance",
    EARLY_SUPPORTER: "Early Supporter",
    TEAM_USER: "Team User",
    SYSTEM: "System",
    VERIFIED_BOT: "Verified Bot",
    VERIFIED_DEVELOPER: "Verified Bot Developer",
};

module.exports = class extends Event {

    async run(oldUser, newUser) {
        // const member = message.mentions.members.last() || message.member;
        let User = await DBUser.findOne({ id: oldUser.id, Username: oldUser.username })
        User = new DBUser({
          _id: `User:${newUser.tag}`,
          Username: newUser.username,
          Discriminator: newUser.discriminator,
          id: newUser.id,
          Tags: ['Active'],
        //   xp: DBUser.xp =+ xp,
          // flags: `${userFlags.length ? userFlags.map(flag => flags[flag]).join(', ') : 'None'}`,
        //   Created: `${moment(member.user.createdTimestamp).format('LT')} ${moment(member.user.createdTimestamp).format('LL')} ${moment(member.user.createdTimestamp).fromNow()}`
        });
        User.save();
        console.log(chalk.hex("3FA037")(`[DataBase] `) +chalk.bold.white`New User Created`);
    }
}

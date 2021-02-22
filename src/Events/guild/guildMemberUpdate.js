const Event = require("../../Structures/Event");
const chalk = require("chalk");
const DBUser = require('../../Mongoose/Schema/user')
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
module.exports = class extends (
  Event
) {
  async run(oldMember, newMember) {
    const removedRoles = oldMember.roles.cache.filter(
      (role) => !newMember.roles.cache.has(role.id)
    );
    if (removedRoles.size > 0)
      console.log(
        chalk.hex("f69aeb")("[ROLE]") +
          chalk.white` The roles ${removedRoles.map(
            (r) => r.name
          )} were removed from ${oldMember.displayName}.`
      );
    const addedRoles = newMember.roles.cache.filter(
      (role) => !oldMember.roles.cache.has(role.id)
    );
    if (addedRoles.size > 0)
      console.log(
        chalk.hex("f69aeb")("[ROLE]") +
          chalk.white` The roles ${addedRoles.map(
            (r) => r.name
          )} were added to ${oldMember.displayName}.`
      );

      const user = await DBUser.findOne({ id: oldMember.id, Username: oldMember.Username});
      if (!user) {
        return
      } else {
        user = DBUser({
          _id: `User:${newMember.tag}`,
          Username: newMember.username,
          Discriminator: newMember.discriminator,
          id: newMember.id,
          // flags: `${userFlags.length ? userFlags.map(flag => flags[flag]).join(', ') : 'None'}`
        })
        user.save();
        console.log(chalk.hex("3FA037")(`[DataBase] `) + chalk.bold.white`Upated User`);
    }
  };
}
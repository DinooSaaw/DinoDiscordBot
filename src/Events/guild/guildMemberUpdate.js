const Event = require('../../Structures/Event');
const chalk = require('chalk');

module.exports = class extends Event {

	async run(oldMember, newMember) {
	const removedRoles = oldMember.roles.cache.filter(role => !newMember.roles.cache.has(role.id));
	if (removedRoles.size > 0) console.log(chalk.hex('f69aeb')('[ROLES]')+ chalk.white` The roles ${removedRoles.map(r => r.name)} were removed from ${oldMember.displayName}.`);
	const addedRoles = newMember.roles.cache.filter(role => !oldMember.roles.cache.has(role.id));
	if (addedRoles.size > 0) console.log(chalk.hex('f69aeb')('[ROLES]')+ chalk.white` The roles ${addedRoles.map(r => r.name)} were added to ${oldMember.displayName}.`);
	}
}
config = require('../../../config.json')
const schema = mongoose.Schema({
    _id: String,
    GuildName: String,
    Region: String,
    MemberCount: Number,
    GuildId: Number,
    OwnerId: Number,
    Owner: String,
    partnered: Boolean,
    PremiumTier: Number,
    PremiumSubscriptionCount: Number,
    verified: Boolean,
    prefix: { type: String, default: config.prefix },
    currentlyIn: { type: Boolean, default: true }
});
module.exports = mongoose.model("Guild", schema)
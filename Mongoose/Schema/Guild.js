const schema = mongoose.Schema({
    _id: String,
    GuildName: String,
    Region: String,
    MemberCount: Number,
    GuildId: Number,
    OwnerId: String,
    Owner: String,
    partnered: Boolean,
    PremiumTier: Number,
    PremiumSubscriptionCount: Number,
    verified: Boolean,
    prefix: { type: String, default: process.env.prefix },
    optin: { type: Boolean, default: true },
    currentlyIn: { type: Boolean, default: true },
    banmessageremove: { type: Number, default: 1 },
    embedColor: { type: String, default: "RANDOM"},
    mutedRole: { type: String, default: undefined},
    logChannel: { type: String, default: undefined},
    welcomeChannel: { type: String, default: undefined}
});
module.exports = mongoose.model("Guild", schema)
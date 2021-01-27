const schema = mongoose.Schema({
    _id: { type: String, default: null },
    Username: String,
    Discriminator: String,
    id: String,
    Type: { type: String, default: "User" },
    flags: Array,
    Tags: [String],
    Inventory: { type: [String], default: ["Iron_Sword", "Wooden_Shield"] },
    Avatar: String,
    Created: String,
    money: { type: Number, default: 1500 },
    bank: { type: Number, default: 500 },
    level: { type: Number, default: 0 },
    prestige: { type: Number, default: 1 },
    multiplier: { type: Number, default: 1 },
    xp: { type: Number, default: 0 },
    kill: { type: Number, default: 0 }
});
module.exports = mongoose.model("User", schema)
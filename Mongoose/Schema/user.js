const schema = mongoose.Schema({
    _id: { type: String, default: null },
    Username: String,
    Discriminator: String,
    id: String,
    Avatar: String,
    Created: String,
    Xp: { type: Number, default: 0},
    money: { type: Number, default: 1500},
    bank: { type: Number, default: 1500},

});
module.exports = mongoose.model("User", schema)
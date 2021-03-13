const schema = mongoose.Schema({
    _id: { type: String, default: null },
    Username: String,
    Discriminator: String,
    id: String,
    Avatar: String,
    Created: String,
    Xp: { type: Number, default: 0},
    Money: { type: Number, default: 0},
    Bank: { type: Number, default: 0},
    Networth: { type: Number, default: 0},

});
module.exports = mongoose.model("User", schema)
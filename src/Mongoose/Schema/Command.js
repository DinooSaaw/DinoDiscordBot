config = require('../../../config.json')
const schema = mongoose.Schema({
    _id: String,
    CommandName: String,
    CommandId: Number,
    CommandTag: String,
    CommandDescription: String,
    CommandUsage: { type: String, default: "Null" },
    CommandOwner: { type: String, default: "Null"} 
});
module.exports = mongoose.model("Command", schema)
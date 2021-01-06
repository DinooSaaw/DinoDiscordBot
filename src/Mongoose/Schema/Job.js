config = require('../../../config.json')
const schema = mongoose.Schema({
    _id: String,
    JobId: String,
    JobTitle: String,
    JobJob: Array,
    PayMin: Number,
    PayMax: Number
});
module.exports = mongoose.model("Job", schema)
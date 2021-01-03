const DinoClient = require('./Structures/DinoClient')
const config = require('../config.json');
const DB = require('./Mongoose/index')

const client = new DinoClient(config)
client.start();
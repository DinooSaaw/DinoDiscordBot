const DinoClient = require('./Structures/DinoClient')
const config = require('../config.json');

const client = new DinoClient(config)
client.start();
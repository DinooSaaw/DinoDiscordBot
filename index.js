require('dotenv').config();
global.mongoose = require('mongoose');
const discord = require("discord.js"); 
const client = new discord.Client({
  disableEveryone: true 
});
const Topgg = require("@top-gg/sdk");
const AutoPoster = require('topgg-autoposter')
const ap = AutoPoster(process.env.topggtoken, client)
ap.on('posted', () => {
  console.log((`[SYSTEM] `) + `Posted stats to Top.gg!`)
})

mongoose.connect ( process.env.URL ,  {  useNewUrlParser : true ,  useUnifiedTopology : true  } ) ;
mongoose.connection.on( 'connected' , ( ) => {console.log((`[DataBase] `) + ('Connected!'))})

client.commands = new discord.Collection();
client.aliases = new discord.Collection();

["command", "events"].forEach(handler => {
  require(`./handlers/${handler}`)(client);
});

client.login(process.env.token);
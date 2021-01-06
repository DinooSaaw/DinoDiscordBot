global.mongoose = require('mongoose');
const config = require('./config.json')
const chalk = require('chalk');
mongoose.connect ( config.URL ,  {  useNewUrlParser : true ,  useUnifiedTopology : true  } ) ;
mongoose.connection.on( 'connected' , ( ) => {console.log(chalk.hex('3FA037')(`[DataBase] `) + chalk.bold.white('Connected!'))})
mongoose.connection.on( 'error' , ( ) => {console.log(chalk.hex('3FA037')(`[DataBase] `) + chalk.bold.red(`ERROR! ${err}`))})
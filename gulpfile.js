var gulp  = require('gulp');
var exec  = require('child_process').exec;
var chalk = require('chalk');

var argv = require('yargs')
        .usage('Usage: gulp.js -g [string] -m [boolean(false)]')
        .example('gulp.js -g','path/to/gui/folder')
        .example('gulp.js --gui','path/to/gui/folder')
        .example('gulp.js -g','path/to/gui/folder -m true')
        .example('gulp.js --gui','path/to/gui/folder --mongo true')
        .demand  (['g','m'])
        .alias   ('g', 'gui')
        .describe('g', 'Path to gui folder')
        .default ('g', '/Users/mrinmoy/mars/theme2/src/webui/src/main/webapp/netapp/mars/gui')
        .alias   ('m', 'mongo')
        .describe('m', 'true or false to start Mongo DB')
        .default ('m', false)
        .argv;

gulp.task('default', function(){
    if (argv.mongo=='true') {
        // This is to start the mongodb process
        var mongoProcess = exec('mongod  --dbpath data/db --smallfiles');
        mongoProcess.stdout.on('data', function(data) {
            console.log(chalk.magenta('MONGO >>> \n' + data));
        });

        mongoProcess.stderr.on('data', function(data) {
            console.log('Mongo Error: ' + data);
        });
    }
    else{
        console.log("To Start This app with Mongo DB use :" +  chalk.magenta("gulp.js --mongo true"));
    }


    // This is to start node app using npm ( executes the script file specified in the package.json)
    var nodeProcess = exec('node app.js --gui ' + argv.gui + ' --mongo '  +  argv.mongo);
    nodeProcess.stdout.on('data', function(data) {
        console.log(chalk.cyan('NODE App.js >>>\n' + data));
    });

    nodeProcess.stderr.on('data', function(data) {
        console.log(chalk.red('Node App Error: ' + data));
    });


});



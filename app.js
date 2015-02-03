//app.js

var express         = require('express');
var bodyParser      = require('body-parser');

var ping            = require('./routes/ping');
var sessionAPI      = require('./routes/sessionAPI');
var lunAPI          = require('./routes/lunAPI');
var igroupAPI       = require('./routes/igroupAPI');
var clusterAPI      = require('./routes/clusterAPI');

// Hardware APIs
var chassisAPI      = require('./routes/chassisAPI');
var controllerAPI   = require('./routes/controllerAPI');
var portsAPI        = require('./routes/portsAPI');
var shelvesAPI      = require('./routes/shelvesAPI');
var diskAPI         = require('./routes/diskAPI');
var raidAPI         = require('./routes/raidAPI');

//Interfaces
var fcAPI         = require('./routes/fcAPI');


// Charts API
var statsAPI        = require('./routes/statsAPI');
var archiveStatsAPI = require('./routes/archiveStatsAPI');

//DNS Settings
var dnsAPI          = require('./routes/dnsAPI');

// Health and Alerts
var alertsAPI       = require('./routes/alertsAPI');


var mongoose   = require('mongoose');

var argv = require('yargs')
    .usage('Usage: node app.js -g [string] -m [boolean(false)]')
    .example('gulp.js -g','path/to/gui/folder')
    .example('gulp.js --gui','path/to/gui/folder')
    .example('gulp.js -g','path/to/gui/folder -m true')
    .example('gulp.js --gui','path/to/gui/folder --mongo true')
    .demand  ('g')
    .alias   ('g', 'gui')
    .describe('g', 'Path to gui folder')
    //.default ('g', '/Users/mrinmoy/mars/theme2/src/webui/src/main/webapp/netapp/mars/gui')
    .alias   ('m', 'mongo')
    .describe('m', 'true or false to start Mongo DB')
    .default ('m', false)
    .argv;


var router  = express.Router();
var app     = express();

//connect to our database
if (argv.mongo =='true') {
    var dbName   = 'MARS_DB';
    var cnString = 'mongodb://localhost:27017/' + dbName;
    var db = mongoose.connection;

    mongoose.connect(cnString);

    db.on('error', console.error.bind(console, 'connection error:'));
    db.once('open', function callback() {
        console.log(dbName + ' Database Open');
    });
}


// route middleware that will happen on every request
router.use(function(req, res, next) {

    // Use this section to check headers, authentication token etc
    console.log(req.method, req.url);

    // continue doing what we were doing and go to the route
    next();
});


//app.use(express.static('/Users/mrinmoy/mars/theme2/src/webui/src/main/webapp/netapp/mars/gui'));
app.use(express.static(argv.gui));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

app.use('/', ping);
app.use('/webmapi', lunAPI);
app.use('/webmapi', igroupAPI);
app.use('/webmapi', sessionAPI);
app.use('/webmapi', clusterAPI);
app.use('/webmapi', chassisAPI);
app.use('/webmapi', controllerAPI);
app.use('/webmapi', portsAPI);
app.use('/webmapi', fcAPI);
app.use('/webmapi', shelvesAPI);
app.use('/webmapi', diskAPI);
app.use('/webmapi', statsAPI);
app.use('/webmapi', archiveStatsAPI);
app.use('/webmapi', raidAPI);
app.use('/webmapi', alertsAPI);
app.use('/webmapi', dnsAPI);

module.exports = app;

var server = app.listen(8080, function() {
    console.log('MARS Simulator on port ' + server.address().port);
    //console.log('MARS Simulator:' + __dirname);
});

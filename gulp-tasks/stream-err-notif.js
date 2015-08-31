/**
 * Utility that handles errors during streaming in gulp
 * Usage:
     var streamErrNotif = require('./gulp-tasks/stream-err-notif');
     //in a task....
     .pipe(streamErrNotif())
     //continue with normal piping stuff
 */

var notifier = require('node-notifier');
var plumber = require('gulp-plumber');
var chalk = require('chalk');

function errorHandler(err) {
    //console it out too, OS notifs are easy to miss
    console.error( chalk.bold.red('\n' + err.message + '\n') );

    //throw OS notification
    var title = 'Error in ' + err.plugin;
    notifier.notify({
        title: title,
        message: err.message,
        sound: true
    });
}


module.exports = function() {
    return plumber({
        errorHandler: errorHandler
    });
};

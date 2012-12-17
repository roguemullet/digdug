var dbURL = 'mongodb://localhost/syslog';
var db = require('mongoose').connect(dbURL);
var Log = require('./data/models/log')
var net = require('net');


var server = require('net').createServer(function(socket) {
    socket.setEncoding('utf8');
    socket.on('data', function(data) {
        console.log("server got: " + data);
        var appsrcRegex = /^\S{3} \d{2} \d{2}:\d{2}:\d{2} \S+ ([A-Za-z]+)/;
        var match = appsrcRegex.exec(data);
        if(match == null){
            var appsrc = "Unknown";
        }
        else{
            var appsrc = match[1];
        }
        var src_orgin = socket.address();
        var logentry = new Log({src_ip:socket.remoteAddress, src_app:appsrc, entry:data, port:socket.remotePort});
        logentry.save();

    });
}).listen(514);

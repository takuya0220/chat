/**
 * Module dependencies.
 */
console.info('');
var routes = require('./routes'),
	user = require('./routes/user'),
	fs = require('fs'),
	path = require('path'),
	express = require('express'),
	app = express(),
	http = require('http'),
	server = http.createServer(app),
	moment = require('moment'),
	today = moment(),
	io = require('socket.io').listen(server);
console.info('');

console.info('');
app.configure(function() {
	app.set('port', process.env.PORT || 3000);
	app.set('views', __dirname + '/views');
	app.set('view engine', 'jade');
	io.set('log level', 1);
	app.use(express.favicon());
	app.use(express.logger('dev'));
	app.use(express.bodyParser());
	app.use(express.methodOverride());
	app.use(express.cookieParser('your secret here'));
	app.use(express.session());
	app.use(app.router);
	app.use(express.static(path.join(__dirname, 'public')));
});

app.configure('development', function() {
	app.use(express.errorHandler());
});

app.get('/', routes.index);
app.get('/chat', routes.chat.index);
app.get('/users', user.list);
console.info('');

server.listen(app.get('port'), function() {
	console.log("Express server listening on port " + app.get('port'));
});

var count = 0;
io.on('connection', function(socket) {
console.info('');
	count++;
	setInterval(function() {
		io.sockets.emit('time', {
			time : moment().format('YYYY-MM-DD HH:mm:ss')
		});
	}, 1000);
	io.sockets.emit('count', count);
	socket.on('message', function(message) {
console.info('');
		io.sockets.emit('message', {
			name : message.name,
			text : message.text,
			date : moment().format('YYYY-MM-DD HH:mm:ss')
		});
	});

	socket.on('disconnect', function() {
console.info('');
		count--;
		io.sockets.emit('count', count);
	});
});

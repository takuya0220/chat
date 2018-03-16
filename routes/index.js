/*
 * GET home page.
 */

exports.index = function(req, res) {
	res.render('index', {
		title : 'Chat'
	});
};

exports.client = {
	socketio : {
		host : 'localhost',
		port : 3000
	}
};

exports.chat = require('./chat');
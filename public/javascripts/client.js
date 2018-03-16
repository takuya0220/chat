$(function() {
	var socket = io.connect('http://localhost:3000');

	socket.on('message', function(message) {
		$("#show").append(message + '<br>');
	});
	socket.on('disconnect', function(message) {
		$("#show").append('切断されました');
	});
});

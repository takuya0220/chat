var socket = io.connect('http://j1nd1301u7:3000');
socket.on('connect', function() {
	socket.on('count', function(data) {
		$('#count').text(data);
	});
});

socket.on('time', function(time) {
	$('#time').text(time.time);
});

socket.on('message', function(message) {
	if (message.text && message.name) {
		$('#tmsg tbody').append(
				'<tr><td class="name"><p>' + escape(message.name) + '</p></td><td class="message"><p>'
						+ escape(message.text) + '</p></td><td class="datetime"><p>'
						+ escape(message.date) + '</p></td></tr>');
		$('#tmsg tbody').children('tr:last').hide().fadeIn(1000);
		var dmsgHeight = $('#tmsg').height();
		$('#dmsg').scrollTop(dmsgHeight);
	}
});

function send() {
	var name = $('#name').val();
	var text = $('#text').val();
	if (text && name) {
		socket.emit('message', {
			name : name,
			text : text,
			date : ''
		});
		$('#text').val('');
	}
}

function escape(str) {
	return $('<div></div>').text(str).html();
}

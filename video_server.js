const http = require("http");
const fs = require('fs');

const videoName = process.argv[2];

var server = http.createServer(function(req, res) {

	var file;
	if (req.headers['range']) {
		var range = req.headers.range;

		console.log(range);

		var parts = range.replace(/bytes=/, "").split("-");
		var partialstart = parts[0];
		var partialend = parts[1];

		var start = parseInt(partialstart, 10);
		var end = parseInt(partialend, 10);
		if(isNaN(end)) {
			end = 400;
		}
		var chunksize = (end-start)+1;
		
		file = fs.createReadStream(videoName, {start: start, end: end});
		res.writeHead(206, {
			'Content-Range': 'bytes ' + start + '-' + end + '/*', 
			'Accept-Ranges': 'bytes', 
			'Content-Length': chunksize, 
			'Content-Type': 'video/mp4' 
		});
		file.pipe(res);
	} else {
		console.log('else: ');
		res.writeHead(200, { 
			'Content-Length': '*', 
			'Content-Type': 'video/mp4' 
		});
		file = fs.createReadStream(videoName, {start: 0, end: 200});
		file.pipe(res);
	} 
});

server.on("error", function(err) {
	console.log(err);
});

server.listen(8765, function() {
	console.log("Starting listening to 127.0.0.1:8765");
});

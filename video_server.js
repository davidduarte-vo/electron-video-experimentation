const http = require("http");
const path = require("path");
const spawn = require("child_process").spawn;

var server = http.createServer(function(req, resp) {
    const proc = spawn('ffmpeg', [
        '-y', 
        '-i', 'bird.avi', 
        '-c:v', 'libx264', 
        '-f', 'mp4', 
        '-movflags', 'frag_keyframe+empty_moov' , '-'
    ]);

	proc.stdout.pipe(resp);

    proc.stdout.on("close", function() {
        console.log("close server");
        server.close();
    });
});

server.on("error", function(err) {
    console.log(err);
});

server.listen(8765, function() {
    console.log("Starting listening to 127.0.0.1:8765");
});
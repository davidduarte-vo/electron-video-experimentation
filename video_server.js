const http = require("http");
const spawn = require("child_process").spawn;

const videoPath = process.argv[2];

const server = http.createServer(function(req, res) {
	const proc = spawn("ffmpeg", [
        "-re",
        "-i", videoPath, 
        "-c:v", "libx264", 
		"-movflags", "faststart+frag_keyframe+empty_moov",
        "-f", "mp4", 
        "-"
    ]);

	proc.stdout.pipe(res); 
});

server.on("error", function(err) {
	console.log(err);
});

server.listen(8765, function() {
	console.log("Starting listening to 127.0.0.1:8765");
});

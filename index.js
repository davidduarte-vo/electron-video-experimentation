const remote = require("electron").remote;
const main = remote.require("./main.js");

document.ondragover = function(ev){
    document.body.style.backgroundColor = "#ff0";
    ev.preventDefault();
};

document.ondrop = function(ev) {
    console.log(ev.dataTransfer.files[0].path)
    document.body.style.backgroundColor = "#fff";
    ev.preventDefault();
    main.openVideoServer(ev.dataTransfer.files[0].path);
    setTimeout(function() {
        document.getElementById("video").src = "http://127.0.0.1:8765";
    }, 500);
}
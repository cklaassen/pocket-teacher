const fs = require('fs')

const ref = document.getElementById("video-drop")
const rem = document.createElement("removable")
let i = 0;
fs.readdirSync('assets/videos').forEach(element => {
    let div = document.createElement("div")
    div.classList.add("video-holder")
    div.setAttribute("id", i.toString(10))
    i++;
    div.addEventListener('click', function (event) {
        const name = document.getElementsByClassName("video-title")[event.currentTarget.id].innerHTML
        console.log(name);

        var x = document.createElement("VIDEO");
        x.setAttribute("src", "../assets/videos/" + name + ".mp4");
        x.setAttribute("controls", "controls");
        x.setAttribute("id", "video")
        document.body.appendChild(x);
        document.getElementById("hide").style.visibility = "hidden";

        var p = document.createElement("button");
        p.setAttribute("id", "back");
        p.innerHTML = "&#x2190;";
        document.body.appendChild(p)
        document.getElementById("back").addEventListener("click", reset);

    });
    let p = document.createElement("p")
    p.innerHTML = element.split(".")[0];
    p.classList.add("video-title")
    div.appendChild(p)
    rem.appendChild(div)
})

ref.appendChild(rem);

function reset() {
    document.getElementById("back").remove();
    document.getElementById("video").remove();
    document.getElementById("hide").style.visibility = "visible";
}


const fs = require('fs')

const ref = document.getElementById("video-drop")

fs.readdirSync('assets/videos').forEach(element => {
    let div = document.createElement("div")
    div.classList.add("video-holder")
    let p = document.createElement("p")
    p.innerHTML = element.split(".")[0];
    div.appendChild(p)
    ref.appendChild(div)
})


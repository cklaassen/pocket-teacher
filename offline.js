const fs = require('fs')

const rem = document.createElement("div")
rem.setAttribute("id", "hide")
const p = document.createElement("h4")
p.innerHTML = "Video Viewing"
p.setAttribute("id", "title")
rem.appendChild(p)
document.body.appendChild(rem)
let i = 0;
let j = 0;
let holder = []
fs.readdirSync('assets/videos').forEach(element => {
    if (element.split(".").pop() === "txt") {
        fs.readFile("assets/videos/" + element, 'utf-8', (err, data) => {
            if (err) throw err;

            // Converting Raw Buffer to text
            // data using tostring function.
            console.log(data);
            let title = document.createElement("p")
            title.classList.add("video-title")
            title.innerHTML = data.split("\n")[0]
            let creator = document.createElement("p")
            creator.classList.add("video-creator")
            creator.innerHTML = data.split("\n")[1]
            let desc = document.createElement("p")
            desc.classList.add("video-desc")
            desc.innerHTML = data.split("\n")[2]
            const refer = document.getElementById((j).toString(10))
            j++;
            refer.appendChild(title)
            refer.appendChild(creator)
            refer.appendChild(desc)
        })
    } else {
        holder.push(element)
        let div = document.createElement("div")
        div.classList.add("video-holder")
        div.setAttribute("id", i.toString(10))
        i++;
        div.addEventListener('click', function (event) {
            const name = document.getElementsByClassName("video-title")[event.currentTarget.id].innerHTML
            console.log(name);

            var x = document.createElement("VIDEO");
            x.setAttribute("src", "../assets/videos/" + holder[event.currentTarget.id]);
            x.setAttribute("controls", "controls");
            x.setAttribute("id", "video")
            document.body.appendChild(x);
            document.getElementById("hide").style.visibility = "hidden";
            document.getElementById("main").style.overflow = "hidden";
            var p = document.createElement("button");
            p.setAttribute("id", "back");
            p.innerHTML = "&#x2190;";
            document.body.appendChild(p)
            document.getElementById("back").addEventListener("click", reset);

        });

        rem.appendChild(div)

    }
})



function reset() {
    document.getElementById("back").remove();
    document.getElementById("video").remove();
    document.getElementById("hide").style.visibility = "visible";
    document.getElementById("main").style.overflow = null;
}


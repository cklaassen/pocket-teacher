const { app } = require('electron')
var FileSaver = require('file-saver');

var firebase = require("firebase/app");
require("firebase/firestore");
require("firebase/storage")

var firebaseConfig = {
    apiKey: "AIzaSyDL_Cq7MhVxAQFZdtq5RswVTMaLo4_L2kQ",
    authDomain: "pocketteacher-6dbfe.firebaseapp.com",
    databaseURL: "https://pocketteacher-6dbfe.firebaseio.com",
    projectId: "pocketteacher-6dbfe",
    storageBucket: "pocketteacher-6dbfe.appspot.com",
    messagingSenderId: "731865696422",
    appId: "1:731865696422:web:c905ad14147d5db73f4c67",
    measurementId: "G-JFVJ21RD68"
};
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

let dataHolder = [];

async function init() {
        const docRef = document.getElementById("item-store");
        const videoStorageRef = db.collection('Data').doc('Videos');
        const doc = await videoStorageRef.get();
        console.log('Document data:', doc.data());
        let i = 0;
        let data = doc.data()[i]
        let holder = document.createElement("div")
        holder.setAttribute("id", "holder");
        while (data != null) {
            dataHolder.push(data);
            let div = document.createElement("div");
            div.setAttribute("id", i.toString(10))
            div.classList.add("video-holder");
            div.addEventListener('click', function (event) {
                const url = document.getElementsByClassName("video-storage")[event.currentTarget.id].innerHTML

                var storageRef = firebase.storage().refFromURL(url);

                const title = url.split("/").pop()
                const videoTitle = document.getElementsByClassName("video-title")[event.currentTarget.id].innerHTML
                const creator = document.getElementsByClassName("video-creator")[event.currentTarget.id].innerHTML
                const description = document.getElementsByClassName("video-desc")[event.currentTarget.id].innerHTML

                var blob = new Blob([videoTitle + "\n" + creator + "\n" + description],
                    { type: "text/plain;charset=utf-8" });
                saveAs(blob, title + ".txt");

                storageRef.getDownloadURL().then(function(url) {
                    let title = url.split("?")[0].split("/").pop()
                    var xhr = new XMLHttpRequest();
                    xhr.responseType = 'blob';
                    xhr.onload = function(event) {
                        var blob = xhr.response;
                        console.log(blob)
                        FileSaver.saveAs(blob, title);
                    };
                    xhr.open('GET', url);
                    xhr.send();
                })
            });

            let p = document.createElement("p");
            p.innerHTML = data[0];
            p.classList.add("video-title");
            div.appendChild(p)
            let creator = document.createElement("p");
            creator.innerHTML = data[2];
            creator.classList.add("video-creator");
            div.appendChild(creator);
            let desc = document.createElement("p");
            desc.innerHTML = data[3];
            desc.classList.add("video-desc");
            div.appendChild(desc);
            let storage = document.createElement("p");
            storage.innerHTML = data[1];
            storage.classList.add("video-storage");
            div.appendChild(storage);
            holder.appendChild(div);
            data = doc.data()[++i]
        }
        docRef.appendChild(holder);
}

function submit() {
    console.log(dataHolder);
    console.log("ran");

    const result = document.getElementById("search").value;

    const docRef = document.getElementById("item-store");

    document.getElementById("holder").remove();
    let holder = document.createElement("div")
    holder.setAttribute("id", "holder");
    let count = 0;
    let i  = 0;
    let data = dataHolder[i]
    while (data != null) {
        if (data[0].toLowerCase().includes(result.toLowerCase())) {
            let div = document.createElement("div");
            div.classList.add("video-holder");
            div.setAttribute("id", i.toString(10))
            div.addEventListener('click', function (event) {
                const url = document.getElementsByClassName("video-storage")[event.currentTarget.id].innerHTML

                var storageRef = firebase.storage().refFromURL(url);

                let title = url.split("/").pop()
                title =  title.split(".")[0]
                const videoTitle = document.getElementsByClassName("video-title")[event.currentTarget.id].innerHTML
                const creator = document.getElementsByClassName("video-creator")[event.currentTarget.id].innerHTML
                const description = document.getElementsByClassName("video-desc")[event.currentTarget.id].innerHTML

                var blob = new Blob([videoTitle + "\n" + creator + "\n" + description],
                    { type: "text/plain;charset=utf-8" });
                saveAs(blob, title + ".txt");

                storageRef.getDownloadURL().then(function(url) {
                    let title = url.split("?")[0].split("/").pop()
                    var xhr = new XMLHttpRequest();
                    xhr.responseType = 'blob';
                    xhr.onload = function(event) {
                        var blob = xhr.response;
                        console.log(blob)
                        FileSaver.saveAs(blob,
                            title);
                    };
                    xhr.open('GET', url);
                    xhr.send();
                })
            });
            let p = document.createElement("p");
            p.innerHTML = data[0];
            p.classList.add("video-title");
            div.appendChild(p)
            let creator = document.createElement("p");
            creator.innerHTML = data[2];
            creator.classList.add("video-creator");
            div.appendChild(creator);
            let storage = document.createElement("p");
            storage.innerHTML = data[1];
            storage.classList.add("video-storage");
            div.appendChild(storage);
            holder.appendChild(div);
            count++;
        }
        data = dataHolder[++i]
    }
    if (count === 0) {
        let p = document.createElement("p");
        p.innerHTML = "There are no results for your search criteria, please try again";
        p.setAttribute("id", "nothing");
        holder.appendChild(p);
    }
    docRef.appendChild(holder);

}
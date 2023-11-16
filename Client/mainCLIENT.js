var socket = io("http://localhost:8080");

function redirectToJoin() {
    window.location.href = "joinSCREEN.html";
}

function redirectToMain() {
    window.location.href = "mainSCREEN.html";
}

let roomForm = document.getElementById("roomForm");

if (roomForm !== null) { // checks that the element does exist (i.e. joinSCREEN loaded)
    roomForm.addEventListener("submit", (e) => {
        e.preventDefault(); // stops default function of submit button
        let roomJoin = document.getElementById("roomCodeJoin").value;
        socket.emit("roomJoinToServer", roomJoin);

        socket.on("roomJoin0Length", message => {
            console.log(message);
        });
    }
)}
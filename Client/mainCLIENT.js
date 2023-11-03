var socket = (io);

function redirectToJoin() {
    window.location.href = "joinSCREEN.html";
}

function redirectToMain() {
    window.location.href = "mainSCREEN.html";
}


let roomForm = document.getElementById("roomForm");

if (roomForm !== null) { // checks that the element does exist (i.e. joinSCREEN loaded)
    roomForm.addEventListener("submit", (e) => {
        e.preventDefault();
        let roomJoin = document.getElementById("roomCodeJoin").value;
        socket.emit("roomJoinToServer", roomJoin)

    }
)}
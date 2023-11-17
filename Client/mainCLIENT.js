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
        var roomJoin = document.getElementById("roomCodeJoin").value;
        socket.emit("roomJoinToServer", roomJoin); // sends roomJoin variable (room code) to server for validation
    }
)}

socket.on("roomJoin0Length", message => {
    document.getElementById("joinError").innerHTML = message;
});
socket.on("roomJoinInvalid", message => {
    document.getElementById("joinError").innerHTML = message;
});
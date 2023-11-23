function redirectToJoin() {
    window.location.href = "joinSCREEN.html";
}

function redirectToMain() {
    window.location.href = "mainSCREEN.html";
}

let roomForm = document.getElementById("roomForm");

if (roomForm !== null) { // checks that the element does exist (i.e. joinSCREEN loaded) so multiple pages can be handled without the listener causing errors
    roomForm.addEventListener("submit", (e) => {
        e.preventDefault(); // stops default function of submit button
        var roomJoin = document.getElementById("roomCodeJoin").value;
        socket.emit("roomJoinToServer", roomJoin); // sends roomJoin variable (room code) to server for validation
    }
)}

// These two socket.ons are used to display an error message if the user does not enter a code 6 chars in length

socket.on("roomJoin0Length", message => {
    document.getElementById("joinError").innerHTML = message;
});
socket.on("roomJoinInvalid", message => {
    document.getElementById("joinError").innerHTML = message;
});
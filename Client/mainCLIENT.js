// REDIRECTING TO PAGES

function redirectToJoin() {
    window.location.href = "joinSCREEN.html"; // redirects to join room
}

function redirectToMain() {
    window.location.href = "mainSCREEN.html"; // redirects to main room
}

function redirectToLobby() {
    socket.emit("generateRoomCode", socket.id); // generates a room code on server
    socket.on("generateCodeComplete", generatedCode => { 
        localStorage.setItem("lobbyGeneratedCode", generatedCode); // stores generated code in local storage
        window.location.href = "lobbySCREEN.html"; // redirects to lobby room
    });
    

}

// SETTING ROOM CODE DISPLAY OF LOBBY

if (document.getElementById("lobbyCode") !== null) {
    let lobbyGeneratedCode = localStorage.getItem("lobbyGeneratedCode");
        console.log(lobbyGeneratedCode);
        document.getElementById("lobbyCode").innerHTML = lobbyGeneratedCode;
}



let roomForm = document.getElementById("roomForm");

if (roomForm !== null) { // checks that the element does exist (i.e. joinSCREEN loaded) so multiple pages can be handled without the listener causing errors
    roomForm.addEventListener("submit", (e) => {
        e.preventDefault(); // stops default function of submit button
        var roomJoin = document.getElementById("roomCodeJoin").value;
        socket.emit("roomJoinToServer", roomJoin); // sends roomJoin variable (room code) to server for validation
    }
)}

// ERROR MESSAGES

socket.on("roomJoin0Length", message => {
    document.getElementById("joinError").innerHTML = message;
});
socket.on("roomJoinInvalid", message => {
    document.getElementById("joinError").innerHTML = message;
});
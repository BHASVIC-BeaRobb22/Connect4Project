// REDIRECTING TO PAGES

function redirectToJoin() {
    window.location.href = "joinSCREEN.html"; // redirects to join room
}

function redirectToMain() {
    window.location.href = "mainSCREEN.html"; // redirects to main room
}


function toMainAndDelete(roomCode) {
    socket.emit("deleteRoom", roomCode); // deletes room from rooms[]

    socket.on("roomRemoved", () => { // confirms room is deleted before redirecting
        window.location.href = "mainSCREEN.html"; 
    })
}


// CREATING A ROOM

function createToLobby() {
    socket.emit("generateRoomCode"); // generates a room code on server
    socket.on("generateCodeComplete", generatedCode => { // awaits for the code to be generated before running
        window.location.href = "lobbySCREEN.html?code=" + generatedCode; // stores generated code in URL so it can be read in lobbySCREEN.html
    });
    
}




// JOINING A ROOM

socket.on("roomJoinValid", roomCode => {
    window.location.href = "lobbySCREEN.html?code=" + roomCode;
});





// SETTING EVENT LISTENER FOR ROOM FORM

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
socket.on("roomNotFound", message => {
    document.getElementById("joinError").innerHTML = message;
});
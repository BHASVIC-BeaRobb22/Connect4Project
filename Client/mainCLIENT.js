var socket = (io);

const joinButton = document.getElementById("joinRoom");
const joinToMain = document.getElementById("joinToMain");


joinButton.addEventListener("click", () => {
    window.location.href = "joinSCREEN.html";
})

joinToMain.addEventListener("click", () => {
    window.location.href = "mainSCREEN.html";
})

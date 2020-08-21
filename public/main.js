var playerOne = document.getElementById("p1");
var playerTwo = document.getElementById("p2");
var playerThree = document.getElementById("p3");
var playerFour = document.getElementById("p4");
var playerFive = document.getElementById("p5");
var playerSix = document.getElementById("p6");
 
var name;
var player;
 
const socket = io();
 
function setPlayer(number){
   player = number;
   switch(player){
       case 1:
           playerOne.append("player1");
           break;
       case 2:
           playerTwo.append("player2");
           break;
       case 3:
           playerThree.append("player3");
           break;
       case 4:
           playerFour.append("player4");
           break;
       case 5:
           playerFive.append("player5");
           break;
       case 6:
           playerSix.append("player6");
           break;
   }
}
 
 
socket.on("user connected", (pCount) => {
   setPlayer(pCount);
});
 
// recieves emits from server to know that we have to write a message
socket.on("message", (data) => {
 addMessageToHTML(data);
});
// function to say user connected
function alertUserConnected(){
 addMessageToHTML("User Connected");
}
// checks for server to emit connection
 
 

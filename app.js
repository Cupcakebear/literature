var app = require('express')();
var express = require("express");
var http = require('http').createServer(app);
const bodyParser = require("body-parser");
 
var io = require('socket.io')(http);
 
 
var playerCount = 0;
 
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));
 
 
app.get('/', function(req,res){
   res.sendFile(__dirname + "/public/index.html");
})
 
 
//connection/disconnect
io.on('connection', (socket) => {
 console.log("player");
 
 playerCount = playerCount + 1;
 console.log("player" + playerCount + "has connected");
 io.emit("user connected" , playerCount);
  socket.on("disconnect", () => {
   playerCount = playerCount - 1;
  console.log("user disconnected");
 });
});
 
//listens on port 3000
http.listen(3000, function(){
   console.log("server started :)");
})
 
 
var suits = ["spades", "diamonds", "clubs", "hearts"];
var values = ["A", "2", "3", "4", "5", "6", "8", "9", "10", "J", "Q", "K"];
 
var deck = new Array();
//full of cards
var hand1 = new Array();
var hand2 = new Array();
var hand3 = new Array();
var hand4 = new Array();
var hand5 = new Array();
var hand6 = new Array();
 
for(var i = 0; i < suits.length; i++){
 for(var x = 0; x < values.length; x++){
   var card = {Value: values[x], Suit: suits[i]};
   deck.push(card);
 }
}
 
for (var i = 0; i < 1000; i++){
 var location1 = Math.floor((Math.random() * deck.length));
 var location2 = Math.floor((Math.random() * deck.length));
 var tmp = deck[location1];
 deck[location1] = deck[location2];
 deck[location2] = tmp;
}
 
for(var i = 1; i <= 48 ; i++){
   if(i%6 === 1){
       hand1.push(deck[i]);
   }else if(i%6 === 2){
       hand2.push(deck[i]);
   }else if(i%6 === 3){
       hand3.push(deck[i]);
   }else if(i%6 === 4){
       hand4.push(deck[i]);
   }else if(i%6 === 5){
       hand5.push(deck[i]);
   }else if(i%6 === 0){
       hand6.push(deck[i]);
   }
}
 
// for(var i = 0; i < 8; i++){
//   playerOne.append(fullCard(hand1, i));
//   playerTwo.append(fullCard(hand2, i));
//   playerThree.append(fullCard(hand3, i));
//   playerFour.append(fullCard(hand4, i));
//   playerFive.append(fullCard(hand5, i));
//   playerSix.append(fullCard(hand6, i));
// }
 
 
 
function fullCard(array, x){
  return array[x].Value + " of " + array[x].Suit;
}
r
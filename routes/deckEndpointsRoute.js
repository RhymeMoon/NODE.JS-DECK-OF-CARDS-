const express = require("express");
const router = express.Router();
var LocalStorage = require('node-localstorage').LocalStorage,
localStorage = new LocalStorage('./scratch');

//global variable of the card
const ranks = ["Ace", "2", "3", "4", "5", "6", "7", "8", "9", "10", "Jack", "Queen", "King"];
const suits = ["Clubs", "Diamonds", "Hearts", "Spades"];

//deck creation
const deck = [];    
for(let suit of suits){
    for(let rank of ranks) {
       deck.push({rank,suit})
    }   
};

//ENDPOINT NUMBER 1
router.post("/createDeck",(request,response) => {
    var myEndpoint = {
        Shuffled : false,
        Remaining : deck.length,
        Cards : deck,   
    }; 
    localStorage.setItem("newDeck", JSON.stringify(myEndpoint));
    
    
    response.status(200).json({
        message : "SUCCESS"
    })
});

//shuffeling the card   
function shuffleDeck(deck) {
    for (let i = deck.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [deck[i], deck[j]] = [deck[j], deck[i]];
    }
  } 
//ENDPOINT NUMBER 2 
router.post("/shuffleDeck",(request,response) => {
        shuffleDeck(deck);
        let myShuffleEndpoint = {
            Shuffled : true,
            Remaining : deck.length,         
            Cards : deck,   
        };    
        localStorage.setItem("shuffled", JSON.stringify(myShuffleEndpoint));
        response.status(200).json({
            message : "SUCCESS"
        })
        
}); 

//DRAW THE LAST CARD
router.get("/drawLastCard", (request,response) => {
    let lastCard = deck.pop();
    localStorage.setItem("lastCard" , JSON.stringify(lastCard));
    response.status(200).json({
        message : "SUCCESS"
    })
});



router.get("/remainingCards", (request,response) => {

    var remainCard = {
        Shuffled : true,
        Remaining : deck.length,
        Cards : deck, 
    }
    localStorage.setItem("cardsRemain" , JSON.stringify(remainCard));

    response.status(200).json({
        message : "SUCCESS"
    })
});

//CLEAR DECK
router.post("/clearDeck", (request,response) => {  
    let deck =  [];   
    localStorage.clear()
    var myEndpoint = {
        Shuffled : false,
        Remaining : deck.length,
        Cards : deck,   
    }; 
    localStorage.setItem("clearDeck", JSON.stringify(myEndpoint));
    response.status(200).json({
        message: "clear"
    })

});
module.exports = router; 
 



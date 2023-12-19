// Coding Steps:
// For the final project you will be creating an automated version
// of the classic card game WAR! There are many versions of the game
// WAR. In this version there are only 2 players.
// You do not need to do anything special when there is a tie in a
//  round.Think about how you would build this project and write
//  your plan down. Consider classes such as: Card, Deck,
// Player, as well as what properties and methods they may include.
// You do not need to accept any user input, when you run your code,
//  the entire game should play out instantly without any user input
//  inside of your browser's console.
// The completed project should, when executed, do the following:
// Deal 26 Cards to each Player from a Deck of 52 cards.
// Iterate through the turns where each Player plays a Card.
// The Player who played the higher card is awarded a point.
// Ties result in zero points for both Players.
// // After all cards have been played, display the score and declare the winner.
// ***********************************************************************************************

// **********CREATING CLASSES:***********
// layout: CARD (suit, name, value) DECK(),

class Card {
  constructor(suit, name, value) {
    this.name = name;
    this.suit = suit;
    this.value = value;
  }
}
// **END OF CARD class**

class Deck {
  constructor() {
    this.cards = [];
    this.suits = ["♠", "♣", "♥", "♦"];
    this.names = [
      "Ace",
      "2",
      "3",
      "4",
      "5",
      "6",
      "7",
      "8",
      "9",
      "10",
      "J",
      "Q",
      "K",
    ];
    this.values = [14, 2, 3, 4, 5, 6, 7, 8, 10, 11, 12, 13];
  }
  // creating method to build the deck, this loops the arrays together.
  createDeck() {
    console.log("creating the deck");
    for (let i = 0; i < this.suits.length; i++) {
      // nested loop
      for (let n = 0; n < this.names.length; n++) {
        this.cards.push(new Card(this.suits[i], this.names[n], this.values[n]));
      }
    }
  }
  //   ***end of createDeck Mehtod****
  //   method to shuffle the cards
  shuffleDeck() {
    console.log("shuffling cards");
    const shuffleDeck = [];
    for (let i = 0; i < 52; i++) {
      let randomPosition = Math.floor((this.cards.length - 1) * Math.random());
      let randomItem = this.cards.splice(randomPosition, 1);
      shuffleDeck.push(...randomItem);
    }
    return shuffleDeck;
  }
  //   **end of shuffleDeck***
  //  method to deal the cards
  dealDeck(players, shuffledCards) {
    console.log("Dealing cards");
    let dealingCards1 = shuffledCards.splice(0, 26);
    players[0].hands.push(...dealingCards1);
    let dealingCards2 = shuffledCards.splice(0, 26);
    players[1].hands.push(...dealingCards2);
  }
}
// ***end of DECK class

// ***PLAYERS class ****
class Players {
  constructor(name) {
    this.name = name;
    this.points = 0;
    this.hands = [];
  }
}

class Game {
  constructor() {
    this.players = [];
  }
  // Create players and assigning names
  start() {
    this.players.push(new Players("Qui Gon Jin"));
    this.players.push(new Players("Darth Maul"));
    console.log("lets play war!", this.players);

    // createing deck and shuffling cards
    let myDeck = new Deck();
    myDeck.createDeck();
    let shuffledDeck = myDeck.shuffleDeck();

    // Deal Cards to Players
    myDeck.dealDeck(this.players, shuffledDeck);

    // play game method
    this.playGame();
    // determine Outcome of game a nd log the winner
    this.endGame();
  }
  playGame() {
    console.log("Let us Play");
    let player1 = this.players[0];
    let player2 = this.players[1];
    let roundWinner = "";
    let turn = 0;
    // looping thru turns
    while (player1.hands.length !== 0 && player2.hands.length !== 0) {
      let player1Card = player1.hands.pop();
      let player2Card = player2.hands.pop();
      if (player1Card.value > player2Card.value) {
        roundWinner = player1.name;
        player1.points += 1;
        console.log(
          `turn: ${(turn += 1)} \nplayer 1 card: ${player1Card.name} of ${
            player1Card.suit
          } \nPlayer 2 card: ${player2Card.name} of ${player2Card.suit}`
        );
      } else if (player2Card.value > player1Card.value) {
        roundWinner = player2.name;
        player2.points += 1;
        console.log(
          `turn: ${(turn += 1)} \nplayer 1 card: ${player1Card.name} of ${
            player1Card.suit
          } \nPlayer 2 card: ${player2Card.name} of ${player2Card.suit}`
        );
      } else {
        console.log(
          `turn: ${(turn += 1)} \nplayer 1 card: ${player1Card.name} of ${
            player1Card.suit
          } \nPlayer 2 card: ${player2Card.name} of ${player2Card.suit}`
        );
      }
    }
  }
  //   end of playGame method**
  endGame() {
    let gameWinner = "";
    let player1 = this.players[0];
    let player2 = this.players[1];
    let winnerPoints = 0;
    if (player1.points > player2.points) {
      gameWinner = player1.name;
      winnerPoints = player1.points;
      alert(
        `game over! ${gameWinner} won the duel! \nFINAL SCORES:\n ${player1.name} : ${player1.points} \nTHANKS FOR PLAYING REMEMBER THE CODE IS WITH YOU ALWAYS`
      );
    } else if (player2.points > player1.points) {
      gameWinner = player2.name;
      winnerPoints = player2.points;
      alert(
        `game over! ${gameWinner} won the duel! \nFINAL SCORES:\n ${player2.name} : ${player2.points} \nTHANKS FOR PLAYING REMEMBER THE CODE IS WITH YOU ALWAYS`
      );
    } else {
      alert(`GAME OVER! \nIts A tie!`);
    }
  }
}

// launching game
let game = new Game();
game.start();

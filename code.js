import { MemoryButton } from "./memoryButton.js";
import { Toolbox } from "./toolbox.js";


let canvas = document.getElementById("myCanvas");
let pencil = canvas.getContext("2d"); // This gives you the drawing context, like a pencil
let toolbox = new Toolbox();

let color1 = toolbox.getRandomColor();
let card1a = new MemoryButton(canvas, pencil, 50, 50, color1);
let card1b = new MemoryButton(canvas, pencil, 200, 50, color1);

let color2 = toolbox.getRandomColor();
let card2a = new MemoryButton(canvas, pencil, 50, 400, color2);
let card2b = new MemoryButton(canvas, pencil, 350, 50, color2);

let color3 = toolbox.getRandomColor();
let card3a = new MemoryButton(canvas, pencil, 200, 400, color3);
let card3b = new MemoryButton(canvas, pencil, 490, 50, color3);

let color4 = toolbox.getRandomColor();
let card4a = new MemoryButton(canvas, pencil, 50, 200, color4);
let card4b = new MemoryButton(canvas, pencil, 490, 200, color4);

let color5 = toolbox.getRandomColor();
let card5a = new MemoryButton(canvas, pencil, 350, 200, color5);
let card5b = new MemoryButton(canvas, pencil, 350, 400, color5);

let color6 = toolbox.getRandomColor();
let card6a = new MemoryButton(canvas, pencil, 200, 200, color6);
let card6b = new MemoryButton(canvas, pencil, 490, 400, color6);

  let allCards = [card1a, card1b, card2a, card2b, card3a, card3b,
                card4a, card4b, card5a, card5b, card6a, card6b];


                for (let i = allCards.length - 1; i > 0; i--){
    let j = Math.floor(Math.random() * (i + 1));
    [allCards[i], allCards[j]] = [allCards[j], allCards[i]];
}

let positions = [
     {x: 30, y: 50},  {x: 180, y: 50},  {x: 330, y: 50},  {x: 480, y: 50},
    {x: 30, y: 200}, {x: 180, y: 200}, {x: 330, y: 200}, {x: 480, y: 200},
    {x: 30, y: 350}, {x: 180, y: 350}, {x: 330, y: 350}, {x: 480, y: 350},
]

allCards.forEach((card, index) => {
    card.x = positions[index].x;
    card.y = positions[index].y;
}

)

allCards.forEach(card => card.onFlip = handleFlip);

let flippedCards = [];

function handleFlip(card) {
  
  if (card.matched) return;

  flippedCards.push(card);

  if (flippedCards.length === 2) {
    let [cardA, cardB] = flippedCards;

    if (cardA !== cardB && cardA.color === cardB.color) {
      cardA.matched = true;
      cardB.matched = true;
    } else {
      setTimeout(() => {
        cardA.isFaceUp = false;
        cardB.isFaceUp = false;
      }, 1000);
    }

    flippedCards = [];
  }
}


  








function gameLoop() {

    pencil.clearRect(0,0, canvas.width, canvas.height);
    card1a.draw();
    card1b.draw();
    card2a.draw();
    card2b.draw();
    card3a.draw();
    card3b.draw();
    card4a.draw();
    card4b.draw();
    card5a.draw();
    card5b.draw();
    card6a.draw();
    card6b.draw();

      pencil.clearRect(0, 0, canvas.width, canvas.height);
  allCards.forEach(card => card.draw());

  if (allCards.every(card => card.matched)) {
    WinScreen();

}

function WinScreen() {
  pencil.fillStyle = "rgba(251, 255, 0, 0.6)";
  pencil.fillRect(0, 0, canvas.width, canvas.height);

  pencil.fillStyle = "green";
  pencil.font = "60px Arial";
  pencil.textAlign = "center";
  pencil.fillText("Your winner", canvas.width / 2, canvas.height / 2);
}


}
setInterval(gameLoop, 50);
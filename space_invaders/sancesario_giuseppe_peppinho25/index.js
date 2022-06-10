import CoronaVirusController from "./CoronaVirusController.js";
import Player from "../../../../Desktop/Space Invaders/Player.js";
import ShootController from "../../../../Desktop/Space Invaders/ShootController.js";

const canvas=document.getElementById("gameHospital");
let context= canvas.getContext("2d");
canvas.width= 700;
canvas.height=500;
let img = new Image();
img.src = "Images/Sfondo.jpg";
let gameOver=false;
let winCheck=false;

const playerShootController = new ShootController(canvas, 10);
const CVShootController = new ShootController(canvas, 10000);
const cvController= new CoronaVirusController(canvas, CVShootController, playerShootController);
const player= new Player(canvas, 3, playerShootController);

function gameIsOver(){
  if(gameOver){
    return;
  }
  if(CVShootController.collide(player)){
    gameOver=true;
  }

  if(cvController.collidePlayer(player)){
    gameOver=true;
  }

  if(cvController.cvRows.length===0){
    console.log("enreo")
   winCheck=true;

  }
}

function game(){
  if(!gameOver){
    if (winCheck){
      console.log("enreo")
      let text= "You won doctor...";
      let text2= "the mask is not a must now"
      context.fillStyle="black";
      context.font="50px Arial";
      context.fillText(text, canvas.width/10+70, canvas.height/2);
      context.fillStyle="black";
context.font="30px Killer";
context.fillText(text2, canvas.width/10+75, canvas.height/2+50);
      return;
    }
    gameIsOver();
  context.drawImage(img,0,0, canvas.width, canvas.height);
  cvController.insertCV(context);
  player.insertPlayer(context);
  playerShootController.draw(context, 1);
  CVShootController.draw(context,2);



}
else{
let text= "You are dead doctor\n ";
let text2= "the pandemic has exterminated humanity"
context.fillStyle="black";
context.font="50px Arial";
context.fillText(text, canvas.width/10+70, canvas.height/2);
context.fillStyle="black";
context.font="30px Killer";
context.fillText(text2, canvas.width/10+50, canvas.height/2+50);
}
}

setInterval(game, 1000/60);
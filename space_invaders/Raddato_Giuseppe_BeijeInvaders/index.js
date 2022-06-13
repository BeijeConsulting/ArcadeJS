import Rocket from "./Rocket.js";
import Alien from "./Alien.js";
import BulletController from "./BulletController.js";
import {java , oca , vue , rubrica , h8 , git , js ,
        spring , aws , eclipse , mysql , intellij, postman, html,
        zoom , discord , front} from "./ToolsList.js";

const score = document.getElementById("score");
const scoreBase=50;
let scoreResult=0;

const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");
canvas.width = 750;
canvas.height = 750;

const bulletController = new BulletController(canvas);
const player = new  Rocket( (canvas.width/2),canvas.height-70,bulletController);


let lvl=1;
const enemies = [
  new Alien(50, 20, java),
  new Alien(150, 20, oca),
  new Alien(250, 20, vue),
  new Alien(350, 20, rubrica),
  new Alien(450, 20, h8),
  new Alien(550,20, git),
  new Alien(650, 20, js),
  

  new Alien(50, 150, spring),
  new Alien(150, 150, aws),
  new Alien(250, 150, eclipse), 
  new Alien(350, 150, mysql),
  new Alien(450, 150, intellij),
  new Alien(550, 150, postman),
  new Alien(650, 150, html),

  new Alien(250, 280, zoom),
  new Alien(450, 280, discord),
];

document.getElementById("reset").addEventListener('click', function(e) {
  console.log("reset");
  gameInit();
}, false);




function gameInit() {
  ctx.fillStyle = "azure";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  
  if(enemies.length<=0){
    if(lvl==1){
      enemies[0]=  new Alien((canvas.width/2)-100, 50, front);
      enemies[0].width=200;
      enemies[0].height=200;
      lvl+=1;
    }else if(lvl==2){
      console.log("Hai vinto");
 
      ctx.font = "30px 'Press Start 2P', cursive";
      ctx.fillStyle = "red";
      ctx.textAlign = "center";
   
      ctx.fillText("Sei Assunto/a!", canvas.width/2, canvas.height/2);
    }
    
  }else{
    
    bulletController.draw(ctx);
    player.draw(ctx);
    enemies.forEach((enemy) => {
      if (bulletController.collideWith(enemy)) {
        
       
        scoreResult+= scoreBase;
        
   
        console.log("Original:"+enemy.getHealth(),
        "Healt:"+enemy.health,
        "scoreResult:"+scoreResult);
  
        if (enemy.health <= 0) {
          const index = enemies.indexOf(enemy);
         let r= enemies.splice(index, 1);
         console.log("Eliminato elemento:",{r} );
          scoreResult+=100;
  
        }
          score.innerHTML="SCORE: "+scoreResult;
      } else {
        
        enemy.draw(ctx);
      }
    
    });
  }

}

setInterval(gameInit, 1000 / 60);

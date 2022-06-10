import {Entity} from "./Enitity.js";
import{Player} from "./Player.js";
import { Grid } from "./Grid.js";
const canvas = document.getElementById("field");
console.log(canvas);
const ctx = canvas.getContext('2d');
canvas.height= 576;
canvas.width = 1024;
console.log("canvas");
const scoreBoard = document.getElementById("score");
const shieldDis= document.getElementById("shield");
const hullDis= document.getElementById("hull");
const start = document.getElementById("startMex");

let pla = new Player(new Entity(canvas.width/2,canvas.height,"./img/Player.png"));
let projectiles=[];
let grids=[new Grid(canvas)];
let invProjectiles=[];
let explosions=[];
let score=0;

function reset()
{
 pla = new Player(new Entity(canvas.width/2,canvas.height,"./img/Player.png"));
 projectiles=[];
 grids=[new Grid(canvas)];
 invProjectiles=[];
 gameOver=false;
score=0;
}


document.addEventListener("keydown",({key})=>
{
    if(event.key=='n')
    {
        reset();
        start.innerHTML="";
    }
    else console.log(key);
})

setInterval(Loop, 1000/30);
let count=0;
let gameOver=true;
let spawnSpeed=600;
function Loop(){
    if(!gameOver){
    count++;
    scoreBoard.innerHTML=score;
    shieldDis.innerHTML=pla.shield;
    hullDis.innerHTML=pla.hull;
    update();
    draw();
    Damage();
    if(count%10==0)
    {
        resetCooldowns();
       
    
    }
    if(count%spawnSpeed==0)
    grids.push(new Grid(canvas));
    if(count%spawnSpeed==18000)
    spawnSpeed-=50
    if(pla.entity.exploded)
    {
        setTimeout(()=>{
        gameOver=true;
        start.innerHTML="GameOver. Press n to Retry";
    },100)}
}
else{
    
}
}

function update(){
    pla.Control(canvas.height,canvas.width);
    pla.entity.update();
    if(pla.keys.space.pressed)
        pla.Fire(projectiles);
    projectiles.forEach(projectile=>{projectile.entity.update();})
    grids.forEach(grid=>{grid.update(canvas,invProjectiles);})
    invProjectiles.forEach(projectile=>{projectile.entity.update();})
}

function draw()
{
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    pla.entity.draw(ctx);
    grids.forEach(grid=>{grid.draw(ctx);})
    projectiles.forEach(projectile=>{projectile.entity.draw(ctx);})
    invProjectiles.forEach(projectile=>{projectile.entity.draw(ctx);})
}

function Damage()
{
    projectiles.forEach((projectile,i) =>{
    if (projectile.entity.position.y<0||projectile.entity.position.y>canvas.height)
    {
        setTimeout(()=>{
            projectiles.splice(i,1); 

        },5);
        
    }
    grids.forEach(grid=>{
        grid.invaders.forEach((invader,q)=>
            {

                if (invader!=null&&projectile.entity.position.y<=invader.entity.position.y+invader.entity.hitBox.height&&projectile.entity.position.y>=invader.entity.position.y)
                {
                    if(projectile.entity.position.x<=invader.entity.position.x+pla.entity.hitBox.height&&projectile.entity.position.x>=invader.entity.position.x)
                    {
                        grid.kill(q,explosions);
                        projectiles.splice(i,1);
                        score+=300;
                        console.log(score);
                    }
                }

            })

    })
    });

    invProjectiles.forEach((projectile,i)=>{
        if (projectile.entity.position.y<=pla.entity.position.y+pla.entity.hitBox.height&&projectile.entity.position.y>=pla.entity.position.y)
                {
                    if(projectile.entity.position.x<=pla.entity.position.x+pla.entity.hitBox.height&&projectile.entity.position.x>=pla.entity.position.x)
                    {
                        pla.getHit();
                        invProjectiles.splice(i,1);
                    }
                }
    });
}

function resetCooldowns(){
    pla.cooldown=false;
    grids.forEach(grid=>{
        grid.invaders.forEach(invader=>{
            if(invader!=null)invader.invCooldown=false;
        })});
}


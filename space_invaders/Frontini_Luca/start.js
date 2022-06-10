import {Entity} from "./Enitity.js";
import{Player} from "./Player.js";
import { Grid } from "./Grid.js";
const canvas = document.getElementById("field");
console.log(canvas);
const ctx = canvas.getContext('2d');
canvas.height= innerHeight;
canvas.width = innerWidth;
console.log("canvas");

const pla = new Player(new Entity(canvas.width/2,canvas.height,"./img/Player.png"));
const projectiles=[];
const grids=[new Grid(canvas)];

setInterval(Loop, 1000/30);
let count=0;
function Loop(){
    count++;
    update();
    draw();
    Damage();
    if(count%18==0)
    {
        pla.cooldown=false;
    }
    if(count%600==0)
    grids.push(new Grid(canvas));
    
}

function update(){
    pla.Control(canvas.height,canvas.width);
    pla.entity.update();
    if(pla.keys.space.pressed)
        pla.Fire(projectiles);
    projectiles.forEach(projectile=>{projectile.entity.update();})
    grids.forEach(grid=>{grid.update(canvas);})
}

function draw()
{
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    pla.entity.draw(ctx);
    grids.forEach(grid=>{grid.draw(ctx);})
    projectiles.forEach(projectile=>{projectile.entity.draw(ctx);})
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
                if (projectile.entity.position.y<=invader.entity.position.y+40&&projectile.entity.position.y>=invader.entity.position.y)
                {
                    if(projectile.entity.position.x<=invader.entity.position.x+40&&projectile.entity.position.x>=invader.entity.position.x)
                    {
                        grid.kill(q);
                        projectiles.splice(i,1);
                    }
                }

            })

    })
    });
}
import {Invader} from "./invader.js";
import { Entity } from "./Enitity.js";
export class Grid{
    constructor(canvas){
        this.position={x:0,y:25};
        this.invSize=40;
        this.explosions=[];
        this.speed={x:6,y:0};
        this.invaders=[];
        this.explosions=[];
        let rows= Math.floor(Math.random()*5);
        let columns = Math.floor(Math.random()*10+10);
        for(let i=0;i<rows;i++){  
            for(let k=0;k<columns;k++){
            this.invaders.push(new Invader(new Entity(this.position.x+(k*this.invSize),this.position.y+(i*this.invSize),"./img/invader.png")));
            }
        }
    }
    draw(ctx){
        this.invaders.forEach(invader=>{if(invader!=null)invader.entity.draw(ctx);})
        this.explosions.forEach(invader=>{invader.entity.draw(ctx);})
    }
    update(canvas,projectiles){
        let updSpeed=this.speed;
        let down;
        this.invaders.forEach(invader=>{
            if(invader!=null){
            invader.entity.speed=this.speed;
            invader.entity.update();
            if (invader.entity.position.x>=canvas.width-this.invSize)
            {
                updSpeed={x:-6,y:0};
                down=true;
            }
            else if (invader.entity.position.x<=0)
            {
                updSpeed={x:6,y:0};
                
            }
            invader.fire(projectiles);
            
        }})
        this.speed=updSpeed;
        if(down)this.speed.y=this.invSize;
        else this.speed.y=0;
    }
    kill(invader)
    {
        this.invaders[invader].entity.explode("./img/explosion-score.png");
        setTimeout(() => {
           this.invaders[invader]=null; 
        }, 200);
    }

}
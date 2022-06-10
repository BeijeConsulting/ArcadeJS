import {Invader} from "./invader.js";
import { Entity } from "./Enitity.js";
export class Grid{
    constructor(canvas){
        this.position={x:0,y:25};
        this.speed={x:6,y:0};
        this.invaders=[];
        let rows= Math.floor(Math.random()*5+2);
        let columns = Math.floor(Math.random()*10+5);
        for(let i=0;i<rows;i++){  
            for(let k=0;k<columns;k++){
            this.invaders.push(new Invader(new Entity(this.position.x+(k*40),this.position.y+(i*40),"./img/invader.png")));
            }
        }
    }
    draw(ctx){
        this.invaders.forEach(invader=>{invader.entity.draw(ctx);})
    }
    update(canvas,projectiles){
        let updSpeed=this.speed;
        let down;
        this.invaders.forEach(invader=>{
            invader.entity.speed=this.speed;
            invader.entity.update();
            if (invader.entity.position.x>=canvas.width-40)
            {
                updSpeed={x:-6,y:0};
                down=true;
            }
            else if (invader.entity.position.x<=0)
            {
                updSpeed={x:6,y:0};
                down=true;
            }
            invader.fire();
            
        })
        this.speed=updSpeed;
        if(down)this.speed.y=20;
        else this.speed.y=0;
    }
    kill(invader)
    {
        this.invaders.splice(invader,1);
    }

}
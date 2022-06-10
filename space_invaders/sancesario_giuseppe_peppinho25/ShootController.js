import Shoot from "./Shoot.js";

export default class ShootController{
    shoots = [];
    timeForNextShoot=0;
    constructor(canvas,maxShoot){
    this.canvas = canvas; 
    this.maxShoot=maxShoot;    
     
    }

    shoot(x,y, velocity, timeForNextShoot=0) {
        if(this.timeForNextShoot<=0 && this.shoots.length < this.maxShoot){
            const shoot = new Shoot(this.canvas, x,y, velocity,this.bullet);  
            this.shoots.push(shoot);
            this.timeForNextShoot=timeForNextShoot;
        }
    }

    collide(opponent){
        const shootOpponent= this.shoots.findIndex((sh)=>sh.collide(opponent));
        if(shootOpponent>=0){
            this.shoots.splice(shootOpponent, 1);
            return true;
        
        }
        return false;
    }
    draw(context, type){
        this.shoots= this.shoots.filter(shoot=> shoot.y+shoot.width>0 && shoot.y<=this.canvas.height);
        this.shoots.forEach(
            (shoot)=>shoot.insertShoot(context, type));
            if(this.timeForNextShoot>0){
                this.timeForNextShoot--;
            }
    }

}
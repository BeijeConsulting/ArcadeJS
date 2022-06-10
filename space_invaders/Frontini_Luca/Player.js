import {Entity} from "./Enitity.js";
import {Projectile} from "./Projectiles.js";
export class Player{
    
    constructor(entity){
        this.entity=entity;
        this.weapon={speed:-12,size:{x:20,y:15},img:"./img/blue-proj.png"};
        this.entity.position.y-=this.entity.hitBox.height+this.entity.hitBox.height/2;
        this.cooldown=false;
         addEventListener('keydown',({key}) =>{
            switch(event.key)
            {
                case 'w':
                this.keys.w.pressed=true;
                console.log(this.entity)
                break;

                case 'a':
                    
                    this.keys.a.pressed=true;
                break;

                case 's':
                    
                    this.keys.s.pressed=true;
                break;
                
                case 'd':

                    this.keys.d.pressed=true;
                break;
                
                case ' ':
                this.keys.space.pressed=true;
                break;
            }
        });
        addEventListener('keyup',({key}) =>{
            switch(event.key)
            {
                case 'w':
                this.keys.w.pressed=false;
                console.log(this.entity)
                break;

                case 'a':
                    
                    this.keys.a.pressed=false;
                break;

                case 's':
                    
                    this.keys.s.pressed=false;
                break;
                
                case 'd':

                    this.keys.d.pressed=false;
                break;
                
                case ' ':
                this.keys.space.pressed=false;
                break;
            }
        });
        this.keys={
            w:{pressed:false},
            a:{pressed:false},
            s:{pressed:false},
            d:{pressed:false},
            space:{pressed:false},
        }
        
    }
Control(height,width)
{
    let speed = 9;
    /*if(this.keys.w.pressed&&(this.entity).position.y>=0) (this.entity).speed.y=-speed;
    else if(this.keys.s.pressed&&(this.entity).position.y<=(height-this.entity.hitBox.height)) (this.entity).speed.y=speed;
    else (this.entity).speed.y=0;
    */
    if(this.keys.a.pressed&&(this.entity).position.x>=0) (this.entity).speed.x=-speed;
    else if(this.keys.d.pressed&&(this.entity).position.x<=width-this.entity.hitBox.width) (this.entity).speed.x=speed;
    else(this.entity).speed.x=0;

    
}
Fire(projectiles)
{
    if(!this.cooldown){
    projectiles.push(new Projectile(new Entity(this.entity.position.x+(this.entity.hitBox.width/2)-25/2,this.entity.position.y-this.entity.hitBox.height/2,this.weapon.img),this.weapon));
    this.cooldown=true;
} 
}
}
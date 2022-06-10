import { Projectile } from "./Projectiles.js";
import { Entity } from "./Enitity.js";
export class Invader{
    constructor(entity){
        this.entity=entity;
        this.invCooldown=false;
        this.entity.hitBox.height=40;
        this.entity.hitBox.width=40;
        this.weapon={speed:12,size:{x:20,y:15},img:"./img/red-proj.png"};
    }
    fire(projectiles){
        let roll=Math.floor(Math.random()*100+1);
        if(!this.invCooldown&&roll%100==0){
            console.log(roll);
            projectiles.push(new Projectile(new Entity(this.entity.position.x+(this.entity.hitBox.width/2)-25/2,this.entity.position.y+this.entity.hitBox.height/2,this.weapon.img),this.weapon));
            this.invCooldown=true;

    }
    }
}
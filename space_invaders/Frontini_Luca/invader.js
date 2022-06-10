import { Projectile } from "./Projectiles.js";
export class Invader{
    constructor(entity){
        this.entity=entity;
        this.entity.hitBox.height=40;
        this.entity.hitBox.width=40;
    }
    fire(){}
}
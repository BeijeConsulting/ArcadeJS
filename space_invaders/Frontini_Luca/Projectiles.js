export class Projectile{
    constructor(entity,Projtype){
        this.entity=entity;
        this.entity.speed.y=Projtype.speed;
        this.entity.hitBox.width=Projtype.size.x;
        this.entity.hitBox.height=Projtype.size.y;
    }

}
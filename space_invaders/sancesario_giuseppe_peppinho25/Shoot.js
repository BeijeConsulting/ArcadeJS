export default class Shoot{
    constructor(canvas, x, y, velocity){
        this.canvas=canvas;
        this.x=x;
        this.y=y;
        this.velocity= velocity;
    
        this.width=5;
        this.height=10;
        
    }

    insertShoot(context, type){
        this.y-=this.velocity;
        if(type==1){
        context.fillStyle="blue";}
        else if(type==2){
            context.fillStyle="red";

        }
        context.fillRect(this.x, this.y, this.width, this.height);
    }

    collide(opponent){
        if (
            this.x + this.width > opponent.x &&
            this.x < opponent.x + opponent.width &&
            this.y + this.height > opponent.y &&
            this.y < opponent.y + opponent.height
          ) {
            return true;
          } else {
            return false;
          }
    }
}
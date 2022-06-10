export class Entity{
    constructor(x,y,img){
    this.rotation=0;
    this.position={
        x: x,
        y: y,
    }
    this.speed={
        x:0,
        y:0,
    }
    this.image = new Image();
    this.image.src=img;
    
    this.hitBox={
        height:50,
        width:50
    }
    }
    draw(ctx){
        ctx.fillStyle = 'purple';
        //ctx.fillRect(this.position.x,this.position.y,this.hitBox.height,this.hitBox.width)
        ctx.drawImage(this.image,this.position.x,this.position.y,this.hitBox.height,this.hitBox.width);
    }
    update(){
        this.position.x+=this.speed.x;
        this.position.y+=this.speed.y;
    }
    
    }
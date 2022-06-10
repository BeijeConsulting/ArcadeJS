export default class CoronaVirus{
    constructor(x, y){
        this.x=x;
        this.y=y;
        this.width=40;
        this.height=30;
        
        
    }

    draw(context){
        let img = new Image();
        img.src = "Images/CV.png";
        context.drawImage(img,this.x, this.y, this.width, this.height);
        
    }

    move(xVel, yVel){
        this.x+=xVel;
        this.y+=yVel;
    }

    collidePlayer(player) {
        if (
          this.x + this.width > player.x &&
          this.x < player.x + player.width &&
          this.y + this.height > player.y &&
          this.y < player.y + player.height
        ) {
          return true;
        } else {
          return false;
        }
}}
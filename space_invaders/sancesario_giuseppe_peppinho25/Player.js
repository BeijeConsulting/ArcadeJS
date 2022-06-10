import CoronaVirusController from "./CoronaVirusController.js";

export default class Player{
    rightMov=false;
    leftMov=false;
    shoot=false;

    constructor(canvas, movPX, shootController){
        this.width=50;
        this.height=50;
        this.canvas= canvas;
        this.movPX=movPX;
        this.x=this.canvas.width/2;
        this.y= this.canvas.height-70;
        this.shootController=shootController;

        document.addEventListener("keydown", this.keydown);
        document.addEventListener("keyup", this.keyup);
    }

    insertPlayer(context){
        let img = new Image();
        img.src = "Images/Doc.png";
        if(this.shoot){
            this.shootController.shoot(this.x+20, this.y,this.width/20);
        }
        this.move();
        context.drawImage(img, this.x, this.y ,this.width, this.height);
    }

    move(){
        if (this.x<=0 ){
            this.x=0;
        }
        else if( this.x>=(this.canvas.width - this.width)){
            this.x=this.canvas.width-this.width;
        }
        if(this.rightMov){
            this.x+=this.movPX;
        }

        if(this.leftMov){
            this.x-=this.movPX;
        }
    }

    keydown = (event) =>{
        if (event.code == "ArrowRight" ){
            this.rightMov=true;
        }

        if (event.code == "ArrowLeft"){
            this.leftMov=true;
        }
        if (event.code == "Space"){            
            this.shoot=true;
            this.countShoot+=1;
        }
    };

    keyup = (event) =>{
        if (event.code == "ArrowRight"){
            this.rightMov=false;
        }

        if (event.code == "ArrowLeft"){
            this.leftMov=false;
        }
        if (event.code == "Space"){
            this.shoot=false;
        }
    };

    
}

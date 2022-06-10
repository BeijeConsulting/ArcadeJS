import CoronaVirus from "./CoronaVirus.js";
import MoveDirection from "../../../../Desktop/Space Invaders/MoveDirection.js";
export default class CoronaVirusController{

    
    
    
    cvStruct= [
        [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
        [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
        [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
        [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
        [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
        [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],

    ]

    cvRows=[];

    actualDirection = MoveDirection.right;
    velX=0;
    velY=0;
    defVelX=1;
    defSXVelX=-1;
    defVelY=0.1;
    shootTimeDef=100;
    shootTime=this.shootTimeDef;


    constructor(canvas, CVShootController, playerShootController){
        this.canvas = canvas;
        this.CVShootController=CVShootController;
        this.playerShootController=playerShootController;
        this.createCV();
    }

   
    createCV() {
        this.cvStruct.forEach((row, rowIndex) => {
          this.cvRows[rowIndex] = [];
          row.forEach((enemyNubmer, enemyIndex) => {
            if (enemyNubmer > 0) {
              this.cvRows[rowIndex].push(
                new CoronaVirus(enemyIndex * 40, rowIndex * 35)
              );
            }
          });
        });
      }
    
    insertCV(context){   
        
        this.updateVelAndDir(); 
        this.collision();
        this.drawCV(context);
        this.goShoot();

    }

    collidePlayer(player) {
      return this.cvRows.flat().some((cv) => cv.collidePlayer(player));
    }

    collision(){
      this.cvRows.forEach((cvRow)=>{
        cvRow.forEach((cv, cvIndex)=>{
          if(this.playerShootController.collide(cv)){
            cvRow.splice(cvIndex,1);
          }
        });
      });
      this.cvRows=this.cvRows.filter((cvR)=>cvR.length>0);
    }

    goShoot(){
      this.shootTime--;
      if(this.shootTime<=0){
        this.shootTime=this.shootTimeDef;
        const cvShoot= this.cvRows.flat();
        const cvIndex=Math.floor(Math.random()* cvShoot.length);
        const cvChoose= cvShoot[cvIndex];

        this.CVShootController.shoot(cvChoose.x, cvChoose.y, -7);
      }
    }

    updateVelAndDir(){
        for (const row of this.cvRows){
            if(this.actualDirection == MoveDirection.right){
                this.velX=this.defVelX;
                this.velY=0;
                const rightCV= row[row.length-1];
                if(rightCV.x+rightCV.width>= this.canvas.width){
                    this.actualDirection=MoveDirection.left;
                    break;
                }
                
                }else if(this.actualDirection===MoveDirection.left){
                    this.velX=this.defSXVelX;
                    this.velY=this.defVelY;
                    const rightCV= row[0];
                    if(rightCV.x+rightCV.width<40){
                        this.actualDirection=MoveDirection.right;
                        break;

                    }
            }
        }
    }

   
    drawCV(context) {
        this.cvRows.flat().forEach((cv) =>{

            cv.move(this.velX, this.velY);
          cv.draw(context);
        });
      }
    

}
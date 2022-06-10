export default class Rocket {
  constructor(x, y, bulletController) {
    this.x = x;
    this.y = y;
    this.bulletController = bulletController;
    this.width = 70;
    this.height = 70;
    this.speed = 4;

    this.image = new Image();
    this.image.src = "img/aereo.png";
   //this.image.src = "img/rocket.png";
    document.addEventListener("keydown", this.keydown);
    document.addEventListener("keyup", this.keyup);
    
 
  }

  draw(ctx) {
    this.move();
    ctx.fillStyle = "black";
    ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
    this.shoot();
  }

  shoot() {
    if (this.shootPressed) {
      const speed = 5;
      const delay = 7;
      const damage = 1;
      const bulletX = this.x + this.width / 2;
      const bulletY = this.y;
      this.bulletController.shoot(bulletX, bulletY, speed, damage, delay);
    }
  }

  move() {

    if (this.leftPressed) {
      let result = this.x -this.speed;
            if(result>=-this.height/2){
                this.x =result;
            }
    }

    if (this.rightPressed) {
      let result = this.x + this.speed;
      if(result <=this.y+ this.width/2){
        this.x =result;
        
      }
    }
  }

  keydown = (e) => {
    if (e.keyCode == '32' && e.target === document.body) {
      e.preventDefault(); 
      this.shootPressed = true;
    }
    if (e.keyCode == '37') {
      this.leftPressed = true;
    }
    if (e.keyCode == '39') {
      this.rightPressed = true;
    }
  
  };

  keyup = (e) => {
    if (e.keyCode == '32') {
      this.shootPressed = false;
    } 
 
    if (e.keyCode == '37') {
      this.leftPressed = false;
    }
    if (e.keyCode == '39') {
      this.rightPressed = false;
    }

  };
}

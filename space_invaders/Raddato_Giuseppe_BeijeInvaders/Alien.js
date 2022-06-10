export default class Alien {
  constructor(x, y, alien) {
    this.alien=alien;
    this.x = x;
    this.y = y;
    this.color = alien.color;
    this.health = alien.health;
    this.healthOriginal = alien.health;
    this.width = 60;
    this.height = 85;
    this.image = new Image();
    //this.image.src = "img/ali1.png";
    if(alien.img===undefined){
      this.image.src = "img/ali1.png";
    }else{
      this.image.src = alien.img;
    }
  }

  draw(ctx) {
    ctx.strokeStyle = this.color;
    ctx.strokeRect(this.x, this.y, this.width, this.height);
    ctx.drawImage(this.image, this.x, this.y, this.width, this.height-25);
    ctx.fillStyle = this.color;
    ctx.font = "10px 'Press Start 2P', cursive";
    ctx.fillText("Diff:"+this.health,this.x, this.y + (this.height) );
    
  }
  takeDamage(damage) {
    this.health -= damage;
  }
  getHealth(){
    return this.healthOriginal;
  }
  getAlien(){
    return this.alien;
  }
}

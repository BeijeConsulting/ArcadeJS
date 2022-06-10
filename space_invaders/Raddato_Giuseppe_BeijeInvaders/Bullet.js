export default class Bullet {


  constructor(x, y, speed, damage) {
    this.x = x;
    this.y = y;
    this.speed = speed;
    this.damage = damage;
    this.width = 5;
    this.height = 20;
    this.color = "red";
  }

  draw(ctx) {
    ctx.fillStyle = this.color;
    this.y -= this.speed;
    ctx.fillRect(this.x, this.y, this.width, this.height);

  }

  collideWith(alien) {
    if (  this.x < alien.x + alien.width && this.x + this.width > alien.x &&
          this.y < alien.y + alien.height && this.y + this.height > alien.y) {
      alien.takeDamage(this.damage);
      return true;
    }
    return false;
  }
}

const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')

canvas.width = window.innerWidth
canvas.height = window.innerHeight

class Player {
    constructor() {

        this.velocity = {
            x: 0,
            y: 0
        }

        this.lives = 3
        this.score = 0

        const image = new Image()
        image.src = './img/spaceship.png'
        image.onload = () => {
            const scale = 0.15
            this.image = image
            this.width = image.width * scale,
                this.height = image.height * scale
            this.position = {
                x: canvas.width / 2 - this.width / 2,
                y: canvas.height - this.height - 20
            }
        }
    }

    draw() {
        c.drawImage(this.image, this.position.x, this.position.y, this.width, this.height)
    }

    update() {
        if (this.image) {
            this.draw()
            this.position.x += this.velocity.x
        }
    }
}

class Projectile {
    constructor({ position, velocity }) {
        this.position = position
        this.velocity = velocity
        this.radius = 3
    }

    draw() {
        c.beginPath()
        c.arc(this.position.x, this.position.y, this.radius, 0, Math.PI * 2)
        c.fillStyle = 'yellow'
        c.fill()
        c.closePath()
    }

    update() {
        this.draw()
        this.position.x += this.velocity.x
        this.position.y += this.velocity.y
    }
}

class EnemyProjectile {
    constructor({ position, velocity }) {
        this.position = position
        this.velocity = velocity
        this.radius = 5
    }

    draw() {
        c.beginPath()
        c.arc(this.position.x, this.position.y, this.radius, 0, Math.PI * 2)
        c.fillStyle = 'red'
        c.fill()
        c.closePath()
    }

    update() {
        this.draw()
        this.position.x += this.velocity.x
        this.position.y += this.velocity.y
    }
}

class Star {
    constructor({ position, velocity }) {
        this.position = position
        this.radius = 2
        this.velocity = velocity
    }

    draw() {
        c.beginPath()
        c.arc(this.position.x, this.position.y, this.radius, 0, Math.PI * 2)
        c.fillStyle = 'white'
        c.fill()
        c.closePath()
    }

    update() {
        this.draw()
        this.position.x += this.velocity.x
        this.position.y += this.velocity.y
    }
}

class Invader {
    constructor({ position }) {

        this.velocity = {
            x: 0,
            y: 0
        }

        const image = new Image()
        image.src = './img/frontender.png'
        image.onload = () => {
            const scale = .04
            this.image = image
            this.width = image.width * scale,
                this.height = image.height * scale
            this.position = {
                x: position.x,
                y: position.y
            }
        }
    }

    draw() {
        c.drawImage(this.image, this.position.x, this.position.y, this.width, this.height)
    }

    update({ velocity }) {
        if (this.image) {
            this.draw()
            this.position.x += velocity.x
            this.position.y += velocity.y
        }
    }
}



class Grid {
    constructor() {
        this.position = {
            x: 0,
            y: 0
        }
        this.velocity = {
            x: 5,
            y: 0
        }
        this.invaders = []

        const columns = Math.floor(Math.random() * 10) + 5
        const rows = Math.floor(Math.random() * 2) + 2

        this.width = columns * 166 / 2

        for (let x = 0; x < columns; x++) {
            for (let y = 0; y < rows; y++)
                this.invaders.push(new Invader({
                    position: {
                        x: x * 166 / 2,
                        y: (y + 1) * 160 / 2
                    }
                })
                )
        }
    }
    update() {
        this.position.x += this.velocity.x
        this.position.y += this.velocity.y

    }
}

const player = new Player()
const projectiles = []
const enemyProjectiles = []
const grids = []
const stars = []
const keys = {
    a: {
        pressed: false
    },
    d: {
        pressed: false
    },
    space: {
        pressed: false
    }
}

let frames = 0



function animate() {
    if (player.lives > 0) {
        const speed = 7
        window.requestAnimationFrame(animate)
        c.fillStyle = 'black'
        c.fillRect(0, 0, canvas.width, canvas.height)

        player.update()
        projectiles.forEach((projectile, index) => {
            if (projectile.position.y + projectile.radius <= 0) {
                setTimeout(() => {
                    projectiles.splice(index, 1)
                }, 0)
            } else {
                projectile.update()
            }
        })


        if (stars.length < 15) {
            stars.push(new Star({
                position: {
                    x: Math.floor(Math.random() * 1800) + 1,
                    y: 0
                },
                velocity: {
                    x: 0,
                    y: Math.floor(Math.random() * 100) + 20
                }
            }))
        }
        
        stars.forEach((star, index) => {
            if(star.position.y > 1000){
                stars.splice(index, 1)
            }
            else{
                star.update();
            }
            
        })

        enemyProjectiles.forEach((enemyProjectile, index) => {
            if (enemyProjectile.position.y + enemyProjectile.radius > 1800) {
                setTimeout(() => {
                    enemyProjectiles.splice(index, 1)
                }, 0)
            } else {
                enemyProjectile.update()
            }
        })

        grids.forEach((grid, index) => {
            var closestInvader;
            var farInvader;
            grid.velocity.y = 0
            if (grid.invaders.length === 0) {
                grids.splice(index, 1)
                player.score += 500
            }

            grid.invaders.forEach((invader) => {
                if (!closestInvader || invader.position.x < closestInvader.position.x) {
                    closestInvader = invader;
                }
                if (!farInvader || invader.position.x > closestInvader.position.x) {
                    farInvader = invader;
                }
                if (closestInvader && grid.velocity.x < 0 && closestInvader.position.x < 0) {
                    grid.velocity.x = -grid.velocity.x
                    grid.velocity.y = 85
                }


                if (farInvader && grid.velocity.x > 0 && farInvader.position.x > 1800) {
                    grid.velocity.x = -grid.velocity.x
                    grid.velocity.y = 85
                }
            })
            grid.update()
            grid.invaders.forEach((invader, index) => {
                const i = index;
                if (invader.position.y > player.position.y - player.height + 5) {
                    player.lives = 0
                }

                projectiles.forEach((projectile, index) => {
                    if (projectile.position.x > invader.position.x && projectile.position.x < invader.position.x + 40 && projectile.position.y > invader.position.y && projectile.position.y < invader.position.y + 50) {
                        grid.invaders.splice(i, 1)
                        projectiles.splice(index, 1)
                        if (grid.invaders.length % 7 === 0) {
                            if (grid.velocity.x > 0) {
                                grid.velocity.x++;
                            }
                            else
                                grid.velocity.x--;
                        }
                        player.score += 50
                    }
                })
                if (enemyProjectiles.length < 5 && Math.floor(Math.random() * 100000) + 1 > 99555) {
                    enemyProjectiles.push(new EnemyProjectile({
                        position: {
                            x: invader.position.x + invader.width / 2,
                            y: invader.position.y + 50
                        },
                        velocity: {
                            x: 0,
                            y: 7
                        }
                    }))
                }
                invader.update({ velocity: grid.velocity })
            })
        })

        enemyProjectiles.forEach((enemyProjectile, index) => {
            if (enemyProjectile.position.x > player.position.x && enemyProjectile.position.x < player.position.x + player.width && enemyProjectile.position.y > player.position.y && enemyProjectile.position.y < player.position.y + player.height) {
                player.lives--;
                enemyProjectiles.splice(index, 1)
            }
        })

        if (keys.a.pressed && player.position.x >= 0) {
            player.velocity.x = -speed
        } else if (keys.d.pressed && player.position.x + player.width < canvas.width) {
            player.velocity.x = speed
        } else {
            player.velocity.x = 0
        }

        if (frames % 1000 === 0) {
            grids.push(new Grid())
        }
    }
    frames++
    c.font = "30px Arial";
    c.fillStyle = "white"
    c.fillText("Lives: " + player.lives, 10, 50)
    c.fillText("Score: " + player.score, 250, 50)
    if (player.lives === 0) {
        c.font = "150px Arial";
        c.fillStyle = "white"
        c.fillText("GAME OVER", 500, 500)
    }
    c.strokeStyle = "red"
    c.lineWidth = 1
    c.beginPath()
    c.moveTo(0, 835)
    c.lineTo(1920, 835)
    c.stroke()
}

animate()



window.addEventListener('keydown', ({ key }) => {

    switch (key) {
        case 'a':
            keys.a.pressed = true
            break;
        case 'd':
            keys.d.pressed = true
            break;
        case ' ':
            keys.space.pressed = true
            break;
    }
})

window.addEventListener('keyup', ({ key }) => {
    switch (key) {
        case 'a':
            keys.a.pressed = false
            break;
        case 'd':
            keys.d.pressed = false
            break;
        case ' ':
            keys.space.pressed = false
            projectiles.push(new Projectile({
                position: {
                    x: player.position.x + player.width / 2,
                    y: player.position.y
                },
                velocity: {
                    x: 0,
                    y: -10
                }
            }))
            break;
    }
})
<script>
import { onUnmounted } from 'vue';

	export default{
		name:"PlayerComponent",
		data(){
			return{
				mov: 3,
				quadro: null,
				directionX: 0,
				leftDistance: 0,
				idPlayer: null,
				idGame: null,
				leftDistance: 0,
				bullets: []
			}
		},
		methods:{
			start(){
				console.log("ENTRO DENTRO START");
				console.log(this.directionX);
				window.addEventListener('keydown', this.getKeyCod);
				window.addEventListener('keyup', this.resetKey);
			},
			MovePlayer() {
				let likeQuadro = document.getElementById("player");
				this.leftDistance = likeQuadro.offsetLeft;
				this.quadro = likeQuadro;
				console.log(this.directionX);
				if(this.leftDistance <= 0){
					this.leftDistance = 5;
					this.directionX = 0;
					this.quadro.style.left = this.leftDistance + "px";
					clearInterval(this.idPlayer);
				}else if((this.leftDistance + this.quadro.offsetWidth) >= (window.innerWidth-1)){
					this.directionX = 0;
					this.leftDistance = window.innerWidth - (5+this.quadro.offsetWidth);
					this.quadro.style.left = this.leftDistance + "px";
					clearInterval(this.idPlayer);
				}
				if (this.directionX > 0) {
					this.leftDistance += this.mov;
					this.quadro.style.left = this.leftDistance + "px";
				} else if (this.directionX < 0) {
					this.leftDistance -= this.mov;
					this.quadro.style.left = this.leftDistance + "px";
				}
			},
			getKeyCod(e) {
				if (e.keyCode == 39) {
					this.directionX = 1;
				} else if (e.keyCode == 37) {
					this.directionX = -1;
				} else if (e.keyCode == 32) {
					/*TODO: SPARA CON BARRA SPAZIATRICE*/
					this.shoot();
				}else{
					this.directionX = 0;	
				}
				if(this.directionX != 0){
					clearInterval(this.idPlayer);
					this.idPlayer = setInterval(this.MovePlayer,1);
				}else{
					clearInterval(this.idPlayer);
				}
			},
			resetKey() {
				this.directionX = 0;
				clearInterval(this.idPlayer);
			},
			shoot(){
				this.bullets.push(this.addElement());
				console.log(this.bullets);
			},
			addElement () { 
				// create a new div element 
				let newDiv = document.createElement("div"); 
				newDiv.className='bullet';
				console.log(this.leftDistance);
				newDiv.style.top = this.quadro.offsetTop + "px";
				newDiv.style.left = (this.leftDistance + this.quadro.offsetWidth/2) + "px";
				newDiv.style.width= "5px"; 
				newDiv.style.height= "5px"; 
				newDiv.style.backgroundColor= 'yellow'; 
				newDiv.style.borderRadius= "50%";
				newDiv.style.position="absolute";
				document.body.appendChild(newDiv);
				return newDiv;
			},
			runGame(){
				for(let i=0;i<this.bullets.length;i++){
					this.update(i);
				}
			},
			update(i){
				let bullet = this.bullets[i];
				//I'm updating the bullet's y position.
				let mov = 1;
				let y = bullet.offsetTop;
				y -= mov;
				if(y <= -20){
					this.removeElement(i);
				}
				bullet.style.top=y+"px";
				
			},
			removeElement(i){
				var div = this.bullets[i];
				let newBullets = [];
				for(let j = 0; j < this.bullets.length; j++){
					if(this.bullets[j] == div){
						continue;
					}
					newBullets.push(this.bullets[j]);
				}
				this.bullets = newBullets;
			}
		},
		created(){
			this.idGame = setInterval(this.runGame, 1);
			this.start();
			
		},
		mounted(){
			this.quadro = document.getElementById("player");
		},
		unmounted(){
			window.removeEventListener('keyup',this.resetKey);
			window.removeEventListener('keydown',this.getKeyCod);
		}
	}
</script>

<template>
    <div id="player" class="ship"></div>
</template>

<style>
.ship {
	background-color: rgb(0, 255, 0);
	position: absolute;
	top:90%; 
	bottom:0%; 
	right:50%;
	width: 60px; 
	height: 30px;
}
.bullet {
	width: 5px; 
	height: 5px; 
	background-color: rgb(255, 255, 0); 
	border-radius: 50%
}

</style>
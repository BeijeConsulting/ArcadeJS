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
				leftDistance: 0,
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
		},
		created(){
			this.start();
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
	top:80%; 
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
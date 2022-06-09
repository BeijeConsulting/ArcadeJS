<script>
	export default{
		name:"App",
		data(){
			return{
				mov: 5,
				quadro: document.getElementById("player"),
				pallina: document.getElementById("bullet"),
				enemy: document.getElementById("enemy"),
				directionX: 0,
				leftDistance: 0,
				tab: document.getElementById("tab"), //tab
				myVar: 0, //mettere 400
				margin: 0,
				l: window.screen.width,
				w: window.innerWidth,
				direction: 1
			}
		},
		methods:{
			start(){
				console.log("ENTRO DENTRO START");
				console.log(this.directionX);
				this.myVar = setInterval(spostaDiv, 450);
			},

			MovePlayer(directionX) {
				this.leftDistance = this.quadro.offsetLeft;
				if (this.directionX > 0) {
					this.leftDistance += this.mov;
					this.quadro.style.left = this.leftDistance + "px";
				} else if (this.directionX < 0) {
					this.leftDistance -= this.mov;
					this.quadro.style.left = this.leftDistance + "px";
				} else{
					
				}
			},
			getKeyCod() {
				key = window.event.keyCode;
				console.log('key :', key);
				console.log('top :',this.quadro.offsetTop);	
				console.log('left :',this.quadro.offsetLeft);
				//187 +
				//189 -
				//37 38 39 40
				if (key == 39) {
					this.directionX = 1;
				} else if (key == 37) {
					this.directionX = -1;
				} else if (key == 32) {
					/*TODO: SPARA CON BARRA SPAZIATRICE*/
				}
				MovePlayer(this.directionX);
			},
			resetKey() {
				this.directionX = 0;
			},
			spostaDiv() {
				if(this.direction == 1){
				if (this.margin >= this.w - this.tab.offsetWidth) {
					this.margin = (this.w - this.tab.offsetWidth - 1);
					this.direction = 0;
				} else {
					this.tab.style.marginLeft = this.margin + "px";
				}
				this.margin += 7;
				} else{
					if (this.margin <= 0) {
						this.margin = 1 ;
						this.direction = 1;
					} else {
						console.log("else",this.margin);
						this.tab.style.marginLeft = this.margin + "px";
						}
						this.margin -= 7;
				}
			}
		}
	}
</script>

<template>
<div v-on:keydown="getKeyCode();" v-on:keyup="resetKey();">
	<div id="tab" class="divTable">
				<div class="headRow">
					<div class="divCell" align="center">
						<div id="enemy" class="enemy"></div>
					</div>
					<div class="divCell" align="center">
						<div id="enemy" class="enemy"></div>
					</div>
					<div class="divCell" align="center">
						<div id="enemy" class="enemy"></div>
					</div>
					<div class="divCell" align="center">
						<div id="enemy" class="enemy"></div>
					</div>
					<div class="divCell" align="center">
						<div id="enemy" class="enemy"></div>
					</div>
					<div class="divCell" align="center">
						<div id="enemy" class="enemy"></div>
					</div>
				</div>
				<div class="divRow">
					<div class="divCell" align="center">
						<div id="enemy" class="enemy"></div>
					</div>
					<div class="divCell" align="center">
						<div id="enemy" class="enemy"></div>
					</div>
					<div class="divCell" align="center">
						<div id="enemy" class="enemy"></div>
					</div>
					<div class="divCell" align="center">
						<div id="enemy" class="enemy"></div>
					</div>
					<div class="divCell" align="center">
						<div id="enemy" class="enemy"></div>
					</div>
					<div class="divCell" align="center">
						<div id="enemy" class="enemy"></div>
					</div>
				</div>
				<div class="divRow">
					<div class="divCell" align="center">
						<div id="enemy" class="enemy"></div>
					</div>
					<div class="divCell" align="center">
						<div id="enemy" class="enemy"></div>
					</div>
						<div class="divCell" align="center"><div id="enemy" class="enemy"></div>
					</div>
					<div class="divCell" align="center">
						<div id="enemy" class="enemy"></div>
					</div>
					<div class="divCell" align="center">
						<div id="enemy" class="enemy"></div>
					</div>
					<div class="divCell" align="center">
						<div id="enemy" class="enemy"></div>
					</div>
				</div>
				<div class="divRow">
					<div class="divCell" align="center">
						<div id="enemy" class="enemy"></div>
					</div>
						<div class="divCell" align="center"><div id="enemy" class="enemy"></div>
					</div>
					<div class="divCell" align="center">
						<div id="enemy" class="enemy"></div>
					</div>
					<div class="divCell" align="center">
						<div id="enemy" class="enemy"></div>
					</div>
					<div class="divCell" align="center">
						<div id="enemy" class="enemy"></div>
					</div>
					<div class="divCell" align="center">
						<div id="enemy" class="enemy"></div>
					</div>
				</div>
	</div>

	<div id="player" class="ship" ></div>
	<div id="bullet" class="bullet"></div>
</div>

</template>

<style>
body{
	margin: 0 0 0 0;
	background-color: rgb(0, 00, 0);
}
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
.enemy {
	background-color: rgb(255, 0, 0);
	width: 35px; 
	height: 35px;
	border-radius: 50%;
}

.divTable{
	display:table;
	border-spacing:20px;
	width: 550px;
}

.divRow{
	display:table-row;
	width:auto;
}

.divCell{
	float:left;/*fix for  buggy browsers*/
	display:table-column;
	width:85px;
}
</style>

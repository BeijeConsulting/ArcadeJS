<script>
	export default{
		name:"PlayerComponent",
		data(){
			return{
				gameover: false,
				winner: false,
				//PLAYER
				mov: 3,
				quadro: null,
				directionX: 0,
				leftDistance: 0,
				idPlayer: null,
				idGame: null,
				leftDistance: 0,
				bullets: [],
				lives: 3,
				score: 0,
				//ENEMY
				enemy: [],
				enemyBullets: [],
				tab: null, //tab
				myVar: 0, //mettere 400
				margin: 0,
				actualHeight: 0,
				l: window.innerHeight,
				w: window.innerWidth,
				direction: 1,
				x: 0,
				y: 0,
			}
		},
		components(){

		},
		methods:{
			start(){
				console.log("Inizializzo PlayerComponent");
				window.addEventListener('keydown', this.getKeyCod);
				window.addEventListener('keyup', this.resetKey);
				this.myVar = setInterval(this.spostaDiv, 400);
				setInterval(this.shootEnemy,400);
			},
			MovePlayer() {
				let likeQuadro = document.getElementById("player");
				this.leftDistance = likeQuadro.offsetLeft;
				this.quadro = likeQuadro;
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
				}
				if (e.keyCode == 32) {
					/*TODO: SPARA CON BARRA SPAZIATRICE*/
					if(this.bullets.length <= 5){
						this.shoot();
					}
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
			},
			addElement () { 
				// create a new div element 
				let newDiv = document.createElement("div"); 
				newDiv.className='bullet';
				newDiv.id='bullet';
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
				for(let i = 0; i < this.enemyBullets.length; i++){
					this.updateEnemyBullet(i);
				}
			},
			update(i){
				let bullet = this.bullets[i];
				//I'm updating the bullet's y position.
				let speed = 2;
				let y = bullet.offsetTop;
				y -= speed;
				if(this.checkCollision(i,this.enemy)){
					this.removeBullet(this.bullets,i);
				}
				if(y <= 0){
					this.removeBullet(this.bullets,i);
				}
				bullet.style.top=y+"px";
				
			},
			removeBullet(elements,i){
				var div = elements[i];
				
				let newBullets = [];
				for(let j = 0; j < elements.length; j++){
					if(elements[j] == div){
						continue;
					}
					newBullets.push(elements[j]);
				}
				this.bullets = newBullets;
				div.parentNode.removeChild(div);
			},spostaDiv() {
				this.enemy = document.getElementsByClassName("enemy");
				if(this.enemy.length == 0){
					this.winner = true;
					clearInterval(this.idGame);
					clearInterval(this.idPlayer);
					return;
				}
				if(this.checkDefeat()){
					this.gameover = true;
					clearInterval(this.idGame);
					clearInterval(this.idPlayer);
					return;
				}
				if(this.direction == 1){
				if (this.margin >= window.innerWidth - this.tab.offsetWidth) {
					this.margin = (window.innerWidth - this.tab.offsetWidth - 1);
					this.direction = 0;
					this.actualHeight += window.innerHeight/10;
					this.tab.style.marginTop = this.actualHeight + "px";
				} else {
					this.margin += 7;
					this.tab.style.marginLeft = this.margin + "px";
				}
				} else{
					if (this.margin <= 0) {
						this.margin = 1 ;
						this.direction = 1;
						this.actualHeight += window.innerHeight/10;
						this.tab.style.marginTop = this.actualHeight + "px";
					} else {
						this.margin -= 7;
						this.tab.style.marginLeft = this.margin + "px";
					}
					
				}
			},checkCollision(bulletI, targetList) {
				var bullet = this.bullets[bulletI];
				var circle={x:bullet.offsetLeft,y:bullet.offsetTop,r:bullet.offsetWidth/2};
				for(var i = 0; i < targetList.length; i++){
					var rect={x:targetList[i].offsetLeft,y:targetList[i].offsetTop,w:targetList[i].offsetWidth,h:targetList[i].offsetHeight};
					var distX = Math.abs(circle.x - rect.x-rect.w/2);
					var distY = Math.abs(circle.y - rect.y-rect.h/2);
					
					if (distX > (rect.w/2 + circle.r)) { continue; }
					if (distY > (rect.h/2 + circle.r)) { continue; }
					if (distX <= (rect.w/2)) {
						this.removeEnemy(targetList[i].id);
						this.score += 50;
						return true; 
					} 
					if (distY <= (rect.h/2)) {
						this.removeEnemy(targetList[i].id); 
						this.score += 250;
						return true; 
					}
				}
				return false;
			},removeEnemy(enemyId){
				let div = document.getElementById(enemyId);
				let newEnemy = [];
				for(let j = 0; j < this.enemy.length; j++){
					if(this.enemy[j] == div){
						continue;
					}
					newEnemy.push(this.enemy[j]);
				}
				this.enemy = newEnemy;
				div.parentNode.removeChild(div);
			},checkDefeat(){
				for(let i = 0; i < this.enemy.length; i++){
					if((this.enemy[i].offsetTop+this.enemy[i].offsetWidth) >= this.quadro.offsetTop)
						return true;
				}
				return false;
			},addEnemyBullet(enemyId){
				let newDiv = document.createElement("div");
				let enemyCopy = document.getElementById(this.enemy[enemyId].id);
				newDiv.className='bulletEnemy';
				newDiv.id='bulletEnemy';
				newDiv.if = "!this.gameover";
				newDiv.style.top = enemyCopy.offsetTop + "px";
				newDiv.style.left = (enemyCopy.offsetLeft + enemyCopy.offsetWidth/2) + "px";
				newDiv.style.width= "5px"; 
				newDiv.style.height= "5px"; 
				newDiv.style.backgroundColor= 'orange'; 
				newDiv.style.borderRadius= "50%";
				newDiv.style.position="absolute";
				document.body.appendChild(newDiv);
				return newDiv;
			},removeEnemyBullet(elements,i){
				var div = elements[i];
				let newBullets = [];
				for(let j = 0; j < elements.length; j++){
					if(elements[j] == div){
						continue;
					}
					newBullets.push(elements[j]);
				}
				this.enemyBullets = newBullets;
				div.parentNode.removeChild(div);
			},updateEnemyBullet(i){
				let bullet = this.enemyBullets[i];
				//I'm updating the bullet's y position.
				let speed = 2;
				let y = bullet.offsetTop;
				y += speed;
				if(this.checkCollisionEnemy(i)){
					this.removeEnemyBullet(this.enemyBullets,i);
					if(this.lives <= 0){
						this.gameover = true;
					}else{
						this.lives -= 1;
					}
				}
				if(y >= (this.quadro.offsetTop + this.quadro.offsetHeight)){
					this.removeEnemyBullet(this.enemyBullets,i);
				}
				bullet.style.top=y+"px";
			},
			shootEnemy(){
				let enemyIndex = Math.floor(Math.random() * (this.enemy.length - 0 + 1) + 0);
				if(this.enemyBullets.length <= 5 && enemyIndex < this.enemy.length){
					this.enemyBullets.push(this.addEnemyBullet(enemyIndex));
				}
			},checkCollisionEnemy(bulletI) {
				var bullet = this.enemyBullets[bulletI];
				var circle={x:bullet.offsetLeft,y:bullet.offsetTop,r:bullet.offsetWidth/2};
				var rect={x:this.quadro.offsetLeft,y:this.quadro.offsetTop,w:this.quadro.offsetWidth,h:this.quadro.offsetHeight};
				var distX = Math.abs(circle.x - rect.x-rect.w/2);
				var distY = Math.abs(circle.y - rect.y-rect.h/2);
					
				if (distX > (rect.w/2 + circle.r)) { return false; }
				if (distY > (rect.h/2 + circle.r)) { return false; }
				if (distX <= (rect.w/2)) {
					//Inserire cosa fare se si viene colpiti da un proiettile
					return true; 
				} 
				if (distY <= (rect.h/2)) {
					return true; 
				}
				
			},restartGame(){
				window.location.reload();
			},cleanAll(){
				for(let i = 0; i < this.enemyBullets.length; i++){
					this.removeEnemyBullet(this.enemyBullets,i);
				}
				for(let i = 0; i < this.bullets.length; i++){
					this.removeBullet(this.bullets, i);
				}
				window.removeEventListener('keyup',this.resetKey);
				window.removeEventListener('keydown',this.getKeyCod);
				clearInterval(this.idGame);
				clearInterval(this.idPlayer);
			}
		},
		created(){
			this.idGame = setInterval(this.runGame, 1);
			this.start();
			
		},updated(){
			clearInterval(this.idGame);
			this.idGame = setInterval(this.runGame, 1);
		},
		mounted(){
			this.quadro = document.getElementById("player");
			this.enemy = document.getElementsByClassName("enemy");
			this.tab = document.getElementById("tab");
		},
		unmounted(){
			window.removeEventListener('keyup',this.resetKey);
			window.removeEventListener('keydown',this.getKeyCod);
			clearInterval(this.idGame);
			clearInterval(this.idPlayer);
		}
	}
</script>

<template>
	<div>
		<b v-if="!this.gameover && !this.winner" style="background-color: green; position: fixed; top:0%; left: 1%;">
			<img src="../assets/space-ship-3-icon.png" class = "enemyIcon"/> Lives: {{this.lives}}
		</b>
		<b v-if="!this.gameover && !this.winner" style="background-color: green; position: fixed; top:0%; right: 1%;">
			<img src="../assets/space-invader-icon.png" class = "enemyIcon"/> Score: {{this.score}}
		</b>
		<div v-if="!this.gameover && !this.winner" id="tab" class="divTable">
			<div class="divRow" v-for="(x,i) in 4" :key="i">
				<div class="divCell" align="center" v-for="(y,j) in 11" :key="j">
					<div :id="11*i+j" class="enemy">
						<img src="../assets/space-invader-icon.png" class = "enemySprite"/>
					</div>
				</div>
			</div>
		</div>
		<div  v-if="!this.gameover && !this.winner" id="player" class="ship">
			<img src="../assets/space-ship-3-icon.png" class = "shipSprite"/>
		</div>
		<b v-if="this.gameover" style="background-color: red; position: absolute;" v>
			{{this.cleanAll()}}
			GAMEOVER!<br/>
			Score: {{this.score}}<br/>
			<button @click="restartGame()">Restart</button>
		</b>
		<b v-if="!this.gameover && this.winner" style="background-color: lightblue; position: absolute;">
			{{this.cleanAll()}}
			YOU WIN!<br/>
			Score: {{this.score}}<br/>
			<button @click="restartGame()">Restart</button>
		</b>
	</div>
    
</template>

<style>

.ship {
	position: absolute;
	top:90%; 
	right:50%;
	width: 60px; 
	height: 30px;
}
.shipSprite {
	width: 65px; 
	height: 35px;
}
.bullet {
	width: 5px; 
	height: 5px; 
	background-color: rgb(255, 255, 0); 
	border-radius: 50%;
}

.enemy {
	
	width: 35px; 
	height: 35px;
	border-radius: 50%;
}
.enemySprite {
	
	width: 40px; 
	height: 40px;
}
.enemyIcon {
	
	width: 20px; 
	height: 20px;
}

.divTable{
	display:table;
	border-spacing:20px;
	width: 980px;
}

.divRow{
	display:table-row;
	width:auto;
}

.divCell{
	float:left;/*fix for  buggy browsers*/
	display:table-column;
	width:85px;
	height: 35px;
}

.bulletEnemy {
	width: 5px; 
	height: 5px;
	background-color: rgb(255, 111, 0); 
	border-radius: 50%;
}

</style>
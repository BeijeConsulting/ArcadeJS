<script>
	export default{
		name:"EnemyComponent",
		data(){
			return{
				enemy: [],
				tab: null, //tab
				myVar: 0, //mettere 400
				margin: 0,
				actualHeight: 0,
				l: window.innerHeight,
				w: window.innerWidth,
				direction: 1,
			}
		},
		methods:{
			start(){
				console.log("ENTRO DENTRO START");
				this.myVar = setInterval(this.spostaDiv, 450);
			},
			spostaDiv() {
				if(this.direction == 1){
				if (this.margin >= this.w - this.tab.offsetWidth) {
					this.margin = (this.w - this.tab.offsetWidth - 1);
					this.direction = 0;
					this.actualHeight += 35;
					this.tab.style.marginTop = this.actualHeight + "px";
				} else {
					this.tab.style.marginLeft = this.margin + "px";
				}
				this.margin += 7;
				} else{
					if (this.margin <= 0) {
						this.margin = 1 ;
						this.direction = 1;
						this.actualHeight += 35;
						this.tab.style.marginTop = this.actualHeight + "px";
					} else {
						this.tab.style.marginLeft = this.margin + "px";
						}
						this.margin -= 7;
				}
			}
		},mounted(){
			this.enemy = document.getElementsByClassName("enemy");
			this.tab = document.getElementById("tab");
			console.log(this.tab);
			console.log(this.enemy);
		},created(){
			this.start();
		}
	}
</script>

<template>
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

</template>

<style>

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
}.bullet {
	width: 5px; 
	height: 5px; 
	background-color: rgb(255, 111, 0); 
	border-radius: 50%
}
</style>
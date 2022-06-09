<script>
import PlayerComponent from "./components/PlayerComponent.vue";
import EnemyComponent from "./components/EnemyComponent.vue";
	export default{
		name:"App",
		data(){
			return{
				pallina: null,
				started: false,
			}
		},
		methods:{
			start(){
				console.log("ENTRO DENTRO START");
				this.started = true;
				this.pallina = document.getElementById("bullet");
				console.log(this.pallina);
			}
		},
		components:{
			PlayerComponent,
			EnemyComponent,
		}
	}
</script>

<template>
<div>
	<EnemyComponent  v-if="this.started"></EnemyComponent>
	<PlayerComponent v-if="this.started"></PlayerComponent> 
	<!--<div id="bullet" class="bullet"></div>-->
	<button v-if="!this.started" @click="start()">START</button>
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

<script>
import PlayerComponent from "./components/PlayerComponent.vue";
	export default{
		name:"App",
		data(){
			return{
				pallina: null,
				started: false,
			}
		},
		methods:{
			init(){
				console.log("Init() App");
				this.started = true;
				this.pallina = document.getElementById("bullet");
			}
		},
		components:{
			PlayerComponent,
		}
	}
</script>

<template>
<div>
	<PlayerComponent v-if="this.started"></PlayerComponent> 
	<!--<div id="bullet" class="bullet"></div>-->
	<button v-if="!this.started" @click="init()">START</button>
</div>

</template>

<style>
body{
	margin: 0 0 0 0;
	background-color: rgb(0, 00, 0);
}
</style>

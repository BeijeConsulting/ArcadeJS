

<template>
  <div id="q" class="quadro"></div>
</template>



<style>
.quadro {
  background-color: #00ff00;
  margin: 20px;
  width: 20px;
  height: 20px;
}
</style>

<script>
export default {
  name: "Alien"
  
//   mounted() {
//     this.moveAlienMove();
//   },

//   methods: {
//     moveAlienMove() {
//       const rows = document.getElementsByClassName("polli");
//       let moveRight = true;
//       let leftDistance = 0;
//       let bottomDistance = 0;

//       console.log(moveRight);
//       setInterval(() => {
//         for (const row of rows) {
//           if (moveRight) {
//             if (leftDistance + 5 <= 100) {
//               leftDistance += 5;
//               row.style.left = leftDistance + "px";
//             } else {
//               moveRight = false;
//               bottomDistance += 40;
//               row.style.top = bottomDistance + "px";
//             }
//           } else if (!moveRight) {
//             if (leftDistance + 5 >= 0) {
//               leftDistance -= 5;
//               row.style.left = leftDistance + "px";
//             } else {
//               moveRight = true;
//               bottomDistance += 40;
//               row.style.top = bottomDistance + "px";
//             }
//           }
//         }

//         console.log("E' passato un secondo da quando mi hai chiamato");
//       }, 1000);
    // },
//   },
}
</script>

<script setup>
import { storage } from "../store/index.js";
storage.delete('todos');
storage.delete('listaPokemons');
storage.set('detall', false);
</script>
<template>
  <section class="home">
    <img src="../assets/img/Daco_4740279.png"  alt="">

  </section>
</template>
<style scoped>
img{
    display: block;
    position: relative;
    width: 25vw;
    height: auto;
}
.home {
  display: flex;
  flex-wrap: wrap;
  align-items: space-between;
  justify-content: center;
  width: 90vw;
  height: auto;
  margin: 0 auto;
  margin-top: 5rem;
  margin-bottom: 1rem;
  z-index: 0;
}
</style>
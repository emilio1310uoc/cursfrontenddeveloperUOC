<script setup>
import tiposPoke from "../components/TheTipus.vue";
import statsPoke from "../components/TheStat.vue";
import { onMounted } from "vue";
import {storage} from "../store/index.js"
// const props = defineProps(["info"]);
const props = defineProps({
  info: {
    type: Object,
    required: true,
  },
});

onMounted(()=>{
  storage.set('detall',true);

})
</script>
<template >
  <div class="contenidor_detalls">
    <div class="card-detall" :id="info.id">
      <div class="cont-detall">
        <section class="nombre">
          <div>
            <p class="pk_id">{{ props.info.id }}</p>
            <p class="pk_name">{{ props.info.name }}</p>
          </div>
        </section>
        <section class="imagenes">
          <img class="pk_img" :src="info.imageFront" />
          <img class="pk_img2" :src="info.imageBack" />
        </section>
        <section class="tipus">
          <tiposPoke v-for="tipo in info.tipus" :key="tipo" :tipo="tipo" />
        </section>
        <section class="stats">
          <statsPoke v-for="stat in info.stats" :key="stat" :stat="stat" />
        </section>
      </div>
    </div>
  </div>
</template>
<style scoped>
/* Estilos CARDS */
/*----------------------------------------------------------------*/
.contenidor_detalls{
  display: flex;
  flex-wrap: wrap;
  align-items: space-between;
  justify-content: center;
  min-height: 100vh;
  width: auto;
  height: auto;
  margin: 0 auto;
  z-index: 0;
}
.card-detall {
  display: flex;
  position: relative;
  top: 5rem;
  left: 15%;
  justify-content: center;
  align-items: center;
  height: 620px;
  width: 300px;
  background: linear-gradient(var(--cab-color), var(--color-fondo));
  border-radius: 8px;
}
.cont-detall {
  display: flex;
  flex-direction: column;
  height: 88%;
  width: 88%;
  border-radius: 16px;
}
.cont-detall > .nombre {
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 10%;
  background: linear-gradient(#38342f, #06065a 75%);
}

.cont-detall > .nombre div > p:first-child {
  display: inline-block;
  font-size: 50%;
}

.cont-detall > .nombre div > p:last-child {
  display: inline-block;
  font-weight: bold;
  font-size: 100%;
}
.cont-detall > .imagenes {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  margin-top: 15px;
  margin-bottom: 15px;
  height: 35%;
  width: 100%;
}
.cont-detall > .imagenes img {
  display: inline-block;
  width: 50%;
  height: auto;
  object-fit: cover;
  overflow: hidden;
  z-index: 15;
}

.tipus {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding-left: 30px;
  padding-right: 30px;
  margin-bottom: 15px;
  background: linear-gradient(#38342f, #06065a 75%);
}

.stats {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 100%;
  align-items: center;
  background: linear-gradient(#38342f, #06065a 75%);
  padding-bottom: 15px;
  padding-top: 10px;

  margin-bottom: 15px;
}
.cont-detall > .utilitats:before {
  content: " ";
  display: block;
  width: 100%;
  height: 2px;
  margin: 10px 0 10px 0;
  align-items: center;
  background: var(--color-sombra-cards);
}
.opcions-d {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
  padding-left: 25%;
  padding-right: 25%;
}
.opcions-d a {
  position: relative;
  text-decoration: none;
  color: inherit;
}

.opcions-d a img {
  width: 24px;
  fill: currentColor;
}

.tooltips {
  background: #262626;
  display: block;
  position: absolute;
  bottom: 0;
  left: 50%;
  padding: 0.5rem 0.4rem;
  border-radius: 5px;
  font-size: 0.8rem;
  font-weight: 600;
  opacity: 0;
  pointer-events: none;
  transform: translate(-50%, -90%);
  transition: all 0.2s ease;
  z-index: 1;
}

.tooltips:after {
  content: " ";
  position: absolute;
  bottom: 1px;
  left: 50%;
  border: solid;
  border-width: 10px 10px 0 10px;
  border-color: transparent;
  transform: translate(-50%, 100%);
}

.opcions a .tooltips:after {
  border-top-color: #262626;
}

.opcions a:hover .tooltips {
  opacity: 1;
  transform: translate(-50%, -130%);
}
</style>
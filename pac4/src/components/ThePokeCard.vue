<script setup>
import { ref, onMounted, computed } from "vue";
import pokeAPI from "../services/services.js";
import {storage} from "../store/index.js"
const props = defineProps(["info"]);
let poke = ref({});

onMounted(async () => {

  let response = await pokeAPI.getSinglePokemon(props.info.pokemon.name);
  if (!response) {
    alert("Porblemas de la API detalls");
    return;
  } else {
    poke.value  = construirDatsPokemon(response.data);
    storage.set('detall',false);
  }
});

function construirDatsPokemon(elPoke) {
  let tipos = [];
  elPoke.types.map(function (type) {
    let tipo = {
      tipo: type.type.name,
    };
    tipos.push(tipo);
  });
  let elPk = {
      id: elPoke.id,
      name: elPoke.name,
      imageFront: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${elPoke.id}.png`,
      imageBack: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/shiny/${elPoke.id}.png`,
      atac: elPoke.stats[1].base_stat,
      defensa: elPoke.stats[2].base_stat,
      tipus: tipos,
      stats: elPoke.stats,
      types: elPoke.types,
  };
  return elPk;
}
</script>
<template>
  <div class="card-pk" :id="poke.id" >
    <div class="card_img">
      <img class="pk_img" :src="poke.imageFront" />
    </div>
    <p class="pk_name">{{ poke.name }}</p>
    <span class="pk_id"></span>
    <div class="opcions">
      <a href="">
      <router-link :to="{ name: 'detall', params: { elpokemon: JSON.stringify(poke) }}">
        <img src="../../src/assets/img/icons8-report-50.png" alt="detalls" />
        <span class="tooltips">Detalls</span>
      </router-link>
    </a>
    </div>
  </div>
</template>
<style scoped>
/* Estilos CARDS */
/*----------------------------------------------------------------*/
.card-pk {
  background: var(--color-cards);
  margin: 10px;
  margin-top: 40px;
  width: 13rem;
  padding-left: 20px;
  padding-right: 20px;
  padding-bottom: 10px;
  border: 4px solid var(--color-border);
  box-shadow: 0 6px 10px var(--color-sombra-cards);
  border-radius: 10px;
  text-align: center;
  color: var(--color-fuente);
  transition: all 0.3s ease;
  z-index: 0;
}
.resaltar {
  border-color: red;
}

.pk_img {
  display: inline-block;
  width: 100%;
  height: 100%;
  object-fit: cover;
  z-index: 15;
}
.pk_img2 {
  display: inline-block;
  width: 100%;
  height: 100%;
  object-fit: cover;
  z-index: 15;
}
.card-pk .pk_name {
  display: inline-block;
  margin: 0;
  font-weight: 200;
  font-size: 18px;
  padding-right: 10px;
}
.card-pk .pk_id {
  display: inline-block;
  font-family: sans-serif;
  font-style: italic;
  font-size: 10px;
  padding-left: 10px;
}

.pk_img:hover {
  transform: scale(1.5, 1.5);
}
.pk_img2:hover {
  transform: scale(1.5, 1.5);
}

.opcions:before {
  content: " ";
  display: block;
  width: 100%;
  height: 2px;
  margin: 20px 0;
  background: var(--color-sombra-cards);
}
.opcions a {
  position: relative;
  margin-right: 15px;
  text-decoration: none;
  color: inherit;
}
.opcions a:last-child {
  margin-right: 0;
}

.opcions a img {
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

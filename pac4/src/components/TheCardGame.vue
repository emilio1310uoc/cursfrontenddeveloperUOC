<script setup>
import { ref, onMounted, computed } from "vue";
import pokeAPI from "../services/services.js";
import { storage } from "../store/index.js";

const props = defineProps(["info"]);
let poke = ref({});

const numeroLuchadores = ref(0);
const emit = defineEmits(["response"]);
const activar = ref("Ninguno")
const show = ref(true)

onMounted(async () => {
  let response = await pokeAPI.getSinglePokemon(props.info.pokemon.name);
  if (!response) {
    alert("Porblemas de la API detalls");
    return;
  } else {
    poke.value = construirDatsPokemon(response.data);
    storage.set("detall", false);
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
const crearLuchador = () => {
  activar.value = poke.value.name
  show.value = !show.value 
  numeroLuchadores.value++;
  emit("response", poke);
};
</script>
<template>
  <div class="card-pk" :id="poke.id" ref="wrapper">
    <div class="card_img">
      <button @click="crearLuchador" >
        <img v-if="show"
          class="pk_img_carta" 
          src="../assets/img/CardBack.jpg"
          alt="Carta"
        />
      </button>
      <img  v-if="!show && activar === poke.name" class="pk_img" :src="poke.imageFront" />
      <p class="pk_name" v-if="!show && activar === poke.name">{{ poke.name }}</p>
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
  width: 7rem;
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

.pk_img {
  display: inline-block;
  width: 100%;
  height: 100%;
  object-fit: cover;
  z-index: 15;
}
.pk_img_carta {
  display: inline-block;
  margin-top: 1rem;
  width: 100%;
  height: 100%;
  z-index: 15;
}
.card-pk .pk_name {
  display: inline-block;
  margin: 0;
  font-weight: 200;
  font-size: 18px;
  padding-right: 10px;
}
</style>
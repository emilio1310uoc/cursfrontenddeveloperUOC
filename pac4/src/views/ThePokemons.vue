<script setup>
import PokeCard from "../components/ThePokeCard.vue";
import pokeAPI from "../services/services.js";
import { storage } from "../store/index.js";
import { ref, onMounted, computed } from "vue";
const props = defineProps({
  npk: {
    type: Number,
    required: true,
  },
  dl: {
    type: Boolean,
    required: true,
  },
});
let todosPokemons = ref([]);
 
onMounted(async () => {
  let response = await pokeAPI.getPokemons();
  if (!response) {
    alert("Porblemas de la API total");
    return;
  } else {
    todosPokemons.value = response.data.results;
    storage.set("todos", todosPokemons.value);
  }
});

function createListAleatori(cuantos, tot) {
  let num = 0;
  let n = 1;
  let lisP = [];
  while (n <= cuantos) {
    num = Math.floor(Math.random() * tot + 1);
    lisP.push(num);
    n++;
  }
  return lisP;
}
const getListaPokemons = computed(() => {
  let elsPk = storage.get("listaPokemons");
  const detall = storage.get("detall");
  if (!detall) {
    let lsIndexPk = [];
    elsPk = [];
    if (todosPokemons.value) {
      lsIndexPk = createListAleatori(props.npk, todosPokemons.value.length);
      let i = 0;
      while (i < lsIndexPk.length) {
        let elPk = {
          pokemon: {
            idt: lsIndexPk[i],
            name: todosPokemons.value[lsIndexPk[i]].name,
            url: todosPokemons.value[lsIndexPk[i]].url,
          },
        };
        elsPk.push(elPk);
        i = i + 1;
      }
    }
    storage.set("listaPokemons", elsPk);

    return elsPk;
  }
  return elsPk;
});
</script>

<template>
  <secction  id="pokeLayout" v-if="todosPokemons.length" >
    <PokeCard
      v-for="pokemon in getListaPokemons"
      :key="pokemon.name"
      :info="pokemon"
    />
  </secction>
</template>
<style scoped>
#pokeLayout {
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
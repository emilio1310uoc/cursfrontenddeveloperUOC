<script setup>
import CardGame from "../components/TheCardGame.vue";
import CardBattle from "../views/ThePokeCardDetallGame.vue";
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
const luchar = ref(false);
const numeroLuchadores = ref(0);
const namesLuchadores = ref([]);
const jsonLuchadores = ref([]);
const ganador = ref('');

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

const actualizarValores = (elJson) => {
  numeroLuchadores.value++;
  namesLuchadores.value.push(elJson.value.name);
  jsonLuchadores.value.push(elJson.value);
  if (numeroLuchadores.value > 1) {
    let maxAtac = 0;
    let maxDefensa =0;
    let masDefensa = ""
    let masFuerte= "";
     
    for (let luchador of jsonLuchadores.value){
        if (luchador.atac>maxAtac){
          maxAtac=luchador.atac;
          masFuerte=luchador.name;
        }
        if (luchador.defensa>maxDefensa){
          maxDefensa=luchador.defensa;
          masDefensa=luchador.name;
        }
    }
    if (maxAtac>maxDefensa){
      ganador.value = masFuerte
    } else{
      ganador.value = masDefensa
    }
    console.log(ganador.value);
  }
};


</script>

<template>
  <secction :key="bolagame"  v-if="todosPokemons.length">
    <div class="pokeLayout" v-if="!luchar">
      <CardGame  
        v-for="pokemon in getListaPokemons"
        :key="pokemon.name"
        :info="pokemon"
        @response="actualizarValores"
        
      />
      <botton
        class="battle"
        @click="luchar = !luchar"
        v-if="numeroLuchadores > 1"
      >
        <img
          src="../assets/img/icons8-lucha-96.png"
          alt="logo"
          width="50"
          height="50"
        />
      </botton>
    </div>
    <div class="info-totals" v-if="luchar">
      <p>El guanyador és: <span class="totals">{{ganador.toUpperCase()}}</span></p>
    </div>

    <div class="pokeLayout" v-if="luchar">
      <CardBattle
        v-for="pokemon in jsonLuchadores"
        :key="pokemon.name"
        :info="pokemon"
      />
    </div>
  </secction>
</template>
<style scoped>
.pokeLayout {
  display: flex;
  flex-wrap: wrap;
  align-items: space-between;
  justify-content: center;
  width: 90vw;
    
  height: auto;
  margin: 0 auto;
  margin-top: 5rem;
  margin-bottom: 3rem;
  z-index: 0;
}
.battle {
  position: fixed;
  top: 70px;
  left: 0;
  display: flex;
  justify-content: left;
  align-items: top;
  padding: 10px;
  width: 50px;
  padding-left: 1rem;
  z-index: 2;
}
.info-totals {
  background-color: var(--cab-color);
  position: fixed;
  top: 75px;
  left: 6rem;
  bottom: 0;
  width: 50%;
  height: 50px;
  display: inline-block;
  overflow: auto;
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 1);
  border-radius: 1.3em;
  border-color: var(--color-border);
  border-width: 3px;
  padding-left: 20px;
  z-index:200;
  transition: 0.5s ease;
}
.totals{
  font-size: 15px;
  font-weight: bold;
  color: var(--color-fuente-pk);
    
}
</style>
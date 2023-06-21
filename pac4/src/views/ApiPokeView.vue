<script setup>

// import {ref, onMounted } from 'vue' //, computed

// import PokeCard from '../components/ThePokeCard.vue'
// import pokeAPI from '../services/services.js'



// const pokemons = ref([])
// const search = ref("")


// onMounted(() => {
//   pokeAPI.getPokemons().then( (response) => {
//     console.log(response.data)
//     pokemons.value = response.data; 
//   })
// })

// const filteredPhotos = computed(() => {
//   return photos.value.filter( (photo) => {
//     // return photo.title.toLowerCase().includes( search.value.toLowerCase() )
//     return photo.title.toLowerCase().startsWith( search.value.toLowerCase() )
//   })
// })


</script>

<template>
  <div class="new">
    <h1>API example</h1>

    <!-- <input v-model="search" type="text" placeholder="type to search...">
    <br>
    <section class="cards">
      <PokeCard v-for="Poke in filteredPhotos" :key="photo.id" :info="photo" />
    </section> -->
  </div>
</template>

<style>
.new {
  display: grid;
}
li {
  cursor: pointer;
}
li:hover {
  color: hsla(160, 100%, 37%, 1);
}
.cards {
  display: flex;
  gap: 2rem;
  max-width: 50vw;
  flex-wrap: wrap;
}
</style>

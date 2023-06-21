<script setup>
const props = defineProps({
  stat: {
    type: Object,
    required: true,
  },
});

</script>

<template>
  <div class="etiquetasEs">
    <label class="nomStat" :for="stat.name">{{ stat.stat.name }}</label>
    <label class="valueStat" for="">{{ stat.base_stat }}</label>
  </div>
  <progress class="fuerza" :id="stat.stat.name" max="150" :value="stat.base_stat">
    {{ stat.base_stat }}%
  </progress>
</template>
<style scoped>
/* Estilos CARDS */
/*----------------------------------------------------------------*/

.fuerza {
  width: 90%;
}
.etiquetasEs {
  display: block;
  width: 100%;
}
.nomStat {
  display: inline-block;
  width: 50%;
  padding-left: 10px;
  font-size: 10px;
  color: var(--cab-fuente);
}
.valueStat {
  display: inline-block;
  padding-left: 10px;
  font-size: 10px;
  color: var(--color-linea);
}


</style>
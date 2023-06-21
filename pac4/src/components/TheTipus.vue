<script setup>
const props = defineProps({
  tipo: {
    type: Object,
    required: true,
  },
});
</script>
<template>
    <p class="tipo" :id="tipo.tipo">{{tipo.tipo}}</p>
</template>
<style scoped>

.tipo {
  background-color: var(--color-fondo);
  color: var(--cab-color);
  padding: 5px;
  padding-left: 10%;
  padding-right: 10%;
  border-radius: 5px;
  font-weight: bold;
  font-size: 12px;
}

</style>
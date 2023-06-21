<script setup>
import theHeader from "@/components/TheHeader.vue";
import theFooter from "@/components/TheFooter.vue";
</script>

<template>
  <div id="page-container">
    <theHeader />
    <secction id="wordLayout" >
      <RouterView />
    </secction>
    <theFooter />
  </div>
</template>

<style scoped>
#page-container {
  position: relative;
  margin: 0 auto;
}
#wordLayout {
  display:relative;
  margin: 0 auto;
}
</style>

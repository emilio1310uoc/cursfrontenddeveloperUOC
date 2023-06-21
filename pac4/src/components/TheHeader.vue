<script setup>
import { RouterLink } from "vue-router";
import { ref } from "vue";
const theme = ref("dark");
const themeSel = ref(false);
const themeValue = ref(false);
const changeTheme = (e) => {
  themeValue.value = !themeValue.value;
  if (e.target.className === "bx bx-moon moon") {
    theme.value = "dark";
    document.body.className = theme.value;
  } else {
    theme.value = "light";
    document.body.className = theme.value;
  }
};

</script>
<template>
  <section class="cabecera">
    <RouterLink :to="{ name: 'home' }"
      ><img
        src="../assets/img/icons8-pokeball-48.png"
        alt="logo"
        width="50"
        height="50"
      />
    </RouterLink>
    <span class="logo">LA POKÉDEX</span>

    <nav>
      <router-link :to="{ name: 'home' }">Home</router-link>
      <router-link :to="{ name: 'pokedex', params: { npk: 10, dl: false } } "
        >Pokedex</router-link
      >
      <router-link :to="{ name: 'game', params: { npk: 6, dl: false } }"
        >Game</router-link
      >
    </nav>

    <div class="darkLight">
      Color de sistema
      <label class="switch_system">
        <input type="checkbox" id="toggle-sys" @click="themeSel = !themeSel" />
        <span class="slider round"></span>
      </label>
      <div class="dark-light" v-if="themeSel">
        <div class="bx bx-sun sun" v-if="themeValue" @click="changeTheme"></div>
        <div
          class="bx bx-moon moon"
          v-if="!themeValue"
          @click="changeTheme"
        ></div>
      </div>
    </div>
  </section>
</template>
<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Roboto&display=swap");
.cabecera {
  position: fixed;
  display: flex;
  align-items: center;
  top: 0;
  left: 0;
  height: 70px;
  width: 100%;
  background-color: var(--cab-color);
  z-index: 50;
}

.cabecera img {
  margin-left: 1rem;
}
.cabecera .logo {
  display: block;
  margin: 0px;
  margin-left: 1rem;
  padding-top: 2rem;
  padding-bottom: 2rem;
  width: 30vw;
  margin: 0;
  font-weight: bold;
  font-size: 20px;
  text-align: center;
  letter-spacing: 0.02em;
  -webkit-text-stroke: 1px var(--color-linea);
  color: var(--color-fuente-pk);
}

.cabecera .darkLight {
  display: flex;
  align-items: center;
  font-size: 10px;
}

.darkLight .dark-light {
  height: 40px;
  width: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 5px;
}

.dark-light div {
  position: absolute;
  color: var(--color-fuente);
  font-size: 22px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.switch_system {
  position: relative;
  display: inline-block;
  width: 30px;
  height: 18px;
}

.switch_system input {
  opacity: 0;
  width: 0;
  height: 0;
}

.switch_system .slider {
  position: absolute;
  cursor: pointer;
  top: 0px;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #ccc;
  -webkit-transition: 0.4s;
  transition: 0.4s;
}

.switch_system .slider:before {
  position: absolute;
  content: "";
  height: 14px;
  width: 14px;
  left: 4px;
  bottom: 2px;
  background-color: rgb(228, 228, 228);
  -webkit-transition: 0.4s;
  transition: 0.4s;
}

.switch_system input:checked + .slider {
  background-color: #2196f3;
}

.switch_system input:focus + .slider {
  box-shadow: 0 0 1px #2196f3;
}

.switch_system input:checked + .slider:before {
  -webkit-transform: translateX((8) px);
  -ms-transform: translateX(8px);
  transform: translateX(8px);
  background-color: rgb(0, 255, 0);
}

.switch_system .slider.round {
  border-radius: 20px;
}

.switch_system .slider.round:before {
  border-radius: 50%;
}

nav {
  width: 40%;
  font-size: 14px;
  text-align: center;
  color: var(--color-fuente);
  /* margin-top: 2rem; */
}

nav a.router-link-exact-active {
  color: var(--color-fuente-pk);
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a {
  display: inline-block;
  padding: 0 1rem;
  color: var(--color-fuente);
  border-left: 1px solid var(--color-border);
}

nav a:first-of-type {
  border: 0;
}
</style>

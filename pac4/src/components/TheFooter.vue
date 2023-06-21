<template>
  <footer class="peu">
    <ul>
      <li>
        <a href="https://www.twitter.com"
          ><img src="../assets/img/twitter.png" alt="twitter"
        /></a>
      </li>
      <li>
        <a href="https://www.linkedin.com"
          ><img src="../assets/img/linkedin.png" alt="linkedin"
        /></a>
      </li>
      <li>
        <a href="https://www.instagram.com"
          ><img src="../assets/img/instagram.png" alt="instagram"
        /></a>
      </li>
    </ul>
  </footer>
</template>
<style scoped>

/* Estilos PEU */
.peu {
  display: flex;
  width: 100vw;
  justify-content: center;
  align-items: center;
  background: var(--cab-color);
  color: var(--color-fuente);
}
.peu ul {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  width: 20vw;
  background: var(--cab-color);
}
.peu li {
  list-style: none;
}
.peu li a img {
  width: 35px;
  height: 35px;
}

</style>

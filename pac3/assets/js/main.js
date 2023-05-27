'use strict';
const botonAceptarCookies = document.getElementById("btn-aceptar-cookies");
const botonDenegarCookies = document.getElementById("btn-denegar-cookies");
const avisoCookies = document.getElementById("aviso-cookies");
const fondoAvisoCookies = document.getElementById("fondo-aviso-cookies");



const body = document.querySelector("body"),
modeToggle = document.querySelector(".dark-light");
const btnSystem = document.getElementById('switch_system');
const chkSystem = document.getElementById('toggle-sys');

function checkPage() {
  chkSystem.click();
  checkAceptaCookies();
  
}

function checkAceptaCookies() {
  if (!localStorage.getItem("cookies-aceptadas")) {
    avisoCookies.classList.add("activo");
    fondoAvisoCookies.classList.add("activo");
  } else {
    checkDark();
    showInicialPokemons();
  }
  botonAceptarCookies.addEventListener("click", () => {
    avisoCookies.classList.remove("activo");
    fondoAvisoCookies.classList.remove("activo");
    localStorage.setItem("cookies-aceptadas", true);
    localStorage.setItem("mode", "light-mode");
    checkDark();
    showInicialPokemons();
  });

  botonDenegarCookies.addEventListener("click", () => {
    avisoCookies.classList.remove("activo");
    fondoAvisoCookies.classList.remove("activo");
    checkDark();
    showInicialPokemons();
  });
}


const isDarkModSys = () => {
  window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
}
const runColorMode = (fn) => {
  if (!window.matchMedia) {
    return;
  }
  const query = window.matchMedia('(prefers-color-scheme: dark)');
  fn(query.matches);

  query.addEventListener('change', (event) => fn(event.matches));
}

runColorMode((isDarkModeSys) => {
  if (isDarkModeSys) {
    document.body.classList.add('dark');
  } else {
    document.body.classList.remove('dark');
  }
})

function checkDark() {
  let getMode = localStorage.getItem("mode");
  if (getMode && getMode === "dark-mode") {
    // body.classList.remove("light");
    body.classList.add("dark");
    chkSystem.click();
  }
  if (getMode && getMode === "light-mode") {
    body.classList.remove("dark");
    // body.classList.add("light");
    chkSystem.click();
  }

}

chkSystem.addEventListener("click", () => {
  if (chkSystem.cheched === true) {
    modeToggle.classList.remove("not_show");
    modeToggle.classList.add("show");    
    chkSystem.cheched = !chkSystem.cheched
  } else {
    modeToggle.classList.remove("show");
    modeToggle.classList.add("not_show");
    chkSystem.cheched = !chkSystem.cheched
  };
});

modeToggle.addEventListener("click", () => {
  modeToggle.classList.toggle("active");
  body.classList.toggle("dark");
  if (localStorage.getItem("cookies-aceptadas")) {
    if (!body.classList.contains("dark")) {
      localStorage.setItem("mode", "light-mode");
    } else {
      localStorage.setItem("mode", "dark-mode");
    }
  }
});


/*=============== SHOW MODAL CERCAR ===============*/

const modal = document.querySelector(".busquedas");
function obrirCercar() {
  modal.classList.add("show-modal");
}

function tancarCercar() {
  modal.classList.remove("show-modal");
}
/*====== ESC BUTTON TO CLOSE MODAL ======*/
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    tancarCercar();
  }
});

/*=============== SHOW MODAL INFORMACIO ===============*/

const openInfoBtn = document.getElementById("informacio");
const modalInfo = document.querySelector(".info-totals");

if (openInfoBtn && modalInfo) {

  openInfoBtn.addEventListener("click", () => {
    let elementStyle = window.getComputedStyle(modalInfo);
    let elementVisibility = elementStyle.getPropertyValue('visibility');
    if (elementVisibility === "hidden") {
      modalInfo.classList.remove("not_show");
      modalInfo.classList.add("show");
      openInfoBtn.classList.add("mostrado")
    } else {
      modalInfo.classList.remove("show");
      modalInfo.classList.add("not_show");

      openInfoBtn.classList.remove("mostrado")
    };

  });
}

const pks_number = 10;
let lsPokedex = [];
let jsonPokedex = [];
let lsPokemons = [];
let jsonPokemons = [];
let nomsPokemons = [];
let nomsPokedex = [];
let nomsPokemonsVisitados = [];
let lsPokemonsVisitados = [];
let nomsTotsPokemons = [];
let todosPokemons;
let PkEncontrados = [];

function reiniciarValores() {
  lsPokedex = [];
  jsonPokedex = [];
  lsPokemons = [];
  jsonPokemons = [];
  nomsPokemons = [];
  nomsPokedex = [];
  nomsPokemonsVisitados = [];
  lsPokemonsVisitados = [];

  if (localStorage.getItem("cookies-aceptadas")) {
    localStorage.removeItem("totalsPokemons");
    localStorage.removeItem("listaPokedex");
    localStorage.removeItem("listaPokemons");
    localStorage.removeItem("listaPokemonsVisitados");
    localStorage.removeItem("nomsPokemonsVisitados");
    localStorage.removeItem("nomsPokemonsEnPantalla");
    localStorage.removeItem("nomsPokemonsEnPokedex");
  }
}
function actualizarLocalStorage() {
  if (localStorage.getItem("cookies-aceptadas")) {
    localStorage.setItem("totalsPokemons", todosPokemons.count);
    localStorage.setItem("listaPokedex", lsPokedex);
    localStorage.setItem("listaPokemons", lsPokemons);
    localStorage.setItem("listaPokemonsVisitados", lsPokemonsVisitados);
    localStorage.setItem("nomsPokemonsVisitados", nomsPokemonsVisitados);
    localStorage.setItem("nomsPokemonsEnPantalla", nomsPokemons);
    localStorage.setItem("nomsPokemonsEnPokedex", nomsPokedex);
  }
}
async function showInicialPokemons() {
  reiniciarValores();
  todosPokemons = await getAllPokemons();
  barrejar();
  actualizarLocalStorage();
}

async function getAllPokemons() {
  let url = "https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0";
  try {
    let res = await fetch(url);
    let resJson = await res.json();
    let nom = "";
    for (let i = 0; i < resJson.results.length; i++) {
      nom = resJson.results[i].name;
      nomsTotsPokemons.push(nom);
    }
    return resJson;
  } catch (error) {
    console.log(error);
  }
}

function showTotals() {
  document.querySelector(
    ".totalsPks"
  ).innerHTML = `${todosPokemons.count} i ${lsPokemonsVisitados.length} visitats`;
  document.querySelector(".totalsDex").innerHTML = lsPokedex.length;
}

function createListAleatori(cuantos) {
  let num = 0;
  let n = 1;

  while (n <= cuantos) {
    num = Math.floor(Math.random() * todosPokemons.count + 1);
    const index = lsPokemonsVisitados.findIndex((nume) => nume === num);
    if (index < 0) {
      lsPokemonsVisitados.push(num);
      lsPokemons.push(num);
      n++;
    }
  }
  if (localStorage.getItem("cookies-aceptadas")) {
    localStorage.setItem("listaPokemons", lsPokemons);
    localStorage.setItem("listaPokemonsVisitados", lsPokemonsVisitados);
  }
  if (cuantos === 1) {
    return num;
  }
}
function showLista(elQue) {
  let listaMostrar = [];
  let origen = "T";
  switch (elQue) {
    case "visitados":
      listaMostrar = Array.from(nomsPokemonsVisitados.sort());
      origen = "Visto";
      break;
    case "nous":
      listaMostrar = Array.from(lsPokemons);
      origen = "Nou";
      break;
    case "pokedex":
      listaMostrar = Array.from(nomsPokedex.sort());
      origen = "Visto";
      break;
    case "busqueda":
      listaMostrar = Array.from(PkEncontrados.sort());
      origen = "Visto";
      break;
  }
  const containerPks = document.querySelector("#principal");
  containerPks.innerHTML = "";
  listaMostrar.forEach((valor) => mostrarPokemon(valor, origen));
  showTotals();
}
function barrejar() {
  lsPokemons = [];
  nomsPokemons = [];
  createListAleatori(pks_number);
  showLista("nous");
}
async function mostrarPokemon(id, origen) {
  let elPokemon = await getUniquePokemon(id, origen);
  let index = 100;
  index = nomsPokemons.findIndex((nombre) => nombre === elPokemon.name);
  if (index < 0) {
    nomsPokemons.push(elPokemon.name);
  }
  index = nomsPokemonsVisitados.findIndex(
    (nombre) => nombre === elPokemon.name
  );
  if (index < 0) {
    nomsPokemonsVisitados.push(elPokemon.name);
  }
  showPokemon(elPokemon);
  actualizarLocalStorage();
  
}
async function getUniquePokemon(id, alcance) {
  try {
    let url;
    if (alcance === "Nou") {
      url = todosPokemons.results[id].url;
    } else {
      let elObj = jsonPokemons.find((e) => e.pokemon.name === id);
      if (elObj) {
        return elObj.pokemon;
      } else {
        url = `https://pokeapi.co/api/v2/pokemon/${id}`;
      }
    }
    if (url) {
      let res = await fetch(url);
      let res_pk = await res.json();
      let elPk = construirDatsPokemon(res_pk);
      jsonPokemons.push(elPk);
      return res_pk;
    }
  } catch (error) {
    console.log(error);
  }
}

function construirDatsPokemon(elPoke) {
  let tipos = [];
  elPoke.types.map(function (type) {
    let tipo = {
      tipo: type.type.name,
    };
    tipos.push(tipo);
  });
  let elPk = {
    pokemon: {
      id: elPoke.id,
      name: elPoke.name,
      imageFront: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${elPoke.id}.png`,
      imageBack: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/shiny/${elPoke.id}.png`,
      atac: elPoke.stats[1].base_stat,
      defensa: elPoke.stats[2].base_stat,
      tipus: tipos,
      stats: elPoke.stats,
      types: elPoke.types
    },
  };
  return elPk;
}

async function showPokemon(pk) {
  const templatePks = document.getElementById("templatePks");
  const containerPks = document.querySelector("#principal");
  const clonedTemplatePks = templatePks.content.cloneNode(true);
  let card = clonedTemplatePks.querySelector(".card-pk");
  let img = clonedTemplatePks.querySelector(".pk_img");
  let titulo = clonedTemplatePks.querySelector(".pk_name");
  let txtid = clonedTemplatePks.querySelector(".pk_id");
  let btnDetalls = clonedTemplatePks.querySelector("#detall");
  let btnAddPoke = clonedTemplatePks.querySelector("#addPoke");
  let btnDelete = clonedTemplatePks.querySelector("#delete");
  let imgAddPoke = clonedTemplatePks.querySelector(".imgGene");
  card.setAttribute("id", pk.id);
  titulo.textContent = pk.name;
  txtid.textContent = pk.id;
  let urlImg = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pk.id}.png`;
  img.setAttribute("src", urlImg);
  btnDetalls.setAttribute("href", `javascript:detalls(${pk.id},"${pk.name}");`);
  btnAddPoke.setAttribute(
    "href",
    `javascript:addPkPokeball(${pk.id},"${pk.name}",'C');`
  );
  btnDelete.setAttribute("href", `javascript:deletePk(${pk.id},"${pk.name}");`);
  imgAddPoke.setAttribute("id", `idpkI_${pk.id}`);
  containerPks.appendChild(clonedTemplatePks);
  resaltarPk(pk.id, pk.name,'C');
}

function deletePk(id, name) {
  let index = lsPokemons.indexOf(id);
  if (index > -1) {
    lsPokemons.splice(index, 1);
  }
  index = nomsPokemons.indexOf(name);

  if (index > -1) {
    nomsPokemons.splice(index, 1);
  }

  const elPkDelete = document.getElementById(id);
  elPkDelete.parentNode.removeChild(elPkDelete);
  let nume = createListAleatori(1);
  mostrarPokemon(nume, "Nou");
  showTotals();
  actualizarLocalStorage();
}



function consultarPokemon(dondeBusco) {
  PkEncontrados = [];
  let cadena_busqueda = document.getElementById("cercar-input").value.toLowerCase();
  let nombre = "";
    let como = document.querySelector('input[name="como"]:checked').value;
    let cumple;
    for (let i = 0; i < dondeBusco.length; i++) {
      nombre = dondeBusco[i].toLowerCase();
      switch (como) {
        case "igual":
          cumple = nombre === cadena_busqueda;
          break;
        case "inicii":
          cumple =
            nombre.substring(0, cadena_busqueda.length) === cadena_busqueda;
          break;
        case "contingui":
          cumple = nombre.includes(cadena_busqueda);
          break;
      }
      if (cumple) {
        PkEncontrados.push(nombre);
      }
    }
}

function configDondeBuscar() {
  let donde = document.querySelector('input[name="donde"]:checked').value;
  let dondeBusco = [];
  switch (donde) {
    case "tots":
      dondeBusco = Array.from(nomsTotsPokemons.sort());
      break;
    case "visites":
      dondeBusco = Array.from(nomsPokemonsVisitados.sort());
      break;
    case "pokeball":
      dondeBusco = Array.from(nomsPokedex.sort());
      break;
  }
  return dondeBusco;
}

let entrada = document.getElementById("cercar-input");
entrada.addEventListener('keyup', (event) => {
  cercarPokemon("N");
}, false);
function cercarPokemon(tancar) {
  if (entrada.value.length > 0) {
    let dondeBusco = configDondeBuscar();
    consultarPokemon(dondeBusco);
    showLista("busqueda");
  } 
  if (tancar=="T"){
    document.getElementById("cercar-input").value = "";
    tancarCercar();
  }
}

const contenidorDetalls = document.getElementById("contenidor_detalls");
const fondoDetalls = document.getElementById("fondo-detalls");

function detalls(id, name) {
   
    let elObj = jsonPokemons.find(e => e.pokemon.name === name);
    showDetallPokemon(elObj.pokemon);
    showTipus(elObj.pokemon.types)
    showStats(elObj.pokemon.stats)
    contenidorDetalls.classList.add("activo");
    fondoDetalls.classList.add("activo");    
}
function tancarDetalls(){
    contenidorDetalls.innerHTML = "";
    contenidorDetalls.classList.remove("activo");
    fondoDetalls.classList.remove("activo");     
}

function showDetallPokemon(pk) {
    contenidorDetalls.innerHTML = "";
    const templateDetall = document.getElementById("templateDetall");
    const clonedTemplateDetall = templateDetall.content.cloneNode(true);
    let card = clonedTemplateDetall.querySelector(".card-detall");
    let img = clonedTemplateDetall.querySelector(".pk_img");
    let img2 = clonedTemplateDetall.querySelector(".pk_img2");
    let titulo = clonedTemplateDetall.querySelector(".pk_name");
    let txtid = clonedTemplateDetall.querySelector(".pk_id");
    let btnTancarDetalls = clonedTemplateDetall.querySelector("#tancar-detall");
    let btnAddPoke = clonedTemplateDetall.querySelector("#addPoke-d");
    let imgAddPoke = clonedTemplateDetall.querySelector(".imgDetall");
    card.setAttribute("id", `idpkd_${pk.id}`);
    titulo.textContent = pk.name;
    txtid.textContent = pk.id;
    let urlImg = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pk.id}.png`;
    let urlImg2 = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/shiny/${pk.id}.png`;
    img.setAttribute("src", urlImg);
    img2.setAttribute("src", urlImg2);
    btnTancarDetalls.setAttribute("href", `javascript:tancarDetalls();`)
    btnAddPoke.setAttribute("href", `javascript:addPkPokeball(${pk.id},"${pk.name}",'D');`)
    imgAddPoke.setAttribute("id", `idpkdI_${pk.id}`)
    contenidorDetalls.appendChild(clonedTemplateDetall);
    resaltarPk(pk.id, pk.name , "D")

}

async function showTipus(tipus){
  const contenidorTipos = document.querySelector(".tipus");

  for(let i in tipus){
    let templateTipo = document.getElementById("templateTipo");
    let clonedTemplateTipo = templateTipo.content.cloneNode(true);    
    let eltipo = clonedTemplateTipo.querySelector(".tipo");
    eltipo.textContent = tipus[i].type.name;
    eltipo.setAttribute("id",tipus[i].type.name);
    contenidorTipos.appendChild(clonedTemplateTipo);
  }
}

function showStats(stats){
  const contenidorStats = document.querySelector(".stats");
  for(let i in stats){
    let templateStat = document.getElementById("templateStat");
    let clonedTemplateStat = templateStat.content.cloneNode(true);    
    let elStat = clonedTemplateStat.querySelector(".nomStat");
    let elValue = clonedTemplateStat.querySelector(".valueStat");
    let fuerza = clonedTemplateStat.querySelector(".fuerza");
    elStat.textContent = stats[i].stat.name;
    elStat.setAttribute("for",stats[i].stat.name)
    elValue.textContent = `${stats[i].base_stat}`;
    fuerza.textContent = `${stats[i].base_stat}%`;
    fuerza.setAttribute("id",stats[i].stat.name)
    fuerza.setAttribute("value",stats[i].base_stat)
    contenidorStats.appendChild(clonedTemplateStat);
  }
}

function resaltarPk(id, name,espai){
  let idBus;
  let idIBus;
  let estilo;
  if (espai === "D"){
    idBus= `idpkd_${id}`;
    idIBus = `idpkdI_${id}`;
    estilo = "resaltard"
  }else{
    idBus= id;
    idIBus = `idpkI_${id}`;
    estilo = "resaltar"
  }
  
  let contienePk = document.getElementById(idBus);
  let imgAddPoke = document.getElementById(idIBus);
  if (nomsPokedex.includes(name)){
    contienePk.classList.add(estilo);
    imgAddPoke.removeAttribute("src");
    imgAddPoke.setAttribute("src", "./assets/img/icons8-salir-redondeado-64.png");
    imgAddPoke.setAttribute("alt","esborrar del pokedex");
  } else{
    contienePk.classList.remove(estilo);
    imgAddPoke.removeAttribute("src");
    imgAddPoke.setAttribute("src", "./assets/img/icons8-open-pokeball-48.png");
    imgAddPoke.setAttribute("alt","possar al pokedex");
  }
}
function addPkPokeball(id, name,espai) {

  let indice = nomsPokedex.indexOf(name);
  
  if (indice>=0){
    nomsPokedex.splice(indice, 1);
    lsPokedex.splice(indice, 1);
    resaltarPk(id, name,espai);
    showTotals();
    actualizarLocalStorage();
  } else{
    lsPokedex.push(id);
    nomsPokedex.push(name);
    resaltarPk(id, name,espai);
    showTotals();
    actualizarLocalStorage();
  }
}


class Pokemon {
  constructor(
    pokemonID,
    pokemonThumbnail,
    pokemonName,
    pokemonType1,
    pokemonType2,
    pokemonHP,
    pokemonAttack,
    pokemonDefense,
    pokemonSpecialAttack,
    pokemonSpecialDefense,
    pokemonSpeed,
    pokemonEvolutions,
    pokemonPreEvolutions
  ) {
    this.pokemonID = pokemonID;
    this.pokemonThumbnail = pokemonThumbnail;
    this.pokemonName = pokemonName;
    this.pokemonType1 = pokemonType1;
    this.pokemonType2 = pokemonType2;
    this.pokemonHP = pokemonHP;
    this.pokemonAttack = pokemonAttack;
    this.pokemonDefense = pokemonDefense;
    this.pokemonSpecialAttack = pokemonSpecialAttack;
    this.pokemonSpecialDefense = pokemonSpecialDefense;
    this.pokemonSpeed = pokemonSpeed;
    this.pokemonEvolutions = pokemonEvolutions;
    this.pokemonPreEvolutions = pokemonPreEvolutions;
    this.shownID = this.createShownID();
  }

  createShownID() {
    let shownID;
    this.pokemonID < 10 ? (shownID = `#00${this.pokemonID}`) : this.pokemonID < 100 ? (shownID = `#0${this.pokemonID}`) : (shownID = `#${this.pokemonID}`);
    return shownID;
  }

  createMiniCard() {
    // Create the new card
    const newMiniCard = document.createElement("div");
    // Add classes and tab index to the card
    if (this.pokemonType2 !== "NA") {
      let type1Color = typesColors[this.pokemonType1];
      let type2Color = typesColors[this.pokemonType2];
      newMiniCard.style.background = `linear-gradient(120deg, ${type1Color} 0%, ${type2Color} 100%)`;
      newMiniCard.classList.add("pokemonCardMini");
    } else {
      newMiniCard.classList.add("pokemonCardMini", this.pokemonType1.toLowerCase());
    }
    newMiniCard.tabIndex = "0";
    // Create the pokemon id element
    const newPokemonID = document.createElement("span");
    newPokemonID.classList.add("pokemonId");
    newPokemonID.textContent = this.shownID;
    newMiniCard.appendChild(newPokemonID);
    // Create the pokemon thumbnail element
    const newPokemonThumbnail = document.createElement("img");
    newPokemonThumbnail.classList.add("pokemonThumbnail");
    newPokemonThumbnail.src = this.pokemonThumbnail;
    newPokemonThumbnail.alt = this.pokemonName;
    newPokemonThumbnail.loading = "lazy";
    newMiniCard.appendChild(newPokemonThumbnail);
    // Create the pokemon name element
    const newPokemonName = document.createElement("h2");
    newPokemonName.classList.add("pokemonName");
    newPokemonName.textContent = this.pokemonName;
    newMiniCard.appendChild(newPokemonName);
    // Add the card to the pokedex
    document.querySelector(".cardsSection").appendChild(newMiniCard);
    // Add an event listener to open a modal on click
    newMiniCard.addEventListener("click", this.showFilledModal.bind(this));
  }

  showFilledModal() {
    // Declare and assign modal HTML elements
    const bgModal = document.querySelector(".modalFilter");
    const modal = document.querySelector(".pokemonModal");
    const topLinePokemonName = document.querySelector(".topLinePokemonName");
    const topLinePokemonID = document.querySelector(".topLinePokemonID");
    const modalImage = document.querySelector(".modalImage");
    const modalType1 = document.querySelector(".modalType1");
    const modalType2 = document.querySelector(".modalType2");
    const modalValueHP = document.querySelector(".valueHP");
    const modalValueATK = document.querySelector(".valueATK");
    const modalValueDEF = document.querySelector(".valueDEF");
    const modalValueSATK = document.querySelector(".valueSATK");
    const modalValueSDEF = document.querySelector(".valueSDEF");
    const modalValueSPD = document.querySelector(".valueSPD");
    const modalBarHP = document.querySelector(".barHP");
    const modalBarATK = document.querySelector(".barATK");
    const modalBarDEF = document.querySelector(".barDEF");
    const modalBarSATK = document.querySelector(".barSATK");
    const modalBarSDEF = document.querySelector(".barSDEF");
    const modalBarSPD = document.querySelector(".barSPD");
    let type1Color = typesColors[this.pokemonType1];
    let type2Color = typesColors[this.pokemonType2];
    // Modify text, src and attribute contents
    topLinePokemonName.textContent = this.pokemonName;
    topLinePokemonID.textContent = this.shownID;
    modalImage.src = this.pokemonThumbnail;
    modalImage.alt = this.pokemonName;
    modalType1.textContent = this.pokemonType1;
    modalType2.textContent = this.pokemonType2;
    modalValueHP.textContent = this.pokemonHP;
    modalValueATK.textContent = this.pokemonAttack;
    modalValueDEF.textContent = this.pokemonDefense;
    modalValueSATK.textContent = this.pokemonSpecialAttack;
    modalValueSDEF.textContent = this.pokemonSpecialDefense;
    modalValueSPD.textContent = this.pokemonSpeed;
    modalBarHP.value = this.pokemonHP;
    modalBarATK.value = this.pokemonAttack;
    modalBarDEF.value = this.pokemonDefense;
    modalBarSATK.value = this.pokemonSpecialAttack;
    modalBarSDEF.value = this.pokemonSpecialDefense;
    modalBarSPD.value = this.pokemonSpeed;
    // Add type(s) to the modal (background)
    if (this.pokemonType2 !== "NA") {
      modal.style.background = `linear-gradient(90deg, ${type1Color} 0%, ${type2Color} 100%)`;
    } else {
      modal.classList.add(this.pokemonType1.toLowerCase());
    }
    // Add types to the modal (infos)
    modalType1.classList.add(this.pokemonType1.toLowerCase());
    if (this.pokemonType2 !== "NA") {
      modalType2.classList.remove("hidden");
      modalType2.classList.add(this.pokemonType2.toLowerCase());
    } else {
      modalType2.classList.add("hidden");
    }
    // Add color to the progress bars
    modalBarHP.style.accentColor = type1Color;
    modalBarATK.style.accentColor = type1Color;
    modalBarDEF.style.accentColor = type1Color;
    modalBarSATK.style.accentColor = type1Color;
    modalBarSDEF.style.accentColor = type1Color;
    modalBarSPD.style.accentColor = type1Color;
    // Remove arrows if necessary
    hideArrows(this.pokemonID - 1);
    // Display the modal
    bgModal.classList.remove("hidden");
  }
}

const pokemonsFetched = [];
let createdCards = 0;
const typesColors = {
  Normal: "#aaa67f",
  Combat: "#c12239",
  Vol: "#a891ec",
  Poison: "#a43e9e",
  Sol: "#dec16b",
  Roche: "#b69e31",
  Insecte: "#a7b723",
  Spectre: "#70559b",
  Acier: "#b7b9d0",
  Feu: "#f57d31",
  Eau: "#6493eb",
  Plante: "#74cb48",
  Électrik: "#f9cf30",
  Psy: "#fb5584",
  Glace: "#9ad6df",
  Dragon: "#7037ff",
  Ténèbres: "#75574c",
  Fée: "#e69eac",
};

async function fetchAllPokemons() {
  let data;
  // If pokemons were already fetched and are in local storage, avoid new fetch
  if (localStorage.getItem("pokemonsFetchedLocal")) {
    data = JSON.parse(localStorage.getItem("pokemonsFetchedLocal"));
  }
  // Else, fetch the pokemons and add them to local storage
  else {
    const response = await fetch("https://pokebuildapi.fr/api/v1/pokemon");
    data = await response.json();
    localStorage.setItem("pokemonsFetchedLocal", JSON.stringify(data));
  }
  // Create new Pokemons
  for (let i = 0; i < 898; i++) {
    const pokemonID = data[i].pokedexId;
    let shownID;
    pokemonID < 10 ? (shownID = `00${pokemonID}`) : pokemonID < 100 ? (shownID = `0${pokemonID}`) : (shownID = `${pokemonID}`);
    const pokemonThumbnail = `https://assets.pokemon.com/assets/cms2/img/pokedex/detail/${shownID}.png`;
    const pokemonName = data[i].name;
    const pokemonType1 = data[i].apiTypes[0].name;
    let pokemonType2;
    if (data[i].apiTypes[1] !== undefined && data[i].apiTypes[1] !== null) {
      pokemonType2 = data[i].apiTypes[1].name;
    } else {
      pokemonType2 = "NA";
    }
    const pokemonHP = data[i].stats.HP;
    const pokemonAttack = data[i].stats.attack;
    const pokemonDefense = data[i].stats.defense;
    const pokemonSpecialAttack = data[i].stats.special_attack;
    const pokemonSpecialDefense = data[i].stats.special_defense;
    const pokemonSpeed = data[i].stats.speed;
    const pokemonEvolutions = data[i].apiEvolutions;
    const pokemonPreEvolutions = data[i].apiPreEvolution;
    if (pokemonsFetched.length < 898) {
      pokemonsFetched.push(
        new Pokemon(
          pokemonID,
          pokemonThumbnail,
          pokemonName,
          pokemonType1,
          pokemonType2,
          pokemonHP,
          pokemonAttack,
          pokemonDefense,
          pokemonSpecialAttack,
          pokemonSpecialDefense,
          pokemonSpeed,
          pokemonEvolutions,
          pokemonPreEvolutions
        )
      );
    }
  }
}

async function addNewCards(num = 50) {
  // Show a loading phase while awaiting for the fetching
  document.querySelector(".loading").style.display = "block";
  document.querySelector(".morePokemons").style.display = "none";
  await fetchAllPokemons();
  // Hide the loading part and show the more card button once fetch is completed
  document.querySelector(".loading").style.display = "none";
  document.querySelector(".morePokemons").style.display = "block";
  // Add new cards at the bottom of the pokedex
  const tempCreatedCards = createdCards;
  for (let i = createdCards; i < num + tempCreatedCards; i++) {
    if (createdCards < 898) {
      pokemonsFetched[i].createMiniCard();
      createdCards++;
    } else {
      document.querySelector(".morePokemons").remove();
    }
  }
}

function hideModal() {
  // Hide modal
  const bgModal = document.querySelector(".modalFilter");
  bgModal.classList.add("hidden");
  removeTypeModal();
}

// Remove type class from modal's background
function removeTypeModal() {
  const modal = document.querySelector(".pokemonModal");
  const modalType1 = document.querySelector(".modalType1");
  const modalType2 = document.querySelector(".modalType2");

  const types = [
    "Normal",
    "Combat",
    "Vol",
    "Poison",
    "Sol",
    "Roche",
    "Insecte",
    "Spectre",
    "Acier",
    "Feu",
    "Eau",
    "Plante",
    "Électrik",
    "Psy",
    "Glace",
    "Dragon",
    "Ténèbres",
    "Fée",
  ];

  types.forEach((type) => {
    modal.classList.remove(type.toLowerCase());
    modalType1.classList.remove(type.toLowerCase());
    modalType2.classList.remove(type.toLowerCase());
  });
  modal.style.background = null;
}

// Switch to previous or next pokemon when click on arrows. If card doesn't exit, add it
function switchPreviousPokemon(pokemonID) {
  removeTypeModal();
  pokemonsFetched[pokemonID].showFilledModal();
  hideArrows(pokemonID);
}
function switchNextPokemon(pokemonID) {
  removeTypeModal();
  pokemonsFetched[pokemonID].showFilledModal();
  hideArrows(pokemonID);
}

// Hide arrows for switching pokemon if necessary
function hideArrows(pokemonID) {
  if (pokemonID === 0) {
    document.querySelector(".leftArrow").classList.add("hidden");
    document.querySelector(".rightArrow").classList.remove("hidden");
  } else if (pokemonID === 897) {
    document.querySelector(".rightArrow").classList.add("hidden");
    document.querySelector(".leftArrow").classList.remove("hidden");
  } else {
    document.querySelector(".leftArrow").classList.remove("hidden");
    document.querySelector(".rightArrow").classList.remove("hidden");
  }
}

// Research Pokemon
function searchPokemon(searchInput) {
  if (searchInput === "") {
    removeAllCards();
    createdCards = 0;
    addNewCards(100);
    document.querySelector(".morePokemons").style.display = "block";
  } else {
    removeAllCards();
    for (let i = 0; i < pokemonsFetched.length; i++) {
      if (pokemonsFetched[i].pokemonName.toLowerCase().includes(searchInput.toLowerCase()) || pokemonsFetched[i].pokemonID.toString().includes(searchInput)) {
        pokemonsFetched[i].createMiniCard();
      }
    }
    document.querySelector(".morePokemons").style.display = "none";
  }
}

// Remove all minicards
function removeAllCards() {
  while (document.querySelector(".cardsSection").firstChild) {
    document.querySelector(".cardsSection").removeChild(document.querySelector(".cardsSection").lastChild);
  }
}

// Hide "More Pokemons" button
function hideMorePokemons() {
  document.querySelector(".morePokemons").style.display = "none";
}
// Show "More Pokemons" button
function hideMorePokemons() {
  document.querySelector(".morePokemons").style.display = "block";
}

// Switch to previous or next pokemon when click on arrows
document.querySelector(".leftArrow").addEventListener("click", () => {
  removeTypeModal();
  switchPreviousPokemon(pokemonsFetched.findIndex((pokemon) => pokemon.pokemonName === document.querySelector(".topLinePokemonName").textContent) - 1);
});

document.querySelector(".rightArrow").addEventListener("click", () => {
  removeTypeModal();
  switchNextPokemon(pokemonsFetched.findIndex((pokemon) => pokemon.pokemonName === document.querySelector(".topLinePokemonName").textContent) + 1);
});

// Add new cards
addNewCards(30);

// Hide the modal when clicking on the close button
document.querySelector(".topLineArrow").addEventListener("click", hideModal);
// Hide the modal when clicking outside of it
document.addEventListener("mouseup", (e) => {
  const modal = document.querySelector(".pokemonModal");
  if (!modal.contains(e.target)) {
    hideModal();
  }
});

// Add event listener to create new cards
document.querySelector(".morePokemons").addEventListener("click", () => {
  addNewCards(50);
});

// Add event listener for search bar
document.querySelector(".searchBar").addEventListener("input", () => {
  searchPokemon(document.querySelector(".searchBar").value);
});

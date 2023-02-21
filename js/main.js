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
    newMiniCard.classList.add("pokemonCardMini", this.pokemonType1.toLowerCase());
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
    newMiniCard.appendChild(newPokemonThumbnail);
    // Create the pokemon name element
    const newPokemonName = document.createElement("h3");
    newPokemonName.classList.add("pokemonName");
    newPokemonName.textContent = this.pokemonName;
    newMiniCard.appendChild(newPokemonName);
    // Add the card to the pokedex
    document.querySelector(".cardsSection").appendChild(newMiniCard);
    // Add an event listener to open a modal on click
    newMiniCard.addEventListener("click", this.createModal.bind(this));
  }

  createModal() {
    // Create a new modal and add the type as background
    const modal = document.createElement("section");
    modal.classList.add("pokemonModal", this.pokemonType1.toLowerCase());
    // Create a top line element with return button, Pokemon's name and ID
    const topLine = document.createElement("div");
    topLine.classList.add("topLine");
    const topLineArrow = document.createElement("button");
    topLineArrow.textContent = "<";
    const topLinePokemonName = document.createElement("h4");
    topLinePokemonName.textContent = this.pokemonName;
    const topLinePokemonID = document.createElement("span");
    topLinePokemonID.textContent = this.shownID;
    const topLineLeft = document.createElement("div");
    topLineLeft.classList.add("topLineLeft");
    // Add the topline element and children
    topLineLeft.appendChild(topLineArrow);
    topLineLeft.appendChild(topLinePokemonName);
    topLine.appendChild(topLineLeft);
    topLine.appendChild(topLinePokemonID);
    modal.appendChild(topLine);
    // Add the modal to the body
    document.querySelector("body").appendChild(modal);
  }
}

const pokemonsFetched = [];
let createdCards = 0;

async function fetchAllPokemons() {
  if (pokemonsFetched.length > 0) {
    return true;
  }
  const response = await fetch("https://pokebuildapi.fr/api/v1/pokemon");
  const data = await response.json();
  for (let i = 0; i < 898; i++) {
    const temp = data[i];
    const pokemonID = data[i].pokedexId;
    const pokemonThumbnail = data[i].image;
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

async function addNewCards(num = 50) {
  document.querySelector(".loading").style.display = "block";
  document.querySelector(".morePokemons").style.display = "none";
  await fetchAllPokemons();
  document.querySelector(".loading").style.display = "none";
  document.querySelector(".morePokemons").style.display = "block";
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

addNewCards(30);

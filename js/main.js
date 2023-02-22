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
    const topLineArrow = document.querySelector(".topLineArrow");
    const topLinePokemonName = document.querySelector(".topLinePokemonName");
    const topLinePokemonID = document.querySelector(".topLinePokemonID");
    const leftArrow = document.querySelector(".leftArrow");
    const rightArrow = document.querySelector(".rightArrow");
    const modalImage = document.querySelector(".modalImage");
    // Add type class to the modal (background)
    modal.classList.add(this.pokemonType1.toLowerCase());
    // Modify text, src and attribute contents
    topLinePokemonName.textContent = this.pokemonName;
    topLinePokemonID.textContent = this.shownID;
    modalImage.src = this.pokemonThumbnail;
    modalImage.alt = this.pokemonName;
    // Display arrow if previous or next pokemon
    if (this.pokemonID == 1) {
      leftArrow.classList.add("hidden");
    } else if (this.pokemonID == 898) {
      rightArrow.classList.add("hidden");
    }
    // Hide the modal when clicking on the arrow button
    topLineArrow.addEventListener("click", () => {
      bgModal.classList.add("hidden");
      modal.classList.remove(this.pokemonType1.toLowerCase());
      leftArrow.classList.remove("hidden");
      rightArrow.classList.remove("hidden");
    });
    // Hide the modal when clicking outside of it
    document.addEventListener("mouseup", (e) => {
      if (!modal.contains(e.target)) {
        bgModal.classList.add("hidden");
        modal.classList.remove(this.pokemonType1.toLowerCase());
        leftArrow.classList.remove("hidden");
        rightArrow.classList.remove("hidden");
      }
    });
    // Switch to previous or next pokemon when click on arrows
    leftArrow.addEventListener("click", () => {
      leftArrow.classList.remove("hidden");
      rightArrow.classList.remove("hidden");
      modal.classList.remove(this.pokemonType1.toLowerCase());
      pokemonsFetched[this.pokemonID - 2].showFilledModal();
    });
    rightArrow.addEventListener("click", () => {
      leftArrow.classList.remove("hidden");
      rightArrow.classList.remove("hidden");
      modal.classList.remove(this.pokemonType1.toLowerCase());
      pokemonsFetched[this.pokemonID].showFilledModal();
    });
    // Display the modal
    bgModal.classList.remove("hidden");
  }
}

const pokemonsFetched = [];
let createdCards = 0;

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

addNewCards(30);

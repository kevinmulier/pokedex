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
  }

  createMiniCard() {
    // Create the new card
    const newMiniCard = document.createElement("section");
    // Add classes and tab index to the card
    newMiniCard.classList.add("pokemonCardMini", this.pokemonType1.toLowerCase());
    newMiniCard.tabIndex = "0";
    // Create the pokemon id element
    const newPokemonID = document.createElement("span");
    newPokemonID.classList.add("pokemonId");
    newPokemonID.textContent = this.pokemonID;
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
  }
}

const pokemonsFetched = [];

function fetchNewPokemon(num = 50) {
  fetch(`https://pokebuildapi.fr/api/v1/pokemon/limit/${pokemonsFetched.length + num}`)
    .then((response) => response.json())
    .then((data) => {
      for (let i = pokemonsFetched.length; i < pokemonsFetched.length + num; i++) {
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
        window[pokemonName.toLowerCase()] = new Pokemon(
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
        );
        window[pokemonName.toLowerCase()].createMiniCard();
        pokemonsFetched.push(window[pokemonName.toLowerCase()]);
      }
    })
    .catch((err) => {
      console.log(`error ${err}`);
    });
}

fetchNewPokemon(50);

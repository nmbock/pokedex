const fs = require('fs');

class Pokemon {
    constructor(id, name, type, ability){
        this._id = id;
        this._name = name;
        this._type = type;
        this._ability = ability;
    }

}

let pokemons = []; //array with all my pokemon stocked

function findPokemonByName(name) {
  // Find a pokemon by name in the pokemons array
  const pokemon = pokemons.find(pokemon => pokemon._name == name);
  if (pokemon) {
    // If a pokemon is found, return its details
    return findPokemon(pokemon._id);
  }
  // If no pokemon is found, return null
  return null;
}

function findPokemon(id){
    // Find a pokemon by ID in the pokemons array
    return pokemons.find(pokemon => pokemon._id == id);
}

function createPokemon(name, type, ability) {
    let id = pokemons.length + 1;
    let isUnique = false;
    
    // Check if the generated ID is unique
    while (!isUnique) {
      isUnique = true;
      for (let i = 0; i < pokemons.length; i++) {
        if (pokemons[i]._id === id) {
          isUnique = false;
          id++;
          break;
        }
      }
    }
    // Create a new Pokemon object with the given parameters    
    const pokemon = new Pokemon(id, name, type, ability);
    // Add the new pokemon to the pokemons array
    pokemons.push(pokemon);
    // Save the data to the file
    saveData();
    // Return the newly created pokemon
    return pokemon;
  }
  
// Update a pokemon's type and ability based on its name
function updatePokemon(name, type, ability){
    const pokemon = findPokemonByName(name);
    if (pokemon != undefined){
        pokemon._type = type;
        pokemon._ability = ability;
        saveData(); // Save the updated pokemon data to the file
        return pokemon;
    }
    return null;
}   

// Delete a pokemon with the given name
function deletePokemon(name) {
  let deletedPokemon = null;

  // Find the index of the Pokemon with the given name
  const index = pokemons.findIndex(pokemon => pokemon._name == name);
  // If the Pokemon exists, delete it from the array and save the data
  if (index !== -1) {
    deletedPokemon = pokemons.splice(index, 1)[0];
    saveData(); // Save the updated pokemon data to the file
  }
  
  return deletedPokemon;
}

// Load the pokemon data from the file
function loadData(){
    const fileData = fs.readFileSync('./data/pokemons.txt','utf8');
    pokemons = JSON.parse(fileData);
    pokemons.forEach(pokemon => {
        pokemon._name = pokemon._name.toLowerCase();
      });
}

// Save the pokemon data to the file
function saveData() {
    const data = JSON.stringify(pokemons);
    fs.writeFileSync('./data/pokemons.txt', data, 'utf8');
}

loadData();

module.exports = {
    findPokemon,
    createPokemon,
    updatePokemon,
    deletePokemon,
    findPokemonByName,
    pokemons,
    loadTypesData,
    loadAbilitiesData
};

// Load the types data from the file
function loadTypesData() {
  const typesData = fs.readFileSync('./data/types.json', 'utf8');
  const types = JSON.parse(typesData);
  const types_data = types.map(type => {
    return {
      name: type.name
      //atk_effectives: type.atk_effectives,
      //genfamily: type.genfamily
    };
  });

  return types_data;
}

// Load ability data from abilities.json file and convert to a formatted array
function loadAbilitiesData() {
  // Read the abilities data from the abilities.json file
  const abilitiesData = fs.readFileSync('./data/abilities.json', 'utf8');
  // Parse the data into a JavaScript object
  const abilities = JSON.parse(abilitiesData);
  // Map each ability to a formatted object with only the name property
  const abilities_data = abilities.map(ability => {
    return {
      name: ability.name
    };
  });
  // Return the formatted array of abilities
  return abilities_data;
}



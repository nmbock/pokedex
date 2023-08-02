const express = require('express');
const cors = require('cors');
const app = express();
const port = 3000;

const path = require('path');

// Set the view engine to ejs
app.set('view engine', 'ejs');

// Set the views folder to the 'views' folder in the current directory
app.set('views', __dirname+'/views');

// Enable CORS middleware
app.use(cors());

// Enable JSON and URL-encoded form data middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Enable static file serving from the 'public' folder in the current directory
app.use(express.static('public'));

// Import functions from data/functions.js
const { findPokemon, createPokemon, updatePokemon, deletePokemon, loadData, pokemons, findPokemonByName, loadTypesData, loadAbilitiesData } = require('./data/functions');

// Load data from JSON files and create arrays of type and ability names
let types_data = loadTypesData();
const typeNames = types_data.map(type => type.name);

let abilities_data = loadAbilitiesData();
const abilitiesName = abilities_data.map(ability => ability.name);

// GET all pokemons - render index.ejs view with list of pokemons, type names, and ability names
app.get('/', (req, res) => {
    res.render('index', { pokemons, typeNames, abilitiesName });
});

// GET all pokemons - render list.ejs view with list of pokemons, type names, and ability names
app.get('/list', (req, res) => {
    res.render('list', {pokemons, typeNames, abilitiesName});
});

// GET a specific pokemon by name - send JSON data for pokemon with given name, or 404 error if not found
app.get('/pokemons/name/:name', (req, res) => {
    console.log("i got a GET request");
    const pokemon = findPokemonByName(req.params.name);
    if (pokemon) {
        res.send(pokemon);
    } else {
        res.status(404).send('Pokemon not found');
    }
});

// POST a new pokemon - create new pokemon with given name, type, and ability, or return 400 error if name already exists
app.post('/pokemons', (req, res) => {
    console.log("i got a POST request");
    const name = req.body.name;
    const type = req.body.type;
    const ability = req.body.ability;

    // Check if the name already exists
    const existingPokemon = pokemons.find(pokemon => pokemon._name === name);
    if (existingPokemon) {
        return res.status(400).send('Pokemon name already exists');
    }

    // Create the new pokemon
    const pokemon = createPokemon(name, type, ability);

    res.send(pokemon);
});

// PUT update an existing pokemon - update pokemon with given name, type, and ability, or return 404 error if not found
app.put('/pokemons/name/:name', (req, res) => {
    console.log("i got a PUT request");
    const pokemon = updatePokemon(req.body.name, req.body.type, req.body.ability);

    if (pokemon) {
        res.send(pokemon);
    } else {
        res.status(404).send('Pokemon not found');
    }
});

// DELETE a pokemon by name
app.delete('/pokemons/name/:name', (req, res) => {
    console.log("i got a DELETE request");
    // find the pokemon by name in the pokemons array
    const pokemon = findPokemonByName(req.params.name);
    if (pokemon) {
        // if the pokemon is found, delete it using the deletePokemon function
        const deletedPokemon = deletePokemon(pokemon._name);
        // send the deleted pokemon as a response
        res.send(deletedPokemon);
    } else {
        // if the pokemon is not found, return a 404 error
        res.status(404).send('Pokemon not found');
    }
});

// start the app and listen on the specified port
app.listen(port, () => {
    console.log(`Pokedex app listening at http://localhost:${port}`);
}); 
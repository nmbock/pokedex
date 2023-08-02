
document.addEventListener('DOMContentLoaded', () => {

    const nameInput1 = document.querySelector('#name1');
    const nameInput2 = document.querySelector('#name2');
    const typeInput = document.querySelector('#type');
    const abilityInput = document.querySelector('#ability');
    const addButton = document.querySelector('#add-button');
    const readButton = document.querySelector('#read-button');
    const deleteButton = document.querySelector('#delete-button');
    const pokemonsList = document.querySelector('#pokemon-list');
    const updateButton = document.querySelector('#update-button');
  
    updateButton.addEventListener('click', event => {
        if (nameInput1.value.trim() === '') {
          event.preventDefault(); // Prevent the form from being submitted
          alert('Please fill out all required fields.'); // Show an error message
        } else {
          event.preventDefault(); // Prevent the form from being submitted
          pokemonsList.classList.remove('hidden'); // Show the pokemon list
      
          while (pokemonsList.firstChild) { // Clear the pokemon list
            pokemonsList.removeChild(pokemonsList.firstChild);
          }
      
          const name = nameInput1.value.toLowerCase();
          const type = typeInput.value;
          const ability = abilityInput.value;
      
          const pokemon = { // Create an object with updated information for the pokemon
            name: nameInput1.value,
            type: typeInput.value,
            ability: abilityInput.value
          };
      
          fetch(`http://localhost:3000/pokemons/name/${name}`, { // Make a PUT request to update the pokemon
              method: 'PUT',
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify(pokemon)
            })
            .then(response => response.json()) // Parse the response as JSON
            .then(pokemon => {
              console.log(pokemon);
              const li = document.createElement('p');
              li.innerHTML = `${pokemon._name} has been updated: <br/>Type: ${pokemon._type}<br/>ability: ${pokemon._ability}`;
              pokemonsList.appendChild(li); // Display a message with the updated information of the pokemon
              nameInput1.value = '';
              typeInput.value = '';
              abilityInput.value = '';
            })
            .catch(error => {
              console.log(error);
              alert('Error updating pokemon');
            });
        }
      });
      
  
    // Add an event listener to the "Add" button
    addButton.addEventListener('click', event => {
        // Check if the "nameInput1" field is empty
        if (nameInput1.value.trim() === '') {
        event.preventDefault(); // Prevent the form from being submitted
        alert('Please fill out all required fields.'); // Show an error message
        } else {
        event.preventDefault(); // Prevent the form from being submitted
        pokemonsList.classList.remove('hidden'); // Display the "pokemonsList" element
        while (pokemonsList.firstChild) {
            pokemonsList.removeChild(pokemonsList.firstChild); // Remove any existing items from the "pokemonsList" element
        }
        // Create a new "pokemon" object with the values from the input fields
        const pokemon = {
            name: nameInput1.value.toLowerCase(),
            type: typeInput.value,
            ability: abilityInput.value
        };
        // Send a POST request to the server with the "pokemon" object as the body
        fetch('http://localhost:3000/pokemons', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(pokemon)
            })
            .then(response => response.json()) // Parse the response as JSON
            .then(pokemon => {
            console.log(pokemon); // Log the new pokemon to the console
            // Create a new list item with the name of the new pokemon
            const li = document.createElement('p');
            li.textContent = `${pokemon._name} has been added to the pokedex`;
            pokemonsList.appendChild(li); // Add the list item to the "pokemonsList" element
            // Clear the input fields
            nameInput1.value = '';
            typeInput.value = '';
            abilityInput.value = '';
            })
            .catch(error => {
            console.log(error); // Log any errors to the console
            alert('A pokemon with this name is already in the pokedex'); // Show an error message
            });
        }
    });
  

        // Add an event listener to the "Read" button
    readButton.addEventListener('click', event => {
        // Check if the "nameInput2" field is empty
        if (nameInput2.value.trim() === '') {
        event.preventDefault(); // Prevent the form from being submitted
        alert('Please fill out all required fields.'); // Show an error message
        }
        else{
        event.preventDefault(); // Prevent the form from being submitted
        pokemonsList.classList.remove('hidden'); // Display the "pokemonsList" element
    
        while (pokemonsList.firstChild) {
            pokemonsList.removeChild(pokemonsList.firstChild); // Remove any existing items from the "pokemonsList" element
        }
        // Get the name of the pokemon to search for from the input field
        const pokemonName = nameInput2.value.toLowerCase();
        console.log(pokemonName);
    
        // Send a GET request to the server to search for the pokemon with the given name
        fetch(`http://localhost:3000/pokemons/name/${pokemonName}`)
            .then(response => response.json()) // Parse the response as JSON
            .then(pokemon => {
            console.log(pokemon); // Log the pokemon to the console
            // Create a new list item with the pokemon's details
            const li = document.createElement('p');
            li.innerHTML = `Id: ${pokemon._id}<br/>Name: ${pokemon._name}<br/>Type: ${pokemon._type}<br/>ability: ${pokemon._ability}`;
            pokemonsList.appendChild(li); // Add the list item to the "pokemonsList" element
            })
            .catch(error => {
            console.log(error); // Log any errors to the console
            alert('This pokemon is not registered in the pokedex'); // Show an error message
            });
        }
    });
  

        // Add an event listener to the "Delete" button
    deleteButton.addEventListener('click', event => {
        // Check if the "nameInput2" field is empty
        if (nameInput2.value.trim() === '') {
        event.preventDefault(); // Prevent the form from being submitted
        alert('Please fill out all required fields.'); // Show an error message
        }
        else{
        event.preventDefault(); // Prevent the form from being submitted
        pokemonsList.classList.remove('hidden'); // Display the "pokemonsList" element
    
        while (pokemonsList.firstChild) {
            pokemonsList.removeChild(pokemonsList.firstChild); // Remove any existing items from the "pokemonsList" element
        }
        // Get the name of the pokemon to delete from the input field
        const pokemonName = nameInput2.value.toLowerCase();
    
        // Send a DELETE request to the server to delete the pokemon with the given name
        fetch(`http://localhost:3000/pokemons/name/${pokemonName}`, {
            method: 'DELETE'
        })
            .then(response => response.json()) // Parse the response as JSON
            .then(pokemon => {
            console.log(pokemon); // Log the deleted pokemon to the console
            // Create a new list item indicating that the pokemon was deleted
            const li = document.createElement('p');
            li.textContent = `${pokemon._name} has been deleted from the pokedex`;
            pokemonsList.appendChild(li); // Add the list item to the "pokemonsList" element
            nameInput2.value = ''; // Clear the input field for the next use
            typeInput.value = ''; // Clear the input field for the next use
            abilityInput.value = ''; // Clear the input field for the next use
            })
            .catch(error => {
            console.log(error); // Log any errors to the console
            alert('A non-registered pokemon cannot be deleted'); // Show an error message
            });
        }
    });
    
});

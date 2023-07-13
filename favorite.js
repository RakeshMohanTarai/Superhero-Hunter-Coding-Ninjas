// Get the HTML element with the id "fevList" and assign it to the `favouriteList` variable
const favouriteList = document.getElementById('fevList');

// Retrieve the stored favorite list from local storage with the key "favlistarr" and parse it from JSON format. If the list doesn't exist in local storage, initialize an empty array.
let list = JSON.parse(localStorage.getItem('favlistarr')) || [];

// Function to fetch and display the updated list of favorite heroes
function fetching(list) {
  // Iterate through each hero ID in the list and call the `loadhero` function to load the hero's data
  list.forEach((heroid) => {
    loadhero(heroid);
  });
}

// Asynchronously load the hero's data from the superhero API using the provided hero ID
async function loadhero(heroid) {
  // Construct the API URL with the base URL and the provided hero ID
  const URL = `https://www.superheroapi.com/api.php/3580926752143021/${heroid.trim()}`;
  // Fetch the data from the API URL
  const res = await fetch(URL);
  // Parse the response data as JSON
  const data = await res.json();
  // If the data exists, call the `heroslist` function to display the hero's data
  if (data) {
    heroslist(data);
  }
}

// Function to display the hero's data in the HTML
function heroslist(hero) {
  // Create a new `div` element to hold the hero's data
  const herosdata = document.createElement('div');
  // Use template literals to define the HTML structure. Insert the hero's image URL, name, and ID into the HTML structure.
  herosdata.innerHTML = `
    <div id="outerbox">
      <div id="innerbox">
        <img src="${hero.image.url}" id="favlistimg">
      </div>
      <h5>${hero.name}</h5>
      <button class="btn btn-primary" id="remove" type="submit" onclick="remove(this.value)" value=${hero.id}>Remove</button>
    </div>
  `;
  // Append the hero's data to the `favouriteList` element
  favouriteList.appendChild(herosdata);
}

// Function to remove an item from the favorite list
function remove(value) {
  // Filter the list to exclude the hero ID that matches the provided value
  list = list.filter((heroid) => heroid !== value);
  // Store the updated favorite list in local storage after removing the item
  localStorage.setItem('favlistarr', JSON.stringify(list));
  // Clear the HTML content inside the `favouriteList` element
  favouriteList.innerHTML = '';
  // Call the `fetching` function to fetch and display the favorite hero list
  fetching(list);
}

// Call the `fetching` function to fetch and display the favorite hero list
fetching(list);

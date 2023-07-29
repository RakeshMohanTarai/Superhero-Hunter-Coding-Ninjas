// Get elements by id
let search = document.getElementById("search"); // Get the search input element
const ul = document.getElementById("auto-complete"); // Get the unordered list element
const favarray = []; // Array to store favorite superhero IDs

// Fetch data when the user types in the search input
search.onkeyup = function () {
  var searchname = search.value;
  if (searchname !== "") {
    // Send a request to fetch superhero data based on the search query
    fetch(
      "https://superheroapi.com/api.php/3580926752143021/search/" +
        searchname.trim()
    )
      .then((response) => response.json()) // Parse the response as JSON
      .then((data) => {
        ul.innerText = " "; // Clear the existing list items before adding new ones
        for (var i of data.results) {
          var li = document.createElement("li"); // Create a list item for each superhero
          li.innerHTML = i.name; // Set the content of the list item to the superhero's name
          li.id = i.id; // Set the ID of the list item to the superhero's ID

          // Add a click event listener to each list item
          li.addEventListener("click", function () {
            var heroid = this.id;
            loadDetails(heroid); // Load details of the selected superhero
            ul.innerText = " "; // Clear the unordered list after a superhero is selected
          });

          li.style.display = "block"; // Set the display style of the list item to "block"
          ul.appendChild(li); // Add the list item to the unordered list
        }
      })
      .catch((err) => console.log(err)); // Log any errors that occur during the fetch request
  }
};

// Display hero details when a superhero is clicked
function loadDetails(heroid) {
  fetch(`https://superheroapi.com/api.php/3580926752143021/${heroid}`)
    .then((response) => response.json()) // Parse the response as JSON
    .then((data) => {
      var details = document.getElementById("details");
      details.style.backgroundColor = "rgba(0, 0, 0, 0.8)"; // Set the background color of the details section

      var img = document.getElementById("img");
      img.src = data.image.url; // Set the source of the image to the superhero's image URL

      var name = document.getElementById("name");
      name.innerHTML = data.name; // Set the content of the name element to the superhero's name

      var bio = document.getElementById("bio");
      bio.innerHTML = "Relatives: " + data.connections.relatives; // Display the superhero's relatives in the bio section

      var nature = document.getElementById("nature");
      nature.innerText = "Nature: " + data.biography.alignment; // Display the superhero's alignment (good, bad, neutral)

      var base = document.getElementById("base");
      base.innerHTML = "Work: " + data.work.base; // Display the superhero's base of operations

      var occ = document.getElementById("occupation");
      occ.innerHTML = "Occupation: " + data.work.occupation; // Display the superhero's occupation

      var powestat = document.getElementById("powerstats");
      powestat.innerHTML =
        "Intelligence: " +
        data.powerstats.intelligence +
        ", Combat: " +
        data.powerstats.combat +
        ", Power: " +
        data.powerstats.power +
        ", Speed: " +
        data.powerstats.speed +
        ", Strength: " +
        data.powerstats.strength; // Display the superhero's power stats

      var favv = document.getElementById("favbtn");
      favv.style.display = "flex"; // Make the favorite button visible
      favv.value = data.id; // Set the value of the favorite button to the superhero ID
    })
    .catch((error) => console.log(error)); // Log any errors that occur during the fetch request
}

// Push data to favarray into local storage when the user adds a superhero to favorites
function favpush(favid) {
  if (favarray.includes(favid)) {
    alert("Already Added to the Favourite List"); // Show an alert if the superhero ID is already in the favorites array
    return;
  }

  favarray.push(favid); // Add superhero ID to the favorites array
  console.log(favarray); // Log the updated favorites array to the console
  localStorage.setItem("favlistarr", JSON.stringify(favarray)); // Store favorites array in local storage
}

// Click event listener for the input form
search.onclick = function() {
  // Make the container div visible
  var container = document.getElementById("container");
  container.style.display = "block"; // Display the container when the search input is clicked
  var favbtn = document.getElementById("favbtn");
  favbtn.style.display = "flex"; // Make the favorite button visible
};

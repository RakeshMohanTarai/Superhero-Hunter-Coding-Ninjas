// Get elements by id
let search = document.getElementById("search"); // Get the search input element
const ul = document.getElementById("auto-complete"); // Get the unordered list element
const favarray = []; // Array to store favorite superhero IDs

// Fetch data
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
        ul.innerText = " ";
        for (var i of data.results) {
          var li = document.createElement("li"); // Create a list item for each superhero
          li.innerHTML = i.name;
          li.id = i.id;

          li.addEventListener("click", function () {
            var heroid = this.id;
            loadDetails(heroid); // Load details of the selected superhero
            ul.innerText = " ";
          });

          li.style.display = "block";
          ul.appendChild(li);
        }
      })
      .catch((err) => console.log(err)); // Log any errors that occur during the fetch request
  }
};

// Display hero details
function loadDetails(heroid) {
  fetch(`https://superheroapi.com/api.php/3580926752143021/${heroid}`)
    .then((response) => response.json()) // Parse the response as JSON
    .then((data) => {
      var details = document.getElementById("details");
      details.style.backgroundColor = "rgba(0, 0, 0, 0.8)";

      var img = document.getElementById("img");
      img.src = data.image.url;

      var name = document.getElementById("name");
      name.innerHTML = data.name;

      var bio = document.getElementById("bio");
      bio.innerHTML = "Relatives: " + data.connections.relatives;

      var nature = document.getElementById("nature");
      nature.innerText = "Nature: " + data.biography.alignment;

      var base = document.getElementById("base");
      base.innerHTML = "Work: " + data.work.base;

      var occ = document.getElementById("occupation");
      occ.innerHTML = "Occupation: " + data.work.occupation;

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
        data.powerstats.strength;

      var favv = document.getElementById("favbtn");
      favv.style.display = "flex";
      favv.value = data.id;
    })
    .catch((error) => console.log(error)); // Log any errors that occur during the fetch request
}

// Push data to favarray into local storage
function favpush(favid) {
  if (favarray.includes(favid)) {
    alert("Already Added to the Favourite List");
    return;
  }

  favarray.push(favid); // Add superhero ID to the favorites array
  console.log(favarray);
  localStorage.setItem("favlistarr", JSON.stringify(favarray)); // Store favorites array in local storage
}

// Click event listener for the input form
search.onclick = function() {
  // Make the container div visible
  var container = document.getElementById("container");
  container.style.display = "block";
  var favbtn = document.getElementById("favbtn");
  favbtn.style.display = "flex";
};

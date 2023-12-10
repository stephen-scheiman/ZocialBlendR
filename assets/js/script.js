$("#searchButton").on("click", executeSearch);

// Function to execute the search
function executeSearch() {
  // Get the user input
  var userInput = $('input[name="searchInput"]').val();
  // Get the state of the checkboxes
  var redditCheckbox = document.getElementById("redditCheckbox").checked;
  var youtubeCheckbox = document.getElementById("youtubeCheckbox").checked;
  var bothCheckbox = document.getElementById("bothCheckbox").checked;

  // Decide which API to query based on checkbox selections
  var searchQuery = userInput;
  if (redditCheckbox && !youtubeCheckbox && !bothCheckbox) {
    redditSearch(userInput);
  } else if (!redditCheckbox && youtubeCheckbox && !bothCheckbox) {
    videoSearch(API_KEY, searchQuery, 20);
  } else if (bothCheckbox) {
    redditSearch(userInput);
    videoSearch(API_KEY, searchQuery, 20);
  } else {
    alert("Pick one, don't be difficult");
  }
}

// YouTube Data API key
const API_KEY = "AIzaSyAAFHr-ZGnlwk-w39q6JLAbKLkAwkEQdUg";

// Function to perform the YouTube API search
function videoSearch(API_KEY, userInput, maxResults) {
  fetch(
    `https://www.googleapis.com/youtube/v3/search?key=${API_KEY}&part=snippet&q=${userInput}&type=video&maxResults=${maxResults}`
  )
    .then((response) => response.json())
    .then((data) => {
      // Process the search results
      displayResults(data.items);
    })
    .catch((error) => {
      console.error("Error executing search:", error);
    });
}

// Function to display search results
function displayResults(items) {
  var rootDiv = document.getElementById("root");
  rootDiv.innerHTML = ""; // Clear previous results

  items.forEach((item) => {
    var videoDiv = document.createElement("div");
    videoDiv.innerHTML = `
      <iframe width="560" height="315" src="https://www.youtube.com/embed/${item.id.videoId}" frameborder="0" allowfullscreen></iframe>
    `;
    rootDiv.appendChild(videoDiv);
  });
}
// Function to perform the Reddit API search
function redditSearch(userInput) {
  const redditSearchURL = "https://www.reddit.com/search.json?q=" + userInput;
  fetch(redditSearchURL)
    .then(function (response) {
    //Parse the response
      return response.json();
    })
    .then(function (data) {
      //Write the top 25 results to the console for now
      console.log("Fetch Response \n-------------");
      for (i = 0; i <= 24; i++) {
        console.log(
          "https://reddit.com" + data.data.children[i].data.permalink
        );
      }
    });
}

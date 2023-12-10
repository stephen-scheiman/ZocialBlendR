// Function to execute the search
function executeSearch() {
  // Get the user input
  var userInput = document.getElementById("searchInput").value;

  // Get the state of the checkboxes
  var redditCheckbox = document.getElementById("redditCheckbox").checked;
  var youtubeCheckbox = document.getElementById("youtubeCheckbox").checked;
  var bothCheckbox = document.getElementById("bothCheckbox").checked;

  // Construct the search query based on the checkboxes
  var searchQuery = userInput;
  if (redditCheckbox && !youtubeCheckbox && !bothCheckbox) {
    searchQuery += " ";
  } else if (!redditCheckbox && youtubeCheckbox && !bothCheckbox) {
    searchQuery += " ";
  } else if (bothCheckbox) {
    // You can customize this part based on your requirements
    searchQuery += " site:reddit.com OR site:youtube.com";
  }

  // Perform the API call
  videoSearch(API_KEY, searchQuery, 20);
}

// YouTube Data API key
const API_KEY = 'AIzaSyAAFHr-ZGnlwk-w39q6JLAbKLkAwkEQdUg';

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
      console.error('Error executing search:', error);
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

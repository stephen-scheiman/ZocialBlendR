$(document).ready(function() {

//document.getElementById("btn_executesearch")
//$("#btn_executesearch").
$("#btn_executesearch").click(function(){
  executeSearch();
});
$("#btn_back").click(function(){
  hideElement("#searchbox_results");
  showElement("#searchbox");
  
});


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
    searchQuery += " ";
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


function showElement(in_element) {
  //document.getElementById(in_element).style.display = 'display';
  //$("#searchbox").show();
  //addClass(in_element, "show");
  //removeClass(in_element, "hide");
  $(in_element).removeClass("hide");
}
function hideElement(in_element) {
  //document.getElementById(in_element).style.display = 'none';
  
  //addClass(in_element, "hide");
  $(in_element).addClass("hide");
}

// Function to display search results  
function displayResults(items) {
  var rootDiv = document.getElementById("root");
  rootDiv.innerHTML = ""; // Clear previous results
  
  hideElement("#searchbox");
  showElement("#searchbox_results");

  items.forEach((item) => {
    var videoDiv = document.createElement("div");
    videoDiv.innerHTML = `
      <iframe width="560" height="315" src="https://www.youtube.com/embed/${item.id.videoId}" frameborder="0" allowfullscreen></iframe>
    `;
    rootDiv.appendChild(videoDiv);
  });
}

//function doisplahy r(){
//  hideElement("#searchbox");
//  showElement("#searchbox_results");
//}

}); // end of jQuery
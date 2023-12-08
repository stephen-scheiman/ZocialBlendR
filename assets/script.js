document.addEventListener("DOMContentLoaded", function () {
    // Your existing React code or other initialization code can go here
  });
  
  function executeSearch() {
    // Get the user input
    var userInput = document.getElementById("searchInput").value;
  
    // Get the state of the checkboxes
    var redditCheckbox = document.getElementById("redditCheckbox").checked;
    var youtubeCheckbox = document.getElementById("youtubeCheckbox").checked;
    var bothCheckbox = document.getElementById("bothCheckbox").checked;
  
    // Construct the search query based on the checkboxes
    var searchQuery = "Search for: " + userInput;
    if (redditCheckbox && !youtubeCheckbox && !bothCheckbox) {
      searchQuery += " on Reddit";
    } else if (!redditCheckbox && youtubeCheckbox && !bothCheckbox) {
      searchQuery += " on YouTube";
    } else if (bothCheckbox) {
      searchQuery += " on Both Reddit and YouTube";
    }
  
    // You can replace this with your actual search logic or API call
    alert(searchQuery);
    // Or perform an API call or other search logic here
    // For example:
    // fetch('https://api.example.com/search?q=' + encodeURIComponent(userInput) + '&reddit=' + redditCheckbox + '&youtube=' + youtubeCheckbox)
    //   .then(response => response.json())
    //   .then(data => {
    //     // Process the search results
    //     console.log(data);
    //   })
    //   .catch(error => {
    //     console.error('Error executing search:', error);
    }
  
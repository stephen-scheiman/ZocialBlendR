$(document).ready(function () {
  //Clicking the search button starts the action
  $("#searchButton").on("click", executeSearch);
  // Function to execute the search

  // Get the modal
  var modal = document.getElementById("myModal");

  // Get the <span> element that closes the modal
  var span = document.getElementsByClassName("close")[0];

  // When the user clicks on <span> (x), close the modal
  span.onclick = function () {
    modal.style.display = "none";
  };

  // When the user clicks anywhere outside of the modal, close it
  window.onclick = function (event) {
    if (event.target == modal) {
      modal.style.display = "none";
    }
  };

  function executeSearch() {
    var rootDiv = document.getElementById("root");
    rootDiv.innerHTML = ""; // Clear previous results
    // Get the user input
    var userInput = $('input[name="searchInput"]').val();
    // Get the state of the checkboxes
    var redditCheckbox = document.getElementById("redditCheckbox").checked;
    var youtubeCheckbox = document.getElementById("youtubeCheckbox").checked;
    var bothCheckbox = document.getElementById("bothCheckbox").checked;

    // Decide which API to query based on checkbox selections
    if (redditCheckbox && !youtubeCheckbox && !bothCheckbox) {
      //Call the Reddit API
      redditSearch(userInput);
      $('input[name="searchInput"]').val("");
    } else if (!redditCheckbox && youtubeCheckbox && !bothCheckbox) {
      //Call the YouTube API
      videoSearch(API_KEY, userInput, 20);
      $('input[name="searchInput"]').val("");
    } else if (bothCheckbox) {
      //Call both APIs
      redditSearch(userInput);
      videoSearch(API_KEY, userInput, 20);
      $('input[name="searchInput"]').val("");
    } else {
      //C'mon man.
      //alert("Pick one, don't be difficult");
      modal.style.display = "block";
      $('input[name="searchInput"]').val("");
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
    items.forEach((item) => {
      var videoDiv = document.createElement("li");
      videoDiv.innerHTML = `
      <iframe width="280" height="157" src="https://www.youtube.com/embed/${item.id.videoId}" frameborder="0" allowfullscreen></iframe>
    `;
      rootDiv.appendChild(videoDiv);
    });
  }
  // Function to perform the Reddit API search
  function redditSearch(userInput) {
    const redditSearchURL =
      "https://www.reddit.com/search.json?q=" + userInput + "&raw_json=1";
    fetch(redditSearchURL)
      .then(function (response) {
        //Parse the response
        return response.json();
      })
      .then(function (data) {
        //Display the top 25 results via the displayRedditResults function
        var count = 20;
        for (i = 0; i <= count; i++) {
          //Make sure the result has a thumbnail, otherwise discard
          if (data.data.children[i].data.thumbnail.includes("http")) {
            displayRedditResults(
              data.data.children[i].data.url,
              data.data.children[i].data.subreddit,
              data.data.children[i].data.title.slice(0, 100),
              data.data.children[i].data.thumbnail
            );
          } else {
            count++;
          }
        }
      });
  }
  // Format and display the params passed by redditSearch()
  function displayRedditResults(url, subReddit, title, thumbnail) {
    var rootDiv = document.getElementById("root");
    var redditDiv = document.createElement("li");
    console.log(thumbnail);
    redditDiv.innerHTML =
      `<a href=` +
      url +
      `><img src=` +
      thumbnail +
      `><span id=sub>Subreddit: </span>` +
      subReddit +
      `<span id=title><br>Title: </span>` +
      title +
      `...</a>`;
    rootDiv.appendChild(redditDiv);
  }
});

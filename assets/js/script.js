document.addEventListener("DOMContentLoaded", function () {
  const movieContainer = document.getElementById("movie-container");
  const searchForm = document.getElementById("search-form");

  const fetchPopularMovies = async (api) => {
    try {
      // Fetch popular movies data from the API
      const response = await fetch(api);
      const data = await response.json();

      // Save the top 10 movies in local storage
      var topMovies = data.items.slice(0, 10);
      localStorage.setItem("movies", JSON.stringify(topMovies));

      // Display the top 10 movies
      showMovies(topMovies);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const showMovies = (data) => {
    var movieCards = document.getElementsByClassName("card");

    for (let i = 0; i < data.length; i++) {
      var item = data[i];

      // Get the current movie card
      var card = movieCards[i];

      // Create the content div inside the card
      var content = document.createElement("div");
      content.classList.add("content");

      // Set the movie title and rating in the content div
      
      content.innerHTML = `
        <div class="title">
          <h6>${item.fullTitle}</h6>
          <span>${item.imDbRating}</span>
        </div>
        
        <img src="${item.image}" class="movie-image" alt="Movie Poster" style="width: 300px; height: auto;">
      `;
      // added style properties so that we can customize the pictures above 
      //Add "View Trailer" button and add a listener
      var viewTrailerButton = document.createElement('button');
      viewTrailerButton.setAttribute('id', "view-trailer");
      viewTrailerButton.textContent = 'View Trailer';
      viewTrailerButton.addEventListener('click', function(e) {
          var selectedTitle = e.target.parentNode.children[0].children[0].innerHTML;
          locateMovieTrailer(selectedTitle);  
        });
      content.appendChild(viewTrailerButton);

      // Append the content to the card
      card.querySelector(".card-content").appendChild(content);
    }
  };

  const displayMovies = (movies) => {
    // Clear previous search results
    movieContainer.innerHTML = "";

    // Save the search movies in local storage
    localStorage.setItem("searchMovies", JSON.stringify(movies));

    movies.forEach(function (movie) {
      // Create a new <div> element for each movie
      const movieCard = document.createElement("div");
      movieCard.className = "row card-space";
      movieCard.style.width = "300px";

      const cardContent = document.createElement("div");
      cardContent.className = "card-content";
      // start of movie content that display movie title and movie image
      const content = document.createElement("div");
      content.className = "content";
      content.innerHTML = `
   
      <div class="has-text-white"> 
        <div><strong>Title:</strong> ${movie.title}</div>
        </div>
        <img src="${movie.image}" class="movie-image" alt="Movie Poster">
      `;

      const viewTrailerBtn = document.createElement("button");
      viewTrailerBtn.innerText = "View Trailer";
      viewTrailerBtn.addEventListener("click", function () {
        // Open IMDb page of the movie in a new tab/window
        window.open(`https://www.imdb.com/title/${movie.id}/videogallery`);
      });

      content.appendChild(viewTrailerBtn);
      cardContent.appendChild(content);
      movieCard.appendChild(cardContent);
      movieContainer.appendChild(movieCard);
    });
  };

  const searchMovies = async (searchTerm) => {
    // Clear previous search results
    movieContainer.innerHTML = "";

    if (searchTerm !== "") {
      try {
        const response = await fetch(
          `https://imdb-api.com/en/API/SearchMovie/k_u2gn9d58/${searchTerm}`
        );
        const data = await response.json();

        if (data.results.length > 0) {
          displayMovies(data.results);
        } else {
          movieContainer.innerHTML = "No movies found.";
        }
      } catch (error) {
        console.error("Error:", error);
      }
    }
  };

  // Call fetchPopularMovies to fetch and display the top 10 movies
  fetchPopularMovies(
    "https://imdb-api.com/en/API/MostPopularMovies/k_u2gn9d58"
  );

  // Handle search form submission
  searchForm.addEventListener("submit", function (event) {
    // Prevent the default form submission behavior
    event.preventDefault();
    // Trim leading/trailing whitespace
    const searchTerm = document.getElementById("search-movie").value.trim();

    if (searchTerm !== "") {
      searchMovies(searchTerm);
    } else {
      movieContainer.innerHTML = "Please enter a search term.";
    }
  });
});

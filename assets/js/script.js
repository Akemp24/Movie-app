document.addEventListener("DOMContentLoaded", function () {
  const movieContainer = document.getElementById("movie-container");
  const searchForm = document.getElementById("search-form");
  var apiKeyIMDB = "k_67zpx0r8";

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
         <img src="${item.image}" class="movie-image" alt="Movie Poster" style="width: 300px; height: auto;">
         <div class="title">
          <h6>${item.title}</h6>
          <span style= "font-size:16px;">Rating: ${item.imDbRating}</span>
        </div>
      `;
      // added style properties so that we can customize the pictures above
      //Add "View Trailer" button and add a listener
      var viewTrailerButton = document.createElement("button");
      viewTrailerButton.setAttribute("id", "view-trailer");
      viewTrailerButton.textContent = "View Trailer";
      viewTrailerButton.addEventListener("click", function (e) {
        var selectedTitle =
          e.target.parentNode.children[1].children[0].textContent;
        locateMovieTrailer(selectedTitle);
      });
      content.appendChild(viewTrailerButton);

      // Append the content to the card
      card.querySelector(".card-content").appendChild(content);
    }
  };

  function locateMovieTrailer(chosenTitle) {
    //get saved top 10 movies from local storage
    var storedMovies = JSON.parse(window.localStorage.getItem("movies"));
    //locate movie id associated with the selected movie trailer button
    for (i = 0; i < storedMovies.length; i++) {
      if (chosenTitle.toLowerCase() === storedMovies[i].title.toLowerCase()) {
        var chosenMovieId = storedMovies[i].id;
        //Play the selected trailer
        playMovieTrailer(chosenMovieId);
        return;
      }
    }
  }

  function playMovieTrailer(movieId) {
    var url = `https://imdb-api.com/en/API/Trailer/${apiKeyIMDB}/${movieId}`;

    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        if (data.errorMessage) {
          const trailerContainer = document.createElement("div");
          trailerContainer.textContent = data.errorMessage;
          document.body.appendChild(trailerContainer);
          return;
        }
        //Trailer plays in a new window:
        window.open(data.link, "_blank");
      })
      .catch((error) => {
        const trailerContainer = document.createElement("div");
        trailerContainer.textContent =
          "Error occurred while fetching the trailer.";
        document.body.appendChild(trailerContainer);
        console.error(error);
      });
  }

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
        <img src="${movie.image}" class="movie-image" alt="Movie Poster">
        <div><strong>Title:</strong> ${movie.title}</div>
        </div>
      `;

      const viewTrailerBtn = document.createElement("button");
      viewTrailerBtn.innerText = "View Trailer";
      viewTrailerBtn.addEventListener("click", function () {
        // Open IMDb page of the movie trailer in a new tab/window
        playMovieTrailer(movie.id);
      });

      content.appendChild(viewTrailerBtn);
      cardContent.appendChild(content);
      movieCard.appendChild(cardContent);
      movieContainer.appendChild(movieCard);
    });
  };

  const searchMovies = async (searchTerm) => {
    if (searchTerm !== "") {
      try {
        const response = await fetch(
          `https://imdb-api.com/en/API/SearchMovie/${apiKeyIMDB}/${searchTerm}`
        );
        const data = await response.json();

        if (data.results.length > 0) {
          //display results of the search-by-title
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
    "https://imdb-api.com/en/API/MostPopularMovies/" + apiKeyIMDB
  );

  // Handle search form submission
  searchForm.addEventListener("submit", function (event) {
    // Prevent the default form submission behavior
    event.preventDefault();
    // Trim leading/trailing whitespace
    const searchTerm = document.getElementById("search-movie").value.trim();

    if (searchTerm !== "") {
      movieContainer.innerHTML = "";
      //display loading gif for 2 seconds
      showLoadingImg();
      setTimeout(() => {
          searchMovies(searchTerm);
        }, 2000);  // 2 seconds
    } else {
      movieContainer.innerHTML = "Please enter a search term.";
    }
  });

  function showLoadingImg() {
    //display loading gif on page
    var loadingImgURL = "./assets/images/Loading_rainbow_globe.gif";
    movieContainer.innerHTML = `<img src="${loadingImgURL}" id="loading-image" alt="Loading image" width="800px" height="800px">`;
  }

function fetchUpcomingMovies() {
  const apiKey = "7b682c20bca29c7165fa16b4b81ab168";
  const apiUrl = `https://api.themoviedb.org/3/movie/upcoming?api_key=${apiKey}`;

  fetch(apiUrl)
    .then((response) => response.json())
    .then((data) => {
      const movies = data.results;
      const movieContainer = document.getElementById("movie-container");
      // Clear the existing movie content
      movieContainer.innerHTML = "";

      if (movies.length === 0) {
        const noResultsMessage = document.createElement("p");
        noResultsMessage.textContent = "No results found.";
        movieContainer.appendChild(noResultsMessage);
      } else {
        movies.forEach((movie) => {
          const title = movie.title;
          const posterPath = movie.poster_path;
          const listItem = document.createElement("div");
          listItem.classList.add(
            "row",
            "card-space",
            "is-size-6-mobile",
            "is-size-6-touch",
            "is-size-6-desktop"
          );
          listItem.style.width = "300px";

          const card = document.createElement("div");
          card.classList.add("card");

          const cardContent = document.createElement("div");
          cardContent.classList.add("card-content");

          const posterElement = document.createElement("img");
          posterElement.src = `https://image.tmdb.org/t/p/w300${posterPath}`;
          posterElement.alt = title;
          posterElement.classList.add("my-4");
          cardContent.appendChild(posterElement);
          posterElement.style.paddingTop = `100px`;

          const titleElement = document.createElement("h2");
          titleElement.textContent = title;
          cardContent.appendChild(titleElement);

          card.appendChild(cardContent);
          listItem.appendChild(card);
          movieContainer.appendChild(listItem);
        });
      }
    })
    .catch((error) => {
      console.log("Error fetching upcoming movies:", error);
    });
}

// Add event listener to the "Upcoming Movies" button
const upcomingMoviesButton = document.querySelector(".upcoming-movie");
upcomingMoviesButton.addEventListener("click", fetchUpcomingMovies);

});

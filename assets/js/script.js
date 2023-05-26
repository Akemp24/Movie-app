
const movieContainer = document.querySelector("#movie-container");

const fetchPopularMovies = async (api) => {
  // Fetch popular movies data from the API
  const response = await fetch(api);
  const data = await response.json();

  // Save the top 10 movies in local storage
  var topMovies = data.items.slice(0, 10);
  localStorage.setItem('movies', JSON.stringify(topMovies));

  // Display the top 10 movies
  showMovies(topMovies);
};

var showMovies = (data) => {
  for (let i = 0; i < data.length; i++) {
    var item = data[i];
    // Create a new div element to hold each movie
    var box = document.createElement("div");
    box.classList.add("box");

// Create the overlay containing for movie fulltitle,and rating
    box.innerHTML = `
      <div class="overlay">
        <div class="title">
        <h2>${item.fullTitle}</h2>
          <span>${item.imDbRating}</span>
        </div>
        <img src="${item.image}" class="movie-image" alt="Movie Poster">
      </div>
    `;
     // Append the box to the movieContainer element
    movieContainer.appendChild(box);
  }
};

// Call fetchPopularMovies to fetch and display the top 10 movies
fetchPopularMovies('https://imdb-api.com/en/API/MostPopularMovies/k_u2gn9d58');



function displayMovieTrailer(movieId) {
  const apiKey = 'k_u2gn9d58'; // Replace with your IMDb API key
  const url = `https://imdb-api.com/en/API/Trailer/${apiKey}/${movieId}`;

  // Create and append the <h1> element
  const h1 = document.createElement('h1');
  h1.textContent = 'Movie Trailer';
  document.body.appendChild(h1);

  fetch(url)
    .then(response => response.json())
    .then(data => {
      if (data.errorMessage) {
        const trailerContainer = document.createElement('div');
        trailerContainer.textContent = data.errorMessage;
        document.body.appendChild(trailerContainer);
        return;
      }

      const trailerUrl = data.videoUrl;
      const iframe = document.createElement('iframe');
      iframe.src = trailerUrl;
      iframe.width = '100%';
      iframe.height = '400px';

      const trailerContainer = document.createElement('div');
      trailerContainer.id = 'trailer-container';
      trailerContainer.appendChild(iframe);

      document.body.appendChild(trailerContainer);
    })
    .catch(error => {
      const trailerContainer = document.createElement('div');
      trailerContainer.textContent = 'Error occurred while fetching the trailer.';
      document.body.appendChild(trailerContainer);
      console.error(error);
    });
}

// Example usage
displayMovieTrailer('k_u2gn9d58');

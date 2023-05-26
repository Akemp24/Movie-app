
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


function fetchTrailer(movieId) {
  const apiKey = 'k_u2gn9d58';
  const apiUrl = `https://imdb-api.com/en/API/Trailer/${apiKey}/${movieId}`;
  
  fetch(apiUrl)
    .then(response => response.json())
    .then(data => {
      const trailerUrl = data.videoUrl;
      displayTrailer(trailerUrl);
    })
    .catch(error => {
      console.log('Error:', error);
    });
}

function displayTrailer(trailerUrl) {
  const trailerContainer = document.createElement('div');
  trailerContainer.id = 'trailer-container';
  document.body.appendChild(trailerContainer);
  
  const videoElement = document.createElement('video');
  videoElement.src = trailerUrl;
  videoElement.controls = true;
  videoElement.width = 640;
  videoElement.height = 360;

  trailerContainer.appendChild(videoElement);
}

// Example usage
const movieId = 'tt1375666'; // Replace with your desired IMDb movie ID
fetchTrailer(movieId);


 



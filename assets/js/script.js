
document.addEventListener('DOMContentLoaded', function() {
  const movieContainer = document.getElementById('movie-container');

  const fetchPopularMovies = async (api) => {
    try {
      // Fetch popular movies data from the API
      const response = await fetch(api);
      const data = await response.json();

      // Save the top 10 movies in local storage
      var topMovies = data.items.slice(0, 10);
      localStorage.setItem('movies', JSON.stringify(topMovies));

      // Display the top 10 movies
      showMovies(topMovies);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  var showMovies = (data) => {
    var movieCards = document.getElementsByClassName('card');

    for (let i = 0; i < data.length; i++) {
      var item = data[i];

      // Get the current movie card
      var card = movieCards[i];

      // Create the content div inside the card
      var content = document.createElement('div');
      content.classList.add('content');

      // Set the movie title and rating in the content div
      
      content.innerHTML = `
        <div class="title">
          <h6>${item.fullTitle}</h6>
          <span>${item.imDbRating}</span>
        </div>
        
        <img src="${item.image}" class="movie-image" alt="Movie Poster" style="width: 200px; height: auto;">
      `;
      // added style properties so that we can customize the pictures above 

      // Append the content to the card
      card.querySelector('.card-content').appendChild(content);
    }
  };

  // Call fetchPopularMovies to fetch and display the top 10 movies
  fetchPopularMovies('https://imdb-api.com/en/API/MostPopularMovies/k_u2gn9d58');


  function showTitle () {
    
  }
});

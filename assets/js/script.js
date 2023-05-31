
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
      card.querySelector('.card-content').appendChild(content);
    }
  };

  // Call fetchPopularMovies to fetch and display the top 10 movies
  fetchPopularMovies('https://imdb-api.com/en/API/MostPopularMovies/k_u2gn9d58');
  
function locateMovieTrailer(chosenTitle) {
  //get saved top 10 movies from local storage 
  var storedMovies = JSON.parse(window.localStorage.getItem("movies"))
  //locate movie id associated with the selected movie trailer button 
  for (i=0; i<10; i++) {
    if (chosenTitle === storedMovies[i].fullTitle) {
      var chosenMovieId = storedMovies[i].id;
      //Play the selected trailer
      playMovieTrailer(chosenMovieId);
      return; 
    }  
  }
}

function playMovieTrailer(movieId) {
  var apiKey = 'k_67zpx0r8';
  var url = `https://imdb-api.com/en/API/Trailer/${apiKey}/${movieId}`;

  fetch(url)
    .then(response => response.json())
    .then(data => {
      if (data.errorMessage) {
        const trailerContainer = document.createElement('div');
        trailerContainer.textContent = data.errorMessage;
        document.body.appendChild(trailerContainer);
        return;
      }
      //Trailer plays in a new window: 
      window.open(data.link, '_blank');
    })
    .catch(error => {
      const trailerContainer = document.createElement('div');
      trailerContainer.textContent = 'Error occurred while fetching the trailer.';
      document.body.appendChild(trailerContainer);
      console.error(error);
    });
}

//keep this line at the very bottom of script.js
});
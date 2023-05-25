var searchedMovie = 



  var apiUrl = 'https://imdb-api.com/en/API/MostPopularMovies/k_e6pkz5yf';

  fetch(apiUrl)
    .then(function (response) {
        console.log(response);
      if (response.ok) {
        response.json().then(function (data) {
            console.log(data);
        });
      } else {
        alert('Error');
      }
    })
    .catch(function (error) {
      alert('error');
    });
# JAKD Movies App Web Page

## Description
This project is a dynamic web page that showcases popular movies and allows users to search for films based on their preferences. It fetches movie data from an API and presents the top 10 trending movies in an appealing format. Users can easily navigate through movie options, view details such as ratings and titles, and even watch trailers with a simple click.

 ## User Story
As a movie lover, I want to have a convenient way to explore popular movies and find trailers for them. With the Movie App, I can quickly access a list of top 10 movies and get a glimpse of their ratings and titles. I can also search for specific movies using the search feature and view their trailers directly on the app. This saves me time and effort in finding and watching movie trailers, helping me make better choices about which movies to watch.

## Features
<ol>
<li>Display popular movies: The web page fetches data from an API and displays the top 10 trending movies on the home page.</li>
<li>Movie search: Users can search for movies based on their preferences using the search form.</li>
<li>Dynamic content: The interface is designed to be user-friendly and dynamically updates the content based on user interactions.</li>
<li>Watch trailers: Users can click on the "View Trailer" button to watch the trailer of a selected movie, which opens in a new window or tab.</li>
<li>Local storage: The code utilizes local storage to store the top movies and search results for later use.</li>
</ol>

## Technologies Used
<ol>
<li>HTML: Used for the structure and layout of the web page.</li>
<li>CSS: Used for styling and presentation of the web page.</li>
<li>JavaScript: Used to fetch movie data from the API, manipulate the DOM, and handle user interactions.</li>
<li>https://imdb-api.com/</li>
</ol>

## API Key
This project uses an API to fetch movie data. To use your own API key, replace the placeholder API key in the code with your own. Make sure to update the API endpoint URLs as well.

const apiKey = '<your-api-key>';<br>
const fetchPopularMoviesURL = `https://imdb-api.com/en/API/MostPopularMovies/${apiKey}`;<br>
const searchMoviesURL = `https://imdb-api.com/en/API/SearchMovie/${apiKey}`;
// ...<br>
import React, { useState , useEffect } from 'react';
import axios from 'axios';
import { apiKey } from './api';
import MovieDetails from './movieDetails';


const SearchBar = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [movies, setMovies] = useState([]);
    const [selectedMovie, setSelectedMovie] = useState(null);
    const [currentPage, setCurrentPage] = useState(1); // Track current page
  const [totalResults, setTotalResults] = useState(0); // Track total results
  const [isDarkMode, setIsDarkMode] = useState(false); // State for dark mode
  const [hasSearched, setHasSearched] = useState(false);

 
const onSearchHandler = (e) => {
  setHasSearched(true); // Set  to true when a search is initiated
  e.preventDefault(); // Prevent default form submission
  if (!searchTerm) return; // Don't search if input is empty

  // Perform API request for the initial search
  axios.get(`https://www.omdbapi.com/?s=${searchTerm}&page=1&apikey=${apiKey}`)
    .then(response => {
      if (response.data.Response === "True") {
        setMovies(response.data.Search || []); // Set movies
        setTotalResults(parseInt(response.data.totalResults, 10)); // Set total results
        setCurrentPage(1); // Reset current page to 1 for new search
      } else {
        setMovies([]); // Clear movies if no results
      }
    })
    .catch(error => {
      console.error("Error fetching movies:", error);
    });
};

 
  const fetchMovieDetails = (imdbID) => {
    axios.get(`https://www.omdbapi.com/?i=${imdbID}&&apikey=${apiKey}`)
      .then(response => {
        if (response.data.Response === "True") {
          setSelectedMovie(response.data); // Set the selected movie data
        } else {
          console.error("Movie details not found");
        }
      })
      .catch(error => {
        console.error("Error fetching the movie details:", error);
      });
  };
  const onMovieClick = (imdbID) => {
    fetchMovieDetails(imdbID); // Fetch details of the selected movie
  };

  const onBackToList = () => {
    setSelectedMovie(null); // Deselect movie to go back to the list
  };

 
       // 2. useEffect to fetch more movies when the page number changes
  useEffect(() => {
    if (currentPage === 1) return; // Avoid fetching again for the first page

    axios.get(`https://www.omdbapi.com/?s=${searchTerm}&page=${currentPage}&apikey=${apiKey}`)
      .then(response => {
        if (response.data.Response === "True") {
          setMovies(prevMovies => [...prevMovies, ...response.data.Search]);
        }
      })
      .catch(error => {
        console.error("Error loading more movies:", error);
      });
  }, [currentPage]); // Trigger this effect when 'currentPage' changes
    // Load more movies (triggering a page increase)
    const loadMoreMovies = () => {
      setCurrentPage(prevPage => prevPage + 1);
    };
 // Function to toggle dark mode
 const toggleDarkMode = () => {
  setIsDarkMode(!isDarkMode);
};

// Effect to set the body class based on dark mode state
useEffect(() => {
  if (isDarkMode) {
    document.body.classList.add('bg-gray-900', 'text-white'); // Dark mode classes
    document.body.classList.remove('bg-white', 'text-black'); // Light mode classes
  } else {
    document.body.classList.add('bg-white', 'text-black'); // Light mode classes
    document.body.classList.remove('bg-gray-900', 'text-white'); // Dark mode classes
  }
}, [isDarkMode]);


return (
  <div
    className={`min-h-screen ${isDarkMode ? 'bg-gray-900' : 'bg-white'}  p-4 transition-all duration-300`}
  >
    <button
      onClick={toggleDarkMode}
      className="mb-4 px-4 py-2 border rounded bg-black text-white hover:bg-gray-800 font-bold"
    >
      Toggle Dark Mode
    </button>

    <div className="flex flex-col md:flex-row items-center justify-center gap-4 w-full mb-8">
      <h1 className={`font-bold text-2xl ${isDarkMode ? 'text-white' : 'text-black'}`}>
        Search Your Movie Here:
      </h1>
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className={`w-full md:w-1/2 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black transition-colors duration-200 ${
          isDarkMode ? 'text-black' : 'text-black'
        }`}
        placeholder="Search for movies..."
      />
      <button
        type="submit"
        className="px-4 py-2 border bg-black text-white rounded-md hover:bg-gray-800 focus:outline-none font-bold"
        onClick={onSearchHandler}
      >
        Search
      </button>
    </div>

    {!selectedMovie ? (
      <div className="movies-container p-4">
        {hasSearched && movies.length === 0 ? (
          <p className="text-gray-600 text-3xl font-bold text-center">No results found.</p>
        ) : (
          movies.length > 0 && (
            <>
              <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {movies.map((movie) => (
                  <li
                    key={movie.imdbID}
                    className="bg-gray-800 p-4 rounded-lg shadow-lg transition transform hover:scale-105 flex flex-col justify-between"
                  >
                    <h2 className="text-lg font-bold text-white mb-2">{movie.Title}</h2>
                    <p className="text-gray-400">Year: {movie.Year}</p>
                    <img
                      src={
                        movie.Poster !== 'N/A'
                          ? movie.Poster
                          : 'https://via.placeholder.com/300x450?text=No+Image'
                      }
                      alt={movie.Title}
                      className="w-full h-80 mt-2 rounded-md pb-4 object-cover"
                    />
                    <button
                      onClick={() => onMovieClick(movie.imdbID)}
                      className="px-4 py-2 border bg-black text-white rounded-md hover:bg-gray-600 focus:outline-none font-bold mt-4"
                    >
                      View Details
                    </button>
                  </li>
                ))}
              </ul>

              {movies.length < totalResults && (
                <button
                  onClick={loadMoreMovies}
                  className="px-4 py-2 border bg-black text-white rounded-md hover:bg-gray-800 focus:outline-none font-bold mt-6 mx-auto block"
                >
                  Load More
                </button>
              )}
            </>
          )
        )}
      </div>
    ) : (
      <MovieDetails movie={selectedMovie} onBack={onBackToList} isDarkMode={isDarkMode} />
    )}
  </div>
);


}


export default SearchBar 
import React from 'react'


const MovieDetails = ({ movie, onBack, isDarkMode }) => {
    if (!movie) return null;
  return (
    <div
    className={`flex flex-col lg:flex-row items-start lg:items-center justify-between space-y-6 lg:space-y-0 lg:space-x-10 p-6 rounded-lg shadow-lg  transition-all duration-300 ${isDarkMode ? 'text-white' : 'text-black'} ${isDarkMode ? 'bg-gray-900' : 'bg-white'}`}
  >
    <button
      onClick={onBack}
      className="px-4 py-2 border bg-black text-white rounded-md hover:bg-gray-800 focus:outline-none font-bold ml-0 lg:ml-8 self-start lg:self-auto"
    >
      Back to list
    </button>
  
    
    <div className="flex flex-col space-y-2">
    <h2 className="text-2xl font-semibold">{movie.Title}</h2>
    <p><strong>Year:</strong> {movie.Year}</p>
    <p><strong>Director:</strong> {movie.Director}</p>
    <p><strong>Genre:</strong> {movie.Genre}</p>
    <p><strong>Plot:</strong> {movie.Plot}</p>
  </div>
  
    <div className="w-full lg:w-auto lg:flex-shrink-0">
      <img
        src={movie.Poster}
        alt={movie.Title}
        className="w-full lg:w-64 h-auto rounded-lg shadow-md object-cover"
      />
    </div>
  </div>
  
   
  )
}
export default MovieDetails
// document.addEventListener('DOMContentLoaded', function() {
//   function renderMovies(movieArray) {
//     let movieHtmlArray = movieArray.map(function(currentMovie) {
//       return `<div>
//         <img src="${currentMovie.Poster}">
//         <h5>${currentMovie.Title}</h5>
//         <p>${currentMovie.Year}</p>
//       `
//     });
//     return movieHtmlArray.join('');
//   }

//   const moviesContainer = document.querySelector('.movies-container')
//   const movies = document.querySelector('.movie')
//   // moviesContainer.forEach(function (movies) {
//   //   movies.innerHTML = renderMovies(movieData);
//   // })

//   moviesContainer.innerHTML = renderMovies(movieData);
// });
function saveToWatchlist(imdbID) {
  console.log(imdbID);
  const movie = movieData.find(currentMovie => currentMovie.imdbID == imdbID);
  console.log(movie)
  let watchlistJSON = localStorage.getItem('watchlist');
  let watchlist = JSON.parse(watchlistJSON);
  if (watchlist == null) {
    watchlist = []
  }
  watchlist.push(movie);
  // const uniqueSet = new Set(watchlist);
  // const displayWatchlist = [...uniqueSet]
  watchlistJSON = JSON.stringify(watchlist);
  localStorage.setItem('watchlist', watchlistJSON);
}


const myForm = document.getElementById('search-form');
myForm.addEventListener('submit', (e) => {
  e.preventDefault();
  function renderMovies(movieArray) {
    let movieHtmlArray = movieArray.map(currentMovie => {
      return `
      <div class="col-12 col-sm-6 col-md-4 col-lg-3 mb-3">
        <div class="card w-100 h-100 d-flex">
          <img class="card-img-top" src="${currentMovie.Poster}" alt="Card image cap" style="height: 65%">
          <div class="card-body d-flex flex-column justify-content-between align-items-center" style="height: 35%">
            <h5 class="card-title">${currentMovie.Title}</h5>
            <p class="card-text">${currentMovie.Year}</p>
            <button type="button" class="btn btn-primary" onclick="saveToWatchlist('${currentMovie.imdbID}')">Add to Watchlist</button>
          </div>
        </div>
      </div>
      `
    });
    return movieHtmlArray.join('');
  }
  
  const moviesContainer = document.querySelector('.movies-container')
  const moviesRow = document.querySelector('.row')
  moviesContainer.innerHTML = renderMovies(movieData);
  });
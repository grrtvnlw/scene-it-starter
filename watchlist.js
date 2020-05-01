watchlist = localStorage.getItem('watchlist')

parsedList = JSON.parse(watchlist)

function renderMovies(movieArray) {
  let movieHtmlArray = movieArray.map(currentMovie => {
    return `
    <div class="col-12 col-sm-6 col-md-4 col-lg-3 mb-3">
      <div class="card w-100 h-100 d-flex">
        <img class="card-img-top" src="${currentMovie.Poster}" alt="Card image cap" style="height: 65%">
        <div class="card-body d-flex flex-column justify-content-between align-items-center border border-danger w-100 p-0 m-0" style="height: 35%">
          <div class="d-flex flex-column justify-content-start align-items-center border border-dark rounded" style="height: 75%">
            <h5 class="card-title text-center">${currentMovie.Title}</h5>
            <p class="card-text">${currentMovie.Year}</p>
          </div>
          <div class="d-flex flex-column justify-content-end align-items-center border border-dark rounded w-100" style="height: 25%">
            <button type="button" class="btn btn-primary p-1" onclick="removeFromWatchlist('${currentMovie.imdbID}')">Remove from Watchlist</button>
          </div>        
        </div>
      </div>
    </div>
    `
  });
  return movieHtmlArray.join('');
}

const moviesContainer = document.querySelector('#movies-container')
const moviesRow = document.querySelector('.row')
moviesContainer.innerHTML = renderMovies(parsedList);

function removeFromWatchlist(imdbID) {
  let watchlistJSON = localStorage.getItem('watchlist');
  let watchlist = JSON.parse(watchlistJSON);
  const movie = watchlist.find(currentMovie => currentMovie.imdbID == imdbID);
  let updatedWatchlist = watchlist.filter(item => {
    return item.Title != movie.Title
  });
  watchlistJSON = JSON.stringify(updatedWatchlist);
  localStorage.setItem('watchlist', watchlistJSON);
  moviesContainer.innerHTML = renderMovies(updatedWatchlist);
}
let movies = [];

function saveToWatchlist(imdbID) {
  const movie = movies.find(currentMovie => currentMovie.imdbID == imdbID);
  let watchlistJSON = localStorage.getItem('watchlist');
  let watchlist = JSON.parse(watchlistJSON);
  if (watchlist == null) {
    watchlist = []
  }
  let watchlistMovie = watchlist.find(currentMovie => currentMovie.imdbID == imdbID)
  if (!watchlistMovie) {
    watchlist.push(movie);
  }
  watchlistJSON = JSON.stringify(watchlist);
  localStorage.setItem('watchlist', watchlistJSON);
}

const myForm = document.getElementById('search-form');
myForm.addEventListener('submit', (e) => {
  e.preventDefault();
  let searchString = $('.search-bar').val()
  let urlEncodedSearchString = encodeURIComponent(searchString)
  axios.get("http://www.omdbapi.com/?apikey=efe3c50b&s=" + urlEncodedSearchString)
    .then(response => {
      movies = response.data.Search
      renderMovies(movies);
      let movieHTML = renderMovies(movies);
      moviesContainer.innerHTML = movieHTML;
      return movies  
    })

  function renderMovies(movieArray) {
    let movieHtmlArray = movieArray.map(currentMovie => {
      // console.log(movieArray)
      axios.get("http://www.omdbapi.com/?apikey=efe3c50b&i=" + currentMovie.imdbID)
        .then(function (response) {
          // console.log(response)
          moviesContainer.innerHTML += (`
            <div class="col-6 col-sm-6 col-md-4 col-lg-3 mb-3">
              <div class="card w-100 h-100 d-flex">
                <img class="card-img-top" src="${response.data.Poster}" alt="Card image cap" style="height: 65%">
                <div class="card-body d-flex flex-column justify-content-between align-items-center border border-danger w-100 p-0 m-0" style="height: 35%">
                <div class="d-flex flex-column justify-content-evenly align-items-center border border-dark rounded" style="height: 75%">
                  <div class="mb-0">
                    <h5 class="card-title text-center border border-dark">${response.data.Title}</h5>
                  </div>  
                  <div class="dropdown d-flex align-items-start border border-dark m-0 p-0" style="height: 25%">
                    <p class="card-text mr-4">${response.data.Year}</p>
                    <button class="btn btn-light dropdown-toggle p-0" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                      Plot
                    </button>
                    <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                      <label>${response.data.Plot}<label>
                    </div>
                  </div>
                </div>
                <div class="d-flex flex-column justify-content-end align-items-center border border-dark rounded w-100" style="height: 25%">
                  <button type="button" class="btn btn-primary p-1" onclick="saveToWatchlist('${response.data.imdbID}')">Add to Watchlist</button>
                </div>
              </div>
              </div>
            </div>
          `)
        });
    });
    const joined = movieHtmlArray.join('');
    return joined;
  }
  const moviesContainer = document.querySelector('.movies-container')
  const moviesRow = document.querySelector('.row')
  });
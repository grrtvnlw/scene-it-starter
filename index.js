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
      axios.get("http://www.omdbapi.com/?apikey=efe3c50b&i=" + currentMovie.imdbID)
        .then(function (response) {
          console.log(response.data.Title)
          moviesContainer.innerHTML += (`
            <div class="col-12 col-sm-6 col-md-4 col-lg-3 mb-3">
              <div class="card w-100 h-100 d-flex flex-column">
                <div class="d-flex" style="height: 65%">
                  <img class="card-img-top" src="${response.data.Poster}" onerror="if (this.src != 'no_image.png') this.src='no_image.png';" alt="Card image cap">
                </div>
                <div class="card-body d-flex flex-column justify-content-between align-items-center p-0 pt-2 m-0 overflow-auto" style="height: 25%">
                  <a href="https://en.wikipedia.org/wiki/${response.data.Title}" target="_blank"><h5 class="card-title text-center m-0 p-0 font-weight-bold">${response.data.Title}</h5></a>
                  <div class="dropdown d-flex align-items-center m-0 p-0 pt-2">
                    <p class="card-text mr-4 m-0 p-0">${response.data.Year}</p>
                    <!-- Button trigger modal -->
                    <button type="button" class="btn btn-dark m-0 p-0" data-toggle="modal" data-target="#${response.data.imdbID}">
                      Plot
                    </button>
                    <!-- Modal -->
                    <div class="modal fade" id="${response.data.imdbID}" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                      <div class="modal-dialog modal-dialog-centered" role="document">
                        <div class="modal-content">
                          <div class="modal-header">
                            <h5 class="modal-title" id="exampleModalLongTitle">${response.data.Title}</h5>
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                              <span aria-hidden="true">&times;</span>
                            </button>
                          </div>
                          <div class="modal-body">
                            <label>${response.data.Plot}<label>
                          </div>
                          <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                          </div>
                        </div>
                      </div>
                    </div>
                    </div>
                    <div class="text-center d-flex justify-content-center m-0 p-2">
                      <p class="card-text text-center border border-dark rounded p-1 font-weight-bold"><span class="bg-warning p-1 rounded font-weight-bold">IMDb</span> ${response.data.imdbRating}/10 ⭐️</p>
                    </div>
                  </div>
                  <div class="d-flex flex-column justify-content-center align-items-center" style="height: 10%">
                    <button type="button" class="btn btn-light p-1" onclick="saveToWatchlist('${response.data.imdbID}')">Add to Watchlist</button>
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
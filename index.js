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
myForm.addEventListener('click', (e) => {
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
          moviesContainer.innerHTML += (`
            <div class="col-12 col-sm-6 col-md-4 col-lg-3 mb-3">
              <div class="card w-100 h-100 d-flex">
                <img class="card-img-top" src="${response.data.Poster}" onerror="if (this.src != 'no_image.png') this.src='no_image.png';" alt="Card image cap" style="height: 65%">
                <div class="card-body d-flex flex-column justify-content-between align-items-center w-100 p-0 pt-3 m-0" style="height: 35%">
                <div class="d-flex flex-column justify-content-evenly align-items-center" style="height: 80%">
                  <div class="mb-0">
                    <h5 class="card-title text-center">${response.data.Title}</h5>
                  </div>  
                  <div class="dropdown d-flex align-items-start m-0 p-0 mt-2" style="height: 20%">
                    <p class="card-text mr-4">${response.data.Year}</p>
                    <!-- Button trigger modal -->
                    <button type="button" class="btn btn-light m-0 p-0" data-toggle="modal" data-target="#${response.data.imdbID}">
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
                    <div class="text-center d-flex justify-content-center m-0 p-0 mt-3">
                      <p class="card-text text-center">IMDB rating: ${response.data.imdbRating}</p>
                    </div>
                  </div>
                  <div class="d-flex flex-column justify-content-end align-items-center rounded w-100 pb-3" style="height: 20%">
                    <button type="button" class="btn btn-primary p-1" onclick="saveToWatchlist('${response.data.imdbID}')">Add to Watchlist</button>
                  </div>
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
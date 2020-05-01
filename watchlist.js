watchlist = localStorage.getItem('watchlist')

parsedList = JSON.parse(watchlist)

function renderMovies(movieArray) {
  let movieHtmlArray = movieArray.map(currentMovie => {
    return `
    <div class="col-6 col-sm-6 col-md-4 col-lg-3 mb-3">
      <div class="card w-100 h-100 d-flex">
        <img class="card-img-top" src="${currentMovie.Poster}" onerror="if (this.src != 'no_image.png') this.src = 'no_image.png';" alt="Card image cap" style="height: 65%">
        <div class="card-body d-flex flex-column justify-content-between align-items-center w-100 p-0 pt-3 m-0" style="height: 35%">
        <div class="d-flex flex-column justify-content-evenly align-items-center" style="height: 80%">
          <div class="mb-0">
            <h5 class="card-title text-center">${currentMovie.Title}</h5>
          </div>  
          <div class="dropdown d-flex align-items-start m-0 p-0 mt-2" style="height: 20%">
            <p class="card-text mr-4">${currentMovie.Year}</p>
            <!-- Button trigger modal -->
            <button type="button" class="btn btn-light m-0 p-0" data-toggle="modal" data-target="#${currentMovie.imdbID}">
              Plot
            </button>
            <!-- Modal -->
            <div class="modal fade" id="${currentMovie.imdbID}" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
              <div class="modal-dialog modal-dialog-centered" role="document">
                <div class="modal-content">
                  <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLongTitle">${currentMovie.Title}</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                      <span aria-hidden="true">&times;</span>
                    </button>
                  </div>
                  <div class="modal-body">
                  <label>${currentMovie.Plot}<label>
                  </div>
                  <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                  </div>
                </div>
              </div>
            </div>
            </div>
            <div class="text-center d-flex justify-content-center m-0 p-0 mt-3">
              <p class="card-text text-center">IMDB rating: ${currentMovie.imdbRating}</p>
            </div>
          </div>
          <div class="d-flex flex-column justify-content-end align-items-center rounded w-100 pb-3" style="height: 20%">
            <button type="button" class="btn btn-primary p-1" onclick="removeFromWatchlist('${currentMovie.imdbID}')">Remove From Watchlist</button>
          </div>
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
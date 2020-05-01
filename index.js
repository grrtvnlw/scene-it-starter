let movies = [];

function saveToWatchlist(imdbID) {
  const movie = movies.find(currentMovie => currentMovie.imdbID == imdbID);
  let watchlistJSON = localStorage.getItem('watchlist');
  let watchlist = JSON.parse(watchlistJSON);
  if (watchlist == null) {
    watchlist = []
  }
  watchlist.push(movie);
  // displayWatchlist = watchlist.reduce((unique, item) => {
  //   console.log(item, unique, unique.includes(item), unique.includes(item.Title) ? unique : [...unique, item.Title],);
  //   return unique.includes(item.Title) ? unique : [...unique, item.Title]
  // }, []);
  // console.log(displayWatchlist)
  // watchlistJSON = JSON.stringify(displayWatchlist);
  let reduced = watchlist.reduce((unique, item) => {
    console.log(unique.includes(item.Title) ? unique : [...unique, item.Title],);
    return unique.includes(item.Title) ? unique : [...unique, item.Title]
  }, []);
  console.log(reduced)
  watchlistJSON = JSON.stringify(watchlist);
  localStorage.setItem('watchlist', watchlistJSON);
}

const myForm = document.getElementById('search-form');
myForm.addEventListener('submit', (e) => {
  e.preventDefault();
  let searchString = $('.search-bar').val()
  let urlEncodedSearchString = encodeURIComponent(searchString)
  axios.get("http://www.omdbapi.com/?apikey=b43843a0&s=" + urlEncodedSearchString)
    .then(response => {
      movies = response.data.Search
      // console.log(movies)
      renderMovies(movies);
      let movieHTML = renderMovies(movies);
      moviesContainer.innerHTML = movieHTML;
      return movies  
    })

  function renderMovies(movieArray) {
    let movieHtmlArray = movieArray.map(currentMovie => {
      console.log(movieArray)
      axios.get("http://www.omdbapi.com/?apikey=b43843a0&i=" + currentMovie.imdbID)
        .then(function (response) {
          console.log(response)
          moviesContainer.innerHTML += (`
            <div class="col-6 col-sm-6 col-md-4 col-lg-3 mb-3">
              <div class="card w-100 h-100 d-flex">
                <img class="card-img-top" src="${response.data.Poster}" alt="Card image cap" style="height: 65%">
                <div class="card-body d-flex flex-column justify-content-between align-items-center border border-danger w-100 p-0 m-0" style="height: 35%">
                <div class="d-flex flex-column justify-content-start align-items-center border border-dark rounded" style="height: 75%">
                  <h5 class="card-title text-center">${response.data.Title}</h5>
                  <p class="card-text">${response.data.Year}</p>
                  <div class="dropdown">
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
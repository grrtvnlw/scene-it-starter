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

const myForm = document.getElementById('search-form');
myForm.addEventListener('submit', function(e) {
  e.preventDefault();
  function renderMovies(movieArray) {
    let movieHtmlArray = movieArray.map(function(currentMovie) {
      return `
      <div class="col-12 col-sm-6 col-md-4 col-lg-3 mb-3">
        <div class="card w-100 h-100 d-flex border border-danger">
          <img class="card-img-top" src="${currentMovie.Poster}" alt="Card image cap">
          <div class="card-body d-flex flex-column border border-success justify-content-between" style="height: 100%">
            <h5 class="card-title border border-info">${currentMovie.Title}</h5>
            <p class="card-text border border-info">${currentMovie.Year}</p>
            <a href="#" class="btn btn-primary justify-self-end">Go somewhere</a>
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
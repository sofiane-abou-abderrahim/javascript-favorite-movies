const addMovieModal = document.getElementById('add-modal');
// const addMovieModal = document.querySelector('#add-modal');
// const addMovieModal = document.body.children[1];
const startAddMovieButton = document.querySelector('header button');
// const startAddMovieButton = document.querySelector('header').lastElementChild;
const backdrop = document.getElementById('backdrop');
// const backdrop = document.body.firstElementChild;
const cancelAddMovieButton = addMovieModal.querySelector('.btn--passive');
// const confirmAddMovieButton = addMovieModal.querySelector('.btn--success'); // best way
const confirmAddMovieButton = cancelAddMovieButton.nextElementSibling; // just to practice the DOM traversal
const userInputs = addMovieModal.querySelectorAll('input');
// const userInputs = addMovieModal.getElementsByTagName('input');
const entryTextSection = document.getElementById('entry-text');
const deleteMovieModal = document.getElementById('delete-modal'); // available globally to use it in closeMovieDeletionModal function

const movies = [];

const updateUI = () => {
  if (movies.length === 0) {
    entryTextSection.style.display = 'block';
  } else {
    entryTextSection.style.display = 'none';
  }
};

/*
we use movieId to find that movie with that ID in the movies array (declared above)
// The movie index in movie array = index in newMovieElement in listRoot in renderNewMovieElement function
  => because the order when we add the movie is the same
So, we use a for of loop to find out the index in the array
*/

const deleteMovie = () => {
  let movieIndex = 0;
  for (const movie of movies) {
    if (movie.id === movieId) {
      break;
    }
    movieIndex++;
  }
  movies.splice(movieIndex, 1); // First, we remove the element from our list of movies from the array in JavaScript
  const listRoot = document.getElementById('movie-list');
  listRoot.children[movieIndex].remove(); // Secondly, we remove it from the DOM
  // listRoot.removeChild(listRoot.children[movieIndex]);
};

const closeMovieDeletionModal = () => {
  toggleBackdrop();
  deleteMovieModal.classList.remove('visible');
};

const deleteMovieHandler = movieId => {
  deleteMovieModal.classList.add('visible'); // we can't use classList.toggle here, because removing doesn't make sense
  toggleBackdrop();
  // deleteMovie(movieId);
};

const renderNewMovieElement = (id, title, imageUrl, rating) => {
  // we add the unique identifier as an argument so we can bind it in newMovieElement event listener
  const newMovieElement = document.createElement('li');
  newMovieElement.className = 'movie-element'; // class in app.css to style the elements in the list
  newMovieElement.innerHTML = `
    <div class="movie-element__image">
      <img src="${imageUrl}" alt="${title}">
    </div>
    <div class="movie-element__info">
      <h2>${title}</h2>
      <p>${rating}/5 stars</p>
    </div>
  `;
  // outside this function, newMovieElement is undefined
  newMovieElement.addEventListener('click', deleteMovieHandler.bind(null, id));
  // bind() helps us to find out which element was clicked, and we need a unique identifier for that movie that's created
  const listRoot = document.getElementById('movie-list');
  listRoot.append(newMovieElement);
};

const toggleBackdrop = () => {
  backdrop.classList.toggle('visible');
};

const closeMovieModal = () => {
  addMovieModal.classList.remove('visible'); // removes instead of toggling
};

const showMovieModal = () => {
  // function () {}
  // addMovieModal.className = 'modal card visible';
  addMovieModal.classList.add('visible'); // we use add instead of toggle
  toggleBackdrop(); // instead of adding another startAddMovieButton event listener
};

const clearMovieInput = () => {
  // userInputs[0].value = '';
  for (const usrInput of userInputs) {
    // userInputs is an array-like object (a node list full of input elements)
    usrInput.value = '';
  }
};

const cancelAddMovieHandler = () => {
  closeMovieModal(); // closes modal and backdrop
  clearMovieInput(); // cancels user input
};

const addMovieHandler = () => {
  const titleValue = userInputs[0].value;
  const imageUrlValue = userInputs[1].value;
  const ratingValue = userInputs[2].value;

  if (
    titleValue.trim() === '' ||
    imageUrlValue.trim() === '' ||
    ratingValue.trim() === '' ||
    +ratingValue < 1 ||
    +ratingValue > 5
  ) {
    alert('Please enter valid values (rating between 1 and 5).');
    return;
  }

  const newMovie = {
    id: Math.random().toString(), // we create an id to get it as an argument in renderNewMovieElement and bind it in newMovieElement event listener
    title: titleValue,
    image: imageUrlValue,
    rating: ratingValue
  };

  movies.push(newMovie);
  console.log(movies);
  closeMovieModal(); // closes modal and backdrop
  toggleBackdrop(); // toggles the backdrop after added a movie
  clearMovieInput(); // cancels user input
  updateUI(); // updates entry text UI whenever a movie is added
  renderNewMovieElement(
    newMovie.id,
    newMovie.title,
    newMovie.image,
    newMovie.rating
  ); // renders new movie elements on the screen
};

const backdropClickHandler = () => {
  closeMovieModal(); // closes modal and backdrop
  closeMovieDeletionModal(); // closes delete movie modal and backdrop
};

startAddMovieButton.addEventListener('click', showMovieModal);
// startAddMovieButton.addEventListener('click', toggleBackdrop); // called toggleBackdrop function inside toggleMovieModal instead
backdrop.addEventListener('click', backdropClickHandler);
cancelAddMovieButton.addEventListener('click', cancelAddMovieHandler);
confirmAddMovieButton.addEventListener('click', addMovieHandler);

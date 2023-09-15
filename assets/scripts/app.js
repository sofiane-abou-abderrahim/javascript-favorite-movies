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

const movies = [];

const updateUI = () => {
  if (movies.length === 0) {
    entryTextSection.style.display = 'block';
  } else {
    entryTextSection.style.display = 'none';
  }
};

const renderNewMovieElement = (title, imageUrl, rating) => {
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
  const listRoot = document.getElementById('movie-list');
  listRoot.append(newMovieElement);
};

const toggleBackdrop = () => {
  backdrop.classList.toggle('visible');
};

const toggleMovieModal = () => {
  // function () {}
  // addMovieModal.className = 'modal card visible';
  addMovieModal.classList.toggle('visible');
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
  toggleMovieModal(); // closes modal and backdrop
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
    title: titleValue,
    image: imageUrlValue,
    rating: ratingValue
  };

  movies.push(newMovie);
  console.log(movies);
  toggleMovieModal(); // closes modal and backdrop
  clearMovieInput(); // cancels user input
  updateUI(); // updates entry text UI whenever a movie is added
  renderNewMovieElement(newMovie.title, newMovie.image, newMovie.rating); // renders new movie elements on the screen
};

const backdropClickHandler = () => {
  toggleMovieModal(); // closes modal and backdrop
};

startAddMovieButton.addEventListener('click', toggleMovieModal);
// startAddMovieButton.addEventListener('click', toggleBackdrop); // called toggleBackdrop function inside toggleMovieModal instead
backdrop.addEventListener('click', backdropClickHandler);
cancelAddMovieButton.addEventListener('click', cancelAddMovieHandler);
confirmAddMovieButton.addEventListener('click', addMovieHandler);

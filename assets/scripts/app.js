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

const toggleBackdrop = () => {
  backdrop.classList.toggle('visible');
};

const toggleMovieModal = () => {
  // function () {}
  // addMovieModal.className = 'modal card visible';
  addMovieModal.classList.toggle('visible');
  toggleBackdrop(); // instead of adding another startAddMovieButton event listener
};

const cancelAddMovieHandler = () => {
  toggleMovieModal(); // close modal and backdrop
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
};

const backdropClickHandler = () => {
  toggleMovieModal(); // close modal and backdrop
};

startAddMovieButton.addEventListener('click', toggleMovieModal);
// startAddMovieButton.addEventListener('click', toggleBackdrop); // called toggleBackdrop function inside toggleMovieModal instead
backdrop.addEventListener('click', backdropClickHandler);
cancelAddMovieButton.addEventListener('click', cancelAddMovieHandler);
confirmAddMovieButton.addEventListener('click', addMovieHandler);

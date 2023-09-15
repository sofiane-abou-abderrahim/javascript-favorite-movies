const addMovieModal = document.getElementById('add-modal');
// const addMovieModal = document.querySelector('#add-modal');
// const addMovieModal = document.body.children[1];
const startAddMovieButton = document.querySelector('header button');
// const startAddMovieButton = document.querySelector('header').lastElementChild;
const backdrop = document.getElementById('backdrop');
// const backdrop = document.body.firstElementChild;

const toggleBackdrop = () => {
  backdrop.classList.toggle('visible');
};

const toggleMovieModal = () => {
  // function () {}
  // addMovieModal.className = 'modal card visible';
  addMovieModal.classList.toggle('visible');
  toggleBackdrop(); // instead of adding another startAddMovieButton event listener
};

const backdropClickHandler = () => {
  toggleMovieModal(); // close modal and backdrop
};

startAddMovieButton.addEventListener('click', toggleMovieModal);
// startAddMovieButton.addEventListener('click', toggleBackdrop); // called toggleBackdrop function inside toggleMovieModal instead
backdrop.addEventListener('click', backdropClickHandler);

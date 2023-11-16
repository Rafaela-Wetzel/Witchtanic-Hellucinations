let startButton = document.getElementById('open-modal');
let endButton = document.getElementById('end-game');

/* Disables the memory cards to be clickable until user has pressed the start button */
document.addEventListener('DOMContentLoaded', function () {
  document.getElementsByClassName('memory-game')[0].classList.add('button-off');
});

/* Modal Box */
/* Source [1] */

// Get the modals
var startModal = document.getElementById('modalStart');
var winModal = document.getElementById('modalWin');
var loseModal = document.getElementById('modalLose'); 

// Get the button that opens the modal
var modalButton = document.getElementById('open-modal');

// Get the element that closes the modal
var span1 = document.getElementById('start-game');
var span2 = document.getElementById('close-modal');

// When the user clicks on 'Start Game' button, open the modal
modalButton.onclick = function() {
  startModal.style.display = 'block';
}

// Find a way to not write this twice!!
// When the user clicks on 'Close' button, close the modal
span1.onclick = function() {
  startModal.style.display = 'none';
}

span2.onclick = function() {
  startModal.style.display = 'none';
}

/* Source [1] end */

document.getElementById('start-game').addEventListener('click', startGame);
document.getElementById('end-game').addEventListener('click', endGame);

/**
 * 
 */
function startGame() {
  startTimer();
  shuffle();
  document.getElementsByClassName('memory-game')[0].classList.remove('button-off');
  startButton.classList.add('display-none');
  endButton.classList.remove('display-none');
  }

function endGame() {
  startButton.classList.remove('display-none');
  endButton.classList.add('display-none');
  window.location.reload();
}

// Source: Tutorial [2] 

/** 
 * Creates a countdown from 20 to 0
 */
function startTimer() {
  document.getElementById('open-modal').classList.add('button-off');
  let count = 41;
  let timer = document.getElementById('countdown');
  const time = setInterval(function () {
    count--;
    console.log(count);
    countdown.innerText = count;
    if (count === 0) {
      clearInterval(time);
      loseGame();
      document.getElementById('open-modal').classList.remove('button-off');
    }
  }, 1000); 
}

// Source: How-to [3]
let matchCount = 0;

// Source Begin: Tutorial [4]
const cards = document.querySelectorAll('.memory-card');

let hasFlippedCard = false;
let lockBoard = false;
let firstCard, secondCard;

/** 
 * Makes the cards flip 
 */
function flipCard() {
  if (lockBoard) return;
  if (this === firstCard) return;

  this.classList.toggle('flip');

  if (!hasFlippedCard) {
    // First click
    hasFlippedCard = true;
    firstCard = this;

    return;
  }
  // Second click 
  hasFlippedCard = false;
  secondCard = this;

  checkForMatch();
}

/**
 * Checks if the cards match
 * if they don't match unflipCards is called
 * 
 */
function checkForMatch() {
  let isMatch = firstCard.dataset.framework === secondCard.dataset.framework;
  isMatch ? disableCards() : unflipCards();
}

/**
 * Accomplishes that the matching card pairs 
 * stay uncovered and can be clicked no longer
 */
function disableCards() {
  firstCard.removeEventListener('click', flipCard);
  secondCard.removeEventListener('click', flipCard);
  
  resetBoard();
  // Source: How-to [3]
  matchCount++;
  if (matchCount === 8) {
    winGame();

  };
  // Source [3] end 
}

/**
 * Cards that do not match will be covered again
 * and setTimeout function accomplishes that 
 * user needs to wait until the unmatching cards 
 * are covered again to uncover more cards
 */
function unflipCards() {
  lockBoard = true;

  setTimeout(() => {
    firstCard.classList.remove('flip');
    secondCard.classList.remove('flip');

    resetBoard();
  }, 1500) 
}

/**
 * 
 */
function resetBoard() {
  [hasFlippedCard, lockBoard] = [false, false];
  [firstCard, secondCard] = [null, null];
}

function shuffle() {
  cards.forEach(card => {
    let randomPos = Math.floor(Math.random() * 12);
    card.style.order = randomPos; 
  });
}

/**
 * Creates a second, regular shuffle function 
 * which can be invoked individually and
 * independently from the IIFE
 */
/*function shuffle() {
  cards.forEach(card => {
    let randomPos = Math.floor(Math.random() * 12);
    card.style.order = randomPos; 
  });
}*/

cards.forEach(card => card.addEventListener('click', flipCard));

// Source end: Tutorial [4]

/**
 * 
 */
function winGame() {
  loseGame = null;
  winModal.style.display = 'block';
  /*window.location.reload();*/
}

/**
 * 
 */
function loseGame() {
  loseModal.style.display = 'block';
  /*window.location.reload();*/
}
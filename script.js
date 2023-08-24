'use strict';

// Selecting elements

const player0El = document.querySelector('.player0');
const player1El = document.querySelector('.player1');
const score0El = document.querySelector('#score--0');
const score1El = document.getElementById('score--1'); // to select id use getElementById so you dont have to put ('#') like in querySelector
const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn-new-game');
const btnRoll = document.querySelector('.btn-roll-dice');
const btnHold = document.querySelector('.btn-hold');
let current0El = document.querySelector('#current--0');
let current1El = document.querySelector('#current--1');
const heading = document.querySelector('.heading');
const holdAudio = new Audio("./audio/pop-6.mp3");
const diceAudio = new Audio("./audio/dice.mp3");
const winAudio = new Audio("./audio/win.mp3");
const closeAudio = new Audio("./audio/close.mp3");

// Starting conditions
let scores;
let currentScore;
let activePlayer;
let playing;
const init = function() {
  scores = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  playing = true;

  score0El.textContent = 0;
  score1El.textContent = 0;
  current0El.textContent = 0;
  current1El.textContent = 0;

  player0El.classList.remove('winner');
  player1El.classList.remove('winner');
  player0El.classList.add('player-active');
  player1El.classList.remove('player-active');
  diceEl.classList.add('hidden');
  document.querySelector('.heading').textContent = `Roll A Century`;
}
init();

const switchPlayer = function() {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
    currentScore = 0;
    activePlayer = activePlayer === 0 ? 1 : 0;
    player0El.classList.toggle('player-active');
    // toggle will check if selected variable('player0') have selected class('player-active') else it will automatically add that class
    player1El.classList.toggle('player-active');
};


// Rolling dice funtionality
btnRoll.addEventListener('click', function() {
  
  if (playing) {
    diceAudio.play();
    // 1. Generating a random dice roll
    const dice = Math.trunc(Math.random() * 6) + 1;
    console.log(dice);

    // 2. Display dice
    diceEl.classList.remove('hidden');
    diceEl.src = `images/dice-${dice}.png`;

    // 3. Check for rolled 1: if true, switch to next player
    if(dice !== 1){
      // Add dice to current score
      currentScore += dice;
      document.getElementById(`current--${activePlayer}`).textContent = currentScore;
    } else {
      // Switch to next player
      switchPlayer();
      holdAudio.play();
    }
  }
});

btnHold.addEventListener('click', function() {
  
  if (playing) {
    holdAudio.play();
    // 1. Add current score to active player's score
    scores[activePlayer] += currentScore;
    // scores[1] = scores[1] + currentScore;
    document.getElementById(`score--${activePlayer}`).textContent = scores[activePlayer];

    // 2. Check if player's score is >=100
    // Finish the game
    if (scores[activePlayer] >= 100){
      winAudio.play();
      playing = false;
      diceEl.classList.add('hidden');
      document.querySelector(`.player${activePlayer}`).classList.add('winner');
      document.querySelector(`.player${activePlayer}`).classList.remove('player-active');
      if(activePlayer === 0) {
        document.querySelector('.heading').textContent = `Player 1 wins! 🎉`
      } else {
        document.querySelector('.heading').textContent = `Player 2 wins! 🎉`
      }
    }
    // 3. Switch to next player
    switchPlayer();
  }
});

btnNew.addEventListener('click', init);

const instruction = document.querySelector('.instruction');
const btnClose = document.querySelector('.close');
const overlay = document.querySelector('.overlay');
const btnNew1 = document.querySelector('.btn-instruction');

overlay.classList.remove('hidden');

btnNew1.addEventListener('click', function() {
  closeAudio.play();
  instruction.classList.remove('hidden');
  overlay.classList.remove('hidden');
});

const close = function() {
  closeAudio.play();
  overlay.classList.add('hidden');
  instruction.classList.add('hidden');
};

btnClose.addEventListener('click', close );
overlay.addEventListener('click', close )

document.addEventListener('keydown', function(event){
  if(event.key === 'Escape' && !instruction.classList.contains('hidden')) {
      close(); 
  }
})

// querySelector Nodes 
const holes = document.querySelectorAll('.hole');
const moles = document.querySelectorAll('.mole');
const startButton = document.querySelector('#start');
const score = document.querySelector('#score'); // Use querySelector() to get the score element
const timerDisplay = document.querySelector('#timerDisplay'); // use querySelector() to get the timer element.

// Audio Variables 
const audioHit = new Audio('../assets/hit.mp3');
const audioGrunt = new Audio('../assets/zombie-grunt.mp3');
const song = new Audio('../assets/zombie-song.mp3');

let time = 0;
let timer;
let lastHole = null;
let points = 0;
let difficulty = "easy";

/** randomInteger function:
 * Generates a random integer within a range.
 *
 * The function takes two values as parameters that limits the range 
 * of the number to be generated. For example, calling randomInteger(0,10)
 * will return a random integer between 0 and 10. Calling randomInteger(10,200)
 * will return a random integer between 10 and 200.
 *
 */
function randomInteger(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

/** setDelay(difficulty) function:
 * Sets the time delay given a difficulty parameter.
 *
 * The function takes a `difficulty` parameter that can have three values: `easy`
 * `normal` or `hard`. If difficulty is "easy" then the function returns a time delay
 * of 1500 milliseconds (or 1.5 seconds). If the difficulty is set to "normal" it should
 * return 1000. If difficulty is set to "hard" it should return a randomInteger between
 * 600 and 1200.
 *
 * Example: 
 * setDelay("easy") //> returns 1500
 * setDelay("normal") //> returns 1000
 * setDelay("hard") //> returns 856 (returns a random number between 600 and 1200).
 *
 */
function setDelay(difficulty) {
  if (difficulty === "easy") {
    return 1500;
  } else if (difficulty === "normal") {
    return 1000;
  } else if (difficulty === "hard") {
    return randomInteger(600, 1200);
  }
}

// Difficulty button click event listener
const difficultyButton = document.getElementById('difficultyButton');

difficultyButton.addEventListener('click', function() {
  // Toggles between difficulty levels
  if (difficulty === "easy") {
    difficulty = "normal";
  } else if (difficulty === "normal") {
    difficulty = "hard";
  } else if (difficulty === "hard") {
    difficulty = "easy";
  }

  // Updates the difficulty button text to the current setting
  difficultyButton.textContent = `Difficulty: ${difficulty}`;
});


/** chooseHole(holes) function:
 * Chooses a random hole from a list of holes.
 *
 * This function should select a random Hole from the list of holes.
 * 1. generate a random integer from 0 to 8 and assign it to an index variable
 * 2. get a random hole with the random index (e.g. const hole = holes[index])
 * 3. if hole === lastHole then call chooseHole(holes) again.
 * 4. if hole is not the same as the lastHole then keep track of 
 * it (lastHole = hole) and return the hole
 *
 * Example: 
 * const holes = document.querySelectorAll('.hole');
 * chooseHole(holes) //> returns one of the 9 holes that you defined
 */
function chooseHole(holes) {
  /*const index = randomInteger(0, 8);*/
  const index = randomInteger(0, holes.length - 1);
  const hole = holes[index];
  if (hole === lastHole) {
    return chooseHole(holes);
  }
  lastHole = hole;
  return hole;
}

/**gameOver function:
*
* Calls the showUp function if time > 0 and stops the game if time = 0.
*
* The purpose of this function is simply to determine if the game should
* continue or stop. The game continues if there is still time `if(time > 0)`.
* If there is still time then `showUp()` needs to be called again so that
* it sets a different delay and a different hole. If there is no more time
* then it should call the `stopGame()` function. The function also needs to
* return the timeoutId if the game continues or the string "game stopped"
* if the game is over.
*
*  // if time > 0:
*  //   timeoutId = showUp()
*  //   return timeoutId
*  // else
*  //   gameStopped = stopGame()
*  //   return gameStopped
*
*/
function gameOver() {
  if(time > 0){
    const timeoutId = showUp();
    return timeoutId;
  } else {
    const gameStopped = stopGame();
    return gameStopped;
  }
}

/** showUp() function:
*
* Calls the showAndHide() function with a specific delay and a hole.
*
* This function simply calls the `showAndHide` function with a specific
* delay and hole. The function needs to call `setDelay()` and `chooseHole()`
* to call `showAndHide(hole, delay)`.
*
*/
function showUp() {
  let delay = setDelay(difficulty); // Updates so that it uses setDelay(difficulty)
  const hole = chooseHole(holes);  // Updates so that it use chooseHole(holes)
  return showAndHide(hole, delay);
}

/** showAndHide(hole) function:
*
* The purpose of this function is to show and hide the mole given
* a delay time and the hole where the mole is hidden. The function calls
* `toggleVisibility` to show or hide the mole. The function should return
* the timeoutID
*
*/
function showAndHide(hole, delay){
  toggleVisibility(hole); // Adds the show class .
  
  const timeoutID = setTimeout(() => {
    toggleVisibility(hole); // Removes the show class when the timer times out.
    
    gameOver();
  }, delay); // Uses the provided delay parameter (instead of 0).
  return timeoutID;
}

/** toggleVisibility(hole) function:
*
* Adds or removes the 'show' class that is defined in styles.css to 
* a given hole. It returns the hole.
*
*/
function toggleVisibility(hole){
  hole.classList.toggle('show');
  return hole;
}

/** updateScore function:
*
* This function increments the points global variable and updates the scoreboard.
* Use the `points` global variable that is already defined and increment it by 1.
* After the `points` variable is incremented proceed by updating the scoreboard
* that you defined in the `index.html` file. To update the scoreboard you can use 
* `score.textContent = points;`. Use the comments in the function as a guide 
* for your implementation:
*
*/
function updateScore() {
  points++; // Increment the points global variable by 1 point.
  score.textContent = points; // Update score.textContent with points.
  return points; // Return the updated points.
  }

/** clearScore function:
*
* This function clears the score by setting `points = 0`. It also updates
* the board using `score.textContent = points`. The function should return
* the points.
*
*/
function clearScore() {
  points = 0; // Set the points global variable to 0.
  score.textContent = points; // Update score.textContent.
  return points; // Return points after updated score/clear.
}

/** updateTimer function:
*
* Updates the control board with the timer if time > 0
*
*/
function updateTimer() {
  if (time > 0){
    time -= 1;
    timerDisplay.textContent = time;
  }
  return time;
}

/** startTimer function:
*
* Starts the timer using setInterval. For each 1000ms (1 second)
* the updateTimer function get called. This function is already implemented
*
*/
function startTimer() {
  timer = setInterval(updateTimer, 1000);
  return timer;
}

/** whack(event) function:
*
* This is the event handler that gets called when a player
* clicks on a mole. The setEventListeners should use this event
* handler (e.g. mole.addEventListener('click', whack)) for each of
* the moles.
*
*/
function whack(event) {
  console.log("whack!");
  playAudio(audioHit); // Play the hit sound
  playAudio(audioGrunt); // Play the zombie-grunt sound
  updateScore();
  return points;
}

/** whack setEventListeners function: 
*
* Adds the 'click' event listeners to the moles. See the instructions
* for an example on how to set event listeners using a for loop.
*/
function setEventListeners(){
  moles.forEach(mole => {
    mole.addEventListener('click', whack);
  });
  return moles;
}

setEventListeners();

/**
*
* This function sets the duration of the game. The time limit, in seconds,
* that a player has to click on the sprites.
*
*/
function setDuration(duration) {
  time = duration;
  return time;
}

/** stopGame function:
*
* This function is called when the game is stopped. It clears the
* timer using clearInterval. Returns "game stopped".
*
*/
/** stopGame function */
function stopGame() {
  stopAudio(song); /* Stops the song once the game ends */
  clearInterval(timer);
  return "game stopped";
}

/** startGame function:
*
* This is the function that starts the game when the `startButton`
* is clicked.
*
*/
function startGame(){
  clearScore(); // Reset score to 0
  setDuration(16); // Set the duration of the game to 16 seconds because of a delay of 1 second, it actually displays the correct duration, 15 seconds. Extended the timer a little for a longer game. 
  showUp();
  startTimer(); // Calls startTimer function to start the timer when the game starts.
  playAudio(song);
  return "game started";
  }

startButton.addEventListener("click", startGame);

/** Audio Functions */
function playAudio(audioObject) {
  audioObject.play().catch(error => {
    console.error("Audio playback failed:", error);
  });
}

function loopAudio(audioObject) {
  audioObject.loop = true;
  playAudio(audioObject);
}

function stopAudio(audioObject) {
  audioObject.pause();
  audioObject.currentTime = 0; // Reset audio when starting
}

function play() {
  playAudio(song);
}

// Please do not modify the code below.
// Used for testing purposes.
window.randomInteger = randomInteger;
window.chooseHole = chooseHole;
window.setDelay = setDelay;
window.startGame = startGame;
window.gameOver = gameOver;
window.showUp = showUp;
window.holes = holes;
window.moles = moles;
window.showAndHide = showAndHide;
window.points = points;
window.updateScore = updateScore;
window.clearScore = clearScore;
window.whack = whack;
window.time = time;
window.setDuration = setDuration;
window.toggleVisibility = toggleVisibility;
window.setEventListeners = setEventListeners;

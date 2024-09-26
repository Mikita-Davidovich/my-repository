const scoreBoard = document.querySelector('.score-main');
const moles = document.querySelectorAll('.mole');
const holes = document.querySelectorAll('.hole');
const standartMode = document.querySelector('.standart-mode');
const easeMode = document.querySelector('.ease-mode');
const mediumMode = document.querySelector('.medium-mode');
const hardMode = document.querySelector('.hard-mode');
const extremalMode = document.querySelector('.extremal-mode');
const timer = document.querySelector('.time')
let lastHole;
let timeUp = true;
let score = 0;
let sec = 10;
const min = 0;

function randomTime(min, max) {
  return  Math.round (Math.random() * (max - min) + min);
}

function randomHole(holes) {
  const index = Math.floor(Math.random() * holes.length);
  const hole = holes[index];
  if(lastHole === hole){
    return randomHole(holes);
  }
  lastHole = hole;
  return hole;
}

function showMole(min, max) {
  const time = randomTime(min, max);
  const hole = randomHole(holes);
  hole.classList.add('active');
  setTimeout(() => {
    hole.classList.remove('active');
    if(!timeUp) showMole(min, max);
  }, time)
}

function startGame(min, max) {
  if(!timeUp) return;
  scoreBoard.textContent = 0;
  timeUp = false;
  changeTimer();
  showMole(min, max);
  setTimeout(() => timeUp = true, 10000);
}

function clickOnMole(e) {
  if(!e.isTrusted) return;
  score++;
  this.parentNode.classList.remove('active');
  scoreBoard.textContent = score;
  localStorage.setItem('Score', scoreBoard.textContent);
}

function getScore () {
  scoreBoard.textContent = localStorage.getItem('Score') === null ? 0 : localStorage.getItem('Score');
}

function startStandartMode() {
  startGame(300, 2000)
}

function startEaseMode() {
  startGame(400, 1500);
}

function startMediumMode() {
  startGame(250, 1000);
}

function startHardMode() {
  startGame(150, 800);
}

function startExtremalMode() {
  startGame(100, 500);
}

function changeTimer() {
  if (sec < 0) {
    sec = 10;
  } else {
    timer.innerHTML = `${min}:${addZero(sec--)}`;
    setTimeout(changeTimer, 1000); 
  }
}

function addZero(n) {
  return (parseInt(n , 10) < 10 ? '0': '') + n;
}

moles.forEach(mole => mole.addEventListener('click',clickOnMole));
standartMode.addEventListener('click' , startStandartMode);
easeMode.addEventListener('click', startEaseMode);
mediumMode.addEventListener('click', startMediumMode);
hardMode.addEventListener('click', startHardMode);
extremalMode.addEventListener('click', startExtremalMode);
getScore();
addZero();

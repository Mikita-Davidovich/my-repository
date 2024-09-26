function launchGame(){

  const buttons = document.querySelectorAll('.button-number');
  const screen = document.querySelector('.screen');
  const clearBtn = document.querySelector('.clear');
  const deleteBtn = document.querySelector('.delete');
  const playBtn = document.querySelector('.play');
  const howToPlayBtn = document.querySelector('.how-to-play');
  const videoHowToPlay = document.querySelector('.how-to-play-video')
  const firstPage = document.querySelector('.first-page');
  const wrapper = document.querySelector('.wrapper');
  const enterBtn = document.querySelector('.enter');
  const scoreTable = document.querySelector('.score');
  const yourTotalScore = document.querySelector('.your-total-score');
  const songWin = document.querySelector('.song-win');
  const songError = document.querySelector('.song-fail');
  const songEndGame = document.querySelector('.song-end-game');
  const mainRainDrop = document.querySelector('.main-rain-drop');
  const wave = document.querySelector('.first-wave');
  const wave2 = document.querySelector('.second-wave');
  const playAgainBtn = document.querySelector('.play-again');
  const exit = document.querySelector('.exit');
  const mainPage = document.querySelector('.main-wrapper');
  const isNumberRegExp =/^[0-9]$/;
  const arrOperators = ['+', '-', '*', '/'];

  let createRainDrop;
  let createBonusRainDrop;
  let score = 0;
  let dropTouchWave = 0;
  let maxValue;
  let minValue;

  function removeFirstPage() {
    firstPage.classList.remove('active');
    firstPage.classList.add('not-active');
  }

  function addFirstPage(){
    firstPage.classList.add('active')
    yourTotalScore.style.display = 'none';
    dropTouchWave = 0;
    score = 0;
    scoreTable.textContent = score;
  }

  function numberPress() {
    for(let button of buttons){
      button.addEventListener('click' , () => {
        screen.value += button.value;
      });
    }
  }

  function clearScreen() {
    return screen.value = '';
  }

  clearBtn.addEventListener('click', () => {
    clearScreen();
  });

  function deleteElementOnScreen() {
    return screen.value = screen.value.slice(0,-1);
  }

  deleteBtn.addEventListener('click', () => {
    deleteElementOnScreen();
  });

  function chekForNumber(number) {
    let isNumber = isNumberRegExp.test(number);
    if (!isNumber) return;
    screen.value += number;
  }

  function useKeyboard(e) {
    chekForNumber(e.key);
    if (e.key === 'Backspace') {
      deleteElementOnScreen();
    }
    else if (e.key === 'Delete') {
      clearScreen();
    }
    else if (e.key === 'Enter') {
      clearScreenAfterClickEnterAndRemoveDrop();
    }
  }

  function getRandomNumber(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min);
  }

  function getRandomOperator() {
    let randomOperator = arrOperators[Math.floor(Math.random() * arrOperators.length)];
    return randomOperator;
  }

  function createEquation(min, max) {
    let x = getRandomNumber(min, max);
    const z = getRandomOperator();
    const y = getRandomNumber(min, max);
    if (z === '/' && x % y !== 0 ) {
      x = y * Math.floor(Math.random()* 10); 
      return x + z + y;
    } else if (x >= y) {
      return x + z + y; 
    } else {
      return y + z + x;
    }
  }

  function createEquationInDrop(drop){
    const equation = createEquation(minValue, maxValue);
    drop.setAttribute('data-value', new Function(`return ${equation}`)());
    mainRainDrop.appendChild(drop);
    drop.style.left = Math.random() * 60 + '%';
    drop.append(equation);
  }

  function createDrop() {
    const rainDrop = document.createElement('div');
    rainDrop.classList.add('rain-drop');

    if (score < 10) {
      minValue = 1;
      maxValue = 10;
    } else if (score >= 10 && score <= 40) {
      minValue = 2;
      maxValue = 15;
    } else {
      minValue = 3;
      maxValue = 25;
    }

    createEquationInDrop(rainDrop);
  }

  function createBonusDrop() {
    const bonusDrop = document.createElement('div');
    bonusDrop.classList.add('bonus-drop');
    minValue = 1;
    maxValue = 10; 

    createEquationInDrop(bonusDrop);
  }

  function removeDrop() {
    const rainDrop = document.querySelector('.rain-drop');
    mainRainDrop.removeChild(rainDrop);
  }

  function deleteRainDrops(drops){
    drops.forEach((drop) => {
      drop.textContent = '';
      drop.classList.add('explosion');
      setTimeout(() => mainRainDrop.removeChild(drop), 100);
    })
  }

  function clearScreenAfterClickEnterAndRemoveDrop() {
    const rainDrop = document.querySelector('.rain-drop');
    const bonusDrop = document.querySelector('.bonus-drop');
    if (rainDrop && rainDrop.getAttribute('data-value') === screen.value ) {
      rainDrop.classList.add('explosion');
      songWin.play();
      setTimeout(removeDrop,100);
      score++;
      scoreTable.textContent = score;
      screen.value = '';
      rainDrop.textContent = '';
    } else if (bonusDrop && bonusDrop.getAttribute('data-value') === screen.value) {
        deleteAllOnBonusDrop();
        songWin.play();
        score += 3;
        scoreTable.textContent = score;
        screen.value = '';
        bonusDrop.textContent = '';
    } else if ((bonusDrop || rainDrop) && (rainDrop.getAttribute('data-value') !== screen.value || bonusDrop.getAttribute('data-value') !== screen.value)) {
        songError.play();
        score--;
        scoreTable.textContent = score;
        screen.value = '';
    }
  }

  function removeDropOnDropTouchWave(){
    let heightOfWave;
    const waveSizes = wave.getBoundingClientRect();
    const topOfWave = Math.floor(waveSizes.top);

    const rainDrop = document.querySelector('.rain-drop');
    const rainDropSizes = rainDrop ? rainDrop.getBoundingClientRect() : 0;
    const bottomOfDrop = Math.floor(rainDropSizes.bottom);

    const bonusRainDrop = document.querySelector('.bonus-drop');
    const bonusRainDropSizes = bonusRainDrop ? bonusRainDrop.getBoundingClientRect() : 0;
    const bottomOfBonusRainDrop = Math.floor(bonusRainDropSizes.bottom) 

    const dropsGreaterOrEqualTopOfWave = (bottomOfDrop >= topOfWave || bottomOfBonusRainDrop >= topOfWave);

    if (dropTouchWave === 0 && dropsGreaterOrEqualTopOfWave) {
      heightOfWave = '35%';
      changesOnDropTouchWave(heightOfWave);
    } else if (dropTouchWave === 1 && dropsGreaterOrEqualTopOfWave) {
        heightOfWave = '50%';
        changesOnDropTouchWave(heightOfWave);
    } else if (dropTouchWave === 2 && dropsGreaterOrEqualTopOfWave) {
        heightOfWave = '70%';
        changesOnDropTouchWave(heightOfWave);
    } else if (dropTouchWave >= 3 && dropsGreaterOrEqualTopOfWave) {
        heightOfWave = '25%';
        changesOnDropTouchWave(heightOfWave);
        songEndGame.play();
        clearInterval(createRainDrop);
        clearInterval(createBonusRainDrop);
        setTimeout(() =>{
          yourTotalScore.style.display = 'flex';
      },3000);
    }
  }

  function changesOnDropTouchWave(heightOfWave){
    deleteAllOnDropTouchWave(heightOfWave);
    songError.play();
    score -= 3;
    scoreTable.textContent = score;
  }

  function deleteAllOnDropTouchWave(heightOfWave) {
    dropTouchWave++;
    const bonusDrop = document.querySelectorAll('.bonus-drop');
    const rainDrops = document.querySelectorAll('.rain-drop');
    deleteRainDrops(rainDrops);
    wave.style.cssText = `--wave-height: ${heightOfWave}`;
    wave2.style.cssText = `--wave-height: ${heightOfWave}`;
    deleteRainDrops(bonusDrop);
  }

  function deleteAllOnBonusDrop() {
    const bonusDrop = document.querySelectorAll('.bonus-drop');
    const rainDrops = document.querySelectorAll('.rain-drop');
    deleteRainDrops(rainDrops);
    deleteRainDrops(bonusDrop);
  }

  function startGame() {
    removeFirstPage();
    createRainDrop = setInterval(createDrop,3000);
    createBonusRainDrop = setInterval(createBonusDrop,15000);
  }

  function clickButtonPlayAgain(){
    yourTotalScore.style.display = 'none';
    dropTouchWave = 0;
    score = 0;
    scoreTable.textContent = score;
  }

  function videoEnded(){
    mainPage.classList.remove('main-wrapper-not-active');
    mainPage.classList.add('main-wrapper');
    videoHowToPlay.classList.remove('how-to-play-video-active');
    videoHowToPlay.classList.add('how-to-play-video');
    firstPage.classList.remove('not-active');
    firstPage.classList.add('active');
  }

  function whenClickHowToPlay(){
    mainPage.classList.add('main-wrapper-not-active');
    videoHowToPlay.classList.add('how-to-play-video-active');
    videoHowToPlay.play();
  }

  numberPress();
  clearScreen();
  deleteElementOnScreen();
  window.addEventListener('keydown', useKeyboard);
  setInterval(removeDropOnDropTouchWave,500);
  enterBtn.addEventListener('click', clearScreenAfterClickEnterAndRemoveDrop);
  videoHowToPlay.addEventListener('ended', videoEnded);
  exit.addEventListener('click',addFirstPage);
  playAgainBtn.addEventListener('click', () => {
    startGame();
    clickButtonPlayAgain();
  });
  playBtn.addEventListener('click', startGame);
  howToPlayBtn.addEventListener('click',()=>{
    removeFirstPage();
    whenClickHowToPlay();
  })
}

launchGame();

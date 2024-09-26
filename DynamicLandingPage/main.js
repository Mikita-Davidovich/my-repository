const time = document.getElementById('time');
const greeting = document.getElementById('greeting');
const name = document.getElementById('name');
const focus = document.getElementById('focus');
const enterPress = 13;

//Options

const ShowAmPm = true;

//Time

function showTime() {
  let today = new Date();
  let hours = today.getHours();
  let minutes = today.getMinutes();
  let seconds = today.getSeconds();

  //Set AM or PM

  const amPM = hours >= 12 ? 'PM' : 'AM';

  //12-hrours format

  hours = hours % 12 || 12;

  //Output time

  time.innerHTML = `${hours}<span>:<span>${addZero(minutes)}<span>:<span>${addZero(seconds)} ${ShowAmPm ? amPM :''}`;
  setTimeout(showTime, 1000);
}

//Add zeros

function addZero(n) {
  return (parseInt(n , 10) < 10 ? '0': '') + n;
}

//Set Background Image and Greeting

function setBackgroundGreeting() {
  let today = new Date(),
    hour = today.getHours();

  if (hour < 12) {
    document.body.style.backgroundImage = 'url(images/morning.jpg)';
    greeting.textContent = 'Good Morning';
  } else if (hour < 18){
    document.body.style.backgroundImage = 'url(images/afternoon.jpg)';
    greeting.textContent = 'Good Afternoon';
    document.body.style.color = 'yellow'
  } else {
    document.body.style.backgroundImage = 'url(images/night.jpg)';
    greeting.textContent = 'Good Evening';
    document.body.style.color = '#ffff';
  }
}

//Get Name

function getName() {
  name.textContent = localStorage.getItem('name') === null ? '[Enter Your Name]' : localStorage.getItem('name');
}

//Set Name
function setName(e) {
  if(e.type === 'keypress') {
    // Male sure enter is pressed
    if (e.which === enterPress || e.code === enterPress) {
      localStorage.setItem('name' , e.target.innerText);
      name.blur();
    } else {
      localStorage.setItem('name',e.target.innerText);
    }
  }
}
function getFocus() {
  focus.textConten = localStorage.getItem('focus') === null ? '[Enter Your Focus]' : localStorage.getItem('focus');
}

//Set Focus

function setFocus(e) {
  if (e.type === 'keypress') {
    // Male sure enter is pressed
    if (e.which === enterPress || e.code === enterPress) {
      localStorage.setItem('focus' , e.target.innerText);
      focus.blur();
    } else {
      localStorage.setItem('focus',e.target.innerText);
    }
  }
}

name.addEventListener('keypress', setName);
name.addEventListener('blur', setName);
focus.addEventListener('keypress', setFocus);
focus.addEventListener('blur', setFocus);

//Run

showTime();
setBackgroundGreeting();
getName();
getFocus();

const app = () => {
  const song = document.querySelector('.song');
  const play = document.querySelector('.play');
  const outline = document.querySelector('.moving-outline circle');
  const video = document.querySelector('.default-video');

  //Sounds

  const sounds = document.querySelectorAll('.buttons-weather');

  //Time Display

  const timeDisplay = document.querySelector('.time-display');
  const timeSelect = document.querySelectorAll('.time-buttons');
  
  //Get the length of the outline

  const outlineLength = outline.getTotalLength();

  //Durations

  let duration = 600;

  outline.style.strokeDasharray = outlineLength;
  outline.style.strokeDashoffset = outlineLength;

  //Pick different sounds

  sounds.forEach(sound => {
    sound.addEventListener('click', () => {
      song.src = sound.getAttribute('data-sound');
      video.src = sound.getAttribute('data-video');
      checkPlaying(song);
    });
  });

  //Play Sound

  play.addEventListener('click', () => {
    checkPlaying(song);
  });

  //Select Sound

  timeSelect.forEach(option => {
    option.addEventListener('click',() => {
      duration = option.getAttribute('data-time');
      timeDisplay.textContent = `${Math.floor(duration / 60)}:${Math.floor(duration % 60)}`;
    });
  });

  //Stop and play sounds

  const checkPlaying = song => {
    if (song.paused) {
      song.play();
      video.play();
      play.src = 'svg/pause.svg';
    } else {
      song.pause();
      video.pause();
      play.src = 'svg/play.svg';
    }
  }

  //Animate the circle

  song.ontimeupdate = () => {
    const currentTime = song.currentTime;
    const elapsed = duration - currentTime;
    const seconds = Math.floor(elapsed % 60);
    const minutes = Math.floor(elapsed / 60);
    const progress = outlineLength - (currentTime / duration) * outlineLength;
    outline.style.strokeDashoffset = progress;

    //Animate the text

    timeDisplay.textContent = `${minutes}:${seconds}`;

    if (currentTime >= duration) {
      song.pause();
      song.currentTime = 0;
      play.src = "svg/play.svg";
      video.pause();
    }
  }
}

app();

const video = document.querySelector('.video');
const speed = document.querySelector('.speed');
const speedBar = document.querySelector('.speed-bar');

function speedController(e) {
  const y = e.pageY - speed.offsetTop;// pageY расстояние от верха документа до курсора - смещение сверху относительно родителя
  const percent = y / speed.offsetHeight;
  const min = 0.4;
  const max = 4;
  const height = Math.round(percent * 100) + '%';
  const playbackRate = percent * (max - min) + min;//получение скорости воспроизведения в пределах от 0,4 до 4
  speedBar.style.height = height;
  speedBar.textContent = playbackRate.toFixed(2) + 'x';
  video.playbackRate = playbackRate;
}
let flag = false;
speed.addEventListener('mousemove', (e) => flag && speedController(e));
speed.addEventListener('mouseup', () => flag = false);
speed.addEventListener('mousedown', () => flag = true);

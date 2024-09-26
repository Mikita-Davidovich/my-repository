const panels = document.querySelectorAll('.panels');

//Open

function toggleOpen() {
  panels.forEach(panel => panel.classList.remove("open"));
  this.classList.add('open');
}

//Active

function toggleActive(e) {
  if (e.propertyName.includes('flex')) {
    this.classList.toggle('active');
  }
}

panels.forEach(panel => panel.addEventListener('click', toggleOpen));
panels.forEach(panel => panel.addEventListener('transitionend', toggleActive));


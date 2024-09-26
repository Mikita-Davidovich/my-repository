const inputs = document.querySelectorAll('.input')

function handleUpDate(){
  const suffix = this.dataset.sizing || '';
  document.documentElement.style.setProperty(`--${this.name}`,this.value + suffix);
}

inputs.forEach(input => input.addEventListener('change', handleUpDate));
inputs.forEach(input => input.addEventListener('mousemove', handleUpDate));

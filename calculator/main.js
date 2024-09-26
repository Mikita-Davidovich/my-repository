const numbers = document.querySelectorAll('.button-number');
const operations = document.querySelectorAll('.button-operation');
const clearBtns = document.querySelectorAll('.button-clear');
const screen = document.getElementById('screen');
const dot = document.querySelector('.button-dot');
let MemoryCurrentNumber = 0;
let MemoryNewNumber = false;
let MemoryPendingOperation = '';


for (let i = 0; i < numbers.length; i++) {
  const number = numbers[i];
  number.addEventListener('click', () => {
    numberPress(number.value)
  });
}
for (let i = 0; i < operations.length; i++) {
  const operation = operations[i];
  operation.addEventListener('click', () => {
    operationPress(operation.value)
  })
}
for (let i = 0; i < clearBtns.length; i++) {
  const clearBtn = clearBtns[i];
  clearBtn.addEventListener('click', () => {
    clear(clearBtn.value)
  });
}
dot.addEventListener('click', () => {
  decimal(dot.value)
})

function numberPress(number) {
  if (MemoryNewNumber) {
    screen.value = number;
    MemoryNewNumber = false;
  }
  else {
    if (screen.value === '0') {
      screen.value = number
      }
    else {
      screen.value += number;
    }
  }
}

function operationPress(oper) {
  let localOperationMemory = screen.value;
  if (MemoryNewNumber &&  MemoryPendingOperation !== '=') {
    screen.value = MemoryCurrentNumber;
    }
  else {
    MemoryNewNumber = true;
    if (MemoryPendingOperation === '+') {
      MemoryCurrentNumber += parseFloat(localOperationMemory);
    } else if (MemoryPendingOperation === '-') {
      MemoryCurrentNumber -= parseFloat(localOperationMemory);
    } else if (MemoryPendingOperation === '*') {
      MemoryCurrentNumber *= parseFloat(localOperationMemory);
    } else if (MemoryPendingOperation === '/') {
      MemoryCurrentNumber /= parseFloat(localOperationMemory);
    } else {
      MemoryCurrentNumber = parseFloat(localOperationMemory);
    }
    screen.value = MemoryCurrentNumber;
    MemoryPendingOperation = oper;
  }
}

 function decimal() {
  let localDecimalMemory = screen.value;
  if (MemoryNewNumber) {
    localDecimalMemory = '0.';
    MemoryNewNumber = false;
  } else {
    if (localDecimalMemory.indexOf('.') === -1) {
      localDecimalMemory += '.';
    }
  }
  screen.value = localDecimalMemory;
}

function clear(value) {
  if (value === 'CE') {
    screen.value = '0';
    MemoryNewNumber = true;
  } else if( value === 'C') {
    screen.value = '0';
    MemoryPendingOperation = '';
    MemoryCurrentNumber = 0;
  }
}

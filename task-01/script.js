// function isValidNumber(value) {
//   return /^-?\d+(\.\d+)?$/.test(value.trim());
// }

// function add(a, b) {
//   return a + b;
// }
// function subtract(a, b) {
//   return a - b;
// }
// function multiply(a, b) {
//   return a * b;
// }
// function divide(a, b) {
//   if (b === 0) return 'Ошибка: деление на ноль';
//   return a / b;
// }
// function formatResult(result) {
//   return typeof result === 'number' ? result.toFixed(2) : result;
// }

// function calculate(operation, a, b) {
//   a = Number(a);
//   b = Number(b);
  
//   switch (operation) {
//     case 'add': return formatResult(add(a, b));
//     case 'subtract': return formatResult(subtract(a, b));
//     case 'multiply': return formatResult(multiply(a, b));
//     case 'divide': return formatResult(divide(a, b));
//     default: return 'Ошибка: неизвестная операция';
//   }
// }

// function handleCalc(operation) {
//   const num1 = document.getElementById('num1').value;
//   const num2 = document.getElementById('num2').value;
//   const resultElement = document.getElementById('result');

//   if (!isValidNumber(num1) || !isValidNumber(num2)) {
//     resultElement.textContent = 'Введите корректные числа!';
//     resultElement.style.color = 'red';
//     return;
//   }

//   const result = calculate(operation, num1, num2);
//   resultElement.textContent = `Результат: ${result}`;
//   resultElement.style.color = 'black';
// }


const readline = require('readline');

function isValidNumber(value) {
  return !isNaN(value);
}

function add(a, b) {
  return a + b;
}
function subtract(a, b) {
  return a - b;
}
function multiply(a, b) {
  return a * b;
}
function divide(a, b) {
  if (b === 0) return 'Ошибка: деление на ноль';
  return a / b;
}
function formatResult(result) {
  return typeof result === 'number' ? result.toFixed(2) : result;
}

function calculate(operation, a, b) {
  switch (operation) {
    case 'add': return formatResult(add(a, b));
    case 'subtract': return formatResult(subtract(a, b));
    case 'multiply': return formatResult(multiply(a, b));
    case 'divide': return formatResult(divide(a, b));
    default: return 'Ошибка: неизвестная операция';
  }
}

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

console.log('=== Калькулятор на Node.js ===');
console.log('Операции: add | subtract | multiply | divide');

rl.question('Введите первое число: ', (num1) => {
  if (!isValidNumber(num1)) {
    console.log('Ошибка: это не число');
    rl.close();
    return;
  }

  rl.question('Введите второе число: ', (num2) => {
    if (!isValidNumber(num2)) {
      console.log('Ошибка: это не число');
      rl.close();
      return;
    }

    rl.question('Выберите операцию: ', (op) => {
      const result = calculate(op.trim(), parseFloat(num1), parseFloat(num2));
      console.log('Результат:', result);
      rl.close();
    });
  });
});

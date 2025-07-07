# Task-06: Модульная система счётчиков

## 📌 Описание

Создана система счётчиков с модульной архитектурой на JavaScript (ES6). Каждый счётчик реализован в отдельном модуле и расширяет базовый функционал `Counter`. В проекте используются замыкания, наследование и приватность данных.

## 🧠 Что изучаем

- ✅ ES6 Модули: `import` / `export`
- ✅ Паттерн «Модуль»
- ✅ ООП и наследование
- ✅ Замыкания для приватности
- ✅ Организация проекта с несколькими JS-файлами

## 📁 Структура проекта

task-06/
├── index.html # Интерфейс
├── main.js # Входная точка, подключение и демонстрация
├── modules/
│ ├── Counter.js # Базовый счётчик
│ ├── TimerCounter.js # Счётчик с автоувеличением
│ ├── StepCounter.js # Счётчик с шагом
│ └── utils.js # Вспомогательные функции
└── README.md # Документация

scss
Copy
Edit

## 🧩 Описание модулей

### 🔹 `Counter.js` — базовый счётчик

```js
export default class Counter {
  constructor(min = 0, max = Infinity) { ... }
  increment() { ... }
  decrement() { ... }
  reset() { ... }
  getValue() { ... }
}
Поддерживает границы (min, max)

Методы: increment(), decrement(), reset(), getValue()

🔹 TimerCounter.js — таймер-счётчик
js
Copy
Edit
import Counter from './Counter.js';

export default class TimerCounter extends Counter {
  start(interval = 1000) { ... }
  pause() { ... }
  stop() { ... }
}
Наследуется от Counter

Автоматически увеличивает значение через setInterval

Методы: start(), pause(), stop()

🔹 StepCounter.js — счётчик с шагом
js
Copy
Edit
import Counter from './Counter.js';

export default class StepCounter extends Counter {
  setStep(step) { ... }
  increment() { ... }
  decrement() { ... }
}
Поддерживает кастомный шаг

Методы: setStep(step), increment(), decrement()

🔹 utils.js — вспомогательные функции
js
Copy
Edit
export function formatNumber(num) { ... }
export function validateStep(step) { ... }
export function clamp(value, min, max) { ... }
Форматирование чисел

Ограничение значения в пределах min/max

Проверка корректности шага

🎮 main.js
Импортирует все классы

Создаёт экземпляры счётчиков

Управляет отображением и кнопками

Демонстрирует работу: счёт по шагу, автотаймер, сброс, границы и т.д.

🖼 Интерфейс (index.html)
Простая панель управления:

Кнопки: ➕ ➖ 🔁 ▶️ ⏸ ⏹

Выбор типа счётчика

Поле для изменения шага

Отображение текущего значения

🧪 Пример использования
js
Copy
Edit
import TimerCounter from "./modules/TimerCounter.js";

const counter = new TimerCounter(0, 10);
counter.start(1000); // увеличивает значение каждую секунду
setTimeout(() => counter.stop(), 7000); // остановить через 7 секунд
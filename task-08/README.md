# Task-08: Персональный планировщик задач (Task Planner SPA)

## 📌 Описание

Финальный проект — одностраничное (SPA) приложение для планирования задач. Включает создание, редактирование, удаление и организацию задач по категориям, тегам, приоритетам и дате. Приложение поддерживает поиск, фильтрацию, уведомления, адаптивный интерфейс, экспорт/импорт и статистику.

## 🧠 Изучаемые темы

- Архитектура SPA на JavaScript
- Модульная структура и разделение ответственности
- Работа с `localStorage`
- Продвинутая работа с DOM
- Drag & Drop
- Уведомления и календарные интерфейсы
- Экспорт и импорт данных
- Валидация и обработка ошибок
- Оптимизация и адаптивность

---

## 🗂 Структура проекта

task-08/
├── index.html
├── css/
│ └── style.css
├── js/
│ ├── main.js
│ ├── TaskManager.js
│ ├── UI.js
│ ├── Storage.js
│ ├── Calendar.js
│ ├── Notifications.js
│ └── utils.js
└── README.md

yaml
Copy
Edit

---

## 📌 Структура задачи

```js
{
  id: generateId(),
  title: "Название задачи",
  description: "Описание",
  category: "work",
  tags: ["urgent", "important"],
  dueDate: "2024-02-15",
  priority: "high",
  status: "pending", // or "completed"
  subtasks: [],
  createdAt: new Date(),
  updatedAt: new Date()
}
🧩 Модули
🔹 TaskManager.js
Хранит и управляет массивом задач

Методы: addTask(), removeTask(), updateTask(), getTasks(), filterTasks(), sortTasks()

Ведёт учёт ID, статус, категории и теги

🔹 UI.js
Рендеринг интерфейса и событий

Подключение к DOM-элементам

Работа с модальными окнами, фильтрами, drag & drop

Управление отображением задач, форм, состояния

🔹 Storage.js
Работа с localStorage

Методы: saveTasks(), loadTasks(), clearStorage(), exportToJson(), importFromJson()

🔹 Calendar.js
Отображение задач в календарном виде

Сортировка по датам

Подсветка событий в сетке

🔹 Notifications.js
Настройка напоминаний и уведомлений о сроках

Проверка дедлайнов и показ оповещений

🔹 utils.js
Генерация ID, форматирование дат, валидация

Хелперы для работы с UI и задачами

⚙️ Функциональность
✅ Создание, редактирование и удаление задач

✅ Выбор категории, приоритета, тэгов

✅ Установка даты и времени выполнения

✅ Подзадачи и статус выполнения

✅ Календарный вид и список

✅ Сортировка и фильтрация

✅ Поиск по названию и тегам

✅ Drag & Drop задач

✅ Уведомления (deadline reminders)

✅ Сохранение состояния в localStorage

✅ Экспорт в JSON / импорт из JSON

✅ Статистика: количество задач, выполненных, просроченных

✅ Темная / светлая тема

✅ Полностью адаптивный интерфейс

🖥 Интерфейс
🔹 Сайдбар: категории, фильтры, переключение темы

🔹 Основная область: задачи, календарь, режим просмотра

🔹 Модальные окна: создание, редактирование, удаление

🔹 Поиск, индикатор дедлайна, приоритет

🔹 Статистика и экспорт / импорт

🔹 Responsive-дизайн: от мобильных до десктопов

💾 Пример использования
js
Copy
Edit
import { TaskManager } from './TaskManager.js';

const taskManager = new TaskManager();
taskManager.addTask({
  title: 'Купить продукты',
  description: 'Молоко, хлеб, сыр',
  dueDate: '2025-07-08',
  category: 'home',
  priority: 'medium',
});
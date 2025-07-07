# Task-02: Система управления задачами (ToDo)

## 📌 Условие

Реализовать консольную систему управления задачами с возможностью добавления, удаления, поиска, фильтрации и сортировки задач.

## ✅ Функциональность

- **addTask(title, priority)** — добавляет новую задачу с уникальным ID, приоритетом и датой создания.
- **removeTask(id)** — удаляет задачу по ID.
- **toggleTask(id)** — меняет статус задачи (`completed` / `pending`).
- **filterTasks(status)** — возвращает задачи по статусу:
  - `all` — все задачи
  - `completed` — только завершённые
  - `pending` — только активные
- **getTasksByPriority(priority)** — возвращает задачи с заданным приоритетом (`low`, `medium`, `high`).
- **getTasksStats()** — возвращает статистику:
  ```js
  {
    total: 10,
    completed: 4,
    pending: 6
  }
searchTasks(query) — возвращает задачи, в названии которых есть подстрока query.

sortTasks(by) — сортирует задачи по:

date — дате создания (по убыванию)

priority — уровню приоритета (high > medium > low)

📋 Пример структуры задачи
js
Copy
Edit
{
  id: 1,
  title: "Изучить JavaScript",
  completed: false,
  priority: "high", // low, medium, high
  createdAt: "2025-07-07"
}
🧪 Пример использования
js
Copy
Edit
addTask("Сделать проект", "high");
addTask("Прочитать статью", "medium");
toggleTask(1);
console.log(filterTasks("completed"));
console.log(getTasksStats());
console.log(searchTasks("проект"));
sortTasks("priority");
🛠 Используемые технологии
JavaScript (ES6+)

Методы массивов: .filter(), .map(), .sort(), .find()

Работа с объектами и датами: Date, toISOString()

Модульный и чистый код
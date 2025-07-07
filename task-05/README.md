# Task-05: Система управления студентами (ООП)

## 📌 Описание

Реализована система управления студентами с использованием **объектно-ориентированного программирования** на JavaScript. Система позволяет:

- Добавлять студентов и преподавателей
- Назначать курсы и выставлять оценки
- Считать GPA и генерировать отчёты
- Организовывать данные по классам и структурам

## 🧠 Изучаемые темы

- Классы и конструкторы
- Наследование `extends`
- Приватные поля `#`
- Геттеры и сеттеры
- Статические методы `static`
- Инкапсуляция, модульность и переиспользуемость кода

## 👨‍🏫 Основные классы

### 🔹 `Person`

```js
class Person {
  constructor(name, age, email) { ... }
  getInfo() { ... } // Возвращает строку с данными
}
🔹 Student extends Person
js
Copy
Edit
class Student extends Person {
  constructor(name, age, email, studentId) { ... }
  enrollCourse(course) { ... }
  addGrade(course, grade) { ... }
  calculateGPA() { ... }
  getTranscript() { ... }
}
🔹 Teacher extends Person
js
Copy
Edit
class Teacher extends Person {
  constructor(name, age, email, teacherId) { ... }
  assignGrade(student, course, grade) { ... }
  getStudentsBySubject(subject) { ... }
}
🔹 University
js
Copy
Edit
class University {
  constructor() {
    this.students = [];
    this.teachers = [];
  }

  addStudent(student) { ... }
  addTeacher(teacher) { ... }
  getStatistics() { ... }
}
✅ Функциональность
👨‍🎓 Регистрация студентов (с уникальным ID)

👩‍🏫 Добавление преподавателей и назначение предметов

🧾 Назначение оценок по предметам

📊 Подсчёт GPA каждого студента

🧠 Генерация транскрипта (всех оценок)

🔎 Поиск студентов по ID и фильтрация по курсам

🔐 Валидация данных (например, email, возраст)

📁 Структура проекта
bash
Copy
Edit
task-05/
├── index.html         # Интерфейс (форма ввода и вывод данных)
├── style.css          # Стили
├── script.js          # Основная логика классов и взаимодействий
├── ui.js              # Взаимодействие с DOM
└── README.md          # Описание задачи и реализации
🧪 Пример использования
js
Copy
Edit
const uni = new University();

const alice = new Student("Алиса", 20, "alice@example.com", "S123");
const bob = new Teacher("Боб", 40, "bob@uni.edu", "T456");

alice.enrollCourse("Математика");
bob.assignGrade(alice, "Математика", 5);

uni.addStudent(alice);
uni.addTeacher(bob);

console.log(alice.getTranscript());
console.log(uni.getStatistics());
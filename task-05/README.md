# Task 05 — Система управления студентами

## 🔧 Описание задачи

Реализована система управления студентами и преподавателями с применением объектно-ориентированного подхода (ООП) на JavaScript.

## 🔤 Структура классов

### ✅ Person (базовый класс)
- name, age, email
- getInfo()

### 👨‍🎓 Student (наследник Person)
- studentId, courses[], grades{}
- enrollCourse(course)
- addGrade(course, grade)
- calculateGPA()
- getTranscript()

### 👨‍🏫 Teacher (наследник Person)
- teacherId, subjects[], students[]
- assignGrade(student, subject, grade)
- getStudentsBySubject(subject)

### 🏫 University
- addStudent(student)
- addTeacher(teacher)
- getStatistics()
- findStudentsByName(query)
- generateReport()

## 📈 Возможности
- Добавление студентов и преподавателей
- Назначение оценок по предметам
- Расчёт среднего балла (GPA)
- Поиск студентов по имени
- Генерация отчётов и статистики

## ▶️ Запуск
Открой `script.js` в среде (например, Node.js):

```bash
node script.js

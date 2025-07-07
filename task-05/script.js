// ✅ Базовый класс
class Person {
  constructor(name, age, email) {
    if (!name || typeof name !== 'string') throw new Error("Некорректное имя");
    if (typeof age !== 'number' || age <= 0) throw new Error("Некорректный возраст");
    if (!email.includes('@')) throw new Error("Некорректный email");

    this.name = name;
    this.age = age;
    this.email = email;
  }

  getInfo() {
    return `${this.name}, ${this.age} лет, Email: ${this.email}`;
  }
}

// ✅ Студент
class Student extends Person {
  constructor(name, age, email, studentId) {
    super(name, age, email);
    this.studentId = studentId;
    this.courses = [];
    this.grades = {};
  }

  enrollCourse(course) {
    if (!this.courses.includes(course)) {
      this.courses.push(course);
      this.grades[course] = [];
    }
  }

  addGrade(course, grade) {
    if (!this.grades[course]) throw new Error("Студент не записан на курс");
    this.grades[course].push(grade);
  }

  calculateGPA() {
    const allGrades = Object.values(this.grades).flat();
    if (allGrades.length === 0) return 0;
    const sum = allGrades.reduce((a, b) => a + b, 0);
    return (sum / allGrades.length).toFixed(2);
  }

  getTranscript() {
    return {
      student: this.name,
      grades: this.grades,
      GPA: this.calculateGPA(),
    };
  }
}

// ✅ Преподаватель
class Teacher extends Person {
  constructor(name, age, email, teacherId) {
    super(name, age, email);
    this.teacherId = teacherId;
    this.subjects = [];
    this.students = [];
  }

  assignGrade(student, subject, grade) {
    if (!student || !(student instanceof Student)) throw new Error("Неверный студент");
    if (!this.subjects.includes(subject)) this.subjects.push(subject);
    student.enrollCourse(subject);
    student.addGrade(subject, grade);
    if (!this.students.includes(student)) this.students.push(student);
  }

  getStudentsBySubject(subject) {
    return this.students.filter(s => s.courses.includes(subject));
  }
}

// ✅ Университет
class University {
  constructor(name) {
    this.name = name;
    this.students = [];
    this.teachers = [];
  }

  addStudent(student) {
    if (!(student instanceof Student)) throw new Error("Не студент");
    this.students.push(student);
  }

  addTeacher(teacher) {
    if (!(teacher instanceof Teacher)) throw new Error("Не преподаватель");
    this.teachers.push(teacher);
  }

  getStatistics() {
    return {
      totalStudents: this.students.length,
      totalTeachers: this.teachers.length,
      averageGPA:
        (this.students.reduce((sum, s) => sum + parseFloat(s.calculateGPA()), 0) /
          (this.students.length || 1)).toFixed(2),
    };
  }

  findStudentsByName(query) {
    return this.students.filter(s => s.name.toLowerCase().includes(query.toLowerCase()));
  }

  generateReport() {
    return this.students.map(s => s.getTranscript());
  }
}


const uni = new University("Мой Университет");

// Временный преподаватель
const teacher = new Teacher("Преподаватель", 40, "teacher@mail.com", "T001");
uni.addTeacher(teacher);

function addStudent() {
  const name = document.getElementById("studentName").value;
  const age = parseInt(document.getElementById("studentAge").value);
  const email = document.getElementById("studentEmail").value;
  const id = document.getElementById("studentId").value;

  try {
    const student = new Student(name, age, email, id);
    uni.addStudent(student);
    alert("Студент добавлен!");
  } catch (err) {
    alert("Ошибка: " + err.message);
  }
}

function assignGrade() {
  const id = document.getElementById("gradeStudentId").value;
  const course = document.getElementById("gradeCourse").value;
  const grade = parseFloat(document.getElementById("gradeValue").value);

  const student = uni.students.find(s => s.studentId === id);
  if (!student) return alert("Студент не найден");

  try {
    teacher.assignGrade(student, course, grade);
    alert("Оценка назначена!");
  } catch (err) {
    alert("Ошибка: " + err.message);
  }
}

function renderStats() {
  const output = document.getElementById("statsOutput");
  output.innerHTML = "";

  uni.students.forEach(s => {
    const div = document.createElement("div");
    const transcript = s.getTranscript();
    div.innerHTML = `
      <strong>${s.name}</strong><br/>
      GPA: ${transcript.GPA}<br/>
      Курсы: ${Object.keys(transcript.grades).join(", ") || "нет"}<br/>
      <hr/>
    `;
    output.appendChild(div);
  });
}

import questions from './questions.js';

const startScreen   = document.getElementById('start-screen');
const quizScreen    = document.getElementById('quiz-screen');
const resultScreen  = document.getElementById('result-screen');
const statsScreen   = document.getElementById('stats-screen');
const catSelect     = document.getElementById('category-select');
const diffSelect    = document.getElementById('difficulty-select');
const timerInput    = document.getElementById('timer-input');
const soundStart    = document.getElementById('sound-start');
const soundCorrect  = document.getElementById('sound-correct');
const soundWrong    = document.getElementById('sound-wrong');
let currentIndex = 0, score = 0, timePerQ = 15, timerInterval;
let history = JSON.parse(localStorage.getItem('quizHistory')) || [];
let settings = JSON.parse(localStorage.getItem('quizSettings')) || {};

// Инициализация: загрузка настроек и заполнение категорий
function init() {
  if (settings.category)   catSelect.value = settings.category;
  if (settings.difficulty) diffSelect.value = settings.difficulty;
  if (settings.timer)      timerInput.value = settings.timer;
  const cats = [...new Set(questions.map(q => q.category))];
  cats.forEach(cat => catSelect.append(new Option(cat, cat)));
}
init();

// Навешиваем обработчики
document.getElementById('start-button').addEventListener('click', startQuiz);
document.getElementById('pause-button').addEventListener('click', pauseQuiz);
document.getElementById('restart-button').addEventListener('click', () => location.reload());
document.getElementById('stats-button').addEventListener('click', () => { renderStats(); showScreen('stats-screen'); });
document.getElementById('back-button').addEventListener('click', () => showScreen('start-screen'));

// Запуск викторины
function startQuiz() {
  soundStart.play();
  settings = { category: catSelect.value, difficulty: diffSelect.value, timer: +timerInput.value };
  localStorage.setItem('quizSettings', JSON.stringify(settings));
  currentIndex = 0; score = 0; timePerQ = settings.timer;
  showScreen('quiz-screen');
  showQuestion();
}

// Показываем следующий вопрос
function showQuestion() {
  clearInterval(timerInterval);
  const pool = questions.filter(q =>
    q.category === settings.category && q.difficulty === settings.difficulty
  );
  if (currentIndex >= pool.length) return endQuiz();
  const q = pool[currentIndex];
  document.getElementById('question').textContent = q.question;
  const opts = document.getElementById('options');
  opts.innerHTML = '';
  q.options.forEach((text, i) => {
    const li = document.createElement('li');
    li.className = 'option';
    li.textContent = text;
    li.addEventListener('click', () => selectAnswer(i === q.correctAnswer));
    opts.append(li);
  });
  startTimer(timePerQ);
  updateProgress(pool.length);
}

// Таймер на вопрос
function startTimer(sec) {
  const timerEl = document.getElementById('timer');
  let t = sec;
  timerEl.textContent = `00:${String(t).padStart(2,'0')}`;
  timerInterval = setInterval(() => {
    t--;
    timerEl.textContent = `00:${String(t).padStart(2,'0')}`;
    if (t < 0) selectAnswer(false);
  }, 1000);
}

// Обработка паузы
function pauseQuiz() {
  clearInterval(timerInterval);
  alert('Игра приостановлена. Нажмите OK, чтобы продолжить.');
  showTimerRemaining();
}

function showTimerRemaining() {
  const timerEl = document.getElementById('timer');
  const sec = +timerEl.textContent.split(':')[1];
  startTimer(sec);
}

// Выбор ответа
function selectAnswer(isCorrect) {
  clearInterval(timerInterval);
  if (isCorrect) { score++; soundCorrect.play(); }
  else soundWrong.play();
  currentIndex++;
  setTimeout(showQuestion, 500);
}

// Обновление прогресс‑бара
function updateProgress(total) {
  document.getElementById('progress').style.width = `${(currentIndex/total)*100}%`;
}

// Конец викторины
function endQuiz() {
  saveHistory();
  document.getElementById('score').textContent = score;
  showScreen('result-screen');
}

// Сохранение истории и лучших результатов
function saveHistory() {
  history.push({
    date:       new Date().toLocaleString(),
    category:   settings.category,
    difficulty: settings.difficulty,
    score
  });
  localStorage.setItem('quizHistory', JSON.stringify(history));
}

// Отрисовка статистики
function renderStats() {
  const sl = document.getElementById('stats-list');
  sl.innerHTML = '';
  history.forEach(h =>
    sl.append(new Option(`${h.date} — ${h.category}/${h.difficulty}: ${h.score}`, ''))
  );
  const best = {};
  history.forEach(h => {
    const key = `${h.category}|${h.difficulty}`;
    if (!best[key] || h.score > best[key].score) best[key] = h;
  });
  const bl = document.getElementById('best-list');
  bl.innerHTML = '';
  Object.values(best).forEach(h =>
    bl.append(new Option(`${h.category}/${h.difficulty}: ${h.score}`, ''))
  );
}

// Переключение экранов
function showScreen(id) {
  document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
  document.getElementById(id).classList.add('active');
}

import TaskManager from './TaskManager.js';
import UI from './UI.js';
import Notifications from './Notifications.js';
import ImportExport from './ImportExport.js';

const tm = new TaskManager();
const ui = new UI(tm);

// Элементы
const addBtn      = document.getElementById('add-task-btn');
const listBtn     = document.getElementById('view-list-btn');
const calBtn      = document.getElementById('view-calendar-btn');
const modal       = document.getElementById('task-modal');
const form        = document.getElementById('task-form');
const cancelBtn   = document.getElementById('modal-cancel');
const exportBtn   = document.createElement('button');
const importInput = document.createElement('input');
const content     = document.getElementById('content');

exportBtn.textContent = 'Export JSON';
importInput.type = 'file';
importInput.accept = 'application/json';

// Вставляем кнопки в header
const header = document.querySelector('#main-view header');
header.append(exportBtn, importInput);

// Инициализация
async function init() {
  const ok = await Notifications.init();
  if (!ok) console.warn('Уведомления отключены');
  ui.renderList();
  tm.getAll().forEach(t => Notifications.schedule(t)); // напоминания
}
init();

// Открытие модалки
addBtn.onclick = () => {
  form.reset();
  delete form.dataset.editId;
  document.getElementById('modal-title').textContent = 'New Task';
  modal.classList.remove('hidden');
};

// Закрытие модалки
cancelBtn.onclick = () => {
  form.reset();
  delete form.dataset.editId;
  modal.classList.add('hidden');
};

// Смена режимов
listBtn.onclick = () => ui.renderList();
calBtn.onclick  = () => ui.renderCalendar();

// Submit формы: создание/редактирование
form.onsubmit = e => {
  e.preventDefault();
  const data = Object.fromEntries(new FormData(form));
  data.tags = data.tags ? data.tags.split(',').map(t => t.trim()) : [];

  // Валидация
  if (!data.title.trim()) {
    alert('Введите название задачи.');
    return;
  }
  if (data.dueDate && isNaN(new Date(data.dueDate))) {
    alert('Некорректная дата.');
    return;
  }

  if (form.dataset.editId) {
    tm.update(form.dataset.editId, data);
    delete form.dataset.editId;
  } else {
    tm.create(data);
  }

  modal.classList.add('hidden');
  form.reset();
  ui.renderList();
  tm.getAll().forEach(t => Notifications.schedule(t));
};


// Делегирование кнопок edit/delete
content.addEventListener('click', e => {
  const id = e.target.dataset.id;
  const action = e.target.dataset.action;
  if (!id || !action) return;

  if (action === 'delete') {
    tm.delete(id);
    ui.renderList();
    return;
  }

  if (action === 'edit') {
    const task = tm.getAll().find(t => t.id === id);
    if (!task) return;

    form.dataset.editId = id;
    document.getElementById('modal-title').textContent = 'Edit Task';

    // Заполняем форму
    form.title.value       = task.title;
    form.description.value = task.description;
    form.category.value    = task.category;
    form.tags.value        = task.tags.join(', ');
    form.dueDate.value     = task.dueDate;
    form.priority.value    = task.priority;
    form.status.value      = task.status;

    modal.classList.remove('hidden');
  }
});

// Фильтрация
const searchIn = document.getElementById('search-input');
const statusFilters = [...document.querySelectorAll('#filter-status input')];
searchIn.oninput = applyFilters;
statusFilters.forEach(chk => chk.onchange = applyFilters);

function applyFilters() {
  const term = searchIn.value.toLowerCase();
  const statuses = statusFilters.filter(c => c.checked).map(c => c.value);
  ui.renderList(t =>
    t.title.toLowerCase().includes(term) && statuses.includes(t.status)
  );
}

// Экспорт / Импорт
exportBtn.onclick = () => ImportExport.export(tm.getAll());
importInput.onchange = async () => {
  const arr = await ImportExport.import(importInput.files[0]);
  if (arr) {
    tm.replaceAll(arr);
    ui.renderList();
  }
};

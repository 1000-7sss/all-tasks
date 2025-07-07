const tasks = [];
let nextId = 1;

function addTask() {
  const title = document.getElementById('taskTitle').value.trim();
  const priority = document.getElementById('taskPriority').value;
  if (!title) return;

  tasks.push({
    id: nextId++,
    title,
    completed: false,
    priority,
    createdAt: new Date().toISOString().split('T')[0]
  });

  document.getElementById('taskTitle').value = '';
  renderTasks();
}

function toggleTask(id) {
  const task = tasks.find(t => t.id === id);
  if (task) task.completed = !task.completed;
  renderTasks();
}

function removeTask(id) {
  const index = tasks.findIndex(t => t.id === id);
  if (index !== -1) tasks.splice(index, 1);
  renderTasks();
}

function renderTasks() {
  const list = document.getElementById('taskList');
  list.innerHTML = '';

  const status = document.getElementById('statusFilter').value;
  const sortBy = document.getElementById('sortFilter').value;
  const query = document.getElementById('searchInput').value.toLowerCase();

  let filtered = tasks.filter(t => {
    if (status === 'completed') return t.completed;
    if (status === 'pending') return !t.completed;
    return true;
  }).filter(t => t.title.toLowerCase().includes(query));

  if (sortBy === 'priority') {
    const order = { high: 1, medium: 2, low: 3 };
    filtered.sort((a, b) => order[a.priority] - order[b.priority]);
  } else {
    filtered.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  }

  for (const task of filtered) {
    const li = document.createElement('li');
    li.className = `${task.priority} ${task.completed ? 'completed' : ''}`;
    li.innerHTML = `
      <span onclick="toggleTask(${task.id})" style="cursor:pointer;">
        ${task.title} (${task.priority})
      </span>
      <button onclick="removeTask(${task.id})">Удалить</button>
    `;
    list.appendChild(li);
  }

  updateStats();
}

function updateStats() {
  const total = tasks.length;
  const completed = tasks.filter(t => t.completed).length;
  const pending = total - completed;
  document.getElementById('stats').textContent =
    `Всего: ${total} | Выполнено: ${completed} | Осталось: ${pending}`;
}

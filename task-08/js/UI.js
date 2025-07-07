import Calendar from './Calendar.js';

export default class UI {
  constructor(taskManager) {
    this.tm = taskManager;
    this.content = document.getElementById('content');
  }

  renderList(filterFn = x => true) {
    this.content.innerHTML = '';
    this.tm.getAll().filter(filterFn).forEach(task => {
      const card = document.createElement('div');
      card.className = 'task-card';
      card.draggable = true;
      card.dataset.id = task.id;
      card.innerHTML = `
  <h3>${task.title}</h3>
  <div class="task-meta">
    ${task.category || '—'} | ${task.tags.join(', ')} | Due: ${task.dueDate}
  </div>
  <div>${task.description}</div>
  <div class="task-actions">
    <button data-action="edit" data-id="${task.id}" title="Редактировать">✎</button>
    <button data-action="delete" data-id="${task.id}" title="Удалить">🗑️</button>
  </div>
`;
      this._addDragHandlers(card);
      this.content.append(card);
    });
  }

  renderCalendar() {
    this.content.innerHTML = '';
    new Calendar(this.tm.getAll(), this.content).render();
  }

  _addDragHandlers(card) {
    card.addEventListener('dragstart', e => {
      e.dataTransfer.setData('text/plain', card.dataset.id);
      card.classList.add('dragging');
    });
    card.addEventListener('dragend', e => {
      card.classList.remove('dragging');
      this._reorderFromDOM();
    });
  }

  // После dragend пересобираем порядок в TaskManager и сохраняем
  _reorderFromDOM() {
    const ids = [...this.content.querySelectorAll('.task-card')].map(c=>c.dataset.id);
    this.tm.reorder(ids);
    this.tm.save(); // сохраняем новый порядок
  }
}

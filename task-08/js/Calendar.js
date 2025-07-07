export default class Calendar {
  constructor(tasks, container) {
    this.tasks = tasks;
    this.container = container;
  }
  render() {
    // Очень упрощённый календарь — группируем по дате
    const byDate = this.tasks.reduce((acc, t) => {
      acc[t.dueDate] = acc[t.dueDate] || [];
      acc[t.dueDate].push(t);
      return acc;
    }, {});
    Object.keys(byDate).sort().forEach(date => {
      const day = document.createElement('div');
      day.innerHTML = `<h4>${date}</h4>`;
      byDate[date].forEach(t => {
        const li = document.createElement('div');
        li.textContent = t.title;
        day.append(li);
      });
      this.container.append(day);
    });
  }
}

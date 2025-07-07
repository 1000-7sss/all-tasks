const STORAGE_KEY = 'taskPlannerTasks';

export default class Storage {
  static load() {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  }
  static save(tasks) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
  }
}

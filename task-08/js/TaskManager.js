import { generateId } from './utils.js';
import Storage from './Storage.js';

export default class TaskManager {
  constructor() {
    this.tasks = Storage.load();
  }
  getAll() { return this.tasks; }
  create(task) {
    task.id = generateId();
    task.createdAt = task.updatedAt = new Date().toISOString();
    this.tasks.push(task);
    this.save();
  }
  update(id, upd) {
    const t = this.tasks.find(x=>x.id===id);
    Object.assign(t, upd, { updatedAt:new Date().toISOString() });
    this.save();
  }
  delete(id) {
    this.tasks = this.tasks.filter(x=>x.id!==id);
    this.save();
  }
  reorder(idList) {
    this.tasks = idList.map(id=>this.tasks.find(t=>t.id===id));
  }
  replaceAll(arr) {
    this.tasks = arr;
    this.save();
  }
  save() {
    Storage.save(this.tasks);
  }
}

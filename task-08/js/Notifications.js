export default class Notifications {
  static async init() {
    if (!("Notification" in window)) return;
    let perm = Notification.permission;
    if (perm === "default") {
      perm = await Notification.requestPermission();
    }
    return perm === "granted";
  }

  // ставим напоминание за X минут до dueDate
  static schedule(task, minutesBefore = 10) {
    if (Notification.permission !== "granted") return;
    const due = new Date(task.dueDate).getTime();
    const when = due - minutesBefore * 60000;
    const delay = when - Date.now();
    if (delay <= 0) return; // уже в прошлом
    setTimeout(() => {
      new Notification("Напоминание по задаче", {
        body: `${task.title} — дедлайн ${task.dueDate}`,
      });
    }, delay);
  }
}

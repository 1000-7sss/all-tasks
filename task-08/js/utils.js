// Генерация уникального ID
export function generateId() {
  return '_' + Math.random().toString(36).substr(2, 9);
}

// Форматирование даты
export function formatDate(dateStr) {
  const dt = new Date(dateStr);
  return dt.toLocaleDateString();
}

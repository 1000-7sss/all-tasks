export default class ImportExport {
  // Скачивает JSON с текущими задачами
  static export(tasks) {
    const blob = new Blob([JSON.stringify(tasks, null,2)], {type: "application/json"});
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url; a.download = "tasks_export.json";
    a.click();
    URL.revokeObjectURL(url);
  }

  // Импорт из выбранного файла <input type="file">
  static async import(file) {
    const text = await file.text();
    try {
      const arr = JSON.parse(text);
      if (!Array.isArray(arr)) throw "Invalid format";
      return arr;
    } catch(e) {
      alert("Ошибка импорта: неверный формат JSON");
      return null;
    }
  }
}

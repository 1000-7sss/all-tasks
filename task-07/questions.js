const questions = [
  // JavaScript - Easy
  { id: 1, question: "Что выведет console.log(typeof 42)?", options: ["string","number","object","boolean"], correctAnswer: 1, difficulty: "easy", category: "JavaScript" },
  { id: 2, question: "Какая функция используется для преобразования строки в число?", options: ["parseInt","toString","JSON.parse","Number.isNaN"], correctAnswer: 0, difficulty: "easy", category: "JavaScript" },

  // JavaScript - Medium
  { id: 3, question: "Что вернёт выражение [] + []?", options: ["''","undefined","NaN","[]"], correctAnswer: 0, difficulty: "medium", category: "JavaScript" },
  { id: 4, question: "Какой метод массива удаляет первый элемент?", options: ["pop()","shift()","splice()","slice()"], correctAnswer: 1, difficulty: "medium", category: "JavaScript" },

  // JavaScript - Hard
  { id: 5, question: "Что вернёт выражение typeof null?", options: ["null","object","undefined","boolean"], correctAnswer: 1, difficulty: "hard", category: "JavaScript" },
  { id: 6, question: "Чем отличается call от apply?", options: ["call передаёт массив аргументов","apply передаёт массив аргументов","они одинаковы","они устарели"], correctAnswer: 1, difficulty: "hard", category: "JavaScript" },

  // HTML - Easy
  { id: 7,  question: "Какой тег используется для параграфа?", options: ["<p>","<paragraph>","<text>","<div>"], correctAnswer: 0, difficulty: "easy", category: "HTML" },
  { id: 8,  question: "Как обозначается заголовок первого уровня?", options: ["<h1>","<title>","<header>","<head>"], correctAnswer: 0, difficulty: "easy", category: "HTML" },

  // HTML - Medium
  { id: 9,  question: "Какой атрибут img отвечает за альтернативный текст?", options: ["alt","title","src","href"], correctAnswer: 0, difficulty: "medium", category: "HTML" },
  { id: 10, question: "Что делает тег <form>?", options: ["Создаёт форму","Вставляет текст","Добавляет стиль","Подключает скрипт"], correctAnswer: 0, difficulty: "medium", category: "HTML" },

  // HTML - Hard
  { id: 11, question: "Как задать область из нескольких ячеек в table?", options: ["rowspan/colspan","merge","group","cellspan"], correctAnswer: 0, difficulty: "hard", category: "HTML" },
  { id: 12, question: "Какой тег используется для встраивания видео?", options: ["<video>","<embed>","<media>","<iframe>"], correctAnswer: 0, difficulty: "hard", category: "HTML" },

  // CSS - Easy
  { id: 13, question: "Как задать внутренний отступ?", options: ["padding","margin","border","spacing"], correctAnswer: 0, difficulty: "easy", category: "CSS" },
  { id: 14, question: "Как поменять цвет текста?", options: ["color","background-color","font-size","text-style"], correctAnswer: 0, difficulty: "easy", category: "CSS" },

  // CSS - Medium
  { id: 15, question: "Что делает display: grid?", options: ["Включает grid-контейнер","Создаёт флекс","Прячет элемент","Задаёт фон"], correctAnswer: 0, difficulty: "medium", category: "CSS" },
  { id: 16, question: "Как задать шрифт Arial?", options: ["font-family: Arial","font: Arial","text-font: Arial","typeface: Arial"], correctAnswer: 0, difficulty: "medium", category: "CSS" },

  // CSS - Hard
  { id: 17, question: "Что означает селектор :nth-child(2)?", options: ["Второй элемент среди дочерних","Последний элемент","Первый элемент","Каждый второй элемент"], correctAnswer: 0, difficulty: "hard", category: "CSS" },
  { id: 18, question: "Как задать фиксированную ширину и центрировать блок?", options: ["width:100px;margin:0 auto","center:100px","margin-center","align:center"], correctAnswer: 0, difficulty: "hard", category: "CSS" },

  // React - Easy
  { id: 19, question: "JSX — это?", options: ["Расширение синтаксиса JavaScript","Фреймворк","Библиотека","Тег HTML"], correctAnswer: 0, difficulty: "easy", category: "React" },
  { id: 20, question: "Как рендерить компонент в DOM?", options: ["ReactDOM.render()","render()","mount()","attach()"], correctAnswer: 0, difficulty: "easy", category: "React" },

  // React - Medium
  { id: 21, question: "Для чего нужен useEffect?", options: ["Побочные эффекты","Состояние","Контекст","Редьюсер"], correctAnswer: 0, difficulty: "medium", category: "React" },
  { id: 22, question: "Каким хуком получаем контекст?", options: ["useContext","useState","useRef","useMemo"], correctAnswer: 0, difficulty: "medium", category: "React" },

  // React - Hard
  { id: 23, question: "Как предотвратить лишний рендер?", options: ["React.memo","useEffect","PureComponent","useState"], correctAnswer: 0, difficulty: "hard", category: "React" },
  { id: 24, question: "Что возвращает useCallback?", options: ["Мемоизированную функцию","Значение","Контекст","Компонент"], correctAnswer: 0, difficulty: "hard", category: "React" }
];

export default questions;

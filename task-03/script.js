const images = [
  { src: 'image1.png', alt: 'Описание 1', title: 'Заголовок 1' },
  { src: 'image1.png', alt: 'Описание 2', title: 'Заголовок 2' },
  { src: 'image1.png', alt: 'Описание 3', title: 'Заголовок 3' },
  { src: 'image1.png', alt: 'Описание 4', title: 'Заголовок 4' },
];

const gallery = document.getElementById('gallery');
const modal = document.getElementById('modal');
const modalImg = document.getElementById('modalImage');
const modalTitle = document.getElementById('modalTitle');
const modalAlt = document.getElementById('modalAlt');
const counter = document.getElementById('counter');
const closeBtn = document.getElementById('close');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');

let currentIndex = 0;

// Создание миниатюр
images.forEach((img, index) => {
  const thumbnail = document.createElement('img');
  thumbnail.src = img.src;
  thumbnail.alt = img.alt;
  thumbnail.title = img.title;
  thumbnail.addEventListener('click', () => openModal(index));
  gallery.appendChild(thumbnail);
});

// Открытие модального окна
function openModal(index) {
  currentIndex = index;
  updateModal();
  modal.style.display = 'flex';
}

// Обновить содержимое модального окна
function updateModal() {
  const { src, alt, title } = images[currentIndex];
  modalImg.src = src;
  modalAlt.textContent = alt;
  modalTitle.textContent = title;
  counter.textContent = `${currentIndex + 1} / ${images.length}`;
}

// Закрытие модального окна
function closeModal() {
  modal.style.display = 'none';
}

// Перелистывание
function prevImage() {
  currentIndex = (currentIndex - 1 + images.length) % images.length;
  updateModal();
}

function nextImage() {
  currentIndex = (currentIndex + 1) % images.length;
  updateModal();
}

// Слушатели
closeBtn.addEventListener('click', closeModal);
prevBtn.addEventListener('click', prevImage);
nextBtn.addEventListener('click', nextImage);

// Закрытие по фону или ESC
modal.addEventListener('click', e => {
  if (e.target === modal) closeModal();
});

document.addEventListener('keydown', e => {
  if (!modal.style.display.includes('flex')) return;
  if (e.key === 'ArrowLeft') prevImage();
  if (e.key === 'ArrowRight') nextImage();
  if (e.key === 'Escape') closeModal();
});

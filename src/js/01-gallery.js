// Описаний в документації
import SimpleLightbox from "simplelightbox";
// Додатковий імпорт стилів
import "simplelightbox/dist/simple-lightbox.min.css";

// Імпортуємо масив елементів галереї з іншого файлу
import { galleryItems } from './gallery-items.js';

// Знаходимо контейнер галереї на сторінці
const galleryContainer = document.querySelector('.gallery');

// Функція, яка створює HTML-розмітку для елемента галереї
const createGalleryItem = ({ preview, original, description }) =>
  `<li class="gallery__item">
    <a class="gallery__link" href="${original}">
      <img
        class="gallery__image"
        src="${preview}"
        data-source="${original}"
        alt="${description}"
      />
    </a>
  </li>`;

// Створюємо HTML-розмітку для всіх елементів галереї
const galleryMarkup = galleryItems.map(createGalleryItem).join('');

// Додаємо HTML-розмітку до контейнера галереї
galleryContainer.insertAdjacentHTML('beforeend', galleryMarkup);

// Додаємо обробник події на контейнер галереї
galleryContainer.addEventListener('click', (event) => {
  event.preventDefault();

  // Перевіряємо, чи був натиснутий елемент з тегом 'img'
  const isGalleryImageEl = event.target.nodeName === 'IMG';

  if (!isGalleryImageEl) {
    return;
  }

  // Отримуємо посилання на зображення та його опис
  const galleryImageSrc = event.target.dataset.source;
  const galleryImageAlt = event.target.alt;

  // Створюємо екземпляр модального вікна та показуємо його
  const instance = basicLightbox.create(
    `
      <img src="${galleryImageSrc}" alt="${galleryImageAlt}">
    `,
    {
      onShow: (instance) => {
        console.log('onShow', instance);
        window.addEventListener('keydown', (event) => onEscKeyPress(event, instance));
      },
      onClose: (instance) => {
        console.log('onClose', instance);
        window.removeEventListener('keydown', (event) => onEscKeyPress(event, instance));
      },
    }
  );

  instance.show();

  // Додаємо слухачів подій
  window.addEventListener('keydown', (event) => onEscKeyPress(event, instance));
  instance.element().addEventListener('click', () => {
    instance.close();
    window.removeEventListener('keydown', (event) => onEscKeyPress(event, instance));
  });
});

// Додаємо обробник події на клавішу 'Escape' для закриття модального вікна
function onEscKeyPress(event, instance) {
  if (event.code === 'Escape') {
    instance.close();
  }
}

import throttle from 'lodash.throttle';

const form = document.querySelector('.feedback-form');
const email = form.elements.email;
const message = form.elements.message;

const feedbackStateKey = 'feedback-form-state';

// відстежуємо подію input на формі і зберігаємо дані у локальне сховище

form.addEventListener(
  'input',
  throttle(function () {
    const feedbackState = {
      email: email.value,
      message: message.value,
    };
    localStorage.setItem(feedbackStateKey, JSON.stringify(feedbackState));
  }, 500)
);

// під час завантаження сторінки заповнюємо поля форми з даних, збережених у локальному сховищі

const savedFeedbackState = JSON.parse(localStorage.getItem(feedbackStateKey));
if (savedFeedbackState) {
  email.value = savedFeedbackState.email;
  message.value = savedFeedbackState.message;
}

// під час сабміту форми робимо перевірки та виводимо дані в консоль і очищуємо сховище та поля форми

form.addEventListener('submit', function (event) {
  event.preventDefault();

    // перевірка, що обидва поля email та message заповнені
    if (email.value.trim() === '' || message.value.trim() === '') {
      console.log('Поля email та/або повідомлення порожні');
      alert('Будь ласка, заповніть поля e-mail та повідомлення');
      return;
    }
  
    // перевірка валідності поля email за допомогою регулярного виразу
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.value)) {
      console.log('Email не валідний');
      alert('Будь ласка, введіть валідне значення e-mail');
      return;
    }

  console.log('Feedback data:', {
    email: email.value,
    message: message.value,
  });

  localStorage.removeItem(feedbackStateKey);
  email.value = '';
  message.value = '';
});

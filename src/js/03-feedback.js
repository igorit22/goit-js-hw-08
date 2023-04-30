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

// під час сабміту форми очищуємо сховище та поля форми та виводимо дані в консоль

form.addEventListener('submit', function (event) {
  event.preventDefault();

  // перевіряємо, щоб значення поля email не було порожнім

  if (email.value.trim() === '') {
    console.log('Email field is empty');
    alert('Будь ласка, заповніть поле e-mail');
    return;
  }

  // перевіряємо валідність поля email за допомогою регулярного виразу
  
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email.value)) {
    console.log('Email is invalid');
    alert('Введіть валідне значення e-mail');
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

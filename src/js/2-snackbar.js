import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";


const form = document.querySelector('.form');
form.addEventListener('submit', function (event) {
  event.preventDefault();

  // Отримуємо значення з форми
  const delayInput = form.querySelector('input[name="delay"]');
  const delay = Number(delayInput.value);
  const state = form.querySelector('input[name="state"]:checked').value;

  // Створюємо проміс
  const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
      if (state === 'fulfilled') {
        resolve(delay);
      } else {
        reject(delay);
      }
    }, delay);
  });

  // Обробка промісу
  promise
    .then((delay) => {
      // Виведення успішного повідомлення
      iziToast.success({
        title: 'Success',
        message: `Fulfilled promise in ${delay}ms`,
      });
    })
    .catch((delay) => {
      // Виведення повідомлення про відхилений проміс
      iziToast.error({
        title: 'Error',
        message: `Rejected promise in ${delay}ms`,
      });
    });
});

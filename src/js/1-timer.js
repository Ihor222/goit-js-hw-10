import flatpickr from "https://cdn.jsdelivr.net/npm/flatpickr/dist/esm/index.js";
import "https://cdn.jsdelivr.net/npm/flatpickr/dist/flatpickr.min.css";
import iziToast from "https://cdn.jsdelivr.net/npm/izitoast/dist/js/iziToast.min.js";
import "https://cdn.jsdelivr.net/npm/izitoast/dist/css/iziToast.min.css";

const inputEl = document.querySelector("#datetime-picker");
const startBtn = document.querySelector("[data-start]");
const daysEl = document.querySelector("[data-days]");
const hoursEl = document.querySelector("[data-hours]");
const minutesEl = document.querySelector("[data-minutes]");
const secondsEl = document.querySelector("[data-seconds]");

let userSelectedDate = null;
let timerId = null;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    const selectedDate = selectedDates[0];
    if (selectedDate <= new Date()) {
      iziToast.error({
        title: "Error",
        message: "Please choose a date in the future",
        position: "topRight",
      });
      startBtn.disabled = true;
    } else {
      startBtn.disabled = false;
      userSelectedDate = selectedDate;
    }
  },
};

flatpickr(inputEl, options);

startBtn.addEventListener("click", () => {
  startBtn.disabled = true;
  inputEl.disabled = true;

  timerId = setInterval(() => {
    const currentTime = new Date();
    const diff = userSelectedDate - currentTime;

    if (diff <= 0) {
      clearInterval(timerId);
      updateTimer(0);
      inputEl.disabled = false;
      return;
    }

    updateTimer(diff);
  }, 1000);
});

function updateTimer(ms) {
  const { days, hours, minutes, seconds } = convertMs(ms);
  daysEl.textContent = days;
  hoursEl.textContent = addLeadingZero(hours);
  minutesEl.textContent = addLeadingZero(minutes);
  secondsEl.textContent = addLeadingZero(seconds);
}

function addLeadingZero(value) {
  return String(value).padStart(2, "0");
}

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor((ms % hour) / minute);
  const seconds = Math.floor((ms % minute) / second);

  return { days, hours, minutes, seconds };
}

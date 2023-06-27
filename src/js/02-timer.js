import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const refs = {
    startBtnEl: document.querySelector('button[data-start]'),
    daysEl: document.querySelector('[data-days]'),
    hoursEl: document.querySelector('[data-hours]'),
    minutesEl: document.querySelector('[data-minutes]'),
    secondsEl: document.querySelector('[data-seconds]'),
}

// Настройки Flatpickr
const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
        console.log(selectedDates[0]);

        if (selectedDates[0] <= new Date) {
            makeStartBtnDisabled();
            return Notify.failure('Please choose a date in the future');
        };
        makeStartBtnEnabled();
    },
};

const fp = flatpickr("#datetime-picker", options);

makeStartBtnDisabled();

refs.startBtnEl.addEventListener('click', () => {
    makeStartBtnDisabled();
    let timerId = setInterval(() => {
        const finishTime = fp.selectedDates[0].getTime();
        const startTime = Date.now();
        const deltaTime = finishTime - startTime;
        if (deltaTime <= 0) {
            clearInterval(timerId);
            return;
        }
            const timer = convertMs(deltaTime);
            
            showTimeTicker(timer);
    }, 1000);
});

function makeStartBtnDisabled() {
    refs.startBtnEl.setAttribute('disabled', 'disabled');
}

function makeStartBtnEnabled() {
    refs.startBtnEl.removeAttribute('disabled');
}

// ф-ція для форматування у хх-хх-хх-хх
function addLeadingZero(value) {
    return String(value).padStart(2, '0');
}

// ф-ція підрахунку часу
function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = addLeadingZero(Math.floor(ms / day));
  // Remaining hours
  const hours = addLeadingZero(Math.floor((ms % day) / hour));
  // Remaining minutes
  const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));
  // Remaining seconds
  const seconds = addLeadingZero(Math.floor((((ms % day) % hour) % minute) / second));

  return { days, hours, minutes, seconds };
};

function showTimeTicker({ days, hours, minutes, seconds }) {
    refs.daysEl.textContent = days;
    refs.hoursEl.textContent = hours;
    refs.minutesEl.textContent = minutes;
    refs.secondsEl.textContent = seconds;
}
const startEl = document.querySelector('button[data-start]');
const stopEl = document.querySelector('button[data-stop]');
const bodyEl = document.querySelector('body');
let timerId = null;

startEl.addEventListener('click', () => {
    startEl.setAttribute('disabled', 'disabled');

    timerId = setInterval(() => {
        let backgroundColor = getRandomHexColor();
        bodyEl.style.backgroundColor = backgroundColor;
    }, 1000)
});

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, 0)}`;
};

stopEl.addEventListener('click', () => {
    clearInterval(timerId);
    startEl.removeAttribute('disabled');
});
